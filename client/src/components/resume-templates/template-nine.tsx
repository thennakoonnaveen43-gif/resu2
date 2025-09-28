import type { ResumeData, StyleSettings } from "@shared/schema";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateNine({ data, style }: TemplateProps) {
  const colors = style.colors || {};
  
  return (
    <div
      className="resume-template h-full"
      style={{
        fontSize: `${style.bodyFontSize}px`,
        lineHeight: style.lineHeight,
        padding: `${style.marginTop}px ${style.marginRight}px ${style.marginBottom}px ${style.marginLeft}px`,
        backgroundColor: colors.background || "#ffffff",
        color: colors.bodyTextColor || "#374151",
      }}
    >
      {/* Header */}
      <header className="text-center mb-8 pb-6" style={{ borderBottom: `3px solid ${colors.primary || "#1e40af"}` }}>
        <h1
          className="font-bold uppercase tracking-wide mb-2"
          style={{ 
            fontSize: `${style.headerFontSize * 1.5}px`,
            color: colors.primary || "#1e40af",
          }}
        >
          {data.name}
        </h1>
        <div className="flex justify-center items-center space-x-4 text-xs mb-4">
          {data.contact.email && <span>{data.contact.email}</span>}
          {data.contact.phone && <span>|</span>}
          {data.contact.phone && <span>{data.contact.phone}</span>}
          {data.contact.location && <span>|</span>}
          {data.contact.location && <span>{data.contact.location}</span>}
        </div>
        {data.contact.website && (
          <div className="text-xs">
            <span>{data.contact.website}</span>
          </div>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
          <h3 
            className="text-base font-bold uppercase tracking-wide mb-4 pb-2"
            style={{ 
              borderBottom: `2px solid ${colors.primary || "#1e40af"}`,
              color: colors.headerTextColor || "#1f2937",
            }}
          >
            Summary
          </h3>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
          <h3 
            className="text-base font-bold uppercase tracking-wide mb-4 pb-2"
            style={{ 
              borderBottom: `2px solid ${colors.primary || "#1e40af"}`,
              color: colors.headerTextColor || "#1f2937",
            }}
          >
            Work Experience
          </h3>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-sm font-semibold">{exp.position}</h4>
                    <p className="text-xs font-medium" style={{ color: colors.primary || "#1e40af" }}>{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500">{exp.from} - {exp.to}</span>
                </div>
                <p className="text-xs leading-relaxed mb-2">{exp.description}</p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="text-xs space-y-1 ml-4">
                    {exp.highlights.map((highlight, j) => (
                      <li key={j} className="list-disc">{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
          <h3 
            className="text-base font-bold uppercase tracking-wide mb-4 pb-2"
            style={{ 
              borderBottom: `2px solid ${colors.primary || "#1e40af"}`,
              color: colors.headerTextColor || "#1f2937",
            }}
          >
            Education
          </h3>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="text-sm font-semibold">{edu.degree}</h4>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                    {edu.gpa && <p className="text-xs text-gray-600">Final CGPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-xs text-gray-500">{edu.from} - {edu.to}</span>
                </div>
                {edu.description && (
                  <p className="text-xs text-gray-700 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Skills */}
      {data.skills.length > 0 && (
        <section>
          <h3 
            className="text-base font-bold uppercase tracking-wide mb-4 pb-2"
            style={{ 
              borderBottom: `2px solid ${colors.primary || "#1e40af"}`,
              color: colors.headerTextColor || "#1f2937",
            }}
          >
            Key Skills
          </h3>
          <div className="grid grid-cols-4 gap-x-8 gap-y-2">
            {data.skills.map((skill, i) => (
              <div key={i} className="text-xs flex items-center">
                <span className="w-1 h-1 rounded-full mr-2" style={{ backgroundColor: colors.primary || "#1e40af" }}></span>
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}