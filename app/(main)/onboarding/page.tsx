import { industries } from '@/data/industries'
import React from 'react'
import OnBoardingForm from './_components/onboarding-form'
import { db } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const OnboardingPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId }
  });

  return (
    <main>
        <OnBoardingForm industries={industries} initialData={user}/>
    </main>
  )
}

export default OnboardingPage