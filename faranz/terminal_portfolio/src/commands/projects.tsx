import type { ReactNode } from 'react';
import { registerCommand } from './registry';
import { projects } from '../data/projects';

registerCommand('projects', (args) => {
  if (args.length > 0) {
    const idx = parseInt(args[0], 10) - 1;
    if (isNaN(idx) || idx < 0 || idx >= projects.length) {
      return {
        output: [
          <span className="c-accent5">
            Invalid project number. Use 1-{projects.length}.
          </span>,
        ],
      };
    }

    const p = projects[idx];
    return {
      output: [
        <div className="cmd-header">
          {p.name} — {p.brief}
        </div>,
        <span className="c-dimmed">{p.year}</span>,
        <span>{''}</span>,
        <span className="c-accent3">{p.subtitle}</span>,
        <span>{''}</span>,
        <span>{p.description}</span>,
        <span>{''}</span>,
        <div>
          {p.tags.map((tag, i) => (
            <span key={i} className="cmd-tag">
              {tag}
            </span>
          ))}
        </div>,
        ...(p.link
          ? [
              <span>{''}</span>,
              <span>
                <span className="c-accent2">Link: </span>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cmd-link"
                >
                  {p.link}
                </a>
              </span>,
            ]
          : []),
      ],
    };
  }

  const output: ReactNode[] = [
    <div className="cmd-header">Selected Projects</div>,
    <span className="c-dimmed">Use 'projects &lt;number&gt;' for details</span>,
    <span>{''}</span>,
    <table className="cmd-table">
      <tbody>
        {projects.map((p, i) => (
          <tr key={i}>
            <td>
              <span className="c-accent2">
                {String(i + 1).padStart(2, '0')}
              </span>
            </td>
            <td>
              <span className="c-accent1">{p.name}</span>
            </td>
            <td>
              <span className="c-fg">{p.brief}</span>
            </td>
            <td>
              <span className="c-dimmed">{p.year}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>,
  ];

  return { output };
});
