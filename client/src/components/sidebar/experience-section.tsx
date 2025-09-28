import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { ResumeData, ExperienceItem } from "@shared/schema";

interface ExperienceSectionProps {
  data: ResumeData;
  onDataChange: (data: Partial<ResumeData>) => void;
}

export default function ExperienceSection({ data, onDataChange }: ExperienceSectionProps) {
  const addExperience = () => {
    const newExperience: ExperienceItem = {
      company: "",
      position: "",
      from: "",
      to: "",
      description: "",
    };
    
    onDataChange({
      experience: [...data.experience, newExperience],
    });
  };

  const updateExperience = (index: number, field: keyof ExperienceItem, value: string) => {
    const updatedExperience = [...data.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    onDataChange({ experience: updatedExperience });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = data.experience.filter((_, i) => i !== index);
    onDataChange({ experience: updatedExperience });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-foreground">Work Experience</h4>
        <Button
          onClick={addExperience}
          size="sm"
          className="px-3 py-1"
          data-testid="button-add-experience"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>
      
      {data.experience.length === 0 ? (
        <p className="text-sm text-muted-foreground">No work experience added yet.</p>
      ) : (
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index} className="p-4 border border-border rounded-lg" data-testid={`experience-form-${index}`}>
              <div className="space-y-3">
                <Input
                  value={exp.position}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  placeholder="Job Title"
                  data-testid={`input-position-${index}`}
                />
                
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  placeholder="Company"
                  data-testid={`input-company-${index}`}
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={exp.from}
                    onChange={(e) => updateExperience(index, "from", e.target.value)}
                    placeholder="From (e.g. 2020)"
                    data-testid={`input-from-${index}`}
                  />
                  <Input
                    value={exp.to}
                    onChange={(e) => updateExperience(index, "to", e.target.value)}
                    placeholder="To (e.g. Present)"
                    data-testid={`input-to-${index}`}
                  />
                </div>
                
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  rows={3}
                  placeholder="Describe your responsibilities and achievements"
                  className="resize-none"
                  data-testid={`textarea-description-${index}`}
                />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(index)}
                className="mt-3 text-destructive hover:text-destructive/80"
                data-testid={`button-remove-experience-${index}`}
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
