import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, Globe, MapPin, Users } from "lucide-react";
import { User, Briefcase, GraduationCap, FolderOpen, Heart } from 'lucide-react';


// You can use a different font by importing it in your main CSS file.
// This template is designed to look good with a font like 'Inter' or 'Lato'.

interface TemplateProps {
  data: ResumeData;
  // The style prop is kept for potential future customization,
  // but this template has a more defined style based on the image.
  style: StyleSettings;
}

export default function TemplateFourteen({ data, style }: TemplateProps) {
  // Define static colors to match the image provided
  const colors = {
    sidebarBg: "#f3f4f6", // Light gray
    mainBg: "#ffffff", // White
    textDark: "#1f2937", // Dark gray for main text
    textLight: "#6b7280", // Lighter gray for subtitles
    accent: "#374151",   // Darker gray for headers and skill bars
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: colors.accent }}>
        {title}
      </h3>
      <div className="w-12 h-0.5 mb-3" style={{ backgroundColor: colors.accent }}></div>
      {children}
    </div>
  );

  const SkillBar = ({ skill }: { skill: string }) => (
    <div className="mb-3">
      <p className="text-xs font-medium mb-1" style={{ color: colors.textDark }}>{skill}</p>
      {/* <div className="w-full bg-gray-300 rounded-full h-1.5">
        <div className="h-1.5 rounded-full" style={{ width: '80%', backgroundColor: colors.accent }}></div>
      </div> */}
    </div>
  );

  return (
    <div
      className="resume-template flex h-full font-sans" // Using a generic font-sans stack
      style={{ backgroundColor: colors.mainBg, position: "relative" }}
    >
      {/* Left Sidebar */}
      <div className="w-1/3 text-white relative overflow-hidden z-10" style={{ backgroundColor: style.colors.sidebarBackground }}>
        <div className="absolute top-0 left-0 w-full h-32" style={{ backgroundColor: style.colors.primary }}></div>

        <div className="relative z-10 p-6">
          <div className="mb-2 pt-4">
            <div className="w-40 h-40 rounded-full mx-auto border-4 border-white overflow-hidden bg-gray-200 shadow-sm shadow-gray-700">
              <img
                src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold " style={{ color: style.colors.primary }}>Nina Lane</h1>
            <h2 className="text-base text-white">Graphic Designer</h2>
          </div>

          <div style={{ marginBottom: `${style.sidebarSectionSpacing * 2}px` }}>
            <div className="flex items-center mb-3">
              <div className="w-8 h-8  rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: style.colors.primary, width: style.bodyFontSize * 1.7, height: style.bodyFontSize * 1.7, }}>
                <Phone /*className="w-4 h-4 "*/ style={{ color: style.colors.sidebarTextColor, width: style.bodyFontSize * 0.95, height: style.bodyFontSize * 0.95, }} />
              </div>
              <h3 className="text-xl font-bold " style={{ color: style.colors.primary, fontSize: `${style.bodyFontSize * 1.1}px`, }} >Contact</h3>
            </div>

            <div className="ml-2">
              <div style={{ marginBottom: `${style.sidebarSectionSpacing * 0.5}px` }}>
                <h4 className="font-semibold text-sm " style={{ color: style.colors.primary, fontSize: `${style.bodyFontSize * 1}px` }}>Email</h4>
                <p className="text-sm text-white" style={{ fontSize: `${style.bodyFontSize * 0.924}px`, }}>{data.contact.email}</p>
              </div>
              <div style={{ marginBottom: `${style.sidebarSectionSpacing * 0.5}px` }}>
                <h4 className="font-semibold text-sm " style={{ color: style.colors.primary, fontSize: `${style.bodyFontSize * 1}px` }}>Phone</h4>
                <p className="text-sm text-white" style={{ fontSize: `${style.bodyFontSize * 0.924}px`, }}>{data.contact.phone}</p>
              </div>
              {data.contact.location && (
                <div style={{ marginBottom: `${style.sidebarSectionSpacing * 0.5}px` }}>
                  <h4 className="font-semibold text-sm " style={{ color: style.colors.primary, fontSize: `${style.bodyFontSize * 1}px` }}>Address</h4>
                  <p className="text-sm text-white" style={{ fontSize: `${style.bodyFontSize * 0.924}px`, }}>{data.contact.location}</p>
                </div>
              )}
              {data.contact.website && (
                <div style={{ marginBottom: `${style.sidebarSectionSpacing * 0.5}px` }}>
                  <h4 className="font-semibold text-sm " style={{ color: style.colors.primary, fontSize: `${style.bodyFontSize * 1}px` }}>Website</h4>
                  <p className="text-sm text-white" style={{ fontSize: `${style.bodyFontSize * 0.924}px`, }}>{data.contact.website.replace(/^https?:\/\//, "")}</p>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div style={{ marginBottom: `${style.sidebarSectionSpacing * 2}px` }}>
            <div className="flex items-center mb-3">
              <div className="w-8 h-8  rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: style.colors.primary, width: style.bodyFontSize * 1.7, height: style.bodyFontSize * 1.7, }}>
                <Phone /*className="w-4 h-4 "*/ style={{ color: style.colors.sidebarTextColor, width: style.bodyFontSize * 0.95, height: style.bodyFontSize * 0.95, }} />
              </div>
              <h3 className="text-xl font-bold " style={{ color: style.colors.primary, fontSize: `${style.bodyFontSize * 1.1}px`, }} >Contact</h3>
            </div>

            <div className=" ml-2">
              {[
                { skill: 'Photoshop', level: 90 },
                { skill: 'Illustrator', level: 85 },
                { skill: 'Web Design', level: 75 }
              ].map((item, index) => (
                <div key={index} style={{ marginBottom: `${style.sidebarSectionSpacing * 0.2}px` }}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-white" style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>{item.skill}</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className=" h-2 rounded-full"
                      style={{ width: `${item.level}%`, backgroundColor: style.colors.primary }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interests Section */}
          <div style={{ marginBottom: `${style.sidebarSectionSpacing * 2}px` }}>
            <div className="flex items-center mb-3">
              <div className="w-8 h-8  rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: style.colors.primary, width: style.bodyFontSize * 1.7, height: style.bodyFontSize * 1.7, }}>
                <Phone /*className="w-4 h-4 "*/ style={{ color: style.colors.sidebarTextColor, width: style.bodyFontSize * 0.95, height: style.bodyFontSize * 0.95, }} />
              </div>
              <h3 className="text-xl font-bold " style={{ color: style.colors.primary, fontSize: `${style.bodyFontSize * 1.1}px`, }} >Skills</h3>
            </div>
            <ul className="ml-2 text-sm text-white">
              {data.skills.map((skill, i) => (
                <li style={{ fontSize: `${style.bodyFontSize * 0.92}px`, marginBottom: `${style.sidebarSectionSpacing * 0.2}px` }}>{skill}</li>
              ))}
            </ul>
          </div>

          {data.references && style.referencePlacement === "sidebar" && data.references.length > 0 && (
            <div style={{ marginBottom: `${style.sidebarSectionSpacing}px` }}>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8  rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: style.colors.primary, width: style.bodyFontSize * 1.7, height: style.bodyFontSize * 1.7, }}>
                  <Users /*className="w-4 h-4 "*/ style={{ color: style.colors.sidebarTextColor, width: style.bodyFontSize * 0.95, height: style.bodyFontSize * 0.95, }} />
                </div>
                <h3 className="text-xl font-bold " style={{ color: style.colors.primary, fontSize: `${style.bodyFontSize * 1.1}px`, }} >References</h3>
              </div>
              {data.references.slice(0, 1).map((ref, i) => (
                <div key={i} className="text-xs">
                  <h4 className="font-semibold" style={{ fontSize: `${style.bodyFontSize * 0.98}px` }}>{ref.name}</h4>
                  <p style={{ fontSize: `${style.bodyFontSize * 0.87}px` }}>{ref.position}</p>
                  {ref.company && <p style={{ fontSize: `${style.bodyFontSize * 0.87}px` }}>{ref.company}</p>}
                  {ref.phone && <p style={{ fontSize: `${style.bodyFontSize * 0.87}px`, display: "flex" }}> {ref.phone}</p>}
                  {ref.email && <p style={{ fontSize: `${style.bodyFontSize * 0.87}px`, display: "flex" }}>  {ref.email}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-white p-8 relative">
        {/* Profile Section */}
        <div className="mb-8" style={{ marginBottom: `${10 + style.sectionSpacing * 0.2}px` }}>
          <div className="flex items-center" style={{ marginBottom: `${5 + style.sectionSpacing * 0.4}px` }}>
            <div className="w-8 h-8  rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: style.colors.primary, width: style.bodyFontSize * 1.7, height: style.bodyFontSize * 1.7 }}>
              <Briefcase className="w-4 h-4 " style={{ color: style.colors.sidebarTextColor, width: style.bodyFontSize * 0.95, height: style.bodyFontSize * 0.95, }} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 border-b-2 " style={{ borderColor: style.colors.primary, fontSize: `${style.bodyFontSize * 1.2}px` }}>Profile</h3>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed ml-11" style={{ fontSize: `${style.bodyFontSize * 0.9}px` }}>
            Creative graphic designer with 5+ years' experience in impactful print and digital visuals.
            Skilled in brand identity, social media, and packaging design, with Adobe Creative Suite
            and Figma expertise. Focused on delivering fresh, aesthetic solutions.
          </p>
        </div>

        {/* Experience Section */}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: `${10 + style.sectionSpacing * 0.2}px` }}>
            <div className="flex items-center" style={{ marginBottom: `${5 + style.sectionSpacing * 0.4}px` }}>
              <div className="w-8 h-8  rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: style.colors.primary, width: style.bodyFontSize * 1.7, height: style.bodyFontSize * 1.7 }}>
                <Briefcase className="w-4 h-4 " style={{ color: style.colors.sidebarTextColor, width: style.bodyFontSize * 0.95, height: style.bodyFontSize * 0.95, }} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 border-b-2 " style={{ borderColor: style.colors.primary, fontSize: `${style.bodyFontSize * 1.2}px` }}>Profile</h3>
            </div>



            <div className="space-y-6 ml-11">
              {data.experience.map((exp, i) => (
                <div className="relative" style={{ marginBottom: `${style.sectionSpacing * 0.7}px` }}>
                  <div className="absolute -left-8 top-2 w-4 h-4  rounded-full" style={{ backgroundColor: style.colors.primary }}></div>
                  <div className="absolute -left-6 top-6 w-0.5 h-16 " style={{ backgroundColor: style.colors.primary }}></div>

                  <h4 className="font-bold text-gray-800" style={{ fontSize: `${style.bodyFontSize * 1.3}px` }}>{exp.position}</h4>
                  <p className="text-sm text-gray-600" style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>{exp.company}</p>
                  <p className="text-sm text-gray-600" style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>{exp.from} - {exp.to}</p>
                  <p className="text-sm text-gray-700" style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>
                    {exp.description}
                  </p>
                </div>
              ))}

            </div>
          </div>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <div style={{ marginBottom: `${20 + style.sectionSpacing * 0.2}px` }}>
            <div className="flex items-center" style={{ marginBottom: `${5 + style.sectionSpacing * 0.4}px` }}>
              <div className="w-8 h-8  rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: style.colors.primary, width: style.bodyFontSize * 1.7, height: style.bodyFontSize * 1.7 }}>
                <Briefcase className="w-4 h-4 " style={{ color: style.colors.sidebarTextColor, width: style.bodyFontSize * 0.95, height: style.bodyFontSize * 0.95, }} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 border-b-2 " style={{ borderColor: style.colors.primary, fontSize: `${style.bodyFontSize * 1.2}px` }}>Profile</h3>
            </div>
            <div className="space-y-6 ml-11">
              {data.education.map((exp, i) => (
                <div className="relative" style={{ marginBottom: `${style.sectionSpacing * 0.7}px` }}>
                  <div className="absolute -left-8 top-2 w-4 h-4  rounded-full" style={{ backgroundColor: style.colors.primary }}></div>
                  <div className="absolute -left-6 top-6 w-0.5 h-16 " style={{ backgroundColor: style.colors.primary }}></div>

                  <h4 className="font-bold text-gray-800 " style={{ fontSize: `${style.bodyFontSize * 1.3}px` }}>{exp.degree}</h4>
                  <p className="text-sm text-gray-600 " style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>{exp.institution}</p>
                  <p className="text-sm text-gray-600 " style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>{exp.from} - {exp.to}</p>
                  <p className="text-sm text-gray-700" style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>
                    {exp.description}
                  </p>
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
                            style={{ backgroundColor: colors.accent || "#06b6d4" }}
                          ></span>
                          {subject.subject} - {subject.mark}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.references && style.referencePlacement === "main" && (
          <div style={{ marginBottom: `${20 + style.sectionSpacing * 0.2}px` }}>
            <div className="flex items-center" style={{ marginBottom: `${5 + style.sectionSpacing * 0.4}px` }}>
              <div className="w-8 h-8  rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: style.colors.primary, width: style.bodyFontSize * 2, height: style.bodyFontSize * 2 }}>
                <Briefcase className="w-4 h-4 " style={{ color: style.colors.sidebarTextColor, width: style.bodyFontSize * 1.25, height: style.bodyFontSize * 1.25, }} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 border-b-2 " style={{ borderColor: style.colors.primary, fontSize: `${style.bodyFontSize * 1.2}px` }}>References</h3>
            </div>
            <div className="grid grid-cols-2 gap-6 ml-11">
              {data.references.map((ref, i) => (
                <div key={i} className="text-xs">
                  <h4 className="font-semibold" style={{ fontSize: `${style.bodyFontSize * 0.92}px` }}>{ref.name}</h4>
                  <p className="text-gray-600" style={{ fontSize: `${style.bodyFontSize * 1.1}px` }}>{ref.position}</p>
                  {ref.company && <p className="text-gray-600" style={{ fontSize: `${style.bodyFontSize * 1.1}px` }}>{ref.company}</p>}
                  {ref.phone && <p className="text-gray-600" style={{ fontSize: `${style.bodyFontSize * 1.1}px`, display: "flex" }}>{ref.phone}</p>}
                  {ref.email && <p className="text-gray-600" style={{ fontSize: `${style.bodyFontSize * 1.1}px`, display: "flex" }}>{ref.email}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      {/* <div style={{ position: "absolute", bottom: "0px", height: "18px", width: "100%", zIndex: "0",  backgroundColor: style.colors.primary  }}></div> */}

    </div>
  );
}