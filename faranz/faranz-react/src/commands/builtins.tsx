import { registerCommand } from './registry';
import { cat as catFile } from '../fs/vfs';

registerCommand('echo', (args) => ({
  output: [<span>{args.join(' ')}</span>],
}));

registerCommand('whoami', () => ({
  output: [<span className="c-accent1">faran</span>],
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

registerCommand('neofetch', () => ({
  output: [
    <pre className="c-accent1">{`
        .--.         faran@portfolio
       |o_o |        ───────────────
       |:_/ |        OS: faran-os 2.0.26
      //   \\ \\       Host: terminal-portfolio
     (|     | )      Shell: faran-sh 1.0
    /'\\_   _/\`\\      Theme: dynamic
    \\___)=(___/      Terminal: Web/React 19
                     Uptime: since you opened this tab
`}</pre>,
    <table className="cmd-table">
      <tbody>
        <tr>
          <td><span className="c-accent2">Languages</span></td>
          <td>Python, TypeScript, Java, SQL, C#</td>
        </tr>
        <tr>
          <td><span className="c-accent2">Focus</span></td>
          <td>Multi-Agent Systems, RAG, LLM Engineering</td>
        </tr>
        <tr>
          <td><span className="c-accent2">Projects</span></td>
          <td>13 shipped</td>
        </tr>
        <tr>
          <td><span className="c-accent2">Hackathons</span></td>
          <td>6x Winner</td>
        </tr>
      </tbody>
    </table>,
  ],
}));

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
