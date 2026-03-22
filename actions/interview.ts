"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
// Only Voice AI functions remain

export async function getVoiceInterviews() {
    const { userId } = await auth();
    if (!userId) return [];

    try {
        const user = await db.user.findUnique({ where: { clerkUserId: userId } });
        if (!user) return [];

        return await db.voiceInterview.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" }
        });
    } catch (error) {
        console.error("Failed to fetch voice interviews:", error);
        return [];
    }
}