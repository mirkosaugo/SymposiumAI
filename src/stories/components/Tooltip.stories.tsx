import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus, Settings, HelpCircle } from "lucide-react";

const meta: Meta = {
  title: "Components/Tooltip",
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
      <TooltipContent>Tooltip content</TooltipContent>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-8">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm">Top</Button>} />
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm">Bottom</Button>} />
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm">Left</Button>} />
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm">Right</Button>} />
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const OnIconButtons: Story = {
  name: "Icon Button Pattern",
  render: () => (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger render={<Button variant="ghost" size="icon-sm"><Plus /></Button>} />
        <TooltipContent>Add node</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="ghost" size="icon-sm"><Settings /></Button>} />
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="ghost" size="icon-sm"><HelpCircle /></Button>} />
        <TooltipContent>Help</TooltipContent>
      </Tooltip>
    </div>
  ),
};
