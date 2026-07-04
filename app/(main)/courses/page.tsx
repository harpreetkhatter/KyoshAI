import React from 'react';
import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import CourseGeneratorHero from './_components/course-generator-hero';
import CourseDashboard from './_components/course-dashboard';

export default async function CoursesPage() {
    const { userId } = await auth();

    let courses: any[] = [];
    if (userId) {
        const user = await db.user.findUnique({ where: { clerkUserId: userId } });
        if (user) {
            const rawCourses = await db.course.findMany({
                where: { createdBy: user.id },
                include: {
                    _count: {
                        select: { slides: true }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
            courses = rawCourses.filter((course: any) => {
                return course._count.slides === course.totalChapters * 5;
            });
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden w-full text-white">
            {/* KyoshAI Grid Background */}
            <div className="grid-background"></div>

            <div className="container mx-auto py-16 px-4 md:px-8 relative z-10 max-w-7xl space-y-16">
                <CourseGeneratorHero />

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight text-white/90">Your Generated Courses</h2>
                    <CourseDashboard courses={courses} />
                </div>
            </div>
        </div>
    );
}
