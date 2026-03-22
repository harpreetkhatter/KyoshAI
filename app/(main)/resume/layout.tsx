import React, { Suspense } from 'react';
import { GlobalLoader } from '@/components/global-loader';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-5 pb-24 lg:pb-0">
            <Suspense fallback={<GlobalLoader words={["Waking up database...", "Loading resume environment..."]} />}>
                {children}
            </Suspense>
        </div>
    );
}