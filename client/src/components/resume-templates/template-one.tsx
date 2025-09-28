import type { ResumeData, StyleSettings } from "@shared/schema";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateOne({ data, style }: TemplateProps) {
  return (
    <div className="resume-template-1 h-full flex" style={{
      fontSize: `${style.bodyFontSize}px`,
      lineHeight: style.lineHeight,
      padding: `${style.marginTop}px ${style.marginRight}px ${style.marginBottom}px ${style.marginLeft}px`
    }}>
      {/* Sidebar */}
      <div 
        className="sidebar flex flex-col p-6" 
        style={{ width: `${style.sidebarWidth}%` }}
      >
        {/* Profile Photo */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
              alt="Professional headshot" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Contact */}
        {(data.contact.email || data.contact.phone || data.contact.linkedin || data.contact.location) && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-300">Contact</h3>
            <div className="space-y-2 text-xs">
              {data.contact.phone && (
                <div className="flex items-start">
                  <i className="fas fa-phone mr-2 mt-0.5 text-gray-400"></i>
                  <span data-testid="text-phone">{data.contact.phone}</span>
                </div>
              )}
              {data.contact.email && (
                <div className="flex items-start">
                  <i className="fas fa-envelope mr-2 mt-0.5 text-gray-400"></i>
                  <span data-testid="text-email">{data.contact.email}</span>
                </div>
              )}
              {data.contact.linkedin && (
                <div className="flex items-start">
                  <i className="fas fa-linkedin mr-2 mt-0.5 text-gray-400"></i>
                  <span data-testid="text-linkedin">{data.contact.linkedin.replace('https://', '').replace('http://', '')}</span>
                </div>
              )}
              {data.contact.location && (
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt mr-2 mt-0.5 text-gray-400"></i>
                  <span data-testid="text-location">{data.contact.location}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-300">Languages</h3>
            <div className="space-y-2">
              {data.languages.map((lang, index) => (
                <div key={index} className="text-xs">
                  <div className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-gray-400">({lang.level})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-300">Certifications</h3>
            <div className="space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="text-xs">
                  <div className="font-medium">{cert.title}</div>
                  <div className="text-gray-400">{cert.issuer}</div>
                  <div className="text-gray-500">{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-300">Skills</h3>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                  data-testid={`skill-${index}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-300">References</h3>
            <div className="space-y-3">
              {data.references.slice(0, 2).map((ref, index) => (
                <div key={index} className="text-xs">
                  <div className="font-medium text-white">{ref.name}</div>
                  <div className="text-gray-400">{ref.position}</div>
                  {ref.company && <div className="text-gray-400">{ref.company}</div>}
                  {ref.phone && <div className="text-gray-500">{ref.phone}</div>}
                  {ref.email && <div className="text-gray-500">{ref.email}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6" style={{ width: `${100 - style.sidebarWidth}%` }}>
        {/* Header */}
        <div className="mb-6" style={{ marginBottom: `${style.sectionSpacing}px` }}>
          <h1 
            className="font-bold text-gray-800 mb-1" 
            style={{ fontSize: `${style.headerFontSize}px` }}
            data-testid="text-name"
          >
            {data.name || "Your Name"}
          </h1>
          <h2 
            className="text-gray-600 mb-3" 
            style={{ fontSize: `${style.headerFontSize * 0.75}px` }}
            data-testid="text-title"
          >
            {data.title || "Your Title"}
          </h2>
          {data.summary && (
            <p className="text-gray-700 leading-relaxed" data-testid="text-summary">
              {data.summary}
            </p>
          )}
        </div>

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-800 border-b border-gray-300 pb-1">
              Experience
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} data-testid={`experience-${index}`}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-semibold text-gray-800">{exp.position}</h4>
                    <span className="text-xs text-gray-600">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{exp.company}</p>
                  <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-800 border-b border-gray-300 pb-1">
              Education
            </h3>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index} data-testid={`education-${index}`}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-semibold text-gray-800">{edu.degree}</h4>
                    <span className="text-xs text-gray-600">{edu.from} - {edu.to}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{edu.institute}</p>
                  {edu.description && (
                    <p className="text-xs text-gray-700 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}