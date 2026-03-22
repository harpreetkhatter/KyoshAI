import { GlobalLoader } from "@/components/global-loader";

export default function Loading() {
    return <GlobalLoader words={["Setting up course generator...", "Loading your courses..."]} />;
}
