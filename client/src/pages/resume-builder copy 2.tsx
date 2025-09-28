import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Save, Download, Printer } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { presetSettings, Resume, ResumeData, StyleSettings } from "@shared/schema";

// Import template components
import TemplateOne from "@/components/resume-templates/template-one";
import TemplateTwo from "@/components/resume-templates/template-two";
import TemplateThree from "@/components/resume-templates/template-three";
import TemplateFour from "@/components/resume-templates/template-four";
import TemplateFive from "@/components/resume-templates/template-five";
import TemplateSix from "@/components/resume-templates/template-six";
import TemplateSeven from "@/components/resume-templates/template-seven";
import TemplateEight from "@/components/resume-templates/template-eight";
import TemplateNine from "@/components/resume-templates/template-nine";
import TemplateTen from "@/components/resume-templates/template-ten";
import TemplateEleven from "@/components/resume-templates/template-eleven";
import TemplateTwelve from "@/components/resume-templates/template-twelve";
import TemplateThirteen from "@/components/resume-templates/template-thirteen";
import TemplateFourteen from "@/components/resume-templates/template-fourteen";

// Import sidebar sections
import BioSection from "@/components/sidebar/bio-section";
import ContactSection from "@/components/sidebar/contact-section";
import ExperienceSection from "@/components/sidebar/experience-section";
import EducationSection from "@/components/sidebar/education-section";
import SkillsSection from "@/components/sidebar/skills-section";
import LanguagesSection from "@/components/sidebar/languages-section";
import CertificationsSection from "@/components/sidebar/certifications-section";
import ReferencesSection from "@/components/sidebar/references-section";
import StyleSection from "@/components/sidebar/style-section";

type SectionType = "bio" | "contact" | "experience" | "education" | "skills" | "languages" | "certifications" | "references" | "customize";

export default function ResumeBuilder() {
  const [match, params] = useRoute("/builder/:id?/:template?/:preset?");
  const [activeSection, setActiveSection] = useState<SectionType>("bio");
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "",
    title: "",
    summary: "",
    contact: { email: "", phone: "", linkedin: "", location: "" },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    references: [],
  });
  const [styleSettings, setStyleSettings] = useState<StyleSettings>({
    headerFontSize: 18,
    bodyFontSize: 12,
    sectionSpacing: 16,
    lineHeight: 1.5,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    sidebarWidth: 40,
    aboutMePlacement: "main",
    referencePlacement: "sidebar",
    sidebarSectionSpacing: 24,
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
  });
  const [templateId, setTemplateId] = useState("1");
  const { toast } = useToast();

  const resumeId = params?.id;

  useEffect(() => {
    if (params?.template) {
      setTemplateId(params.template);
    }
  }, [params?.template]);

  // Fetch existing resume if ID provided
  const { data: presets, isLoading: presetsLoading } = useQuery({
    queryKey: ["/api/presets"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/presets");
      return response.json();
    },
  });

  useEffect(() => {
    if (params?.preset && presets) {
      const foundPreset = presets.find(
        (p: presetSettings) =>
          p.presetID.toLowerCase() === (params?.preset ? params.preset.toLowerCase() : "")
      );
      if (foundPreset) {
        //alert("resume" + foundPreset?.name)

        setStyleSettings(prev => ({
          ...prev,
          colors: foundPreset.presetValues,
        }));
      }
    }
  }, [params?.preset, presets]);


  // Fetch existing resume if ID provided
  const { data: resume, isLoading } = useQuery<Resume>({
    queryKey: ["/api/resumes", resumeId],
    enabled: !!resumeId,
  });

  // Update mutation
  const updateResumeMutation = useMutation({
    mutationFn: async (updates: Partial<Resume>) => {
      if (!resumeId) throw new Error("No resume ID");
      const response = await apiRequest("PATCH", `/api/resumes/${resumeId}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes", resumeId] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save changes.",
      });
    },
  });

  // Create mutation for new resumes
  const createResumeMutation = useMutation({
    mutationFn: async (newResume: any) => {
      const response = await apiRequest("POST", "/api/resumes", newResume);
      return response.json();
    },
    onSuccess: (newResume) => {
      window.history.replaceState({}, "", `/builder/${newResume.id}`);
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
    },
  });

  // Load resume data when query succeeds
  useEffect(() => {
    if (resume && resume.data && resume.style && resume.templateId) {
      setResumeData(resume.data);
      if (!params?.preset) {
        setStyleSettings(resume.style);
      }
      
      if (!params?.template) {
        setTemplateId(resume.templateId);
      }

    }
  }, [resume]);

  // Auto-save functionality
  useEffect(() => {
    if (!resumeId || isLoading) return;

    const timeoutId = setTimeout(() => {
      updateResumeMutation.mutate({
        data: resumeData,
        style: styleSettings,
        templateId,
      });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [resumeData, styleSettings, templateId, resumeId, isLoading]);

  // Create new resume if no ID provided
  useEffect(() => {
    if (!resumeId && !isLoading) {
      createResumeMutation.mutate({
        name: "Untitled Resume",
        templateId: "1",
        userId: "anonymous",
        data: resumeData,
        style: styleSettings,
      });
    }
  }, []);

  const handleDataChange = (newData: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...newData }));
  };

  const handleStyleChange = (newStyle: Partial<StyleSettings>) => {
    setStyleSettings(prev => ({ ...prev, ...newStyle }));
  };

  const handleTemplateChange = (newTemplateId: string) => {
    setTemplateId(newTemplateId);
  };

  const handleDownloadPDF = () => {
    const resumeElement = document.querySelector('.a4-preview');
    if (!resumeElement) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Get all stylesheets
    const stylesheets = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          return '';
        }
      })
      .join('\n');

    // Create the print document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${data.name}</title>
          <style>
            ${stylesheets}
            @page {
              size: A4;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: Inter, system-ui, sans-serif;
            }
            .resume-container {
              width: 210mm;
              height: 297mm;
              margin: 0 auto;
              background: white;
            }
            @media print {
              body { margin: 0; }
              .resume-container { 
                width: 100%; 
                height: 100vh; 
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="resume-container">
            ${resumeElement.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();

    // Wait for content to load then trigger download
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const handlePrint = () => {
    const resumeElement = document.querySelector('.a4-preview');
    if (!resumeElement) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Get all stylesheets
    const stylesheets = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          return '';
        }
      })
      .join('\n');

    // Create the print document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume </title>
          <style>
            ${stylesheets}
            @page {
              size: A4;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: Inter, system-ui, sans-serif;
            }
            .resume-container {
              width: 210mm;
              height: 297mm;
              margin: 0 auto;
              background: white;
            }
            @media print {
              body { margin: 0; }
              .resume-container { 
                width: 100%; 
                height: 100vh; 
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="resume-container">
            ${resumeElement.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const renderTemplate = () => {
    const props = { data: resumeData, style: styleSettings };

    switch (templateId) {
      case "1":
        return <TemplateOne {...props} />;
      case "2":
        return <TemplateTwo {...props} />;
      case "3":
        return <TemplateThree {...props} />;
      case "4":
        return <TemplateFour {...props} />;
      case "5":
        return <TemplateFive {...props} />;
      case "6":
        return <TemplateSix {...props} />;
      case "7":
        return <TemplateSeven {...props} />;
      case "8":
        return <TemplateEight {...props} />;
      case "9":
        return <TemplateNine {...props} />;
      case "10":
        return <TemplateTen {...props} />;
      case "11":
        return <TemplateEleven {...props} />;
      case "12":
        return <TemplateTwelve {...props} />;
      case "13":
        return <TemplateThirteen {...props} />;
      case "14":
        return <TemplateFourteen {...props} />;
      default:
        return <TemplateOne {...props} />;
    }
  };

  const renderSectionEditor = () => {
    const commonProps = { data: resumeData, onDataChange: handleDataChange };

    switch (activeSection) {
      case "bio":
        return <BioSection {...commonProps} />;
      case "contact":
        return <ContactSection {...commonProps} />;
      case "experience":
        return <ExperienceSection {...commonProps} />;
      case "education":
        return <EducationSection {...commonProps} />;
      case "skills":
        return <SkillsSection {...commonProps} />;
      case "languages":
        return <LanguagesSection {...commonProps} />;
      case "certifications":
        return <CertificationsSection {...commonProps} />;
      case "references":
        return <ReferencesSection {...commonProps} />;
      case "customize":
        return <StyleSection style={styleSettings} onStyleChange={handleStyleChange} presets={presets} />;
      default:
        return <BioSection {...commonProps} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading resume...</p>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-autosave"
            >
              <Save className="mr-2 h-4 w-4" />
              {updateResumeMutation.isPending ? "Saving..." : "Auto-saved"}
            </Button>
            <Button size="sm" data-testid="button-download">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              data-testid="button-print"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)] overflow-hidden">
        {/* Left Sidebar - Section Editors */}
        <div className="w-full lg:w-80 bg-card border-b lg:border-b-0 lg:border-r border-border flex flex-col">
          <div className="px-2 border-b border-border">
            {/* <h3 className="text-lg font-semibold text-foreground mb-4">Resume Editor</h3> */}

            {/* Template Switcher */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-foreground mb-2">Template</label>
              <Select value={templateId} onValueChange={handleTemplateChange}>
                <SelectTrigger data-testid="select-template">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="1">Professional Dark</SelectItem>
                  <SelectItem value="2">Modern Clean</SelectItem>
                  <SelectItem value="3">Executive</SelectItem>
                  <SelectItem value="4">Corporate</SelectItem> */}
                  <SelectItem value="5">Mariana Anderson</SelectItem>
                  <SelectItem value="6">Francisco Andrade</SelectItem>
                  <SelectItem value="7">Lorna Alvarado</SelectItem>
                  <SelectItem value="8">Richard Sanchez</SelectItem>
                  <SelectItem value="9">Olivia Wilson</SelectItem>
                  <SelectItem value="10">Korina Professional</SelectItem>
                  <SelectItem value="11">Aron Modern</SelectItem>
                  <SelectItem value="12">Lorna Executive</SelectItem>
                  <SelectItem value="13">Richard Timeline</SelectItem>
                  <SelectItem value="14">Diagonal Blue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Section Tabs */}
            <div className="flex flex-wrap gap-1">
              {[
                { key: "bio" as const, label: "Bio" },
                { key: "contact" as const, label: "Contact" },
                { key: "experience" as const, label: "Experience" },
                { key: "education" as const, label: "Education" },
                { key: "skills" as const, label: "Skills" },
                { key: "languages" as const, label: "Languages" },
                { key: "certifications" as const, label: "Certs" },
                { key: "references" as const, label: "References" },
                { key: "customize" as const, label: "Style" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`px-1 py-1 text-xs  rounded-md transition-colors ${activeSection === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  data-testid={`tab-${key}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {renderSectionEditor()}
          </div>
        </div>

        {/* Main Content Area - Live Preview */}
        <div className="flex-1 bg-muted overflow-auto">
          <div className="p-4 lg:p-8 flex justify-center">
            <div className="a4-preview bg-card">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
