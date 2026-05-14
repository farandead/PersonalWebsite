import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const experiences = [
  {
    company: 'RealityMine',
    location: 'Manchester, UK',
    position: 'Software Engineer',
    period: 'Dec 2024 \u2013 Present',
    bullets: [
      'Built an AI-powered server management and diagnostics tool that autonomously triages errors and runs remediation, cutting MTTR from ~60 min to minutes',
      'Built an agentic automation tool that converts raw web-traffic captures into extraction code, eliminating ~20 hours/week of manual analysis',
      'Optimized 600 GB/day data pipeline, improving throughput by 86%',
      'Reduced legacy system alarms/crashes by ~95%',
    ],
  },
  {
    company: 'Acumei',
    url: 'https://acumei.com',
    location: 'Manchester, UK',
    position: 'Founder',
    period: '2025 \u2013 Present',
    bullets: [
      'Building AI automation ("AI Brain") for British SMEs \u2014 agentic pipelines handling calls, dispatch, rebooking, stock, and invoicing across CRM, POS, and diary systems',
      'Shipped production integrations for plumbing, hospitality, and salon clients: 14-second avg dispatch, 24% food-waste reduction, 7x weekly rebookings',
      'End-to-end custom builds in 3\u201314 days with full code/prompt ownership and GDPR-compliant data handling',
    ],
  },
  {
    company: 'Ovalens',
    url: 'https://ovalens.com',
    location: 'London, UK',
    position: 'Founder & CTO',
    period: 'Jan 2025 \u2013 April 2025',
    bullets: [
      'Raised \u00A37k through a hackathon win',
      'Implemented a deterministic UK tax engine (16 modules) incl. income tax, NI, AA, HICBC, loans, ANI, BED/ISA',
      'Shipped Claude-powered chat (streaming) with 6 tools for modelling, dashboards, and note search',
      'Delivered 30+ REST APIs, async processing via Redis, 280+ tests, and production observability with Sentry',
    ],
  },
  {
    company: 'Google DeepMind',
    url: 'https://deepmind.google',
    location: 'Birmingham, UK',
    position: 'Research Intern',
    period: 'July 2024 \u2013 Aug 2024',
    bullets: [
      'Developed Adaptive Memory RAG (AMRAG) framework, integrating self-checks and web search, leading to 88% improvement in response accuracy',
      'Applied decomposition, QA context generation, hallucination detection, and retrieval augmentation',
      'Achieved sub-5-second response times',
    ],
  },
  {
    company: 'Aston University',
    url: 'https://www.aston.ac.uk',
    location: 'Birmingham, UK',
    position: 'Teaching Assistant',
    period: 'Oct 2023 \u2013 July 2024',
    bullets: [
      'Mentored 10+ student teams in OOP',
      'Led 8+ hands-on workshops on advanced OOP topics',
    ],
  },
];

const education = {
  institution: 'Aston University',
  location: 'Birmingham, UK',
  degree: 'BSc in Computer Science',
  period: 'Sept 2021 \u2013 Sept 2024',
  description: 'First Class Honours (4.0 GPA). Distinction in: DSA in Java, OOP, Computer Systems, AI, Data Mining, Game Development, Information Security, Software Project Management, Secure Network Services',
};

const highlightNumbers = (text: string) => {
  const regex = /(\u00a3?~?\d+[.,]?\d*[%kKGB+\-]?|~?\u00a3\d+[.,]?\d*[kKGB]?)/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <span key={match.index} className="number-highlight">{match[0]}</span>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

export default function Experience() {
  const ref = useScrollReveal();

  return (
    <div className="page" ref={ref}>
      <div className="page-header" data-reveal>
        <h1 className="page-title">Experience</h1>
      </div>

      <div className="exp-list">
        {experiences.map((exp, i) => (
          <div key={i} className="exp-row" data-reveal style={{ transitionDelay: `${0.1 * i}s` }}>
            <div className="exp-meta">
              <div className="exp-period">{exp.period}</div>
              <div className="exp-location">{exp.location}</div>
            </div>
            <div className="exp-body">
              <h3 className="exp-position">{exp.position}</h3>
              <div className="exp-company">
                {exp.url ? (
                  <a href={exp.url} target="_blank" rel="noopener noreferrer">{exp.company}</a>
                ) : exp.company}
              </div>
              <ul className="exp-bullets">
                {exp.bullets.map((bullet, j) => (
                  <li key={j}>{highlightNumbers(bullet)}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="section-header education-header" data-reveal>
        <span className="section-number">&bull;</span>
        <span className="section-label">Education</span>
      </div>

      <div className="exp-list">
        <div className="exp-row" data-reveal>
          <div className="exp-meta">
            <div className="exp-period">{education.period}</div>
            <div className="exp-location">{education.location}</div>
          </div>
          <div className="exp-body">
            <h3 className="exp-position">{education.degree}</h3>
            <div className="exp-company">{education.institution}</div>
            <p className="edu-description">{highlightNumbers(education.description)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
