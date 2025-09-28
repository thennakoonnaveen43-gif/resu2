import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, MapPin, Globe, Award, Users, Languages } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateThirteen({ data, style }: TemplateProps) {
  const colors = style.colors || {};
  
  return (
    <div
      className="resume-template h-full"
      style={{
        fontSize: `${style.bodyFontSize}px`,
        lineHeight: style.lineHeight,
        padding: 0,
        backgroundColor: colors.background || "#f8fafc",
        overflow: "hidden",
      }}
    >
      {/* Dark Header */}
      <header
        className="p-6 text-white relative"
        style={{ backgroundColor: colors.sidebarBackground || "#2d3748" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mr-6 border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1
                className="font-bold uppercase tracking-wide mb-2"
                style={{ 
                  fontSize: `${style.headerFontSize * 2}px`,
                  color: colors.sidebarTextColor || "#ffffff",
                }}
              >
                {data.name}
              </h1>
              <h2
                className="font-medium"
                style={{ 
                  fontSize: `${style.headerFontSize}px`,
                  color: colors.sidebarTextColor || "#ffffff",
                }}
              >
                {data.title}
              </h2>
            </div>
          </div>
          <div className="text-right text-sm space-y-2">
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
            {data.contact.website && (
              <div className="flex items-center justify-end">
                <Globe className="w-4 h-4 mr-2" />
                <span>{data.contact.website.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {data.contact.location && (
              <div className="flex items-center justify-end">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{data.contact.location}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex" style={{ height: 'calc(100% - 140px)' }}>
        {/* Sidebar */}
        <aside
          className="p-6"
          style={{ 
            width: `${style.sidebarWidth}%`,
            backgroundColor: colors.background || "#f1f5f9",
            color: colors.bodyTextColor || "#374151",
            paddingBottom:"0px"
          }}
        >
          {/* About Me */}
          {data.summary && (
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3 border-b pb-2" style={{ color: colors.headerTextColor || "#1f2937" }}>
                About Me
              </h3>
              <p className="text-sm leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3 border-b pb-2" style={{ color: colors.headerTextColor || "#1f2937" }}>
                Education
              </h3>
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i} className="text-sm">
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-gray-500">{edu.from} - {edu.to}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3 border-b pb-2" style={{ color: colors.headerTextColor || "#1f2937" }}>
                Skills
              </h3>
              <div className="space-y-2">
                {data.skills.map((skill, i) => (
                  <div key={i} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>{skill}</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: '85%',
                          backgroundColor: colors.primary || "#3b82f6"
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h3 className="text-base font-bold mb-3 border-b pb-2" style={{ color: colors.headerTextColor || "#1f2937" }}>
                Language
              </h3>
              <ul className="text-sm space-y-1">
                {data.languages.map((lang, i) => (
                  <li key={i}>• {lang.name}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main
          className="flex-1 p-6"
          style={{ color: colors.bodyTextColor || "#374151" }}
        >
          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b-2 pb-2" style={{ borderColor: colors.primary || "#3b82f6" }}>
                Experience
              </h3>
              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary || "#3b82f6" }}></div>
                    <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gray-300"></div>
                    
                    <div className="mb-2">
                      <h4 className="font-semibold">{exp.position}</h4>
                      <p className="text-sm" style={{ color: colors.primary || "#3b82f6" }}>
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-500">{exp.from} - {exp.to}</p>
                    </div>
                    <ul className="text-sm space-y-1">
                      <li>• {exp.description}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {data.references && data.references.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-4 border-b-2 pb-2" style={{ borderColor: colors.primary || "#3b82f6" }}>
                References
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {data.references.map((ref, i) => (
                  <div key={i} className="text-sm">
                    <h4 className="font-bold">{ref.name}</h4>
                    <p className="text-gray-600">{ref.position}</p>
                    <div className="mt-2 space-y-1">
                      {ref.phone && <p><strong>Phone:</strong> {ref.phone}</p>}
                      {ref.email && <p><strong>Email:</strong> {ref.email}</p>}
                    </div>
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