import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ResumeData, StyleSettings } from "@shared/schema";

interface GeneratePDFRequest {
  resumeData: ResumeData;
  style: StyleSettings;
  templateId: string;
}

export function usePDFGenerator() {
  const generatePDFMutation = useMutation({
    mutationFn: async ({ resumeData, style, templateId }: GeneratePDFRequest) => {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeData,
          style,
          templateId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      return response.blob();
    },
    onSuccess: (pdfBlob, variables) => {
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume-${variables.resumeData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });

  return {
    generatePDF: generatePDFMutation.mutate,
    isGenerating: generatePDFMutation.isPending,
    error: generatePDFMutation.error,
  };
}