import type { ResumeData, StyleSettings } from "@shared/schema";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateTwo({ data, style }: TemplateProps) {
  return (
    <div className="resume-template-2 h-full flex" style={{
      fontSize: `${style.bodyFontSize}px`,
      lineHeight: style.lineHeight,
      padding: `${style.marginTop}px ${style.marginRight}px ${style.marginBottom}px ${style.marginLeft}px`
    }}>
      {/* Sidebar */}
      <div 
        className="sidebar bg-gray-50 border-r p-6" 
        style={{ width: `${style.sidebarWidth}%` }}
      >
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1494790108755-2616b612c38f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
              alt="Professional headshot" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Contact */}
        {(data.contact.email || data.contact.phone || data.contact.linkedin || data.contact.location) && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-800">Contact</h3>
            <div className="space-y-2 text-xs text-gray-700">
              {data.contact.phone && (
                <div><i className="fas fa-phone mr-2 text-gray-500"></i><span data-testid="text-phone">{data.contact.phone}</span></div>
              )}
              {data.contact.email && (
                <div><i className="fas fa-envelope mr-2 text-gray-500"></i><span data-testid="text-email">{data.contact.email}</span></div>
              )}
              {data.contact.linkedin && (
                <div><i className="fas fa-linkedin mr-2 text-gray-500"></i><span data-testid="text-linkedin">{data.contact.linkedin.replace('https://', '').replace('http://', '')}</span></div>
              )}
              {data.contact.location && (
                <div><i className="fas fa-map-marker-alt mr-2 text-gray-500"></i><span data-testid="text-location">{data.contact.location}</span></div>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-800">Skills</h3>
            <div className="space-y-1">
              {data.skills.map((skill, index) => (
                <div key={index} className="text-xs text-gray-700" data-testid={`skill-${index}`}>
                  {skill}
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
            className="font-bold text-gray-800 mb-1" 
            style={{ fontSize: `${style.headerFontSize}px` }}
            data-testid="text-name"
          >
            {data.name || "Your Name"}
          </h1>
          <h2 
            className="text-blue-600 mb-3" 
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
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-800 border-b-2 border-blue-600 pb-1">
              Experience
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} data-testid={`experience-${index}`}>
                  <h4 className="text-sm font-semibold text-gray-800">
                    {exp.position} <span className="font-normal text-gray-600">at {exp.company}</span>
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">{exp.from} - {exp.to}</p>
                  <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-800 border-b-2 border-blue-600 pb-1">
              Education
            </h3>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index} data-testid={`education-${index}`}>
                  <h4 className="text-sm font-semibold text-gray-800">{edu.degree}</h4>
                  <p className="text-xs text-gray-600">{edu.institute} • {edu.from} - {edu.to}</p>
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
