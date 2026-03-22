import { getVoiceInterviews } from '@/actions/interview'
import React from 'react'
import VoiceInterviewFlow from './_components/voice-interview-flow'
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { InterviewsGrid } from './_components/interviews-grid'

export default async function InterviewPage() {
  const interviews = await getVoiceInterviews()

  return (
    <div className="relative min-h-screen overflow-hidden w-full">
      {/* KyoshAI Grid Background */}
      <div className="grid-background"></div>

      <div className="container mx-auto py-10 px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto pt-16">
          {/* Left Column: Typography & Features */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border-l-[3px] border-primary text-primary text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]"></span>
              AI Simulator
            </div>

            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
              Master <br />
              <span className="text-primary underline decoration-primary/30 underline-offset-8">
                Interviews
              </span> <br />
              With AI.
            </h1>

            <p className="text-white/60 text-lg max-w-md font-medium leading-relaxed">
              Configure your simulation. Our advanced engine adapts to role specifics in real-time and provides actionable feedback instantly.
            </p>

            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M12 2v20" /><path d="m17 5-5-3-5 3v14l5 3 5-3Z" /></svg></div>
                <span className="text-sm font-semibold text-white/80">Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg></div>
                <span className="text-sm font-semibold text-white/80">Hyper-Realistic Voices</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg></div>
                <span className="text-sm font-semibold text-white/80">Actionable Feedback</span>
              </div>
            </div>
          </div>

          {/* Right Column: Flow Configurator */}
          <div className="lg:col-span-7 w-full">
            <VoiceInterviewFlow />
          </div>
        </div>

        {/* Bottom Section: Recent Interviews */}
        <div className="max-w-7xl mx-auto mt-32 border-t border-white/10 pt-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Recent Sessions</h2>
            </div>
          </div>
          <InterviewsGrid interviews={interviews} />
        </div>
      </div>
    </div>
  )
}