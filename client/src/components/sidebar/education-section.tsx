import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { ResumeData, EducationItem } from "@shared/schema";

interface EducationSectionProps {
  data: ResumeData;
  onDataChange: (data: Partial<ResumeData>) => void;
}

export default function EducationSection({ data, onDataChange }: EducationSectionProps) {
  const addEducation = () => {
    const newEducation: EducationItem = {
      institution: "",
      degree: "",
      from: "",
      to: "",
      description: "",
    };
    
    onDataChange({
      education: [...data.education, newEducation],
    });
  };

  const updateEducation = (index: number, field: keyof EducationItem, value: string) => {
    const updatedEducation = [...data.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    onDataChange({ education: updatedEducation });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = data.education.filter((_, i) => i !== index);
    onDataChange({ education: updatedEducation });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-foreground">Education</h4>
        <Button
          onClick={addEducation}
          size="sm"
          className="px-3 py-1"
          data-testid="button-add-education"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>
      
      {data.education.length === 0 ? (
        <p className="text-sm text-muted-foreground">No education added yet.</p>
      ) : (
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="p-4 border border-border rounded-lg" data-testid={`education-form-${index}`}>
              <div className="space-y-3">
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  placeholder="Degree (e.g. Bachelor of Computer Science)"
                  data-testid={`input-degree-${index}`}
                />
                
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  placeholder="Institution"
                  data-testid={`input-institution-${index}`}
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={edu.from}
                    onChange={(e) => updateEducation(index, "from", e.target.value)}
                    placeholder="From (e.g. 2018)"
                    data-testid={`input-from-${index}`}
                  />
                  <Input
                    value={edu.to}
                    onChange={(e) => updateEducation(index, "to", e.target.value)}
                    placeholder="To (e.g. 2022)"
                    data-testid={`input-to-${index}`}
                  />
                </div>
                
                <Textarea
                  value={edu.description || ""}
                  onChange={(e) => updateEducation(index, "description", e.target.value)}
                  rows={2}
                  placeholder="Description (optional)"
                  className="resize-none"
                  data-testid={`textarea-description-${index}`}
                />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(index)}
                className="mt-3 text-destructive hover:text-destructive/80"
                data-testid={`button-remove-education-${index}`}
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
