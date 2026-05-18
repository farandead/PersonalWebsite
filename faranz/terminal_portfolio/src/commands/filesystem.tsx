import { registerCommand } from './registry';
import * as vfs from '../fs/vfs';
import { asciiArt } from '../data/ascii-art';

function isAboutPath(path: string): boolean {
  const base = path.split('/').pop() ?? '';
  return base === 'about.txt' || base === 'about';
}

function resolveAboutCatPath(path: string): string {
  const parts = path.split('/');
  if (parts[parts.length - 1] === 'about') {
    parts[parts.length - 1] = 'about.txt';
  }
  return parts.join('/');
}

registerCommand('pwd', () => ({
  output: [<span className="c-accent1">{vfs.pwd()}</span>],
}));

registerCommand('cd', (args) => {
  const target = args[0] || '~';
  const err = vfs.cd(target);
  if (err) return { output: [<span className="c-accent5">{err}</span>] };
  return { output: [] };
});

registerCommand('ls', (args) => {
  const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
  const pathArg = args.find(a => !a.startsWith('-'));
  const result = vfs.ls(pathArg);
  if (typeof result === 'string') {
    return { output: [<span className="c-accent5">{result}</span>] };
  }

  const filtered = showHidden ? result : result.filter(e => !e.name.startsWith('.'));

  if (filtered.length === 0) {
    return { output: [<span className="c-dimmed">(empty directory)</span>] };
  }

  const output = filtered.map(entry => (
    <div key={entry.name}>
      <span className={entry.type === 'dir' ? 'c-accent1 c-bold' : 'c-fg'}>
        {entry.type === 'dir' ? `${entry.name}/` : entry.name}
      </span>
      {entry.type === 'file' && (
        <span className="c-dimmed">  {entry.size}B{entry.readonly ? '' : ' [writable]'}</span>
      )}
    </div>
  ));

  return { output };
});

registerCommand('cat', (args) => {
  if (args.length === 0) {
    return { output: [<span className="c-accent5">cat: missing file argument</span>] };
  }

  const path = args[0];
  if (isAboutPath(path)) {
    const content = vfs.cat(resolveAboutCatPath(path));
    if (content.startsWith('cat:')) {
      return { output: [<span className="c-accent5">{content}</span>] };
    }
    return {
      output: [
        <div className="about-layout" key="cat-about">
          <pre className="ascii-art c-accent1 about-art">{asciiArt}</pre>
          <pre className="about-info" style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{content}</pre>
        </div>,
      ],
    };
  }

  const result = vfs.cat(path);
  return { output: [<span style={{ whiteSpace: 'pre-wrap' }}>{result}</span>] };
});

registerCommand('touch', (args) => {
  if (args.length === 0) {
    return { output: [<span className="c-accent5">touch: missing file argument</span>] };
  }
  const err = vfs.touch(args[0]);
  if (err) return { output: [<span className="c-accent5">{err}</span>] };
  return { output: [] };
});

registerCommand('mkdir', (args) => {
  if (args.length === 0) {
    return { output: [<span className="c-accent5">mkdir: missing directory argument</span>] };
  }
  const err = vfs.mkdir(args[0]);
  if (err) return { output: [<span className="c-accent5">{err}</span>] };
  return { output: [] };
});

registerCommand('rm', (args) => {
  if (args.length === 0) {
    return { output: [<span className="c-accent5">rm: missing argument</span>] };
  }

  const recursive = args.includes('-r') || args.includes('-rf');
  const target = args.filter(a => !a.startsWith('-'))[0];

  if (!target) {
    return { output: [<span className="c-accent5">rm: missing file argument</span>] };
  }

  const err = recursive ? vfs.rmRecursive(target) : vfs.rm(target);
  if (err) return { output: [<span className="c-accent5">{err}</span>] };
  return { output: [] };
});
