import React from 'react';
import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import CoursePlayerWrapper from './_components/course-player-wrapper';
import { BookOpen, Layers, PlayCircle } from 'lucide-react';

export default async function CoursePreviewPage({
    params
}: {
    params: Promise<{ courseId: string }>
}) {
    const p = await params;
    const { courseId } = p;

    const course = await db.course.findUnique({
        where: { courseId: courseId }
    });

    if (!course) {
        return notFound();
    }

    const rawSlides = await db.courseSlide.findMany({
        where: { courseId: courseId }
    });

    // Build chapter order from layout (layout order = correct order)
    const layoutChapters = course.layout as any[];
    const chapterOrder = new Map(layoutChapters.map((ch: any, idx: number) => [ch.chapterId, idx]));

    // Sort slides by actual chapter order, then by slideIndex
    const slides = rawSlides.sort((a, b) => {
        const chapterDiff = (chapterOrder.get(a.chapterId) ?? 999) - (chapterOrder.get(b.chapterId) ?? 999);
        if (chapterDiff !== 0) return chapterDiff;
        return a.slideIndex - b.slideIndex;
    });

    // Group slides by chapter for the navigator
    const chapters = layoutChapters.map((ch: any) => ({
        chapterId: ch.chapterId,
        title: ch.chapterTitle,
        slides: slides.filter(s => s.chapterId === ch.chapterId),
    }));

    return (
        <div className="min-h-screen text-white overflow-hidden relative w-full pt-16 flex flex-col items-center">
            {/* KyoshAI Grid Background */}
            <div className="grid-background"></div>

            <div className="container mx-auto px-4 max-w-7xl flex flex-col items-center gap-10 relative z-10 w-full mb-20">
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl">
                    <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_-3px_var(--color-primary)]">
                        Course Player
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">{course.name}</h1>
                    <p className="text-white/50 text-lg leading-relaxed">{course.description}</p>
                    <div className="flex items-center justify-center gap-6 text-sm text-white/40">
                        <span className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-primary" />
                            {chapters.length} Chapters
                        </span>
                        <span className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-primary" />
                            {slides.length} Slides
                        </span>
                    </div>
                </div>

                {/* Player + Navigator (client component handles both for seeking) */}
                {slides.length > 0 ? (
                    <CoursePlayerWrapper slides={slides} chapters={chapters} />
                ) : (
                    <div className="w-full aspect-video bg-black rounded-3xl border border-white/10 flex items-center justify-center flex-col gap-4 text-white/40 font-medium">
                        <PlayCircle className="w-16 h-16 text-white/10" />
                        <p>No slides found for this course yet.</p>
                        <p className="text-sm">Did the generation process complete?</p>
                    </div>
                )}
            </div>
        </div>
    );
}
