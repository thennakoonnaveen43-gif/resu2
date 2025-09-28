import type { ResumeData, StyleSettings } from "@shared/schema";
import { User, Phone, Mail, MapPin, Globe, GraduationCap, Briefcase, Award, Users, Languages, Heart } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateFive({ data, style }: TemplateProps) {
  const colors = style.colors || {};

  return (
    <div
      className="resume-template flex h-full text-gray-900"
      style={{
        fontSize: `${style.bodyFontSize}px`,
        lineHeight: style.lineHeight,
        padding: 0,
        backgroundColor: colors.background || "#ffffff",
        color: colors.bodyTextColor || "#374151",
      }}
    >
      {/* Sidebar */}
      <aside
        className="p-6 flex flex-col text-white"
        style={{
          width: `${style.sidebarWidth}%`,
          backgroundColor: colors.sidebarBackground || "#4a5568",
          color: colors.sidebarTextColor || "#ffffff",
        }}
      >
        {/* Photo */}
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 mx-auto border-4 border-white shadow-lg" style={{ marginTop: `${style.sidebarSectionSpacing * 0.4}px` }}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contact */}
        <div className="mb-6" style={{ marginBottom: `${style.sidebarSectionSpacing}px`, paddingTop: `${style.sidebarSectionSpacing * 0.6}px` }}>
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 border-b border-white/30 pb-2">
            <Phone className="inline w-4 h-4 mr-2" />
            Contact
          </h3>
          <div className="space-y-3 text-xs">
            {data.contact.phone && (
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-2 opacity-80" />
                <span style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>{data.contact.phone}</span>
              </div>
            )}
            {data.contact.email && (
              <div className="flex items-center">
                <Mail className="w-3 h-3 mr-2 opacity-80" />
                <span className="break-all" style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>{data.contact.email}</span>
              </div>
            )}
            {data.contact.location && (
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-2 opacity-80" />
                <span style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>{data.contact.location}</span>
              </div>
            )}
            {data.contact.website && (
              <div className="flex items-center">
                <Globe className="w-3 h-3 mr-2 opacity-80" />
                <span className="break-all" style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>{data.contact.website.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        {/* {data.education.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 border-b border-white/30 pb-2">
              <GraduationCap className="inline w-4 h-4 mr-2" />
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} className="text-xs">
                  <div className="font-medium">{edu.degree}</div>
                  <div className="opacity-90 text-xs">{edu.institution}</div>
                  <div className="opacity-75 text-xs">{edu.from} - {edu.to}</div>
                  {edu.gpa && (
                    <div className="opacity-75 text-xs">GPA: {edu.gpa}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6" style={{ marginBottom: `${style.sidebarSectionSpacing}px` }}>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 border-b border-white/30 pb-2">
              Expertise
            </h3>
            <div className="space-y-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="text-xs">
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>
                      {skill}</span>
                  </div>
                  {/* <div className="w-full bg-white/20 rounded-full h-1">
                    <div 
                      className=" h-1 rounded-full" 
                      style={{ width: '85%', backgroundColor: colors.primary || "#3b82f6" }}
                    ></div>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-6" style={{ marginBottom: `${style.sidebarSectionSpacing}px` }}>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 border-b border-white/30 pb-2">
              <Languages className="inline w-4 h-4 mr-2" />
              Languages
            </h3>
            <div className="space-y-2">
              {data.languages.map((lang, i) => (
                <div key={i} className="text-xs">
                  <div className="flex justify-between">
                    <span style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>{lang.name}</span>
                    <span className="opacity-75" style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>{lang.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {data.references && style.referencePlacement === "sidebar" && data.references.length > 0 && (
          <div style={{ marginBottom: `${style.sidebarSectionSpacing}px` }}>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
              <Users className="inline w-4 h-4 mr-2" />
              Reference
            </h3>
            {data.references.slice(0, 1).map((ref, i) => (
              <div key={i} className="text-xs">
                <h4 className="font-semibold" style={{ fontSize: `${style.bodyFontSize * 0.98}px` }}>{ref.name}</h4>
                <p style={{ fontSize: `${style.bodyFontSize * 0.87}px` }}>{ref.position}</p>
                {ref.company && <p style={{ fontSize: `${style.bodyFontSize * 0.87}px` }}>{ref.company}</p>}
                {ref.phone && <p style={{ fontSize: `${style.bodyFontSize * 0.87}px`, display: "flex" }}><Phone className="w-3 h-3 mr-2 opacity-80" /> {ref.phone}</p>}
                {ref.email && <p style={{ fontSize: `${style.bodyFontSize * 0.87}px`, display: "flex" }}> <Mail className="w-3 h-3 mr-2 opacity-80" /> {ref.email}</p>}
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
        {/* Header */}
        <header className="mb-8">
          <h1
            className="font-bold uppercase tracking-wide "
            style={{
              fontSize: `${style.headerFontSize * 1.5}px`,
              color: colors.headerTextColor || "#1e293b",
            }}
          >
            {data.name}
          </h1>
          <h2
            className="uppercase font-medium mb-4"
            style={{
              fontSize: `${style.headerFontSize * 0.8}px`,
              color: colors.primary || "#3b82f6",
            }}
          >
            {data.title}
          </h2>
          {data.summary && (
            <p className="text-sm leading-relaxed">{data.summary}</p>
          )}
        </header>

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3
              className="text-base font-bold uppercase tracking-wide mb-4 border-b-2 pb-2"
              style={{ borderColor: colors.primary || "#3b82f6" }}
            >
              <Briefcase className="inline w-4 h-4 mr-2" />
              Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="relative pl-6" style={{ marginBottom: `${style.sectionSpacing * 0.7}px` }}>
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary || "#3b82f6" }}></div>
                  <div className="absolute left-1.5 top-5 w-0.5 " style={{ backgroundColor: colors.primary || "#3b82f6", opacity: 0.3, height: "calc(100% - 1rem)" }}></div>

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-semibold" style={{ fontSize: `${style.bodyFontSize * 1.12}px`, }}>{exp.position}</h4>
                      <p className="text-xs font-medium" style={{ color: colors.primary || "#3b82f6", fontSize: `${style.bodyFontSize * 0.9}px` }}>{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-2" style={{ fontSize: `${style.bodyFontSize * 0.9}px` }}>{exp.description}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="text-xs space-y-1">
                      {exp.highlights.map((highlight, j) => (
                        <li key={j} className="flex items-start" style={{ fontSize: `${style.bodyFontSize * 0.9}px` }}>
                          <span className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0" style={{ backgroundColor: colors.primary || "#06b6d4", }}></span>
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


        {data.education.length > 0 && (
          <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3
              className="text-base font-bold uppercase tracking-wide mb-4 border-b-2 pb-2"
              style={{ borderColor: colors.primary || "#3b82f6" }}
            >
              <GraduationCap className="inline w-4 h-4 mr-2" />

              Education
            </h3>
            <div className="space-y-6">
              {data.education.map((exp, i) => (
                <div key={i} className="relative pl-6" style={{ marginBottom: `${style.sectionSpacing * 0.7}px` }}>
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary || "#3b82f6" }}></div>
                  <div className="absolute left-1.5 top-5 w-0.5 " style={{ backgroundColor: colors.primary || "#3b82f6", opacity: 0.3, height: "calc(100% - 1rem)" }}></div>

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-semibold" style={{ fontSize: `${style.bodyFontSize * 1.12}px`, }}>{exp.degree}</h4>
                      <p className="text-xs font-medium" style={{ color: colors.primary || "#3b82f6", fontSize: `${style.bodyFontSize * 0.9}px` }}>{exp.institution}</p>
                    </div>
                    <span className="text-xs text-gray-500">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-2" style={{ fontSize: `${style.bodyFontSize * 0.9}px` }}>{exp.description}</p>
                  {/* {exp.courses && exp.courses.length > 0 && (
                    <ul className="text-xs space-y-1">
                      {exp.courses.map((subect, j) => (
                        <li key={j} className="flex items-start" style={{fontSize: `${style.bodyFontSize * 0.9}px`}}>
                          <span className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0" style={{ backgroundColor: colors.primary || "#06b6d4", }}></span>
                          {subect.subject} - {subect.mark}
                        </li>
                      ))}
                    </ul>
                  )} */}

                  {exp.courses && exp.courses.length > 0 && (
                    <ul
                      className={`text-xs gap-x-6 gap-y-1`}
                      style={{
                        fontSize: `${style.bodyFontSize * 0.9}px`,
                        display: "grid",
                        gridTemplateColumns: exp.courses.length > 6 ? "1fr 1fr" : "1fr",
                      }}
                    >
                      {exp.courses.map((subject, j) => (
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
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references && style.referencePlacement === "main" && data.references.length > 0 && (
          <section>
            <h3
              className="text-base font-bold uppercase tracking-wide mb-4 border-b-2 pb-2"
              style={{ borderColor: colors.primary || "#3b82f6" }}
            >
              <Users className="inline w-4 h-4 mr-2" />
              References
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((ref, i) => (
                <div key={i} className="text-xs">
                  <h4 className="font-semibold" style={{ fontSize: `${style.bodyFontSize * 0.98}px` }}>{ref.name}</h4>
                  <p className="text-gray-600" style={{ fontSize: `${style.bodyFontSize * 0.87}px` }}>{ref.position}</p>
                  {ref.company && <p className="text-gray-600" style={{ fontSize: `${style.bodyFontSize * 0.87}px` }}>{ref.company}</p>}
                  {ref.phone && <p style={{ fontSize: `${style.bodyFontSize * 0.87}px`, display: "flex" }}><Phone className="w-3 h-3 mr-2 opacity-80" /> {ref.phone}</p>}
                  {ref.email && <p style={{ fontSize: `${style.bodyFontSize * 0.87}px`, display: "flex" }}> <Mail className="w-3 h-3 mr-2 opacity-80" /> {ref.email}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}