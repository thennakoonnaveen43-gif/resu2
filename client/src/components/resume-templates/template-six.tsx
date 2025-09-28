import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, MapPin, Globe, GraduationCap, Briefcase, Award, Users, Languages } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateSix({ data, style }: TemplateProps) {
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
        className="p-6 flex flex-col"
        style={{
          width: `${style.sidebarWidth}%`,
          backgroundColor: colors.sidebarBackground || "#e5e7eb",
          color: colors.sidebarTextColor || "#374151",
        }}
      >
        {/* Photo */}
        <div className="w-28 h-28 rounded-2xl overflow-hidden mb-6 mx-auto shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
            {/* <Phone className="inline w-4 h-4 mr-2" /> */}
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
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">Skills</h3>
            <div className="space-y-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="text-xs">
                  <span className="block mb-1">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
              {/* <Languages className="inline w-4 h-4 mr-2" /> */}
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

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
              <Users className="inline w-4 h-4 mr-2" />
              Reference
            </h3>
            {data.references.slice(0, 1).map((ref, i) => (
              <div key={i} className="text-xs">
                  <h4 className="font-semibold" style={{fontSize: `${style.bodyFontSize * 0.98}px`}}>{ref.name}</h4>
                  <p  style={{fontSize: `${style.bodyFontSize * 0.87}px`}}>{ref.position}</p>
                  {ref.company && <p  style={{fontSize: `${style.bodyFontSize * 0.87}px`}}>{ref.company}</p>}
                  {ref.phone && <p style={{fontSize: `${style.bodyFontSize * 0.87}px`, display:"flex"}}><Phone className="w-3 h-3 mr-2 opacity-80" /> {ref.phone}</p>}
                  {ref.email && <p style={{fontSize: `${style.bodyFontSize * 0.87}px`,display:"flex"}}> <Mail className="w-3 h-3 mr-2 opacity-80" /> {ref.email}</p>}
                </div>
            ))}
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
        {/* Header with Blue Background */}
        <header
          className="mb-8 p-6 -mx-8 -mt-8 text-white"
          style={{ backgroundColor: colors.primary || "#1e40af" }}
        >
          <h1
            className="font-bold uppercase tracking-wide mb-2"
            style={{ fontSize: `${style.headerFontSize * 1.3}px` }}
          >
            {data.name}
          </h1>
          <h2
            className="uppercase font-medium"
            style={{ fontSize: `${style.headerFontSize * 0.7}px` }}
          >
            {data.title}
          </h2>
        </header>

        {/* Profile */}
        {data.summary && (
          <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3 className="text-base font-bold uppercase tracking-wide mb-4 border-b-2 border-gray-300 pb-2">
              Profile
            </h3>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3 className="text-base font-bold uppercase tracking-wide mb-4 border-b-2 border-gray-300 pb-2">
              <Briefcase className="inline w-4 h-4 mr-2" />
              Work Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: `${style.sectionSpacing * 0.4}px` }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-semibold">{exp.company}</h4>
                      <p className="text-xs font-medium" style={{ color: colors.bodyTextColor || "#1e40af" }}>{exp.position}</p>
                    </div>
                    <span className="text-xs text-gray-500">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-2">{exp.description}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="text-xs space-y-1">
                      {exp.highlights.map((highlight, j) => (
                        <li key={j} className="flex items-start">
                          <span className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0" style={{ backgroundColor: colors.primary || "#06b6d4" }}></span>
                          {highlight}
                        </li>
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
          <section>
            <h3 className="text-base font-bold uppercase tracking-wide mb-4 border-b-2 border-gray-300 pb-2">
              <GraduationCap className="inline w-4 h-4 mr-2" />
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: `${style.sectionSpacing * 0.4}px` }}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="text-sm font-semibold">{edu.degree}</h4>
                      <p className="text-xs text-gray-600">{edu.institution}</p>
                      {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-xs text-gray-500">{edu.from} - {edu.to}</span>
                  </div>
                  {edu.description && (
                    <p className="text-xs text-gray-700 leading-relaxed">{edu.description}</p>
                  )}
                  <div className="ml-4">
                    {edu.courses && edu.courses.length > 0 && (
                      <ul
                        className={`text-xs gap-x-6 gap-y-1`}
                        style={{
                          fontSize: `${style.bodyFontSize * 0.9}px`,
                          display: "grid",
                          gridTemplateColumns: edu.courses.length > 6 ? "1fr 1fr" : "1fr",
                        }}
                      >
                        {edu.courses.map((subject, j) => (
                          <li
                            key={j}
                            className="flex items-start"
                          >
                            <span
                              className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0"
                              style={{ backgroundColor: colors.primary || "#06b6d4" }}
                            ></span>
                            {subject.subject} - {subject.mark}
                          </li>
                        ))}
                      </ul>
                    )}
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