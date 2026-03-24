import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  HelpCircle,
  Palette,
  FileText,
  Trash2,
} from "lucide-react";

const meta: Meta = {
  title: "Components/DropdownMenu",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Menu</Button>} />
      <DropdownMenuContent>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            Profile
            <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
            <DropdownMenuShortcut>Ctrl+,</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle />
            Help
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithCheckbox: Story = {
  name: "Checkbox Items",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">View Preferences</Button>} />
      <DropdownMenuContent>
        <DropdownMenuLabel>Display</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          <FileText />
          Show grid
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={false}>
          <Palette />
          Minimap
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          <Sun />
          Snap to grid
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const AppHeaderPattern: Story = {
  name: "App Header (Pattern)",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
            MR
          </button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mirko</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Sun />
          Light theme
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Moon />
          Dark theme
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle />
          Help & Feedback
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Clear canvas
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
