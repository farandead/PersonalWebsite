import React from 'react';

const experiences = [
  {
    company: 'RealityMine',
    location: 'Manchester, UK',
    position: 'Software Engineer',
    period: 'Dec 2024 – Present',
    bullets: [
      'Built agentic server automation, cutting MTTR from ~60 min to minutes; saved ~£500k in manual hours',
      'Automated client configuration via internal agentic tooling, saving ~350+ hours/year by standardizing repeatable setups',
      'Optimized 600 GB/day data pipeline, improving throughput by 86%',
      'Reduced legacy system alarms/crashes by ~95%',
    ],
    logo: 'fa-solid fa-code',
  },
  {
    company: 'Google DeepMind',
    location: 'Birmingham, UK',
    position: 'Research Intern',
    period: 'July 2024 – Aug 2024',
    bullets: [
      'Developed Adaptive Memory RAG (AMRAG) framework, integrating self-checks and web search, leading to 88% improvement in response accuracy',
      'Applied decomposition, QA context generation, hallucination detection, and retrieval augmentation',
      'Achieved sub-5-second response times',
    ],
    logo: 'fa-solid fa-brain',
  },
  {
    company: 'Aston University',
    location: 'Birmingham, UK',
    position: 'Teaching Assistant',
    period: 'Oct 2023 – July 2024',
    bullets: [
      'Mentored 10+ student teams in OOP',
      'Led 8+ hands-on workshops on advanced OOP topics',
    ],
    logo: 'fa-solid fa-graduation-cap',
  },
];

const education = [
  {
    institution: 'Aston University',
    location: 'Birmingham, UK',
    degree: 'BSc in Computer Science',
    period: 'Sept 2021 – Sept 2024',
    description: 'First Class Honours (4.0 GPA). Distinction in: DSA in Java, OOP, Computer Systems, AI, Data Mining, Game Development, Information Security, Software Project Management, Secure Network Services',
    logo: 'fa-solid fa-graduation-cap',
  },
];

const highlightNumbers = (text: string) => {
  // Match numbers including percentages, currency, and numbers with symbols
  const numberRegex = /(£?~?\d+[.,]?\d*[%kKGB+\-]?|~?£\d+[.,]?\d*[kKGB]?)/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;
  
  while ((match = numberRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Add the highlighted number
    parts.push(
      <span key={match.index} className="number-highlight">{match[0]}</span>
    );
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

export default function Experience() {
  return (
    <div className="page-content">
      <h1>Experience</h1>
      
      {experiences.map((exp, index) => (
        <div key={index} className="publication-card experience-card">
          <div className="experience-logo">
            <i className={exp.logo}></i>
          </div>
          <div className="pub-year">{exp.period}</div>
          <div className="pub-content">
            <h3>{exp.position}</h3>
            <p className="pub-subtitle">{exp.company} • {exp.location}</p>
            <ul className="experience-bullets">
              {exp.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex}>{highlightNumbers(bullet)}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      
      <h2 className="section-title" style={{ marginTop: '60px' }}>Education</h2>
      
      {education.map((edu, index) => (
        <div key={index} className="publication-card experience-card">
          <div className="experience-logo">
            <i className={edu.logo}></i>
          </div>
          <div className="pub-year">{edu.period}</div>
          <div className="pub-content">
            <h3>{edu.degree}</h3>
            <p className="pub-subtitle">{edu.institution} • {edu.location}</p>
            <p className="pub-abstract">{highlightNumbers(edu.description)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
