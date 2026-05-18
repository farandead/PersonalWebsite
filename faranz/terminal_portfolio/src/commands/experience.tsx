import type { ReactNode } from 'react';
import { registerCommand } from './registry';
import { experiences } from '../data/experience';

registerCommand('experience', () => {
  const output: ReactNode[] = [
    <div className="cmd-header">Work Experience</div>,
  ];

  for (const exp of experiences) {
    output.push(
      <div className="cmd-section" key={exp.company}>
        <div>
          <span className="c-accent3 c-bold">{exp.position}</span>
          <span className="c-dimmed"> @ </span>
          {exp.url ? (
            <a
              href={exp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cmd-link"
            >
              {exp.company}
            </a>
          ) : (
            <span className="c-accent1">{exp.company}</span>
          )}
        </div>
        <div className="c-dimmed">
          {exp.period} · {exp.location}
        </div>
        <div style={{ marginTop: '4px' }}>
          {exp.bullets.map((bullet, j) => (
            <div key={j}>
              <span className="c-accent2"> ▸ </span>
              {bullet}
            </div>
          ))}
        </div>
      </div>,
    );
  }

  return { output };
});
