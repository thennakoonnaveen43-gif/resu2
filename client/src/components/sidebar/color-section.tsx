import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";
import type { presetSettings, StyleSettings } from "@shared/schema";

interface ColorSectionProps {
  style: StyleSettings;
  onStyleChange: (style: Partial<StyleSettings>) => void;
  presets: presetSettings[];
  templateId: string;
}

export default function ColorSection({ style, onStyleChange, presets, templateId }: ColorSectionProps) {
  const colors = style.colors || {};

  const updateColor = (colorKey: string, value: string) => {
    onStyleChange({
      colors: {
        ...colors,
        [colorKey]: value,
      },
    });
  };

  const colorOptions = [
    { key: "primary", label: "Primary Color", description: "Main accent color" },
    { key: "secondary", label: "Secondary Color", description: "Secondary accent" },
    //{ key: "accent", label: "Accent Color", description: "Highlight color" },
    { key: "background", label: "Background", description: "Main background" },
    { key: "sidebarBackground", label: "Sidebar Background", description: "Sidebar color" },
    { key: "headerTextColor", label: "Header Text", description: "Header text color" },
    { key: "bodyTextColor", label: "Body Text", description: "Main text color" },
    { key: "sidebarTextColor", label: "Sidebar Text", description: "Sidebar text color" },
  ];

  return (
    <div className="p-1">
      <div className="flex items-center mb-2">
        <Palette className="w-5 h-5 mr-2 text-primary" />
        <h6 className="font-medium text-foreground">Color Settings</h6>
      </div>

      <div className="space-y-1">
        {colorOptions.map(({ key, label, description }) => (
          <div key={key} className="mb-3">
            <Label className="text-xs font-medium text-foreground mb-1 block">
              {label}
            </Label>
            <p className="text-[11px] text-muted-foreground mb-1">{description}</p>
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                value={colors[key as keyof typeof colors] || "#000000"}
                onChange={(e) => updateColor(key, e.target.value)}
                className="w-12 h-8 p-0.5 border rounded cursor-pointer"
                data-testid={`color-${key}`}
              />
              <Input
                type="text"
                value={colors[key as keyof typeof colors] || "#000000"}
                onChange={(e) => updateColor(key, e.target.value)}
                placeholder="#000000"
                className="flex-1 h-7 text-xs font-mono"
                data-testid={`color-input-${key}`}
              />
            </div>
          </div>
        ))}

      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h5 className="text-sm font-medium mb-2">Quick Presets</h5>


        <div className="grid grid-cols-2 gap-2 mb-4">
          {presets.filter(item=> item.forTemplates.includes(templateId)).filter(item => item.category === "dark colors").map((preset) => (
            <button
              key={preset.name}
              onClick={() => onStyleChange({ colors: preset.presetValues })}
              className={preset.className}
            >
              {preset.name}
            </button>
          ))}
        </div>
        {/* 
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#3b82f6",
                secondary: "#64748b",
                accent: "#06b6d4",
                background: "#ffffff",
                sidebarBackground: "#1e293b",
                headerTextColor: "#1e293b",
                bodyTextColor: "#374151",
                sidebarTextColor: "#ffffff",
              }
            })}
            className="p-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Blue Professional
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#059669",
                secondary: "#64748b",
                accent: "#10b981",
                background: "#ffffff",
                sidebarBackground: "#065f46",
                headerTextColor: "#065f46",
                bodyTextColor: "#374151",
                sidebarTextColor: "#ffffff",
              }
            })}
            className="p-2 text-xs bg-green-600 text-white rounded hover:bg-green-700"
          >
            Green Modern
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#dc2626",
                secondary: "#64748b",
                accent: "#ef4444",
                background: "#ffffff",
                sidebarBackground: "#7f1d1d",
                headerTextColor: "#7f1d1d",
                bodyTextColor: "#374151",
                sidebarTextColor: "#ffffff",
              }
            })}
            className="p-2 text-xs bg-red-600 text-white rounded hover:bg-red-700"
          >
            Red Bold
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#7c3aed",
                secondary: "#64748b",
                accent: "#8b5cf6",
                background: "#ffffff",
                sidebarBackground: "#400f66",
                headerTextColor: "#581c87",
                bodyTextColor: "#374151",
                sidebarTextColor: "#ffffff",
              }
            })}
            className="p-2 text-xs bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Purple Creative
          </button> */}
        {/* </div> */}

        <h6 className="text-xs font-medium mb-2 text-muted-foreground">Light Themes</h6>
        <div className="grid grid-cols-2 gap-2 mb-4">

          <div className="grid grid-cols-2 gap-2 mb-4">
            {presets.filter(item=> item.forTemplates.includes(templateId)).filter(item => item.category === "Light colors").map((preset) => (
              <button
                key={preset.name}
                onClick={() => onStyleChange({ colors: preset.presetValues })}
                className={preset.className}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* 
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#f59e0b",
                secondary: "#64748b",
                accent: "#fbbf24",
                background: "#ffffff",
                sidebarBackground: "#fef3c7",
                headerTextColor: "#92400e",
                bodyTextColor: "#374151",
                sidebarTextColor: "#92400e",
              }
            })}
            className="p-2 text-xs bg-amber-400 text-amber-900 rounded hover:bg-amber-500"
          >
            Light Amber
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#ec4899",
                secondary: "#64748b",
                accent: "#f472b6",
                background: "#ffffff",
                sidebarBackground: "#fce7f3",
                headerTextColor: "#be185d",
                bodyTextColor: "#374151",
                sidebarTextColor: "#be185d",
              }
            })}
            className="p-2 text-xs bg-pink-400 text-pink-900 rounded hover:bg-pink-500"
          >
            Light Pink
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#06b6d4",
                secondary: "#64748b",
                accent: "#22d3ee",
                background: "#fffff",
                sidebarBackground: "#e5f4ff",
                headerTextColor: "#0f766e",
                bodyTextColor: "black",
                sidebarTextColor: "#3d3d3d",
              }
            })}
            className="p-2 text-xs bg-cyan-400 text-cyan-900 rounded hover:bg-cyan-500"
          >
            Light Cyan
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#a807d5",
                secondary: "#64748b",
                accent: "#a78bfa",
                background: "#ffffff",
                sidebarBackground: "#fdf0ff",
                headerTextColor: "#990f8e",
                bodyTextColor: "#374151",
                sidebarTextColor: "#5c238b",
              }
            })}
            className="p-2 text-xs bg-violet-400 text-violet-900 rounded hover:bg-violet-500"
          >
            Light Violet
          </button> */}
        </div>

        <h6 className="text-xs font-medium mb-2 text-muted-foreground">Dark Themes</h6>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#3b82f6",
                secondary: "#64748b",
                accent: "#06b6d4",
                background: "#0f172a",
                sidebarBackground: "#1e293b",
                headerTextColor: "#f1f5f9",
                bodyTextColor: "#e2e8f0",
                sidebarTextColor: "#ffffff",
              }
            })}
            className="p-2 text-xs bg-slate-800 text-white rounded hover:bg-slate-900"
          >
            Dark Slate
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#10b981",
                secondary: "#64748b",
                accent: "#34d399",
                background: "#064e3b",
                sidebarBackground: "#065f46",
                headerTextColor: "#d1fae5",
                bodyTextColor: "#a7f3d0",
                sidebarTextColor: "#ffffff",
              }
            })}
            className="p-2 text-xs bg-emerald-800 text-white rounded hover:bg-emerald-900"
          >
            Dark Emerald
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#f59e0b",
                secondary: "#64748b",
                accent: "#fbbf24",
                background: "#451a03",
                sidebarBackground: "#78350f",
                headerTextColor: "#fef3c7",
                bodyTextColor: "#fed7aa",
                sidebarTextColor: "#ffffff",
              }
            })}
            className="p-2 text-xs bg-amber-800 text-white rounded hover:bg-amber-900"
          >
            Dark Amber
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#8b5cf6",
                secondary: "#64748b",
                accent: "#a78bfa",
                background: "#2e1065",
                sidebarBackground: "#4c1d95",
                headerTextColor: "#ede9fe",
                bodyTextColor: "#c4b5fd",
                sidebarTextColor: "#ffffff",
              }
            })}
            className="p-2 text-xs bg-violet-800 text-white rounded hover:bg-violet-900"
          >
            Dark Violet
          </button>
        </div>
      </div>
    </div>
  );
}