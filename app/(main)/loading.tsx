import { GlobalLoader } from "@/components/global-loader";

export default function Loading() {
    return <GlobalLoader words={["Loading route...", "Preparing workspace..."]} />;
}
