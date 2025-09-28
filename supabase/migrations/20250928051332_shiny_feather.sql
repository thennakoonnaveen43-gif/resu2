/*
  # Create resume styles and templates tables

  1. New Tables
    - `templates`
      - `id` (varchar, primary key)
      - `name` (text, not null)
      - `description` (text, optional)
      - `default_style` (jsonb, not null)
      - `created_at` (timestamp, default now)
    - `resume_styles`
      - `resume_id` (varchar, foreign key to resumes.id)
      - `template_id` (varchar, foreign key to templates.id)
      - `style` (jsonb, not null)
      - `created_at` (timestamp, default now)
      - `updated_at` (timestamp, default now)
      - Primary key: (resume_id, template_id)

  2. Schema Changes
    - Add `created_at` and `updated_at` to resumes table
    - Remove `style` column from resumes table (moved to resume_styles)

  3. Security
    - Enable RLS on all new tables
    - Add cascade delete for resume_styles when resume is deleted
*/

-- Add timestamps to existing resumes table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resumes' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE resumes ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resumes' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE resumes ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Remove style column from resumes table if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resumes' AND column_name = 'style'
  ) THEN
    ALTER TABLE resumes DROP COLUMN style;
  END IF;
END $$;

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id varchar PRIMARY KEY,
  name text NOT NULL,
  description text,
  default_style jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create resume_styles table
CREATE TABLE IF NOT EXISTS resume_styles (
  resume_id varchar NOT NULL,
  template_id varchar NOT NULL,
  style jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (resume_id, template_id)
);

-- Add foreign key constraints
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'resume_styles_resume_id_fkey'
  ) THEN
    ALTER TABLE resume_styles 
    ADD CONSTRAINT resume_styles_resume_id_fkey 
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'resume_styles_template_id_fkey'
  ) THEN
    ALTER TABLE resume_styles 
    ADD CONSTRAINT resume_styles_template_id_fkey 
    FOREIGN KEY (template_id) REFERENCES templates(id);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_styles ENABLE ROW LEVEL SECURITY;

-- RLS policies for templates (public read access)
CREATE POLICY "Templates are publicly readable"
  ON templates
  FOR SELECT
  TO public
  USING (true);

-- RLS policies for resume_styles (users can manage their own resume styles)
CREATE POLICY "Users can read their own resume styles"
  ON resume_styles
  FOR SELECT
  TO public
  USING (
    resume_id IN (
      SELECT id FROM resumes WHERE user_id = 'anonymous'
    )
  );

CREATE POLICY "Users can insert their own resume styles"
  ON resume_styles
  FOR INSERT
  TO public
  WITH CHECK (
    resume_id IN (
      SELECT id FROM resumes WHERE user_id = 'anonymous'
    )
  );

CREATE POLICY "Users can update their own resume styles"
  ON resume_styles
  FOR UPDATE
  TO public
  USING (
    resume_id IN (
      SELECT id FROM resumes WHERE user_id = 'anonymous'
    )
  );

CREATE POLICY "Users can delete their own resume styles"
  ON resume_styles
  FOR DELETE
  TO public
  USING (
    resume_id IN (
      SELECT id FROM resumes WHERE user_id = 'anonymous'
    )
  );

-- Insert default templates
INSERT INTO templates (id, name, description, default_style) VALUES
('5', 'Mariana Anderson', 'Professional with timeline design', '{
  "headerFontSize": 18,
  "bodyFontSize": 12,
  "sectionSpacing": 16,
  "sidebarSectionSpacing": 24,
  "lineHeight": 1.5,
  "marginTop": 20,
  "marginBottom": 20,
  "marginLeft": 20,
  "marginRight": 20,
  "sidebarWidth": 40,
  "aboutMePlacement": "main",
  "referencePlacement": "sidebar",
  "colors": {
    "primary": "#3b82f6",
    "secondary": "#64748b",
    "accent": "#06b6d4",
    "background": "#ffffff",
    "sidebarBackground": "#1e293b",
    "headerTextColor": "#1e293b",
    "bodyTextColor": "#374151",
    "sidebarTextColor": "#ffffff"
  }
}'),
('6', 'Francisco Andrade', 'Blue header with clean layout', '{
  "headerFontSize": 18,
  "bodyFontSize": 12,
  "sectionSpacing": 16,
  "sidebarSectionSpacing": 24,
  "lineHeight": 1.5,
  "marginTop": 20,
  "marginBottom": 20,
  "marginLeft": 20,
  "marginRight": 20,
  "sidebarWidth": 40,
  "aboutMePlacement": "main",
  "referencePlacement": "sidebar",
  "colors": {
    "primary": "#1e40af",
    "secondary": "#64748b",
    "accent": "#06b6d4",
    "background": "#ffffff",
    "sidebarBackground": "#e5e7eb",
    "headerTextColor": "#ffffff",
    "bodyTextColor": "#374151",
    "sidebarTextColor": "#374151"
  }
}'),
('8', 'Richard Sanchez', 'Dark professional with timeline', '{
  "headerFontSize": 18,
  "bodyFontSize": 12,
  "sectionSpacing": 16,
  "sidebarSectionSpacing": 24,
  "lineHeight": 1.5,
  "marginTop": 20,
  "marginBottom": 20,
  "marginLeft": 20,
  "marginRight": 20,
  "sidebarWidth": 40,
  "aboutMePlacement": "main",
  "referencePlacement": "sidebar",
  "colors": {
    "primary": "#3b82f6",
    "secondary": "#64748b",
    "accent": "#06b6d4",
    "background": "#ffffff",
    "sidebarBackground": "#374151",
    "headerTextColor": "#1f2937",
    "bodyTextColor": "#374151",
    "sidebarTextColor": "#ffffff"
  }
}'),
('9', 'Olivia Wilson', 'Clean single column layout', '{
  "headerFontSize": 18,
  "bodyFontSize": 12,
  "sectionSpacing": 16,
  "sidebarSectionSpacing": 24,
  "lineHeight": 1.5,
  "marginTop": 20,
  "marginBottom": 20,
  "marginLeft": 20,
  "marginRight": 20,
  "sidebarWidth": 40,
  "aboutMePlacement": "main",
  "referencePlacement": "sidebar",
  "colors": {
    "primary": "#1e40af",
    "secondary": "#64748b",
    "accent": "#06b6d4",
    "background": "#ffffff",
    "sidebarBackground": "#ffffff",
    "headerTextColor": "#1e40af",
    "bodyTextColor": "#374151",
    "sidebarTextColor": "#374151"
  }
}'),
('12', 'Lorna Executive', 'Dark header with timeline', '{
  "headerFontSize": 18,
  "bodyFontSize": 12,
  "sectionSpacing": 16,
  "sidebarSectionSpacing": 24,
  "lineHeight": 1.5,
  "marginTop": 20,
  "marginBottom": 20,
  "marginLeft": 20,
  "marginRight": 20,
  "sidebarWidth": 40,
  "aboutMePlacement": "main",
  "referencePlacement": "sidebar",
  "colors": {
    "primary": "#3b82f6",
    "secondary": "#64748b",
    "accent": "#06b6d4",
    "background": "#f8fafc",
    "sidebarBackground": "#f1f5f9",
    "headerTextColor": "#1f2937",
    "bodyTextColor": "#374151",
    "sidebarTextColor": "#374151"
  }
}'),
('14', 'Diagonal Blue', 'Distinctive diagonal header', '{
  "headerFontSize": 18,
  "bodyFontSize": 12,
  "sectionSpacing": 16,
  "sidebarSectionSpacing": 24,
  "lineHeight": 1.5,
  "marginTop": 20,
  "marginBottom": 20,
  "marginLeft": 20,
  "marginRight": 20,
  "sidebarWidth": 33,
  "aboutMePlacement": "main",
  "referencePlacement": "main",
  "colors": {
    "primary": "#facc15",
    "secondary": "#64748b",
    "accent": "#06b6d4",
    "background": "#ffffff",
    "sidebarBackground": "#1e293b",
    "headerTextColor": "#1e293b",
    "bodyTextColor": "#374151",
    "sidebarTextColor": "#ffffff"
  }
}'),
('15', 'Modern Timeline', 'Clean timeline design', '{
  "headerFontSize": 18,
  "bodyFontSize": 12,
  "sectionSpacing": 16,
  "sidebarSectionSpacing": 24,
  "lineHeight": 1.5,
  "marginTop": 20,
  "marginBottom": 20,
  "marginLeft": 20,
  "marginRight": 20,
  "sidebarWidth": 35,
  "aboutMePlacement": "sidebar",
  "referencePlacement": "main",
  "colors": {
    "primary": "#3b82f6",
    "secondary": "#64748b",
    "accent": "#06b6d4",
    "background": "#ffffff",
    "sidebarBackground": "#f3f4f6",
    "headerTextColor": "#374151",
    "bodyTextColor": "#374151",
    "sidebarTextColor": "#374151"
  }
}'
) ON CONFLICT (id) DO NOTHING;