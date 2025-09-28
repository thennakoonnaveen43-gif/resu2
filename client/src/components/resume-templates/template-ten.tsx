import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, MapPin, Globe, Award, Users, Languages } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateTen({ data, style }: TemplateProps) {
  const colors = style.colors || {};
  
  return (
    <div
      className="resume-template h-full"
      style={{
        fontSize: `${style.bodyFontSize}px`,
        lineHeight: style.lineHeight,
        padding: 0,
        backgroundColor: colors.background || "#ffffff",
      }}
    >
      {/* Dark Header */}
      <header
        className="p-6 text-white flex items-center justify-between"
        style={{ backgroundColor: colors.sidebarBackground || "#2d3748" }}
      >
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mr-6 border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612c38f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1
              className="font-bold mb-2"
              style={{ 
                fontSize: `${style.headerFontSize * 1.5}px`,
                color: colors.sidebarTextColor || "#ffffff",
              }}
            >
              {data.name}
            </h1>
            <h2
              className="font-medium"
              style={{ 
                fontSize: `${style.headerFontSize * 0.8}px`,
                color: colors.sidebarTextColor || "#ffffff",
              }}
            >
              {data.title}
            </h2>
          </div>
        </div>
        <div className="text-right text-sm space-y-1">
          {data.contact.phone && (
            <div className="flex items-center justify-end">
              <Phone className="w-4 h-4 mr-2" />
              <span>{data.contact.phone}</span>
            </div>
          )}
          {data.contact.email && (
            <div className="flex items-center justify-end">
              <Mail className="w-4 h-4 mr-2" />
              <span>{data.contact.email}</span>
            </div>
          )}
          {data.contact.location && (
            <div className="flex items-center justify-end">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{data.contact.location}</span>
            </div>
          )}
        </div>
      </header>

      <div className="flex" style={{ height: 'calc(100% - 120px)' }}>
        {/* Sidebar */}
        <aside
          className="p-6"
          style={{ 
            width: `${style.sidebarWidth}%`,
            backgroundColor: colors.background || "#f7fafc",
            color: colors.bodyTextColor || "#374151",
          }}
        >
          {/* About Me */}
          {data.summary && (
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3" style={{ color: colors.headerTextColor || "#1f2937" }}>
                About Me
              </h3>
              <p className="text-sm leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3" style={{ color: colors.headerTextColor || "#1f2937" }}>
                Skills
              </h3>
              <ul className="text-sm space-y-1">
                {data.skills.map((skill, i) => (
                  <li key={i}>• {skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3 flex items-center" style={{ color: colors.headerTextColor || "#1f2937" }}>
                <Languages className="w-4 h-4 mr-2" />
                Languages
              </h3>
              <div className="space-y-2">
                {data.languages.map((lang, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-gray-600 ml-2">({lang.level})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h3 className="text-base font-bold mb-3 flex items-center" style={{ color: colors.headerTextColor || "#1f2937" }}>
                <Award className="w-4 h-4 mr-2" />
                Certifications
              </h3>
              <div className="space-y-3">
                {data.certifications.map((cert, i) => (
                  <div key={i} className="text-sm">
                    <h4 className="font-medium">{cert.title}</h4>
                    <p className="text-gray-600">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main
          className="flex-1 p-6"
          style={{ color: colors.bodyTextColor || "#374151" }}
        >
          {/* Work Experience */}
          {data.experience.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.headerTextColor || "#1f2937" }}>
                Work Experience
              </h3>
              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-base font-semibold">{exp.position}</h4>
                        <p className="text-sm font-medium" style={{ color: colors.primary || "#3b82f6" }}>
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">{exp.from} - {exp.to}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.headerTextColor || "#1f2937" }}>
                Education
              </h3>
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="text-base font-semibold">{edu.degree}</h4>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                      </div>
                      <span className="text-sm text-gray-500">{edu.from} - {edu.to}</span>
                    </div>
                    {edu.description && (
                      <p className="text-sm text-gray-700">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {data.references && data.references.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center" style={{ color: colors.headerTextColor || "#1f2937" }}>
                <Users className="w-5 h-5 mr-2" />
                References
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {data.references.map((ref, i) => (
                  <div key={i} className="text-sm">
                    <h4 className="font-semibold">{ref.name}</h4>
                    <p className="text-gray-600">{ref.position}</p>
                    {ref.company && <p className="text-gray-600">{ref.company}</p>}
                    {ref.phone && <p className="mt-1">Phone: {ref.phone}</p>}
                    {ref.email && <p>Email: {ref.email}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}