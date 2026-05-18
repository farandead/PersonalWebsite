import { registerCommand } from './registry';
import { skills } from '../data/skills';

registerCommand('skills', () => ({
  output: [
    <div className="cmd-header">Tech Stack</div>,
    <div className="skills-grid">
      {skills.map((cat) => (
        <div key={cat.name} className="skill-category">
          <div className="c-accent3 c-bold" style={{ marginBottom: '6px' }}>
            {cat.name}
          </div>
          {cat.items.map((item) => (
            <div key={item} style={{ marginBottom: '2px' }}>
              <span className="c-accent2"> ▸ </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      ))}
    </div>,
  ],
}));
