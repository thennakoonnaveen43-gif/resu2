import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, Globe, MapPin } from "lucide-react";

// You can use a different font by importing it in your main CSS file.
// This template is designed to look good with a font like 'Inter' or 'Lato'.

interface TemplateProps {
    data: ResumeData;
    // The style prop is kept for potential future customization,
    // but this template has a more defined style based on the image.
    style: StyleSettings;
}

export default function TemplateFifteen({ data, style }: TemplateProps) {
    // Define static colors to match the image provided
    const colors = {
        sidebarBg: "#f3f4f6", // Light gray
        mainBg: "#ffffff", // White
        textDark: "#1f2937", // Dark gray for main text
        textLight: "#6b7280", // Lighter gray for subtitles
        accent: "#374151",   // Darker gray for headers and skill bars
    };

    const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div style={{ marginBottom: `${style.sidebarSectionSpacing}px` }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: colors.accent, fontSize: `${style.bodyFontSize * 1.5}px` }}>
                {title}
            </h3>
            <div className="w-12 h-0.5 mb-3" style={{ backgroundColor: style.colors.primary }}></div>
            {children}
        </div>
    );


    return (
        <div
            className="resume-template flex h-full font-sans" // Using a generic font-sans stack
            style={{ backgroundColor: colors.mainBg, position: "relative" }}
        >

            {/* Sidebar (Left Column) */}
            <aside
                className="p-8"
                style={{
                    width: style.sidebarWidth + '%',
                    backgroundColor: colors.sidebarBg,
                    color: colors.textDark,
                }}
            >
                {/* Profile Picture */}

                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 mx-auto shadow-md" style={{ marginBottom: `${20 + style.sidebarSectionSpacing}px` }}>
                    <img
                        src={'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>


                {/* About Me */}
                {data.summary && (
                    <div style={{ marginBottom: `${style.sidebarSectionSpacing}px` }}>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: colors.accent }}>
                            About Me
                        </h3>
                        <div className="w-12 h-0.5 mb-3" style={{ backgroundColor: style.colors.primary }}></div>
                        <p className="text-xs leading-relaxed" style={{ fontSize: `${style.bodyFontSize * 1.1}px` }}>
                            {data.summary}
                        </p>
                    </div>
                )}

                {/* Education */}
                {/* {data.education.length > 0 && (
          <Section title="Education">
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} className="text-xs">
                  <p className="font-bold" style={{ fontSize: `${style.bodyFontSize *1.1}px` }}>{edu.degree}</p>
                  <p className="font-medium" style={{ fontSize: `${style.bodyFontSize * 1.1}px` }}>{edu.institution}</p>
                  <p className="text-gray-600 italic" style={{ fontSize: `${style.bodyFontSize * 1.1}px` }}>{edu.from} - {edu.to}</p>
                </div>
              ))}
            </div>
          </Section>
        )} */}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <Section title="Skills" >
                        {data.skills.map((skill, i) => (
                            <div style={{ marginBottom: `${style.sidebarSectionSpacing * 0.7}px` }}>
                                <p className="text-xs font-medium mb-1" style={{ color: colors.textDark, fontSize: `${style.bodyFontSize * 1.1}px` }}>{skill}</p>
                                {/* <div className="w-full bg-gray-300 rounded-full h-1.5">
                                    <div className="h-1.5 rounded-full" style={{ width: '80%', backgroundColor: colors.accent }}></div>
                                </div> */}
                            </div>
                        ))}
                    </Section>
                )}

                {/* Languages */}
                {data.languages && data.languages.length > 0 && (
                    <Section title="Language">
                        <ul className="list-disc list-inside text-xs space-y-1">
                            {data.languages.map((lang, i) => (
                                <li key={i} style={{ fontSize: `${style.bodyFontSize * 1.1}px`, marginBottom: `${style.sidebarSectionSpacing * 0.7}px` }}>{lang.name}</li>
                            ))}
                        </ul>
                    </Section>
                )}


                {/* Languages */}
                {data.references && style.referencePlacement === "sidebar" && (
                    <Section title="References">
                        <ul className="list-disc list-inside text-xs space-y-1">
                            {data.references.slice(0, 1).map((ref, i) => (
                                <div key={i} className="text-xs">
                                    <h4 className="font-semibold" style={{ fontSize: `${style.bodyFontSize * 0.98}px` }}>{ref.name}</h4>
                                    <p style={{ fontSize: `${style.bodyFontSize * 1}px` }}>{ref.position}</p>
                                    {ref.company && <p style={{ fontSize: `${style.bodyFontSize * 1}px` }}>{ref.company}</p>}
                                    {ref.phone && <p style={{ fontSize: `${style.bodyFontSize * 1}px`, display: "flex" }}><Phone className="w-3 h-3 mr-2 opacity-80" /> {ref.phone}</p>}
                                    {ref.email && <p style={{ fontSize: `${style.bodyFontSize * 1}px`, display: "flex" }}> <Mail className="w-3 h-3 mr-2 opacity-80" /> {ref.email}</p>}
                                </div>
                            ))}
                        </ul>
                    </Section>
                )}


            </aside>

            {/* Main Content (Right Column) */}
            <main
                className="flex-1 p-8"
                style={{
                    width: '65%',
                    color: colors.textDark,
                }}
            >
                {/* Header */}
                <header className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-wide" style={{ color: colors.accent }}>{data.name}</h1>
                        <h2 className="text-xl font-semibold tracking-wider" style={{ color: colors.textLight }}>{data.title}</h2>
                    </div>
                    <div className="text-xs text-right space-y-2">
                        {data.contact.phone && (
                            <div className="flex items-center justify-end" style={{ fontSize: `${style.bodyFontSize}px` }}>
                                <span>{data.contact.phone}</span>
                                <Phone className="w-3.5 h-3.5 ml-2" style={{ color: colors.accent }} />
                            </div>
                        )}
                        {data.contact.website && (
                            <div className="flex items-center justify-end" style={{ fontSize: `${style.bodyFontSize}px` }}>
                                <span>{data.contact.website}</span>
                                <Globe className="w-3.5 h-3.5 ml-2" style={{ color: colors.accent }} />
                            </div>
                        )}
                        {data.contact.email && (
                            <div className="flex items-center justify-end" style={{ fontSize: `${style.bodyFontSize}px` }}>
                                <span>{data.contact.email}</span>
                                <Mail className="w-3.5 h-3.5 ml-2" style={{ color: colors.accent }} />
                            </div>
                        )}
                        {data.contact.location && (
                            <div className="flex items-center justify-end" style={{ fontSize: `${style.bodyFontSize}px` }}>
                                <span>{data.contact.location}</span>
                                <MapPin className="w-3.5 h-3.5 ml-2" style={{ color: colors.accent }} />
                            </div>
                        )}
                    </div>
                </header>

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section style={{ marginBottom: `${20 + style.sectionSpacing}px` }}>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: style.colors.headerTextColor }}>
                            Experience
                        </h3>
                        <div className="w-full h-0.5 " style={{ backgroundColor: style.colors.primary, marginBottom: `${style.sectionSpacing}px` }}></div>
                        <div className="relative">
                            {/* Vertical Timeline Bar */}
                            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-200 opacity-40" style={{ backgroundColor: style.colors.primary }}></div>

                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative pl-10" style={{ marginBottom: `${style.sectionSpacing * 0.7}px` }}>
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 top-1.5">
                                        <div className="w-5 h-5 rounded-full bg-white border-2" style={{ borderColor: style.colors.primary }}></div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <h4 className="text-base font-bold" style={{ fontSize: `${style.bodyFontSize * 1.4}px` }}>{exp.position}</h4>
                                        <p className="text-xs font-medium text-gray-500" style={{ fontSize: `${style.bodyFontSize * 1.1}px` }}>{exp.from} - {exp.to}</p>
                                    </div>
                                    <p className="text-sm font-semibold mb-2" style={{ color: colors.textLight, fontSize: `${style.bodyFontSize * 1.1}px` }}>{exp.company} </p>
                                    <p className="text-xs leading-relaxed" style={{ fontSize: `${style.bodyFontSize * 1.1}px` }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section style={{ marginBottom: `${20 + style.sectionSpacing}px` }}>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: style.colors.headerTextColor }}>
                            Education
                        </h3>
                        <div className="w-full h-0.5" style={{ backgroundColor: style.colors.primary, marginBottom: `${style.sectionSpacing}px` }}></div>
                        <div className="relative">
                            {/* Vertical Timeline Bar */}
                            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-200 opacity-40" style={{ backgroundColor: style.colors.primary }}></div>

                            {data.education.map((edu, i) => (
                                <div key={i} className="relative pl-10" style={{ marginBottom: `${style.sectionSpacing * 0.7}px` }}>
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 top-1.5">
                                        <div className="w-5 h-5 rounded-full bg-white border-2" style={{ borderColor: style.colors.primary }}></div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <h4 className="text-base font-bold" style={{ fontSize: `${style.bodyFontSize * 1.4}px` }}>{edu.degree}</h4>
                                        <p className="text-xs font-medium text-gray-500" style={{ fontSize: `${style.bodyFontSize * 1.1}px` }}>{edu.from} - {edu.to}</p>
                                    </div>
                                    <p className="text-sm font-semibold mb-2" style={{ color: colors.textLight, fontSize: `${style.bodyFontSize * 1.1}px` }}>{edu.institution} </p>
                                    <p className="text-xs leading-relaxed">
                                        {edu.description}
                                    </p>
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
                                                        style={{ backgroundColor: style.colors.primary || "#06b6d4" }}
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
                {data.references &&  style.referencePlacement === "main" && data.references.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: colors.accent }}>
                            References
                        </h3>
                        <div className="w-full h-0.5 mb-6" style={{ backgroundColor: style.colors.primary }}></div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {data.references.map((ref, i) => (
                                <div key={i} className="text-xs">
                                    <h4 className="font-bold text-sm mb-1">{ref.name}</h4>
                                    <p className="font-medium text-gray-600">{ref.position} | {ref.company}</p>
                                    {ref.phone && <p><strong>Phone:</strong> {ref.phone}</p>}
                                    {ref.email && <p><strong>Email:</strong> {ref.email}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}