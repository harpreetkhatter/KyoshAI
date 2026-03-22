"use client";

import React from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2, ArrowUpRight, Lightbulb, Activity, Calendar } from "lucide-react";

interface InterviewReportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    interview: any | null;
}

export function InterviewReportDialog({ open, onOpenChange, interview }: InterviewReportDialogProps) {
    if (!interview) return null;

    const isFailed = interview.status === "FAILED";
    const overallScore =
        interview.technicalScore !== null && interview.communicationScore !== null && interview.confidenceScore !== null
            ? Math.round((interview.technicalScore + interview.communicationScore + interview.confidenceScore) / 3)
            : null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] bg-[#0a0a0a] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border border-white/10 p-0 shadow-2xl rounded-2xl outline-none">
                <DialogDescription className="sr-only">Detailed interview report results</DialogDescription>

                {/* Top Header Band */}
                <div className="p-6 md:p-8 pb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <div className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${interview.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                    {interview.status}
                                </div>
                                <div className="px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-white/40 font-bold tracking-wider flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3" />
                                    {format(new Date(interview.createdAt), "MMM dd, yyyy")}
                                </div>
                            </div>
                            <DialogTitle className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                                {interview.targetRole}
                            </DialogTitle>
                        </div>

                        {/* Overall Score */}
                        <div className="shrink-0 flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-[#111] border border-white/5">
                            <div className="flex flex-col items-center">
                                <span className="text-[9px] uppercase tracking-widest font-bold text-white/30 mb-1">Score</span>
                                <span className="text-5xl md:text-6xl font-black text-white tabular-nums leading-none">
                                    {overallScore ?? "--"}
                                </span>
                                <span className="text-[10px] font-bold text-white/20 mt-0.5">out of 100</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 pt-6 space-y-8">


                    {/* Feedback Sections */}
                    <div className="space-y-8">

                        {/* Strengths */}
                        <div>
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="p-1.5 rounded-lg bg-emerald-500/10">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                </div>
                                <h4 className="text-sm font-bold text-white tracking-tight">Key Strengths</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Array.isArray(interview.strengths) && interview.strengths.length > 0 ? (
                                    interview.strengths.map((point: string, i: number) => (
                                        <div key={i} className="flex gap-3 p-4 rounded-xl bg-[#111] border border-white/5 hover:border-emerald-500/20 transition-colors">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_6px_#10b981]" />
                                            <span className="text-sm text-white/70 font-medium leading-relaxed">{point}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-white/30 italic col-span-2">No specific strengths recorded.</p>
                                )}
                            </div>
                        </div>

                        {/* Improvements */}
                        <div>
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="p-1.5 rounded-lg bg-red-500/10">
                                    <ArrowUpRight className="w-4 h-4 text-red-500" />
                                </div>
                                <h4 className="text-sm font-bold text-white tracking-tight">Areas to Improve</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Array.isArray(interview.improvements) && interview.improvements.length > 0 ? (
                                    interview.improvements.map((point: string, i: number) => (
                                        <div key={i} className="flex gap-3 p-4 rounded-xl bg-[#111] border border-white/5 hover:border-red-500/20 transition-colors">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 shadow-[0_0_6px_#ef4444]" />
                                            <span className="text-sm text-white/70 font-medium leading-relaxed">{point}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-white/30 italic col-span-2">No specific improvements recorded.</p>
                                )}
                            </div>
                        </div>

                        {/* Key Points */}
                        <div>
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="p-1.5 rounded-lg bg-blue-500/10">
                                    <Lightbulb className="w-4 h-4 text-blue-500" />
                                </div>
                                <h4 className="text-sm font-bold text-white tracking-tight">Key Takeaways</h4>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-[#111] divide-y divide-white/5 overflow-hidden">
                                {Array.isArray(interview.keyPoints) && interview.keyPoints.length > 0 ? (
                                    interview.keyPoints.map((point: string, i: number) => (
                                        <div key={i} className="p-4 text-sm text-white/70 font-medium leading-relaxed flex gap-4 hover:bg-white/[0.02] transition-colors">
                                            <span className="text-blue-500/40 font-bold select-none shrink-0 tabular-nums">{(i + 1).toString().padStart(2, '0')}</span>
                                            {point}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-white/30 italic p-4">No takeaways generated yet.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/20 font-bold uppercase tracking-widest">
                        <span>KyoshAI Engine v2.0</span>
                        <span>Ref: {interview.id.substring(0, 8)}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
