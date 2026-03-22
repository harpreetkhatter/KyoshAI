import React from 'react';
import VoiceInterviewer from '../_components/voice-interviewer';
import { ShieldCheck, Sparkles, Bot } from 'lucide-react';

export default async function InterviewSessionPage({
    searchParams,
}: {
    searchParams: Promise<{ role?: string; language?: string }>;
}) {
    const sp = await searchParams;
    const targetRole = sp.role || "General Role";
    const language = sp.language || "English";

    return (
        <div className="relative min-h-screen overflow-hidden w-full">
            {/* KyoshAI standard grid background */}
            <div className="grid-background"></div>

            <div className="container mx-auto py-6 px-4 md:px-8 relative z-10 hidden md:block mt-6 text-center space-y-4">
                <div className="mx-auto w-fit inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border-l-[3px] border-primary text-primary text-xs font-bold uppercase tracking-wider shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]"></span>
                    Live Session
                </div>
                <h1 className='text-4xl md:text-5xl font-black tracking-tight text-white mb-2 leading-[1.1]'>
                    Simulated <span className="text-primary underline decoration-primary/30 underline-offset-8">AI Interview</span>
                </h1>
            </div>

            <div className="container mx-auto px-4 md:px-8 mt-4 md:mt-8 relative z-10 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Voice Interviewer Panel (Span 2 Columns) */}
                    <div className="lg:col-span-2 order-1 relative overflow-hidden bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col justify-center">
                        {/* Soft interior glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="mb-10 text-center md:text-left border-b border-white/5 pb-6">
                           <h2 className="text-3xl font-black text-white tracking-tight">Active Simulation</h2>
                           <p className="text-white/40 text-sm mt-2 font-medium">Role Target: <span className="text-white/80">{targetRole}</span></p>
                        </div>

                        <VoiceInterviewer targetRole={targetRole} language={language} />
                    </div>

                    {/* Information Sidebar (Stacked on Right) */}
                    <div className="order-2 flex flex-col gap-6">
                        
                        {/* Security Card */}
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                Connection Secure
                            </h3>
                            <ul className="space-y-4 text-sm text-white/50 font-medium">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500/50 shadow-[0_0_8px_#10b981]" />
                                    End-to-end processing
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500/50 shadow-[0_0_8px_#10b981]" />
                                    Real-time deep analysis
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500/50 shadow-[0_0_8px_#10b981]" />
                                    Encrypted audio feed
                                </li>
                            </ul>
                        </div>

                        {/* Best Practices Card */}
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-white font-bold text-base mb-6 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                Pro Tips
                            </h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shrink-0">
                                        <span className="text-white/70 text-xs font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-semibold mb-1">Speak explicitly</h4>
                                        <p className="text-xs text-white/40 leading-relaxed font-medium">Clear communication helps the AI accurately parse your logic.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shrink-0">
                                        <span className="text-white/70 text-xs font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-semibold mb-1">STAR Method</h4>
                                        <p className="text-xs text-white/40 leading-relaxed font-medium">Use Situation, Task, Action, and Result for behavioral tests.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Powered By Tag */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center gap-2 text-[10px] text-white/30 font-black uppercase tracking-widest mt-auto mb-4 lg:mb-0">
                            <Bot className="w-4 h-4" /> Powered By KyoshAI
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
