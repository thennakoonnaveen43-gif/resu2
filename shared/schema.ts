import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact information schema
const contactSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  website: z.string().url().optional(),
  location: z.string().optional(),
});

// Experience item schema
const experienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  from: z.string(),
  to: z.string(),
  description: z.string(),
  highlights: z.array(z.string()).optional(),
});

// Education item schema
const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  area: z.string().optional(),
  from: z.string(),
  to: z.string(),
  gpa: z.string().optional(),
  description: z.string().optional(),
  courses: z
    .array(
      z.object({
        subject: z.string(),
        mark: z.string(),
      })
    )
    .optional(),
});

// Certification schema
const certificationSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  date: z.string(),
  description: z.string().optional(),
});

// Award schema
const awardSchema = z.object({
  title: z.string(),
  awarder: z.string(),
  date: z.string(),
  summary: z.string().optional(),
});

// Language schema
const languageSchema = z.object({
  name: z.string(),
  level: z.string(),
});

// Interest schema
const interestSchema = z.object({
  name: z.string(),
  keywords: z.array(z.string()).optional(),
});

// Reference schema
const referenceSchema = z.object({
  name: z.string(),
  position: z.string(),
  company: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

// Color settings schema
const colorSchema = z.object({
  primary: z.string().default("#3b82f6"),
  secondary: z.string().default("#64748b"),
  accent: z.string().default("#06b6d4"),
  background: z.string().default("#ffffff"),
  sidebarBackground: z.string().default("#1e293b"),
  headerTextColor: z.string().default("#1e293b"),
  bodyTextColor: z.string().default("#374151"),
  sidebarTextColor: z.string().default("#ffffff"),
});

// Style settings schema
const styleSchema = z.object({
  headerFontSize: z.number().min(16).max(24).default(18),
  bodyFontSize: z.number().min(10).max(16).default(12),
  sectionSpacing: z.number().min(8).max(32).default(16),
  sidebarSectionSpacing: z.number().min(8).max(32).default(16),
  lineHeight: z.number().min(1.2).max(2.0).default(1.5),
  marginTop: z.number().min(10).max(40).default(20),
  marginBottom: z.number().min(10).max(40).default(20),
  marginLeft: z.number().min(10).max(40).default(20),
  marginRight: z.number().min(10).max(40).default(20),
  sidebarWidth: z.number().min(30).max(45).default(40),
  colors: colorSchema.default({}),
  referencePlacement: z.string().default("sidebar"),
  aboutMePlacement: z.string().default("sidebar"),
});


const presetSchema = z.object({
  name: z.string(),
  className: z.string(),
  category: z.string(),
  forTemplates:z.array(z.string()).default([]),
  presetID: z.string(),
  presetValues: colorSchema.default({}),
});



// Resume data schema
const resumeDataSchema = z.object({
  name: z.string(),
  title: z.string(),
  summary: z.string(),
  contact: contactSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(z.string()),
  languages: z.array(languageSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
  awards: z.array(awardSchema).optional(),
  interests: z.array(interestSchema).optional(),
  references: z.array(referenceSchema).optional(),
  
});

export const resumes = pgTable("resumes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().default("anonymous"),
  name: text("name").notNull().default("Untitled Resume"),
  templateId: text("template_id").notNull().default("1"),
  data: jsonb("data").$type<z.infer<typeof resumeDataSchema>>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Template definitions table
export const templates = pgTable("templates", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  defaultStyle: jsonb("default_style").$type<z.infer<typeof styleSchema>>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Resume-specific template styles table
export const resumeStyles = pgTable("resume_styles", {
  resumeId: varchar("resume_id").notNull().references(() => resumes.id, { onDelete: "cascade" }),
  templateId: varchar("template_id").notNull().references(() => templates.id),
  style: jsonb("style").$type<z.infer<typeof styleSchema>>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  pk: primaryKey({ columns: [table.resumeId, table.templateId] }),
}));

// Template schema
const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  defaultStyle: styleSchema,
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTemplateSchema = createInsertSchema(templates).omit({
  createdAt: true,
});

export const insertResumeStyleSchema = createInsertSchema(resumeStyles).omit({
  createdAt: true,
  updatedAt: true,
});

export const updateResumeSchema = insertResumeSchema.partial();
export const updateResumeStyleSchema = insertResumeStyleSchema.partial();

export type InsertResume = z.infer<typeof insertResumeSchema>;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type InsertResumeStyle = z.infer<typeof insertResumeStyleSchema>;
export type Resume = typeof resumes.$inferSelect;
export type Template = typeof templates.$inferSelect;
export type ResumeStyle = typeof resumeStyles.$inferSelect;
export type ResumeData = z.infer<typeof resumeDataSchema>;
export type StyleSettings = z.infer<typeof styleSchema>;
export type presetSettings = z.infer<typeof presetSchema>;
export type ColorSettings = z.infer<typeof colorSchema>;
export type ContactInfo = z.infer<typeof contactSchema>;
export type ExperienceItem = z.infer<typeof experienceSchema>;
export type EducationItem = z.infer<typeof educationSchema>;
export type CertificationItem = z.infer<typeof certificationSchema>;
export type AwardItem = z.infer<typeof awardSchema>;
export type LanguageItem = z.infer<typeof languageSchema>;
export type InterestItem = z.infer<typeof interestSchema>;
export type ReferenceItem = z.infer<typeof referenceSchema>;

// Export schemas for validation
export { 
  resumeDataSchema, 
  styleSchema, 
  colorSchema,
  contactSchema, 
  experienceSchema, 
  educationSchema,
  certificationSchema,
  awardSchema,
  languageSchema,
  interestSchema,
  referenceSchema,
  presetSchema,
  templateSchema
};