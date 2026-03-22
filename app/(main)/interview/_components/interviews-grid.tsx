"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { InterviewReportDialog } from "./interview-report-dialog";
import { Target, MessageSquare, ShieldCheck, Clock, ArrowRight } from "lucide-react";

export function InterviewsGrid({ interviews }: { interviews: any[] }) {
    const [selectedInterview, setSelectedInterview] = useState<any | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCardClick = (interview: any) => {
        setSelectedInterview(interview);
        setIsDialogOpen(true);
    };

    const ITEMS_PER_PAGE = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(interviews.length / ITEMS_PER_PAGE);

    const paginatedInterviews = interviews.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (interviews.length === 0) {
        return <p className="text-muted-foreground text-center py-12">You haven&apos;t completed any voice interviews yet.</p>;
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedInterviews.map((interview: any) => {
                    const overall =
                        interview.technicalScore !== null && interview.communicationScore !== null && interview.confidenceScore !== null
                            ? Math.round((interview.technicalScore + interview.communicationScore + interview.confidenceScore) / 3)
                            : null;

                    return (
                        <div
                            key={interview.id}
                            onClick={() => handleCardClick(interview)}
                            className="cursor-pointer group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300"
                        >
                            {/* Top accent line */}
                            <div className={`h-1 w-full ${interview.status === 'COMPLETED' ? 'bg-gradient-to-r from-emerald-500/60 via-primary/40 to-transparent' : 'bg-gradient-to-r from-red-500/60 via-red-500/20 to-transparent'}`} />

                            <div className="p-5 space-y-5">
                                {/* Header Row */}
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1.5">
                                        <h3 className="text-lg font-bold text-white leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                                            {interview.targetRole}
                                        </h3>
                                        <div className="flex items-center gap-3 text-[11px] text-white/30 font-medium">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {format(new Date(interview.createdAt), "MMM dd, yyyy")}
                                            </span>
                                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${interview.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {interview.status === 'COMPLETED' ? 'Done' : 'Failed'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Score Circle */}
                                    <div className="shrink-0 w-14 h-14 rounded-full border-2 border-white/10 flex flex-col items-center justify-center group-hover:border-primary/40 transition-colors">
                                        <span className="text-xl font-black text-white leading-none">{overall ?? "--"}</span>
                                        <span className="text-[8px] text-white/30 font-bold">/100</span>
                                    </div>
                                </div>

                                {/* Mini Score Bars */}
                                <div className="space-y-2.5">
                                    <div className="flex items-center gap-2">
                                        <Target className="w-3 h-3 text-blue-400 shrink-0" />
                                        <span className="text-[10px] text-white/40 font-semibold w-20 shrink-0">Technical</span>
                                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${interview.technicalScore || 0}%` }} />
                                        </div>
                                        <span className="text-[10px] text-white/40 font-bold tabular-nums w-6 text-right">{interview.technicalScore !== null ? Math.round(interview.technicalScore) : "--"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-3 h-3 text-purple-400 shrink-0" />
                                        <span className="text-[10px] text-white/40 font-semibold w-20 shrink-0">Communication</span>
                                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-400 rounded-full" style={{ width: `${interview.communicationScore || 0}%` }} />
                                        </div>
                                        <span className="text-[10px] text-white/40 font-bold tabular-nums w-6 text-right">{interview.communicationScore !== null ? Math.round(interview.communicationScore) : "--"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                                        <span className="text-[10px] text-white/40 font-semibold w-20 shrink-0">Confidence</span>
                                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${interview.confidenceScore || 0}%` }} />
                                        </div>
                                        <span className="text-[10px] text-white/40 font-bold tabular-nums w-6 text-right">{interview.confidenceScore !== null ? Math.round(interview.confidenceScore) : "--"}</span>
                                    </div>
                                </div>

                                {/* View Report Link */}
                                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">View Report</span>
                                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                                        <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-black transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${currentPage === page
                                    ? "bg-primary text-primary-foreground"
                                    : "text-white hover:bg-white/10"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}

            <InterviewReportDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                interview={selectedInterview}
            />
        </div>
    );
}
