import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const meta: Meta = {
  title: "Components/Sheet",
};

export default meta;
type Story = StoryObj;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open Sheet (right)</Button>} />
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Configure your application preferences.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Project name</label>
            <Input placeholder="My project" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <Input placeholder="Brief description..." />
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open Sheet (left)</Button>} />
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Side navigation menu.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-1 p-4">
          {["Dashboard", "Projects", "Team", "Settings"].map((item) => (
            <button
              key={item}
              className="rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
            >
              {item}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open Sheet (bottom)</Button>} />
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Node Details</SheetTitle>
          <SheetDescription>
            Information about the selected node.
          </SheetDescription>
        </SheetHeader>
        <div className="flex items-center gap-4 p-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10" />
          <div>
            <p className="text-sm font-medium text-foreground">Concept Card #1</p>
            <p className="text-xs text-muted-foreground">Created 2 hours ago</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};
