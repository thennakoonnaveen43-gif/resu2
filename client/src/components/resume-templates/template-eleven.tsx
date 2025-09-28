import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, MapPin, Globe, Award, Users, Languages } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateEleven({ data, style }: TemplateProps) {
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
        className="p-6"
        style={{ 
          width: `${style.sidebarWidth}%`,
          backgroundColor: colors.sidebarBackground || "#e2e8f0",
          color: colors.sidebarTextColor || "#374151",
        }}
      >
        {/* Photo with rounded rectangle frame */}
        <div className="mb-6 flex justify-center">
          <div className="w-32 h-40 rounded-3xl overflow-hidden border-4 border-gray-800 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h3 className="text-base font-bold mb-4 border-b-2 border-gray-800 pb-2">
            Contact
          </h3>
          <div className="space-y-3 text-sm">
            {data.contact.phone && (
              <div>
                <strong>Phone</strong><br />
                {data.contact.phone}
              </div>
            )}
            {data.contact.email && (
              <div>
                <strong>Email</strong><br />
                {data.contact.email}
              </div>
            )}
            {data.contact.location && (
              <div>
                <strong>Address</strong><br />
                {data.contact.location}
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-bold mb-4 border-b-2 border-gray-800 pb-2">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} className="text-sm">
                  <div className="font-bold">{edu.from}</div>
                  <div className="font-semibold">{edu.degree}</div>
                  <div>{edu.institution}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-bold mb-4 border-b-2 border-gray-800 pb-2">
              Experience
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
          <div>
            <h3 className="text-base font-bold mb-4 border-b-2 border-gray-800 pb-2">
              Language
            </h3>
            <div className="space-y-2">
              {data.languages.map((lang, i) => (
                <div key={i} className="text-sm">
                  <div className="font-semibold">{lang.name}</div>
                  <div className="text-gray-600">{lang.level}</div>
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
          {data.summary && (
            <p className="text-sm leading-relaxed">{data.summary}</p>
          )}
        </header>

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b-2 border-gray-300 pb-2">
              Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex items-start mb-2">
                    <div className="w-3 h-3 rounded-full bg-gray-800 mt-2 mr-4 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="text-sm text-gray-600">{exp.from} - {exp.to}</div>
                          <div className="text-gray-600">{exp.company}</div>
                          <h4 className="font-bold text-gray-800">{exp.position}</h4>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed mt-2">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-gray-300 pb-2">
              Reference
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((ref, i) => (
                <div key={i} className="text-sm">
                  <h4 className="font-bold text-lg">{ref.name}</h4>
                  <p className="text-gray-600">{ref.position}, {ref.company}</p>
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