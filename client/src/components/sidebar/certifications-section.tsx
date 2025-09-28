import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Award } from "lucide-react";
import type { ResumeData, CertificationItem } from "@shared/schema";

interface CertificationsSectionProps {
  data: ResumeData;
  onDataChange: (data: Partial<ResumeData>) => void;
}

export default function CertificationsSection({ data, onDataChange }: CertificationsSectionProps) {
  const certifications = data.certifications || [];

  const addCertification = () => {
    const newCertification: CertificationItem = {
      title: "",
      issuer: "",
      date: "",
      description: "",
    };
    
    onDataChange({
      certifications: [...certifications, newCertification],
    });
  };

  const updateCertification = (index: number, field: keyof CertificationItem, value: string) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    onDataChange({ certifications: updatedCertifications });
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    onDataChange({ certifications: updatedCertifications });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Award className="w-5 h-5 mr-2 text-primary" />
          <h4 className="font-medium text-foreground">Certifications</h4>
        </div>
        <Button
          onClick={addCertification}
          size="sm"
          className="px-3 py-1"
          data-testid="button-add-certification"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>
      
      {certifications.length === 0 ? (
        <p className="text-sm text-muted-foreground">No certifications added yet.</p>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={index} className="p-4 border border-border rounded-lg" data-testid={`certification-form-${index}`}>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-foreground mb-1 block">
                    Certification Title
                  </Label>
                  <Input
                    value={cert.title}
                    onChange={(e) => updateCertification(index, "title", e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect"
                    data-testid={`input-cert-title-${index}`}
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground mb-1 block">
                    Issuing Organization
                  </Label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    data-testid={`input-cert-issuer-${index}`}
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground mb-1 block">
                    Date Obtained
                  </Label>
                  <Input
                    value={cert.date}
                    onChange={(e) => updateCertification(index, "date", e.target.value)}
                    placeholder="e.g. March 2023"
                    data-testid={`input-cert-date-${index}`}
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground mb-1 block">
                    Description (Optional)
                  </Label>
                  <Textarea
                    value={cert.description || ""}
                    onChange={(e) => updateCertification(index, "description", e.target.value)}
                    rows={2}
                    placeholder="Brief description of the certification"
                    className="resize-none"
                    data-testid={`textarea-cert-description-${index}`}
                  />
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCertification(index)}
                className="mt-3 text-destructive hover:text-destructive/80"
                data-testid={`button-remove-certification-${index}`}
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