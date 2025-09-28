import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertResume } from "@shared/schema";

const templates = [
  {
    id: "1",
    name: "Professional Dark",
    description: "Clean design with dark sidebar",
    preview: "Template preview with dark left sidebar and white main content",
  },
  {
    id: "2", 
    name: "Modern Clean",
    description: "Minimalist with light sidebar",
    preview: "Template preview with light gray sidebar and white content",
  },
  {
    id: "3",
    name: "Executive", 
    description: "Professional with circular photo",
    preview: "Template preview with dark sidebar and circular profile photo",
  },
  {
    id: "4",
    name: "Corporate",
    description: "Blue header with sidebar layout",
    preview: "Template preview with blue header section and dark sidebar",
  },
  {
    id: "5",
    name: "Mariana Anderson",
    description: "Professional with timeline design",
    preview: "Template with dark sidebar and timeline experience layout",
  },
  {
    id: "6",
    name: "Francisco Andrade",
    description: "Blue header with clean layout",
    preview: "Template with blue header and light sidebar",
  },
  {
    id: "7",
    name: "Lorna Alvarado",
    description: "Light modern with circular photo",
    preview: "Template with light sidebar and circular profile image",
  },
  {
    id: "8",
    name: "Richard Sanchez",
    description: "Dark professional with timeline",
    preview: "Template with dark sidebar and professional timeline",
  },
  {
    id: "9",
    name: "Olivia Wilson",
    description: "Clean single column layout",
    preview: "Simple single column template with blue accents",
  },
  {
    id: "10",
    name: "Korina Professional",
    description: "Dark header with profile photo",
    preview: "Professional template with dark header and contact info",
  },
  {
    id: "11",
    name: "Aron Modern",
    description: "Rounded photo frame design",
    preview: "Modern template with rounded rectangle photo frame",
  },
  {
    id: "12",
    name: "Lorna Executive",
    description: "Dark header with timeline",
    preview: "Executive template with dark header and timeline layout",
  },
  {
    id: "13",
    name: "Richard Timeline",
    description: "Professional timeline design",
    preview: "Timeline template with circular profile photo",
  },
  {
    id: "14",
    name: "Diagonal Blue",
    description: "Distinctive diagonal header",
    preview: "Modern template with diagonal blue header design",
  },
];

export default function TemplateSelection() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const createResumeMutation = useMutation({
    mutationFn: async (resumeData: InsertResume) => {
      const response = await apiRequest("POST", "/api/resumes", resumeData);
      return response.json();
    },
    onSuccess: (resume) => {
      toast({
        title: "Resume created",
        description: "Your new resume is ready to edit.",
      });
      setLocation(`/builder/${resume.id}`);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create resume. Please try again.",
      });
    },
  });

  const handleContinue = () => {
    if (!selectedTemplate) return;

    const newResume: InsertResume = {
      name: "Untitled Resume",
      templateId: selectedTemplate,
      userId: "anonymous",
      data: {
        name: "",
        title: "",
        summary: "",
            github: "",
            website: "",
        contact: {
          email: "",
          phone: "",
          linkedin: "",
          location: "",
          languages: [],
          certifications: [],
          references: [],
          colors: {
            primary: "#3b82f6",
            secondary: "#64748b",
            accent: "#06b6d4",
            background: "#ffffff",
            sidebarBackground: "#1e293b",
            headerTextColor: "#1e293b",
            bodyTextColor: "#374151",
            sidebarTextColor: "#ffffff",
          },
        },
        experience: [],
        education: [],
        skills: [],
      },
      style: {
        headerFontSize: 18,
        bodyFontSize: 12,
        sectionSpacing: 16,
        lineHeight: 1.5,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        sidebarWidth: 40,
      },
    };

    createResumeMutation.mutate(newResume);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="text-primary-foreground text-lg" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">ResumeForge</h1>
          </div>
        </div>
      </nav>

      {/* Template Selection */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Choose Your Resume Template
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select from our professionally designed templates. You can always switch templates later while keeping your data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`template-card cursor-pointer border ${
                selectedTemplate === template.id ? "selected" : ""
              }`}
              onClick={() => setSelectedTemplate(template.id)}
              data-testid={`template-card-${template.id}`}
            >
              <CardContent className="p-4">
                <div className="aspect-[210/297] bg-gradient-to-br from-slate-100 to-slate-200 rounded border-2 border-slate-300 relative overflow-hidden">
                  {/* Template preview mockup */}
                  {template.id === "1" && (
                    <>
                      <div className="absolute left-0 top-0 w-2/5 h-full bg-slate-700"></div>
                      <div className="absolute right-0 top-0 w-3/5 h-full bg-white p-4">
                        <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
                        <div className="w-3/4 h-3 bg-slate-200 rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                          <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute left-4 top-8 w-16 h-16 bg-slate-200 rounded-full"></div>
                    </>
                  )}
                  {template.id === "2" && (
                    <>
                      <div className="absolute left-0 top-0 w-2/5 h-full bg-slate-100"></div>
                      <div className="absolute right-0 top-0 w-3/5 h-full bg-white p-4">
                        <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
                        <div className="w-3/4 h-3 bg-slate-200 rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                          <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute left-4 top-8 w-16 h-16 bg-slate-300 rounded-full"></div>
                    </>
                  )}
                  {template.id === "3" && (
                    <>
                      <div className="absolute left-0 top-0 w-2/5 h-full bg-slate-700"></div>
                      <div className="absolute right-0 top-0 w-3/5 h-full bg-gradient-to-b from-white to-slate-50 p-4">
                        <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
                        <div className="w-3/4 h-3 bg-slate-200 rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                          <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute left-4 top-8 w-20 h-20 bg-slate-200 rounded-full border-4 border-slate-600"></div>
                    </>
                  )}
                  {template.id === "4" && (
                    <>
                      <div className="absolute top-0 left-0 w-full h-20 bg-slate-600"></div>
                      <div className="absolute left-0 top-24 w-2/5 h-3/4 bg-slate-600"></div>
                      <div className="absolute right-0 top-24 w-3/5 h-3/4 bg-white p-4">
                        <div className="space-y-2 mt-4">
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                          <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute left-4 top-4 w-16 h-12 bg-white rounded"></div>
                    </>
                  )}
                  {template.id === "5" && (
                    <>
                      <div className="absolute left-0 top-0 w-2/5 h-full bg-slate-600"></div>
                      <div className="absolute right-0 top-0 w-3/5 h-full bg-white p-4">
                        <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
                        <div className="w-3/4 h-3 bg-blue-200 rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <div className="w-3/4 h-2 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute left-4 top-8 w-20 h-20 bg-slate-200 rounded-full border-4 border-white"></div>
                    </>
                  )}
                  {template.id === "6" && (
                    <>
                      <div className="absolute top-0 left-0 w-full h-16 bg-blue-600"></div>
                      <div className="absolute left-0 top-20 w-2/5 h-4/5 bg-slate-100"></div>
                      <div className="absolute right-0 top-20 w-3/5 h-4/5 bg-white p-4">
                        <div className="space-y-2 mt-4">
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                          <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute left-4 top-4 w-16 h-8 bg-white rounded"></div>
                    </>
                  )}
                  {template.id === "7" && (
                    <>
                      <div className="absolute left-0 top-0 w-2/5 h-full bg-slate-100"></div>
                      <div className="absolute right-0 top-0 w-3/5 h-full bg-white p-4">
                        <div className="space-y-2 mt-8">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <div className="w-3/4 h-2 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute left-4 top-8 w-20 h-20 bg-slate-200 rounded-full border-4 border-white"></div>
                    </>
                  )}
                  {template.id === "8" && (
                    <>
                      <div className="absolute left-0 top-0 w-2/5 h-full bg-slate-700"></div>
                      <div className="absolute right-0 top-0 w-3/5 h-full bg-white p-4">
                        <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
                        <div className="w-full h-1 bg-blue-500 rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                          <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute left-4 top-8 w-16 h-16 bg-slate-200 rounded-full"></div>
                    </>
                  )}
                  {template.id === "9" && (
                    <>
                      <div className="absolute top-0 left-0 w-full h-20 bg-white border-b-2 border-blue-600 p-4">
                        <div className="w-3/4 h-4 bg-blue-600 rounded mb-2"></div>
                        <div className="w-1/2 h-2 bg-slate-300 rounded"></div>
                      </div>
                      <div className="absolute top-24 left-0 w-full h-3/4 bg-white p-4">
                        <div className="space-y-3">
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                          <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                    </>
                  )}
                  {template.id === "10" && (
                    <>
                      <div className="absolute top-0 left-0 w-full h-16 bg-slate-700 flex items-center px-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-full mr-3"></div>
                        <div className="flex-1">
                          <div className="w-20 h-3 bg-white rounded mb-1"></div>
                          <div className="w-16 h-2 bg-slate-300 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute top-20 left-0 w-2/5 h-3/4 bg-slate-100 p-2">
                        <div className="space-y-1">
                          <div className="w-full h-2 bg-slate-300 rounded"></div>
                          <div className="w-3/4 h-2 bg-slate-300 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute top-20 right-0 w-3/5 h-3/4 bg-white p-2">
                        <div className="space-y-1">
                          <div className="w-full h-2 bg-slate-200 rounded"></div>
                          <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                    </>
                  )}
                  {template.id === "11" && (
                    <>
                      <div className="absolute left-0 top-0 w-2/5 h-full bg-slate-200 p-2">
                        <div className="w-16 h-20 bg-slate-400 rounded-2xl mx-auto mb-2 border-2 border-slate-600"></div>
                        <div className="space-y-1">
                          <div className="w-full h-2 bg-slate-400 rounded"></div>
                          <div className="w-3/4 h-2 bg-slate-400 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute right-0 top-0 w-3/5 h-full bg-white p-2">
                        <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-slate-600 rounded-full mr-2"></div>
                            <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {template.id === "12" && (
                    <>
                      <div className="absolute top-0 left-0 w-full h-16 bg-slate-700 flex items-center px-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-full mr-3"></div>
                        <div className="flex-1">
                          <div className="w-20 h-3 bg-white rounded mb-1"></div>
                          <div className="w-16 h-2 bg-slate-300 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute top-20 left-0 w-2/5 h-3/4 bg-slate-100 p-2">
                        <div className="space-y-2">
                          <div className="w-full h-2 bg-slate-300 rounded"></div>
                          <div className="w-3/4 h-1 bg-blue-400 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute top-20 right-0 w-3/5 h-3/4 bg-white p-2">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {template.id === "13" && (
                    <>
                      <div className="absolute left-0 top-0 w-2/5 h-full bg-slate-600 p-2">
                        <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-2 border-2 border-white"></div>
                        <div className="space-y-1">
                          <div className="w-full h-2 bg-white rounded"></div>
                          <div className="w-3/4 h-2 bg-slate-300 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute right-0 top-0 w-3/5 h-full bg-white p-2">
                        <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {template.id === "14" && (
                    <>
                      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-br from-blue-500 to-transparent"></div>
                      <div className="absolute left-0 top-8 w-2/5 h-4/5 bg-slate-100 p-2">
                        <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-2 border-2 border-white"></div>
                        <div className="space-y-1">
                          <div className="w-full h-2 bg-slate-400 rounded"></div>
                          <div className="w-3/4 h-2 bg-slate-400 rounded"></div>
                        </div>
                      </div>
                      <div className="absolute right-0 top-8 w-3/5 h-4/5 bg-white p-2">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mt-4 mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate || createResumeMutation.isPending}
            className="px-8 py-3 font-medium"
            data-testid="button-continue"
          >
            {createResumeMutation.isPending
              ? "Creating Resume..."
              : "Continue with Selected Template"}
          </Button>
        </div>
      </div>
    </div>
  );
}
