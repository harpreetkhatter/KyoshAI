"use client";
import React from 'react';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';

export function GlobalLoader({ words = ["Preparing application...", "Loading data..."] }: { words?: string[] }) {
    return <MultiStepLoader loading={true} loadingStates={words.map(w => ({ text: w }))} duration={1000} />;
}
