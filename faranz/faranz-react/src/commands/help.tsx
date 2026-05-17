import { registerCommand } from './registry';

const portfolioCommands = [
  ['about', 'Who I am — bio, portrait, quick stats'],
  ['experience', 'Work history and roles'],
  ['projects', 'Selected projects ("projects <n>" for details)'],
  ['skills', 'Tech stack and tools'],
  ['education', 'Academic background'],
  ['contact', 'Social links and email'],
  ['cv', 'Open my CV in a new tab'],
  ['theme', 'Switch terminal color theme'],
];

const fsCommands = [
  ['ls', 'List directory contents'],
  ['cd', 'Change directory'],
  ['pwd', 'Print working directory'],
  ['cat', 'Print file contents'],
  ['nano', 'Edit a file (writable in ~/tmp/)'],
  ['touch', 'Create an empty file (~/tmp/ only)'],
  ['mkdir', 'Create a directory (~/tmp/ only)'],
  ['rm', 'Remove file or directory (-r for recursive)'],
  ['grep', 'Search pattern in a file'],
];

const shellCommands = [
  ['echo', 'Print text'],
  ['whoami', 'Print current user'],
  ['date', 'Print current date/time'],
  ['uname', 'Print system info (-a for full)'],
  ['hostname', 'Print hostname'],
  ['which', 'Show command location'],
  ['neofetch', 'System info summary'],
  ['clear', 'Clear the terminal (or Ctrl+L)'],
  ['history', 'Show command history'],
  ['help', 'Show this message'],
];

function Section({ title, commands }: { title: string; commands: string[][] }) {
  return (
    <>
      <div style={{ marginBottom: '4px' }}><span className="c-accent3">{title}</span></div>
      <table className="cmd-table">
        <tbody>
          {commands.map(([cmd, desc]) => (
            <tr key={cmd}>
              <td><span className="c-accent1">{cmd}</span></td>
              <td><span className="c-dimmed">{desc}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

registerCommand('help', () => ({
  output: [
    <div className="cmd-header">Available Commands</div>,
    <Section title="Portfolio" commands={portfolioCommands} />,
    <span>{''}</span>,
    <Section title="Filesystem" commands={fsCommands} />,
    <span>{''}</span>,
    <Section title="Shell" commands={shellCommands} />,
    <span>{''}</span>,
    <div className="c-dimmed">
      <div>Shortcuts: <span className="c-accent3">Tab</span> autocomplete · <span className="c-accent3">→</span> accept hint · <span className="c-accent3">↑↓</span> history</div>
      <div style={{ marginLeft: '70px' }}><span className="c-accent3">Ctrl+C</span> cancel · <span className="c-accent3">Ctrl+L</span> clear · <span className="c-accent3">Ctrl+U</span> clear line</div>
    </div>,
  ],
}));
