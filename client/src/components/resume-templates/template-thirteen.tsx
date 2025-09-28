import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, MapPin, Globe, Award, Users, Languages, User, Briefcase, GraduationCap } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateThirteen({ data, style }: TemplateProps) {
  const colors = style.colors || {};
  
  return (
    <div
      className="resume-template flex h-full"
      style={{
        fontSize: `${style.bodyFontSize}px`,
        lineHeight: style.lineHeight,
        padding: `${style.marginTop}px ${style.marginRight}px ${style.marginBottom}px ${style.marginLeft}px`,
        backgroundColor: colors.background || "#ffffff",
      }}
    >
      {/* Sidebar */}
      <aside
        className="p-6 text-white"
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
          <h3 className="text-base font-bold mb-4 border-b border-white/30 pb-2">
            Contact
          </h3>
          <div className="space-y-3 text-sm">
            {data.contact.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3" />
                <span>{data.contact.phone}</span>
              </div>
            )}
            {data.contact.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3" />
                <span className="break-all">{data.contact.email}</span>
              </div>
            )}
            {data.contact.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3" />
                <span>{data.contact.location}</span>
              </div>
            )}
            {data.contact.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-3" />
                <span className="break-all">{data.contact.website.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-bold mb-4 border-b border-white/30 pb-2">
              Skills
            </h3>
            <ul className="text-sm space-y-2">
              {data.skills.map((skill, i) => (
                <li key={i}>• {skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-bold mb-4 border-b border-white/30 pb-2">
              Languages
            </h3>
            <div className="space-y-2">
              {data.languages.map((lang, i) => (
                <div key={i} className="text-sm">
                  <span>{lang.name} ({lang.level})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div>
            <h3 className="text-base font-bold mb-4 border-b border-white/30 pb-2">
              Certifications
            </h3>
            <div className="space-y-3">
              {data.certifications.map((cert, i) => (
                <div key={i} className="text-sm">
                  <h4 className="font-medium">{cert.title}</h4>
                  <p className="opacity-90">{cert.issuer}</p>
                  <p className="opacity-75">{cert.date}</p>
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
        {/* Header */}
        <header className="mb-8">
          <h1
            className="font-bold uppercase tracking-wide mb-2"
            style={{ 
              fontSize: `${style.headerFontSize * 2}px`,
              color: colors.headerTextColor || "#1f2937",
            }}
          >
            {data.name}
          </h1>
          <h2
            className="uppercase font-medium mb-4"
            style={{ 
              fontSize: `${style.headerFontSize}px`,
              color: colors.primary || "#3b82f6",
            }}
          >
            {data.title}
          </h2>
        </header>

        {/* Profile */}
        {data.summary && (
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" style={{ color: colors.primary || "#3b82f6" }} />
              Profile
            </h3>
            <div className="relative pl-6">
              <div className="absolute left-0 top-2 w-0.5 h-full bg-gray-300"></div>
              <p className="text-sm leading-relaxed">{data.summary}</p>
            </div>
          </section>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" style={{ color: colors.primary || "#3b82f6" }} />
              Work Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary || "#3b82f6" }}></div>
                  <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gray-300"></div>
                  
                  <div className="mb-2">
                    <h4 className="font-semibold">{exp.company}</h4>
                    <p className="text-sm font-medium">{exp.position}</p>
                    <p className="text-sm text-gray-500">{exp.from} - {exp.to}</p>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• {exp.description}</li>
                    {exp.highlights && exp.highlights.map((highlight, j) => (
                      <li key={j}>• {highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" style={{ color: colors.primary || "#3b82f6" }} />
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary || "#3b82f6" }}></div>
                  <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gray-300"></div>
                  
                  <div>
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">GPA: {edu.gpa || "N/A"}</p>
                    <p className="text-sm text-gray-500">{edu.from} - {edu.to}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" style={{ color: colors.primary || "#3b82f6" }} />
              Reference
            </h3>
            <div className="space-y-4">
              {data.references.slice(0, 1).map((ref, i) => (
                <div key={i} className="text-sm">
                  <h4 className="font-bold">{ref.name}</h4>
                  <p className="text-gray-600">{ref.company} / {ref.position}</p>
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
  );
}