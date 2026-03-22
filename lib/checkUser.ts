import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";

export const checkUser= async()=>{
    const user = await currentUser();
    if(!user){
        return null;
    }

    try{
        const loggedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id
            }
        });
        if (loggedInUser) {
            return loggedInUser;
        }

        const name = `${user.firstName} ${user.lastName}`;
        const email = user.emailAddresses[0].emailAddress;

        // Prevent Unique constraint error by checking email
        const existingUserByEmail = await db.user.findUnique({
            where: { email }
        });

        if (existingUserByEmail) {
            // Update the existing user with the new clerkUserId (in case they deleted/recreated their account)
            return await db.user.update({
                where: { email },
                data: {
                    clerkUserId: user.id,
                    name,
                    imageUrl: user.imageUrl
                }
            });
        }

        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email
            }
        });
        return newUser;
    }catch(err:any){
         console.log(err.message)
    }
}