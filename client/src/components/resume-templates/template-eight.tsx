import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, MapPin, User, GraduationCap, Briefcase, Award, Users, Globe } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateEight({ data, style }: TemplateProps) {
  const colors = style.colors || {};
  
  return (
    <div
      className="resume-template flex h-full"
      style={{
        fontSize: `${style.bodyFontSize}px`,
        lineHeight: style.lineHeight,
        padding: 0,
        backgroundColor: colors.background || "#ffffff",
      }}
    >
      {/* Sidebar */}
      <aside
        className="p-6 flex flex-col text-white"
        style={{ 
          width: `${style.sidebarWidth}%`,
          backgroundColor: colors.sidebarBackground || "#374151",
          color: colors.sidebarTextColor || "#ffffff",
        }}
      >
        {/* Photo */}
        <div className="w-28 h-28 rounded-full overflow-hidden mb-6 mx-auto border-4 border-white shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 border-b border-white/30 pb-2">
            Contact
          </h3>
          <div className="space-y-3 text-xs">
            {data.contact.phone && (
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-2" />
                <span>{data.contact.phone}</span>
              </div>
            )}
            {data.contact.email && (
              <div className="flex items-center">
                <Mail className="w-3 h-3 mr-2" />
                <span className="break-all">{data.contact.email}</span>
              </div>
            )}
            {data.contact.location && (
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-2" />
                <span>{data.contact.location}</span>
              </div>
            )}
            {data.contact.website && (
              <div className="flex items-center">
                <Globe className="w-3 h-3 mr-2" />
                <span className="break-all">{data.contact.website.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 border-b border-white/30 pb-2">
              Skills
            </h3>
            <div className="space-y-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="text-xs">
                  <span>• {skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 border-b border-white/30 pb-2">
              Languages
            </h3>
            <div className="space-y-2">
              {data.languages.map((lang, i) => (
                <div key={i} className="text-xs">
                  <div className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="opacity-75">({lang.level})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 p-8"
        style={{ 
          width: `${100 - style.sidebarWidth}%`,
          color: colors.bodyTextColor || "#374151",
        }}
      >
        {/* Header */}
        <header className="mb-8">
          <h1
            className="font-bold uppercase tracking-wide mb-2"
            style={{ 
              fontSize: `${style.headerFontSize * 1.8}px`,
              color: colors.headerTextColor || "#1f2937",
            }}
          >
            {data.name}
          </h1>
          <div className="h-1 w-full mb-4" style={{ backgroundColor: colors.primary || "#3b82f6" }}></div>
          <p className="text-sm leading-relaxed mb-4">{data.summary}</p>
        </header>

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3 className="text-base font-bold uppercase tracking-wide mb-4">
              Work Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="mb-2">
                    <h4 className="text-sm font-semibold">{exp.position}, {exp.company}</h4>
                    <p className="text-xs text-gray-500">{exp.from} - {exp.to}</p>
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
            <h3 className="text-base font-bold uppercase tracking-wide mb-4">
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
        <section>
          <h3 className="text-base font-bold uppercase tracking-wide mb-4">
            Key Skills
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {data.skills.map((skill, i) => (
              <div key={i} className="text-xs flex items-center">
                <span className="w-1 h-1 rounded-full mr-2" style={{ backgroundColor: colors.primary || "#3b82f6" }}></span>
                {skill}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}