import { registerCommand } from './registry';
import { education } from '../data/experience';

registerCommand('education', () => ({
  output: [
    <div className="cmd-header">Education</div>,
    <div className="cmd-section">
      <div>
        <span className="c-accent3 c-bold">{education.degree}</span>
      </div>
      <div>
        <span className="c-accent1">{education.institution}</span>
        <span className="c-dimmed"> · {education.location}</span>
      </div>
      <div className="c-dimmed">{education.period}</div>
      <div style={{ marginTop: '8px' }}>{education.description}</div>
    </div>,
  ],
}));
