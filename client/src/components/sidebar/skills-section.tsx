import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import type { ResumeData } from "@shared/schema";

interface SkillsSectionProps {
  data: ResumeData;
  onDataChange: (data: Partial<ResumeData>) => void;
}

export default function SkillsSection({ data, onDataChange }: SkillsSectionProps) {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = (skill: string) => {
    if (skill.trim() && !data.skills.includes(skill.trim())) {
      onDataChange({
        skills: [...data.skills, skill.trim()],
      });
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = data.skills.filter((_, i) => i !== index);
    onDataChange({ skills: updatedSkills });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      addSkill(skillInput);
      setSkillInput("");
    }
  };

  return (
    <div className="p-6">
      <h4 className="font-medium text-foreground mb-4">Skills</h4>
      <div className="space-y-4">
        <div>
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a skill (press Enter)"
            data-testid="input-skills"
          />
        </div>
        
        {data.skills.length === 0 ? (
          <p className="text-sm text-muted-foreground">No skills added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2" data-testid="skills-container">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent text-accent-foreground"
                data-testid={`skill-tag-${index}`}
              >
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className="ml-2 hover:text-destructive"
                  data-testid={`button-remove-skill-${index}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
