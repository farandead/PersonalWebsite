import { registerCommand } from './registry';

const links = [
  { name: 'GitHub', url: 'https://github.com/farandead/', icon: '◆' },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/faranzafar/',
    icon: '◆',
  },
  { name: 'Medium', url: 'https://medium.com/@faranzafar', icon: '◆' },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/humangasorus/',
    icon: '◆',
  },
];

registerCommand('contact', () => ({
  output: [
    <div className="cmd-header">Get In Touch</div>,
    <span>{''}</span>,
    ...links.map((link) => (
      <div key={link.name}>
        <span className="c-accent4">{link.icon} </span>
        <span
          className="c-accent3"
          style={{ display: 'inline-block', width: '100px' }}
        >
          {link.name}
        </span>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="cmd-link"
        >
          {link.url}
        </a>
      </div>
    )),
    <span>{''}</span>,
    <span className="c-dimmed">Links open in a new tab.</span>,
  ],
}));
