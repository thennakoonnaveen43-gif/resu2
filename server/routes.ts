import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { insertResumeSchema, updateResumeSchema, styleSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all resumes for a user
  app.get("/api/resumes", async (req, res) => {
    try {
      const userId = req.query.userId as string || "anonymous";
      const resumes = await storage.getResumesByUser(userId);
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  // Get a specific resume
  app.get("/api/resumes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const resume = await storage.getResume(id);
      
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      res.json(resume);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resume" });
    }
  });

  // Create a new resume
  app.post("/api/resumes", async (req, res) => {
    try {
      const validatedData = insertResumeSchema.parse(req.body);
      const resume = await storage.createResume(validatedData);
      res.status(201).json(resume);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create resume" });
    }
  });

  // Update a resume
  app.patch("/api/resumes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = updateResumeSchema.parse(req.body);
      
      const updatedResume = await storage.updateResume(id, validatedData);
      
      if (!updatedResume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      res.json(updatedResume);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update resume" });
    }
  });

  // Delete a resume
  app.delete("/api/resumes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteResume(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete resume" });
    }
  });

  // Get all templates
  app.get("/api/templates", async (req, res) => {
    try {
      const templates = await storage.getAllTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  // Get template by ID
  app.get("/api/templates/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const template = await storage.getTemplate(id);
      
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  // Get style for specific resume and template combination
  app.get("/api/resumes/:id/styles/:templateId", async (req, res) => {
    try {
      const { id: resumeId, templateId } = req.params;
      
      // First try to get custom style
      const customStyle = await storage.getResumeStyle(resumeId, templateId);
      if (customStyle) {
        return res.json(customStyle.style);
      }
      
      // Fall back to template default
      const template = await storage.getTemplate(templateId);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.json(template.defaultStyle);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch style" });
    }
  });

  // Save or update style for specific resume and template combination
  app.post("/api/resumes/:id/styles/:templateId", async (req, res) => {
    try {
      const { id: resumeId, templateId } = req.params;
      const validatedStyle = styleSchema.parse(req.body);
      
      // Verify resume exists
      const resume = await storage.getResume(resumeId);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      // Verify template exists
      const template = await storage.getTemplate(templateId);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      const savedStyle = await storage.saveResumeStyle(resumeId, templateId, validatedStyle);
      res.json(savedStyle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to save style" });
    }
  });

  // Delete style for specific resume and template combination
  app.delete("/api/resumes/:id/styles/:templateId", async (req, res) => {
    try {
      const { id: resumeId, templateId } = req.params;
      const deleted = await storage.deleteResumeStyle(resumeId, templateId);
      
      if (!deleted) {
        return res.status(404).json({ message: "Style not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete style" });
    }
  });

  app.get("/api/presets", async (req, res) => {
    try {
      const presets = await storage.getPresets();
      
      if (!presets) {
        return res.status(404).json({ message: "presets not found" });
      }
      
      res.status(200).json(presets);

    } catch (error) {
      res.status(500).json({ message: "Failed to delete resume" });
    }
  });
  

  const httpServer = createServer(app);
  return httpServer;
}
