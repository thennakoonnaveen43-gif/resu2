import type { ResumeData, StyleSettings } from "@shared/schema";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateFour({ data, style }: TemplateProps) {
  return (
    <div
      className="resume-template flex h-full bg-white text-gray-900"
      style={{
        fontSize: `${style.bodyFontSize}px`,
        lineHeight: style.lineHeight,
        padding: 0,
      }}
    >
      {/* Sidebar */}
      <aside
        className="bg-gray-50 p-6 flex flex-col items-center text-gray-800"
        style={{ width: `${style.sidebarWidth}%` }}
      >
        {/* Photo */}
        <div className="w-28 h-28 rounded-full overflow-hidden mb-6 shadow">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contact */}
        <div className="w-full mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 border-b pb-1">
            Contact
          </h3>
          <ul className="text-xs space-y-2">
            {data.contact.phone && <li>📞 {data.contact.phone}</li>}
            {data.contact.email && <li>✉️ {data.contact.email}</li>}
            {data.contact.location && <li>📍 {data.contact.location}</li>}
            {data.contact.linkedin && (
              <li>🔗 {data.contact.linkedin.replace(/^https?:\/\//, "")}</li>
            )}
          </ul>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="w-full mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 border-b pb-1">
              Skills
            </h3>
            <ul className="text-xs space-y-1">
              {data.skills.map((skill, i) => (
                <li key={i}>• {skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="w-full mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 border-b pb-1">
              Languages
            </h3>
            <ul className="text-xs space-y-1">
              {data.languages.map((lang, i) => (
                <li key={i}>{lang.name} ({lang.level})</li>
              ))}
            </ul>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="w-full mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 border-b pb-1">
              Certifications
            </h3>
            <div className="space-y-2">
              {data.certifications.map((cert, i) => (
                <div key={i} className="text-xs">
                  <p className="font-medium">{cert.title}</p>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div className="w-full">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 border-b pb-1">
              References
            </h3>
            <div className="space-y-3">
              {data.references.slice(0, 2).map((ref, i) => (
                <div key={i}>
                  <p className="text-xs font-medium">{ref.name}</p>
                  <p className="text-xs text-gray-600">{ref.position}</p>
                  {ref.company && <p className="text-xs text-gray-600">{ref.company}</p>}
                  {ref.phone && <p className="text-xs">📞 {ref.phone}</p>}
                  {ref.email && <p className="text-xs">✉️ {ref.email}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 p-8 text-gray-900"
        style={{ width: `${100 - style.sidebarWidth}%` }}
      >
        {/* Header */}
        <header className="mb-6 border-b-4 border-gray-900 pb-3">
          <h1
            className="font-bold uppercase tracking-wide"
            style={{ fontSize: `${style.headerFontSize}px` }}
          >
            {data.name}
          </h1>
          <h2
            className="text-gray-600 uppercase font-medium"
            style={{ fontSize: `${style.headerFontSize * 0.7}px` }}
          >
            {data.title}
          </h2>
        </header>

        {/* Profile */}
        {data.summary && (
          <section className="mb-8">
            <h3 className="text-base font-bold uppercase tracking-wide border-b-2 border-gray-800 pb-1 mb-3">
              Profile
            </h3>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-base font-bold uppercase tracking-wide border-b-2 border-gray-800 pb-1 mb-3">
              Work Experience
            </h3>
            <div className="space-y-5">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-semibold text-gray-800">
                    <span>{exp.company}</span>
                    <span>
                      {exp.from} – {exp.to}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-gray-600">
                    {exp.position}
                  </div>
                  <p className="text-xs text-gray-700 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h3 className="text-base font-bold uppercase tracking-wide border-b-2 border-gray-800 pb-1 mb-3">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-semibold text-gray-800">
                    <span>{edu.degree}</span>
                    <span>
                      {edu.from} – {edu.to}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-gray-600">
                    {edu.institute}
                  </div>
                  {edu.description && (
                    <p className="text-xs text-gray-700 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
