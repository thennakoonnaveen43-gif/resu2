import type { ResumeData, StyleSettings } from "@shared/schema";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateThree({ data, style }: TemplateProps) {
  return (
    <div className="resume-template-3 h-full flex" style={{
      fontSize: `${style.bodyFontSize}px`,
      lineHeight: style.lineHeight,
      padding: `${style.marginTop}px ${style.marginRight}px ${style.marginBottom}px ${style.marginLeft}px`
    }}>
      {/* Sidebar */}
      <div 
        className="sidebar flex flex-col p-6" 
        style={{ width: `${style.sidebarWidth}%` }}
      >
        <div className="mb-6 flex justify-center">
          <div className="w-28 h-28 rounded-full bg-gray-300 border-4 border-white overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
              alt="Executive headshot" 
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
                <div><i className="fas fa-phone mr-2 text-gray-400"></i><span data-testid="text-phone">{data.contact.phone}</span></div>
              )}
              {data.contact.email && (
                <div><i className="fas fa-envelope mr-2 text-gray-400"></i><span data-testid="text-email">{data.contact.email}</span></div>
              )}
              {data.contact.linkedin && (
                <div><i className="fas fa-linkedin mr-2 text-gray-400"></i><span data-testid="text-linkedin">{data.contact.linkedin.replace('https://', '').replace('http://', '')}</span></div>
              )}
              {data.contact.location && (
                <div><i className="fas fa-map-marker-alt mr-2 text-gray-400"></i><span data-testid="text-location">{data.contact.location}</span></div>
              )}
            </div>
          </div>
        )}

        {/* Expertise with skill bars */}
        {data.skills.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-300">Expertise</h3>
            <div className="space-y-2">
              {data.skills.slice(0, 5).map((skill, index) => (
                <div key={index} className="text-xs" data-testid={`skill-${index}`}>
                  <div className="flex justify-between mb-1">
                    <span>{skill}</span>
                    <span className="text-gray-400">Expert</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1">
                    <div className="bg-white h-1 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6" style={{ width: `${100 - style.sidebarWidth}%` }}>
        <div className="mb-6" style={{ marginBottom: `${style.sectionSpacing}px` }}>
          <h1 
            className="font-bold text-gray-800 mb-2" 
            style={{ fontSize: `${style.headerFontSize * 1.33}px` }}
            data-testid="text-name"
          >
            {data.name || "Your Name"}
          </h1>
          <h2 
            className="text-gray-600 mb-4" 
            style={{ fontSize: `${style.headerFontSize}px` }}
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
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
              Experience
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} className="flex items-start" data-testid={`experience-${index}`}>
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-4 mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-semibold text-gray-800">{exp.position}</h4>
                      <span className="text-xs text-gray-600">{exp.from} - {exp.to}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{exp.company}</p>
                    <p className="text-xs text-gray-700">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
              Education
            </h3>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index} className="flex items-start" data-testid={`education-${index}`}>
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-4 mt-2"></div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{edu.degree}</h4>
                    <p className="text-xs text-gray-600">{edu.institute}</p>
                    <p className="text-xs text-gray-600">{edu.from} - {edu.to}</p>
                    {edu.description && (
                      <p className="text-xs text-gray-700 leading-relaxed mt-1">{edu.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
