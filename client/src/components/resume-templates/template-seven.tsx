import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, MapPin, User, GraduationCap, Briefcase, Cog, Users, Languages } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateSeven({ data, style }: TemplateProps) {
  const colors = style.colors || {};

  return (
    <div
      className="resume-template flex h-full"
      style={{
        fontSize: `${style.bodyFontSize}px`,
        lineHeight: style.lineHeight,
        padding: 0,
        backgroundColor: colors.background || "#f8fafc",
      }}
    >
      {/* Sidebar */}
      <aside
        className="p-6 flex flex-col"
        style={{
          width: `${style.sidebarWidth}%`,
          backgroundColor: colors.sidebarBackground || "#f1f5f9",
          color: colors.sidebarTextColor || "#475569",
        }}
      >
        {/* Photo */}
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 mx-auto border-4 border-white shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Title */}
        <div className="text-center mb-6">
          <h1
            className="font-bold mb-2"
            style={{
              fontSize: `${style.headerFontSize}px`,
              color: colors.sidebarTextColor || "#64748b",
            }}
          >
            {data.name}
          </h1>
          <h2
            className="font-medium"
            style={{
              fontSize: `${style.headerFontSize * 0.8}px`,
              color: colors.sidebarTextColor || "#64748b",
            }}
          >
            {data.title}
          </h2>
        </div>

        {/* Contact */}
        <div className="mb-6" style={{ marginBottom: `${style.sidebarSectionSpacing}px` }}>
          <h3 className="text-sm font-semibold mb-4 flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            Contact
          </h3>
          <div className="space-y-3 text-xs" style={{fontSize: `${style.bodyFontSize * 0.87}px`}}>
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
          </div>
        </div>

        {/* About Me */}
        {data.summary && style.aboutMePlacement === "sidebar" && (
          <div className="mb-6" style={{ marginBottom: `${style.sidebarSectionSpacing}px` }}>
            <h3 className="text-sm font-semibold mb-4 flex items-center">
              <User className="w-4 h-4 mr-2" />
              About Me
            </h3>
            <p className="text-xs leading-relaxed" style={{fontSize: `${style.bodyFontSize * 0.87}px`}}>{data.summary}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6" style={{ marginBottom: `${style.sidebarSectionSpacing}px` }}>
            <h3 className="text-sm font-semibold mb-4 flex items-center">
              <Cog className="w-4 h-4 mr-2" />
              Skills
            </h3>
            <div className="space-y-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="text-xs" style={{fontSize: `${style.bodyFontSize * 0.87}px`}}>
                  <span className="block">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-6" style={{ marginBottom: `${style.sidebarSectionSpacing}px` }}>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
              <Languages className="inline w-4 h-4 mr-2" />
              Languages
            </h3>
            <div className="space-y-2">
              {data.languages.map((lang, i) => (
                <div key={i} className="text-xs" style={{fontSize: `${style.bodyFontSize * 0.87}px`}}>
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
        {data.references && style.referencePlacement === "sidebar" &&  data.references.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
              <Users className="inline w-4 h-4 mr-2" />
              Reference
            </h3>
            {data.references.slice(0, 1).map((ref, i) => (
              <div key={i} className="text-xs">
                  <h4 className="font-semibold pb-1" style={{fontSize: `${style.bodyFontSize * 0.98}px`}}>{ref.name}</h4>
                  <p className="pb-1"  style={{fontSize: `${style.bodyFontSize * 0.87}px`}}>{ref.position}</p>
                  {ref.company && <p className="pb-1" style={{fontSize: `${style.bodyFontSize * 0.87}px`}}>{ref.company}</p>}
                  {ref.phone && <p className="pb-1" style={{fontSize: `${style.bodyFontSize * 0.87}px`, display:"flex"}}><Phone className="w-3 h-3 mr-2 opacity-80" /> {ref.phone}</p>}
                  {ref.email && <p className="pb-1" style={{fontSize: `${style.bodyFontSize * 0.87}px`,display:"flex"}}> <Mail className="w-3 h-3 mr-2 opacity-80" /> {ref.email}</p>}
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

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3 className="text-base font-bold mb-4 flex items-center border-b pb-2" style={{ borderColor: colors.primary || "#3b82f6" }}>
              <User className="w-5 h-5 mr-2"  />
              About Me
            </h3>
            <div className="space-y-6">
              <p className="text-xs leading-relaxed mb-2">{data.summary}</p>
            </div>
          </section>
        )}


        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3 className="text-base font-bold mb-4 flex items-center border-b pb-2" style={{ borderColor: colors.primary || "#3b82f6" }}>
              <Briefcase className="w-5 h-5 mr-2" /*style={{ color: colors.primary || "#3b82f6" }}*/ />
              Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="flex items-start" style={{ marginBottom: `${style.sectionSpacing * 0.7}px` }}>
                  <div className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: colors.headerTextColor || "#3b82f6" }}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-semibold" style={{fontSize: `${style.bodyFontSize * 1.12}px`,}}>{exp.position}</h4>
                        <p className="text-xs font-medium" style={{ color: colors.headerTextColor || "#3b82f6", fontSize: `${style.bodyFontSize * 0.9}px`  }}>{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500">{exp.from} - {exp.to}</span>
                    </div>
                    <p className="text-xs leading-relaxed mb-2" style={{fontSize: `${style.bodyFontSize * 0.9}px`}}>{exp.description}</p>
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
                </div>
              ))}
            </div>
          </section>
        )}


        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3 className="text-base font-bold mb-4 flex items-center border-b pb-2" style={{ borderColor: colors.primary || "#3b82f6" }}>
              <GraduationCap className="w-5 h-5 mr-2" /*style={{ color: colors.primary || "#3b82f6" }}*/ />
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} className="flex items-start" style={{ marginBottom: `${style.sectionSpacing * 0.7}px` }}>
                  <div className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: colors.headerTextColor || "#3b82f6" }}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="text-sm font-semibold" style={{fontSize: `${style.bodyFontSize * 1.12}px`,}}>{edu.degree}</h4>
                        <p className="text-xs " style={{fontSize: `${style.bodyFontSize * 0.9}px` , color: colors.headerTextColor || "#3b82f6"}}>{edu.institution}</p>
                      </div>
                      <span className="text-xs text-gray-500">{edu.from} - {edu.to}</span>
                    </div>
                    {edu.description && (
                      <p className="text-xs text-gray-700 leading-relaxed mt-1" style={{fontSize: `${style.bodyFontSize * 0.9}px`}}>{edu.description}</p>
                    )}
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



        {/* References */}
        {data.references && style.referencePlacement === "main" && data.references.length > 0 && (
          <section>
            <h3 className="text-base font-bold mb-4 flex items-center border-b pb-2" style={{ borderColor: colors.primary || "#3b82f6" }}>
              <Users className="w-5 h-5 mr-2" /*style={{ color: colors.primary || "#3b82f6" }}*/ />
              References
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((ref, i) => (
                <div key={i} className="text-xs">
                  <h4 className="font-semibold">{ref.name}</h4>
                  <p className="text-gray-600">{ref.position}</p>
                  {ref.company && <p className="text-gray-600">{ref.company}</p>}
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