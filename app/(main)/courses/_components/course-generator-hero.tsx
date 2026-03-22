"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Play, Loader2, CheckCircle2 } from 'lucide-react';
import { generateCourseLayout } from '@/actions/course';
import { useRouter } from 'next/navigation';

export default function CourseGeneratorHero() {
    const [topic, setTopic] = useState('');
    const [level, setLevel] = useState('Beginner');
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('');
    const router = useRouter();

    const handleGenerate = async () => {
        if (!topic) return;
        setIsGenerating(true);
        setProgress(5);
        setStatusText("Designing Course Syllabus with AI...");

        try {
            // STEP 1: Generate Layout (Fast)
            const layoutResult = await generateCourseLayout(topic, level);
            const { course, courseId } = layoutResult;

            setProgress(20);

            // STEP 2: Generate chapters in batches of 2 (parallel Gemini, safe for gemma quota)
            const chapters = course.layout as any[];
            const chapterCount = chapters.length;
            let completed = 0;

            const batchSize = 2;
            for (let i = 0; i < chapterCount; i += batchSize) {
                const batch = chapters.slice(i, i + batchSize);
                await Promise.all(
                    batch.map(async (chapter) => {
                        setStatusText(`Generating: ${chapter.chapterTitle}...`);
                        const fetchRes = await fetch('/api/generate-video-content', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                courseId: course.courseId,
                                chapterId: chapter.chapterId,
                                subTopics: chapter.subTopics
                            })
                        });

                        if (!fetchRes.ok) {
                            const err = await fetchRes.json();
                            throw new Error(err.error || "Failed to generate chapter content");
                        }
                        completed++;
                        setProgress(20 + (completed / chapterCount) * 80);
                    })
                );
            }

            setStatusText("Course generated successfully!");
            setProgress(100);

            // Refresh the page data (server component re-fetches) then redirect
            setTimeout(() => {
                router.refresh(); // Re-fetches server component data
                router.push(`/courses/${courseId}/preview`);
            }, 1000);

        } catch (error: any) {
            console.error("Generation failed:", error);
            setStatusText(`Error: ${error.message}`);
            setIsGenerating(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-6xl mx-auto pt-12 pb-8">
            {/* Left Column - Copy */}
            <div className="flex flex-col items-start text-left space-y-6 lg:pr-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border-l-[3px] border-primary text-primary text-xs font-bold uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" /> AI Course Builder
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                    Generate <br />
                    <span className="text-primary underline decoration-primary/30 underline-offset-8">
                        Interactive Courses
                    </span> <br />
                    in Seconds.
                </h1>

                <p className="text-white/60 text-lg max-w-md font-medium leading-relaxed">
                    Simply type your topic and select a level. Our AI handles the research, curriculum design, slide creation, and voice narration instantly.
                </p>
                
                <div className="pt-4 flex items-center gap-4 text-sm font-semibold text-white/40">
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Auto-curriculum</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Voiceovers</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Slides</div>
                </div>
            </div>

            {/* Right Column - Interactive Card */}
            <div className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0 p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                
                {!isGenerating ? (
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-white/80 uppercase tracking-widest">1. Select Level</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLevel(l)}
                                        className={`py-2 rounded-lg text-xs font-bold transition-all border ${level === l
                                            ? 'bg-primary text-primary-foreground shadow-md border-primary'
                                            : 'bg-[#111] border-white/5 text-white/50 hover:bg-white/5 hover:text-white/80'
                                            }`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-white/80 uppercase tracking-widest">2. Enter Topic</label>
                            <Input
                                placeholder="e.g. Advanced Python Concurrency..."
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full bg-[#111] border-white/10 text-white placeholder:text-white/30 text-base px-4 h-14 rounded-xl focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all shadow-inner"
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                            />
                        </div>

                        <Button
                            size="lg"
                            onClick={handleGenerate}
                            disabled={!topic || isGenerating}
                            className="w-full h-14 rounded-xl font-black text-lg shadow-[0_10px_30px_-10px_var(--color-primary)] hover:scale-[1.02] transition-all"
                        >
                            Build My Course <Play className="ml-2 w-5 h-5 fill-current" />
                        </Button>
                    </div>
                ) : (
                    <div className="py-12 flex flex-col items-center justify-center space-y-8 text-center min-h-[300px]">
                        {progress < 100 ? (
                            <div className="relative">
                                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                                <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-ping" />
                            </div>
                        ) : (
                            <CheckCircle2 className="w-16 h-16 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                        )}

                        <div className="w-full space-y-4">
                            <div className="flex justify-between text-sm font-bold">
                                <span className="text-primary animate-pulse">{statusText}</span>
                                <span className="text-white/90">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2.5 bg-white/10" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
