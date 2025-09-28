import express from "express";
import puppeteer from "puppeteer";
import { z } from "zod";
import { resumeDataSchema, styleSchema } from "@shared/schema";

const app = express();
app.use(express.json({ limit: '10mb' }));

// PDF generation request schema
const pdfRequestSchema = z.object({
  resumeData: resumeDataSchema,
  style: styleSchema,
  templateId: z.string(),
});

// Template renderer function
function renderResumeHTML(resumeData: any, style: any, templateId: string): string {
  // This would contain the actual template rendering logic
  // For now, we'll create a basic HTML structure
  const colors = style.colors || {};
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume - ${resumeData.name}</title>
      <style>
        @page {
          size: A4;
          margin: 0;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: ${style.bodyFontSize}px;
          line-height: ${style.lineHeight};
          color: ${colors.bodyTextColor || '#374151'};
          background: ${colors.background || '#ffffff'};
        }
        
        .resume-container {
          width: 210mm;
          height: 297mm;
          display: flex;
          background: ${colors.background || '#ffffff'};
        }
        
        .sidebar {
          width: ${style.sidebarWidth}%;
          background: ${colors.sidebarBackground || '#1e293b'};
          color: ${colors.sidebarTextColor || '#ffffff'};
          padding: 24px;
        }
        
        .main-content {
          flex: 1;
          padding: 32px;
          background: ${colors.background || '#ffffff'};
        }
        
        .profile-photo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #e5e7eb;
          margin: 0 auto 24px;
          border: 4px solid white;
        }
        
        .name {
          font-size: ${style.headerFontSize * 1.5}px;
          font-weight: bold;
          color: ${colors.headerTextColor || '#1e293b'};
          margin-bottom: 8px;
        }
        
        .title {
          font-size: ${style.headerFontSize * 0.8}px;
          color: ${colors.primary || '#3b82f6'};
          margin-bottom: 16px;
        }
        
        .section-title {
          font-size: ${style.headerFontSize}px;
          font-weight: bold;
          color: ${colors.headerTextColor || '#1e293b'};
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid ${colors.primary || '#3b82f6'};
        }
        
        .sidebar-section {
          margin-bottom: ${style.sidebarSectionSpacing}px;
        }
        
        .sidebar-title {
          font-size: ${style.bodyFontSize * 1.2}px;
          font-weight: bold;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          padding-bottom: 8px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          font-size: ${style.bodyFontSize * 0.9}px;
        }
        
        .skill-item {
          margin-bottom: 4px;
          font-size: ${style.bodyFontSize * 0.9}px;
        }
        
        .experience-item {
          margin-bottom: ${style.sectionSpacing}px;
        }
        
        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 8px;
        }
        
        .position {
          font-weight: bold;
          font-size: ${style.bodyFontSize * 1.1}px;
        }
        
        .company {
          color: ${colors.primary || '#3b82f6'};
          font-size: ${style.bodyFontSize * 0.95}px;
        }
        
        .date-range {
          font-size: ${style.bodyFontSize * 0.85}px;
          color: #6b7280;
        }
        
        .description {
          font-size: ${style.bodyFontSize * 0.9}px;
          line-height: 1.6;
          margin-bottom: 8px;
        }
        
        .highlight {
          display: flex;
          align-items: start;
          margin-bottom: 4px;
          font-size: ${style.bodyFontSize * 0.85}px;
        }
        
        .highlight::before {
          content: "•";
          color: ${colors.primary || '#3b82f6'};
          margin-right: 8px;
        }
      </style>
    </head>
    <body>
      <div class="resume-container">
        <div class="sidebar">
          <div class="profile-photo"></div>
          
          <div class="sidebar-section">
            <div class="sidebar-title">Contact</div>
            ${resumeData.contact.phone ? `<div class="contact-item">📞 ${resumeData.contact.phone}</div>` : ''}
            ${resumeData.contact.email ? `<div class="contact-item">✉️ ${resumeData.contact.email}</div>` : ''}
            ${resumeData.contact.location ? `<div class="contact-item">📍 ${resumeData.contact.location}</div>` : ''}
            ${resumeData.contact.website ? `<div class="contact-item">🌐 ${resumeData.contact.website.replace(/^https?:\/\//, '')}</div>` : ''}
          </div>
          
          ${resumeData.skills.length > 0 ? `
          <div class="sidebar-section">
            <div class="sidebar-title">Skills</div>
            ${resumeData.skills.map((skill: string) => `<div class="skill-item">• ${skill}</div>`).join('')}
          </div>
          ` : ''}
          
          ${resumeData.languages && resumeData.languages.length > 0 ? `
          <div class="sidebar-section">
            <div class="sidebar-title">Languages</div>
            ${resumeData.languages.map((lang: any) => `<div class="skill-item">${lang.name} (${lang.level})</div>`).join('')}
          </div>
          ` : ''}
        </div>
        
        <div class="main-content">
          <div class="name">${resumeData.name}</div>
          <div class="title">${resumeData.title}</div>
          
          ${resumeData.summary ? `
          <div style="margin-bottom: ${style.sectionSpacing}px;">
            <div class="section-title">Summary</div>
            <div class="description">${resumeData.summary}</div>
          </div>
          ` : ''}
          
          ${resumeData.experience.length > 0 ? `
          <div style="margin-bottom: ${style.sectionSpacing}px;">
            <div class="section-title">Experience</div>
            ${resumeData.experience.map((exp: any) => `
              <div class="experience-item">
                <div class="experience-header">
                  <div>
                    <div class="position">${exp.position}</div>
                    <div class="company">${exp.company}</div>
                  </div>
                  <div class="date-range">${exp.from} - ${exp.to}</div>
                </div>
                <div class="description">${exp.description}</div>
                ${exp.highlights ? exp.highlights.map((highlight: string) => `<div class="highlight">${highlight}</div>`).join('') : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          ${resumeData.education.length > 0 ? `
          <div>
            <div class="section-title">Education</div>
            ${resumeData.education.map((edu: any) => `
              <div class="experience-item">
                <div class="experience-header">
                  <div>
                    <div class="position">${edu.degree}</div>
                    <div class="company">${edu.institution}</div>
                  </div>
                  <div class="date-range">${edu.from} - ${edu.to}</div>
                </div>
                ${edu.description ? `<div class="description">${edu.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}

// PDF generation endpoint
app.post("/api/generate-pdf", async (req, res) => {
  let browser;
  
  try {
    const { resumeData, style, templateId } = pdfRequestSchema.parse(req.body);
    
    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    
    const page = await browser.newPage();
    
    // Generate HTML content
    const htmlContent = renderResumeHTML(resumeData, style, templateId);
    
    // Set content and wait for it to load
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="resume-${resumeData.name.replace(/\s+/g, '-').toLowerCase()}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    
    // Send PDF
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('PDF generation error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: error.errors 
      });
    }
    
    res.status(500).json({ 
      message: "Failed to generate PDF",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "pdf-generator" });
});

const PORT = process.env.PDF_SERVICE_PORT || 3001;

app.listen(PORT, () => {
  console.log(`PDF service running on port ${PORT}`);
});

export default app;