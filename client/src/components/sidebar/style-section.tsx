import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Palette } from "lucide-react";
import ColorSection from "./color-section";
import type { presetSettings, StyleSettings } from "@shared/schema";
import { Switch } from "@/components/ui/switch";

interface StyleSectionProps {
  style: StyleSettings;
  onStyleChange: (style: Partial<StyleSettings>) => void;
  presets: presetSettings[];
  templateId: string;
}

export default function StyleSection({ style, onStyleChange, presets, templateId }: StyleSectionProps) {
  return (
    <div className="p-4">
      <div className="flex items-center mb-3">
        <Settings className="w-4 h-4 mr-2 text-primary" />
        <h4 className="text-sm font-semibold text-foreground">Style Settings</h4>
      </div>

      <Tabs defaultValue="layout" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-8 text-xs">
          <TabsTrigger value="layout" className="text-xs h-7 px-2">
            <Settings className="w-3 h-3 mr-1" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="colors" className="text-xs h-7 px-2">
            <Palette className="w-3 h-3 mr-1" />
            Colors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="layout" className="space-y-5 mt-3">
          {/* Font Size */}
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Font Size</Label>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Header</span>
                  <span className="text-xs text-foreground">{style.headerFontSize}px</span>
                </div>
                <Slider
                  value={[style.headerFontSize]}
                  onValueChange={([value]) => onStyleChange({ headerFontSize: value })}
                  min={16}
                  max={24}
                  step={1}
                  className="w-full h-6"
                  data-testid="slider-header-font-size"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Body Text</span>
                  <span className="text-xs text-foreground">{style.bodyFontSize}px</span>
                </div>
                <Slider
                  value={[style.bodyFontSize]}
                  onValueChange={([value]) => onStyleChange({ bodyFontSize: value })}
                  min={10}
                  max={16}
                  step={1}
                  className="w-full h-6"
                  data-testid="slider-body-font-size"
                />
              </div>
            </div>
          </div>

          {/* Spacing */}
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Spacing</Label>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Section Spacing</span>
                  <span className="text-xs text-foreground">{style.sectionSpacing}px</span>
                </div>
                <Slider
                  value={[style.sectionSpacing]}
                  onValueChange={([value]) => onStyleChange({ sectionSpacing: value })}
                  min={8}
                  max={46}
                  step={1}
                  className="w-full h-6"
                  data-testid="slider-section-spacing"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Sidebar Section Spacing</span>
                  <span className="text-xs text-foreground">{style.sidebarSectionSpacing}px</span>
                </div>
                <Slider
                  value={[style.sidebarSectionSpacing]}
                  onValueChange={([value]) => onStyleChange({ sidebarSectionSpacing: value })}
                  min={8}
                  max={46}
                  step={1}
                  className="w-full h-6"
                  data-testid="slider-sidebar-section-spacing"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Line Height</span>
                  <span className="text-xs text-foreground">{style.lineHeight}</span>
                </div>
                <Slider
                  value={[style.lineHeight]}
                  onValueChange={([value]) => onStyleChange({ lineHeight: value })}
                  min={1.2}
                  max={2.0}
                  step={0.1}
                  className="w-full h-6"
                  data-testid="slider-line-height"
                />
              </div>
            </div>
          </div>

          {/* Placements */}
          <Label className="text-xs font-medium text-foreground mb-2 block">Placements</Label>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs text-muted-foreground">Sidebar</span>
            <Switch
              checked={style.referencePlacement === "main"}
              onCheckedChange={(value) =>
                onStyleChange({ referencePlacement: value ? "main" : "sidebar" })
              }
              className="h-4 w-7"
            />
            <span className="text-xs text-muted-foreground">Main</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">About Me</span>
            <Switch
              checked={style.aboutMePlacement === "main"}
              onCheckedChange={(value) =>
                onStyleChange({ aboutMePlacement: value ? "main" : "sidebar" })
              }
              className="h-4 w-7"
            />
            <span className="text-xs text-muted-foreground">Main</span>
          </div>

          {/* Sidebar Width */}
          <div>
            <Label className="text-xs font-medium text-foreground mb-2 block">Sidebar Width</Label>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Width</span>
                <span className="text-xs text-foreground">{style.sidebarWidth}%</span>
              </div>
              <Slider
                value={[style.sidebarWidth]}
                onValueChange={([value]) => onStyleChange({ sidebarWidth: value })}
                min={30}
                max={45}
                step={1}
                className="w-full h-6"
                data-testid="slider-sidebar-width"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="colors" className="mt-3">
          <ColorSection style={style} onStyleChange={onStyleChange} presets={presets} templateId={templateId}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
