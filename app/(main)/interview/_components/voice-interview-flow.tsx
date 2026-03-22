"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const VoiceInterviewFlow = ({ children }: { children?: React.ReactNode }) => {
    const router = useRouter();
    const [targetRole, setTargetRole] = useState("");
    const [isStarting, setIsStarting] = useState(false);
    const language = "English";

    const handleStart = () => {
        setIsStarting(true);
        router.push(`/interview/session?role=${encodeURIComponent(targetRole)}&language=${encodeURIComponent(language)}`);
    }

    return (
        <div className="w-full relative">
            {isStarting && (
                <MultiStepLoader 
                    loading={true} 
                    loadingStates={[
                        { text: "Establishing secure connection..." },
                        { text: "Loading AI persona..." },
                        { text: "Preparing simulation environment..." }
                    ]} 
                />
            )}
            <div className="p-8 md:p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                {/* Decorative Background Glows */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="space-y-8 relative z-10">
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-white/80 uppercase tracking-widest">
                            Configure Simulation
                        </label>
                        <p className="text-sm text-white/40 leading-relaxed">
                            Enter the job title you are interviewing for. Our AI will automatically tailor the questions, technical depth, and tone to match this specific role.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">
                                Target Role
                            </label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                <Input
                                    placeholder="e.g. Senior Frontend Engineer"
                                    className="bg-[#111] border-white/10 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary pl-11 h-14 text-base rounded-xl text-white shadow-inner transition-all w-full"
                                    value={targetRole}
                                    onChange={(e) => setTargetRole(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="w-full h-14 rounded-xl text-lg font-black text-primary-foreground bg-primary hover:bg-primary/90 shadow-[0_10px_30px_-10px_var(--color-primary)] hover:scale-[1.02] transition-all group"
                            disabled={!targetRole}
                            onClick={handleStart}
                        >
                            Start Interview
                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceInterviewFlow;
