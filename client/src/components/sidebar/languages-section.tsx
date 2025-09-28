import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Languages } from "lucide-react";
import type { ResumeData, LanguageItem } from "@shared/schema";

interface LanguagesSectionProps {
  data: ResumeData;
  onDataChange: (data: Partial<ResumeData>) => void;
}

export default function LanguagesSection({ data, onDataChange }: LanguagesSectionProps) {
  const languages = data.languages || [];

  const addLanguage = () => {
    const newLanguage: LanguageItem = { name: "", level: "Beginner" };
    onDataChange({ languages: [...languages, newLanguage] });
  };

  const updateLanguage = (index: number, field: keyof LanguageItem, value: string) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    onDataChange({ languages: updated });
  };

  const removeLanguage = (index: number) => {
    onDataChange({ languages: languages.filter((_, i) => i !== index) });
  };

  const proficiencyLevels = [
    "Beginner",
    "Elementary",
    "Intermediate",
    "Upper Intermediate",
    "Advanced",
    "Proficient",
    "Native",
    "Fluent",
    "Conversational",
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Languages className="w-4 h-4 mr-2 text-primary" />
          <h4 className="text-sm font-semibold text-foreground">Languages</h4>
        </div>
        <Button
          onClick={addLanguage}
          size="sm"
          className="h-7 px-2 text-xs"
          data-testid="button-add-language"
        >
          <Plus className="mr-1 h-3 w-3" />
          Add
        </Button>
      </div>

      {languages.length === 0 ? (
        <p className="text-xs text-muted-foreground">No languages added yet.</p>
      ) : (
        <div className="space-y-3">
          {languages.map((language, index) => (
            <div
              key={index}
              className="p-3 border border-border rounded-md"
              data-testid={`language-form-${index}`}
            >
              <div className="space-y-2">
                <div>
                  <Label className="text-xs font-medium text-foreground mb-1 block">
                    Language
                  </Label>
                  <Input
                    value={language.name}
                    onChange={(e) => updateLanguage(index, "name", e.target.value)}
                    placeholder="e.g. Spanish"
                    className="h-8 text-sm"
                    data-testid={`input-language-name-${index}`}
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium text-foreground mb-1 block">
                    Proficiency Level
                  </Label>
                  <Select
                    value={language.level}
                    onValueChange={(value) => updateLanguage(index, "level", value)}
                  >
                    <SelectTrigger
                      className="h-8 text-sm"
                      data-testid={`select-language-level-${index}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level} value={level} className="text-sm">
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLanguage(index)}
                className="mt-2 h-7 px-2 text-xs text-destructive hover:text-destructive/80"
                data-testid={`button-remove-language-${index}`}
              >
                <Trash2 className="mr-1 h-3 w-3" />
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
