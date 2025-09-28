import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { StyleSettings, Template } from "@shared/schema";

export function useTemplateStyles(resumeId: string | undefined, templateId: string) {
  // Fetch style for specific resume and template combination
  const { data: style, isLoading: styleLoading } = useQuery({
    queryKey: ["/api/resumes", resumeId, "styles", templateId],
    enabled: !!resumeId && !!templateId,
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/resumes/${resumeId}/styles/${templateId}`);
      return response.json() as Promise<StyleSettings>;
    },
  });

  // Save style mutation
  const saveStyleMutation = useMutation({
    mutationFn: async (styleData: StyleSettings) => {
      if (!resumeId) throw new Error("No resume ID");
      const response = await apiRequest("POST", `/api/resumes/${resumeId}/styles/${templateId}`, styleData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["/api/resumes", resumeId, "styles", templateId] 
      });
    },
  });

  return {
    style,
    styleLoading,
    saveStyle: saveStyleMutation.mutate,
    isSaving: saveStyleMutation.isPending,
  };
}

export function useTemplates() {
  return useQuery({
    queryKey: ["/api/templates"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/templates");
      return response.json() as Promise<Template[]>;
    },
  });
}

export function useTemplate(templateId: string) {
  return useQuery({
    queryKey: ["/api/templates", templateId],
    enabled: !!templateId,
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/templates/${templateId}`);
      return response.json() as Promise<Template>;
    },
  });
}