import { registerCommand } from './registry';
import * as vfs from '../fs/vfs';

registerCommand('nano', (args) => {
  if (args.length === 0) {
    return { output: [<span className="c-accent5">nano: missing filename</span>] };
  }

  const filePath = args[0];
  const resolved = vfs.resolveForNano(filePath);
  const result = vfs.readFile(filePath);

  let initialContent = '';
  let isReadonly = false;

  if (typeof result === 'string') {
    // File doesn't exist — check if we can create it
    if (!resolved.segments.length || resolved.segments[0] !== 'tmp') {
      return { output: [<span className="c-accent5">nano: permission denied: {filePath} (only ~/tmp/ is writable)</span>] };
    }
    initialContent = '';
    isReadonly = false;
  } else {
    initialContent = result.content;
    isReadonly = result.readonly;
  }

  return {
    output: [],
    nano: {
      filePath: resolved.absPath,
      initialContent,
      readonly: isReadonly,
    },
  };
});
