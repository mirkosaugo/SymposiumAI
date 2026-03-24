import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Type,
  Lightbulb,
  ImageIcon,
  Play,
  Plus,
  Minus,
  Maximize2,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Check,
  Search,
  Send,
  Trash2,
  Copy,
  Download,
  Upload,
  ArrowRight,
  MousePointer2,
  Hand,
  Loader2,
  LogOut,
  User,
  AlertTriangle,
  Mail,
  Eye,
  Palette,
  FileText,
  Circle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Icon Grid                                                          */
/* ------------------------------------------------------------------ */

const allIcons = [
  { name: "Type", icon: Type, category: "Canvas" },
  { name: "Lightbulb", icon: Lightbulb, category: "Canvas" },
  { name: "ImageIcon", icon: ImageIcon, category: "Canvas" },
  { name: "Play", icon: Play, category: "Canvas" },
  { name: "MousePointer2", icon: MousePointer2, category: "Canvas" },
  { name: "Hand", icon: Hand, category: "Canvas" },
  { name: "Plus", icon: Plus, category: "Action" },
  { name: "Minus", icon: Minus, category: "Action" },
  { name: "X", icon: X, category: "Action" },
  { name: "Check", icon: Check, category: "Action" },
  { name: "Search", icon: Search, category: "Action" },
  { name: "Send", icon: Send, category: "Action" },
  { name: "Copy", icon: Copy, category: "Action" },
  { name: "Trash2", icon: Trash2, category: "Action" },
  { name: "Download", icon: Download, category: "Action" },
  { name: "Upload", icon: Upload, category: "Action" },
  { name: "ArrowRight", icon: ArrowRight, category: "Navigation" },
  { name: "ChevronRight", icon: ChevronRight, category: "Navigation" },
  { name: "ChevronDown", icon: ChevronDown, category: "Navigation" },
  { name: "Menu", icon: Menu, category: "Navigation" },
  { name: "Maximize2", icon: Maximize2, category: "UI" },
  { name: "Settings", icon: Settings, category: "UI" },
  { name: "HelpCircle", icon: HelpCircle, category: "UI" },
  { name: "Sun", icon: Sun, category: "UI" },
  { name: "Moon", icon: Moon, category: "UI" },
  { name: "User", icon: User, category: "UI" },
  { name: "LogOut", icon: LogOut, category: "UI" },
  { name: "Loader2", icon: Loader2, category: "UI" },
  { name: "AlertTriangle", icon: AlertTriangle, category: "Status" },
  { name: "Circle", icon: Circle, category: "Status" },
  { name: "Mail", icon: Mail, category: "Communication" },
  { name: "Eye", icon: Eye, category: "Communication" },
  { name: "Palette", icon: Palette, category: "Misc" },
  { name: "FileText", icon: FileText, category: "Misc" },
];

function IconsPage() {
  const categories = [...new Set(allIcons.map((i) => i.category))];

  return (
    <div className="w-full max-w-4xl space-y-10 bg-background p-8 text-foreground">
      <div>
        <h1 className="text-2xl font-bold">Icons</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Icon set based on <strong>lucide-react</strong>. All icons
          use <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">size-4</code> (16px)
          as the default in components.
        </p>
      </div>

      {categories.map((cat) => (
        <div key={cat} className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{cat}</h3>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
            {allIcons
              .filter((i) => i.category === cat)
              .map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                >
                  <Icon className="size-5 text-foreground" />
                  <span className="text-center text-[9px] text-muted-foreground">
                    {name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Size reference */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Size Reference</h3>
        <div className="flex items-end gap-6">
          {[3, 3.5, 4, 5, 6].map((s) => (
            <div key={s} className="flex flex-col items-center gap-1">
              <Settings style={{ width: `${s * 4}px`, height: `${s * 4}px` }} className="text-foreground" />
              <span className="font-mono text-[10px] text-muted-foreground">
                size-{s}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground">
                {s * 4}px
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: "Foundations/Icons",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <IconsPage />,
};
