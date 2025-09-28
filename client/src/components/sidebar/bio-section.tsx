import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeData } from "@shared/schema";

interface BioSectionProps {
  data: ResumeData;
  onDataChange: (data: Partial<ResumeData>) => void;
}

export default function BioSection({ data, onDataChange }: BioSectionProps) {
  return (
    <div className="p-6">
      <h4 className="font-medium text-foreground mb-4">Personal Information</h4>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-foreground mb-2">
            Full Name
          </Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onDataChange({ name: e.target.value })}
            placeholder="Enter your full name"
            data-testid="input-name"
          />
        </div>
        
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-foreground mb-2">
            Professional Title
          </Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => onDataChange({ title: e.target.value })}
            placeholder="Enter your job title"
            data-testid="input-title"
          />
        </div>
        
        <div>
          <Label htmlFor="summary" className="text-sm font-medium text-foreground mb-2">
            Professional Summary
          </Label>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={(e) => onDataChange({ summary: e.target.value })}
            rows={4}
            placeholder="Describe your professional background and key strengths"
            className="resize-none"
            data-testid="textarea-summary"
          />
        </div>
      </div>
    </div>
  );
}
