import { registerCommand } from './registry';
import { cat as catFile } from '../fs/vfs';
const CAT_ASCII = `
  /\\_/\\
 ( o.o )
  > ^ <
 /|   |\\
(_|   |_)
`;

registerCommand('echo', (args) => ({
  output: [<span>{args.join(' ')}</span>],
}));

registerCommand('whoami', () => ({
  output: [
    <pre className="c-accent1">{CAT_ASCII}</pre>,
    <span className="c-accent1 c-bold">Faran Zafar</span>,
    <span className="c-dimmed">Software Engineer · AI Specialist · 6x Hackathon Winner</span>,
  ],
}));

registerCommand('date', () => ({
  output: [<span>{new Date().toString()}</span>],
}));

registerCommand('uname', (args) => {
  if (args.includes('-a')) {
    return {
      output: [<span>faran-os 2.0.26 terminal-portfolio aarch64 JavaScript/V8</span>],
    };
  }
  return { output: [<span>faran-os</span>] };
});

registerCommand('hostname', () => ({
  output: [<span>portfolio</span>],
}));

registerCommand('which', (args) => {
  if (args.length === 0) return { output: [<span className="c-accent5">which: missing argument</span>] };
  const builtins = [
    'help', 'about', 'experience', 'projects', 'skills', 'education', 'contact',
    'cv', 'theme', 'clear', 'history', 'ls', 'cd', 'pwd', 'cat', 'nano',
    'touch', 'mkdir', 'rm', 'echo', 'whoami', 'date', 'uname', 'hostname',
    'which', 'grep', 'neofetch',
  ];
  const cmd = args[0].toLowerCase();
  if (builtins.includes(cmd)) {
    return { output: [<span>/usr/local/bin/{cmd}</span>] };
  }
  return { output: [<span className="c-accent5">{cmd} not found</span>] };
});

registerCommand('neofetch', () => {
  const infoLines = [
    ['', 'faran@portfolio'],
    ['', '───────────────'],
    ['OS', 'faran-os 2.0.26'],
    ['Host', 'terminal-portfolio'],
    ['Shell', 'faran-sh 1.0'],
    ['Theme', 'dynamic (type "theme")'],
    ['Terminal', 'Web/React 19'],
    ['Uptime', 'since you opened this tab'],
    ['', ''],
    ['Languages', 'Python, TypeScript, Java, C++, PHP, SQL, C#'],
    ['Focus', 'Multi-Agent Systems, RAG, LLM Engineering'],
    ['Projects', '13 shipped'],
    ['Hackathons', '6x Winner'],
  ];

  return {
    output: [
      <div className="about-layout" style={{ gap: '16px' }}>
        <pre className="c-accent1" style={{ whiteSpace: 'pre', lineHeight: '1.3' }}>{CAT_ASCII}</pre>
        <div style={{ paddingTop: '4px', fontSize: '12px', lineHeight: '1.6' }}>
          {infoLines.map(([key, val], i) => (
            <div key={i}>
              {key ? (
                <><span className="c-accent2">{key}</span><span className="c-dimmed">: </span><span>{val}</span></>
              ) : (
                <span className={i === 0 ? 'c-accent1 c-bold' : ''}>{val}</span>
              )}
            </div>
          ))}
        </div>
      </div>,
    ],
  };
});

registerCommand('grep', (args) => {
  if (args.length < 2) {
    return { output: [<span className="c-accent5">usage: grep &lt;pattern&gt; &lt;file&gt;</span>] };
  }
  const pattern = args[0];
  const fileName = args[1];

  const content = catFile(fileName);
  if (content.startsWith('cat:')) {
    return { output: [<span className="c-accent5">{content.replace('cat:', 'grep:')}</span>] };
  }

  const lines = content.split('\n');
  const matches = lines.filter(line =>
    line.toLowerCase().includes(pattern.toLowerCase())
  );

  if (matches.length === 0) {
    return { output: [<span className="c-dimmed">(no matches)</span>] };
  }

  return {
    output: matches.map((line, i) => {
      const idx = line.toLowerCase().indexOf(pattern.toLowerCase());
      const before = line.slice(0, idx);
      const match = line.slice(idx, idx + pattern.length);
      const after = line.slice(idx + pattern.length);
      return (
        <span key={i}>
          {before}<span className="c-accent5 c-bold">{match}</span>{after}
        </span>
      );
    }),
  };
});
