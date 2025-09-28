import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, MapPin, User, GraduationCap, Briefcase } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateSixteen({ data, style }: TemplateProps) {
  const colors = {
    primary: "#1E40AF",
    sidebarBackground: "#93C5FD",
    sidebarTextColor: "#1E293B",
    bodyTextColor: "#374151",
    headerTextColor: "#1E40AF",
    background: "#FFFFFF",
  };

  return (
    <div
      className="resume-template flex h-full"
      style={{
        fontSize: `${style.bodyFontSize}px`,
        lineHeight: style.lineHeight,
        padding: 0,
        backgroundColor: colors.background,
      }}
    >
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-700 text-white relative">
        {/* Yellow triangle accent */}
        <div 
          className="absolute top-0 right-0 bg-yellow-400"
          style={{
            width: '0',
            height: '0',
            borderLeft: '60px solid transparent',
            borderRight: '60px solid #facc15',
            borderBottom: '60px solid transparent',
            borderTop: '60px solid #facc15'
          }}
        ></div>
        
        <div className="p-6 pt-20">
          {/* Profile Photo */}
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full mx-auto border-2 border-white overflow-hidden bg-gray-200">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Savannah</h1>
            <h1 className="text-2xl font-bold text-yellow-400 mb-2">Maya</h1>
            <h2 className="text-sm text-gray-300 uppercase tracking-wider">SALES EXECUTIVE</h2>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-yellow-400 mb-4 uppercase">Education</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-300 mb-1">2008</p>
                <h4 className="font-semibold text-white text-sm">Master in Management Studies</h4>
                <p className="text-xs text-gray-300">University/College</p>
              </div>
              <div>
                <p className="text-xs text-gray-300 mb-1">2006</p>
                <h4 className="font-semibold text-white text-sm">Bachelor in Commerce</h4>
                <p className="text-xs text-gray-300">University/College</p>
              </div>
            </div>
          </div>

          {/* Pro Skills Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-yellow-400 mb-4 uppercase">Pro Skills</h3>
            
            <div className="space-y-3">
              {[
                { skill: 'Communication', level: 90 },
                { skill: 'Leadership', level: 85 },
                { skill: 'Problem Solving', level: 80 },
                { skill: 'Time Management', level: 75 }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white">{item.skill}</span>
                    <span className="text-gray-300">{item.level}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1">
                    <div 
                      className="bg-yellow-400 h-1 rounded-full" 
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reference Section */}
          <div>
            <h3 className="text-lg font-bold text-yellow-400 mb-4 uppercase">Reference</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">Estelle Darcy</h4>
                <p className="text-xs text-gray-300 mb-1">Wardiere Inc. / CEO</p>
                <p className="text-xs text-gray-300 mb-1">Phone: 123-456-7890</p>
                <p className="text-xs text-gray-300">Email: hello@reallygreatsite.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">Harper Russo</h4>
                <p className="text-xs text-gray-300 mb-1">Wardiere Inc. / CEO</p>
                <p className="text-xs text-gray-300 mb-1">Phone: 123-456-7890</p>
                <p className="text-xs text-gray-300">Email: hello@reallygreatsite.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-white p-8">
        {/* Personal Profile Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase">Personal Profile</h3>
          
          <p className="text-sm text-gray-700 leading-relaxed">
            Dedicated sales professional with over 8 years of experience in driving revenue growth and 
            building strong client relationships. Proven track record of exceeding sales targets and 
            developing innovative strategies to capture new market opportunities. Skilled in consultative 
            selling, negotiation, and team leadership. Committed to delivering exceptional customer service 
            and fostering long-term partnerships that drive business success.
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 uppercase">Work Experience</h3>
          
          <div className="space-y-6">
            <div className="relative pl-6">
              <div className="absolute left-0 top-2 w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="absolute left-1.5 top-5 w-0.5 h-20 bg-gray-300"></div>
              
              <div className="mb-2">
                <h4 className="font-bold text-gray-800 mb-1">Senior Sales Executive</h4>
                <p className="text-sm text-gray-600 mb-1">Brightline Solutions | 2019 - Present</p>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Lead a team of 8 sales representatives, consistently achieving 120% of quarterly targets. 
                Developed and implemented strategic sales plans that resulted in 35% revenue growth. 
                Managed key client accounts worth over $2M annually and established partnerships with 
                15+ new enterprise clients.
              </p>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-0 top-2 w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="absolute left-1.5 top-5 w-0.5 h-20 bg-gray-300"></div>
              
              <div className="mb-2">
                <h4 className="font-bold text-gray-800 mb-1">Sales Representative</h4>
                <p className="text-sm text-gray-600 mb-1">TechFlow Industries | 2016 - 2019</p>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Exceeded individual sales quotas by an average of 25% annually. Built and maintained 
                relationships with 100+ clients across various industries. Conducted product demonstrations 
                and presentations to C-level executives, resulting in $1.5M in new business.
              </p>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-0 top-2 w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="absolute left-1.5 top-5 w-0.5 h-20 bg-gray-300"></div>
              
              <div className="mb-2">
                <h4 className="font-bold text-gray-800 mb-1">Junior Sales Associate</h4>
                <p className="text-sm text-gray-600 mb-1">Global Marketing Corp | 2014 - 2016</p>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Supported senior sales team in lead generation and client outreach activities. 
                Assisted in preparing sales proposals and maintaining CRM database. Achieved 
                rookie of the year award for outstanding performance in first year.
              </p>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-0 top-2 w-3 h-3 bg-yellow-400 rounded-full"></div>
              
              <div className="mb-2">
                <h4 className="font-bold text-gray-800 mb-1">Sales Intern</h4>
                <p className="text-sm text-gray-600 mb-1">StartUp Ventures | 2013 - 2014</p>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Gained foundational experience in sales processes and customer relationship management. 
                Participated in market research initiatives and supported business development activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}