import { Header } from "@/components/layout/header";
import { FlowCanvas } from "@/components/canvas/flow-canvas";

export default function Home() {
  return (
    <div className="relative h-full">
      <FlowCanvas />
      <Header />
    </div>
  );
}
