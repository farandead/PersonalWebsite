import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { ls } from '../fs/vfs';

const FS_COMMANDS = new Set(['cd', 'cat', 'nano', 'touch', 'rm', 'mkdir', 'ls']);

interface PromptInputProps {
  onSubmit: (command: string) => void;
  onClear: () => void;
  history: string[];
  commandNames: string[];
  disabled?: boolean;
  cwdPath?: string;
}

function getFileCompletions(partial: string): string[] {
  const parts = partial.split('/');
  const dir = parts.length > 1 ? parts.slice(0, -1).join('/') : undefined;
  const prefix = parts[parts.length - 1].toLowerCase();

  const result = ls(dir);
  if (typeof result === 'string') return [];

  return result
    .filter(e => e.name.toLowerCase().startsWith(prefix))
    .map(e => {
      const base = dir ? `${dir}/${e.name}` : e.name;
      return e.type === 'dir' ? `${base}/` : base;
    });
}

export default function PromptInput({ onSubmit, onClear, history, commandNames, disabled = false, cwdPath = '~' }: PromptInputProps) {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [savedInput, setSavedInput] = useState('');
  const [hint, setHint] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  useEffect(() => {
    const handleClick = () => {
      if (!disabled && inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [disabled]);

  const updateHint = useCallback((value: string) => {
    if (!value) { setHint(''); return; }

    const parts = value.split(/\s+/);
    if (parts.length === 1) {
      const match = commandNames.find(c => c.startsWith(value.toLowerCase()) && c !== value.toLowerCase());
      setHint(match ? match.slice(value.length) : '');
    } else {
      const cmd = parts[0].toLowerCase();
      if (FS_COMMANDS.has(cmd)) {
        const filePart = parts[parts.length - 1];
        const completions = getFileCompletions(filePart);
        if (completions.length === 1) {
          setHint(completions[0].slice(filePart.length));
        } else {
          setHint('');
        }
      } else {
        setHint('');
      }
    }
  }, [commandNames]);

  const handleChange = useCallback((value: string) => {
    setInput(value);
    setHistoryIndex(-1);
    updateHint(value);
  }, [updateHint]);

  const doComplete = useCallback(() => {
    if (!input) return;

    const parts = input.split(/\s+/);

    if (parts.length === 1) {
      const matches = commandNames.filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
        setHint('');
      } else if (matches.length > 1) {
        const common = commonPrefix(matches);
        if (common.length > input.length) {
          setInput(common);
          updateHint(common);
        }
      }
    } else {
      const cmd = parts[0].toLowerCase();
      if (FS_COMMANDS.has(cmd)) {
        const filePart = parts[parts.length - 1];
        const completions = getFileCompletions(filePart);
        if (completions.length === 1) {
          parts[parts.length - 1] = completions[0];
          const completed = parts.join(' ');
          setInput(completed);
          setHint('');
        } else if (completions.length > 1) {
          const common = commonPrefix(completions);
          if (common.length > filePart.length) {
            parts[parts.length - 1] = common;
            const completed = parts.join(' ');
            setInput(completed);
            updateHint(completed);
          }
        }
      }
    }
  }, [input, commandNames, updateHint]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Ctrl shortcuts
    if (e.ctrlKey) {
      switch (e.key) {
        case 'c':
          e.preventDefault();
          setInput('');
          setHint('');
          setHistoryIndex(-1);
          return;
        case 'l':
          e.preventDefault();
          onClear();
          return;
        case 'u':
          e.preventDefault();
          setInput('');
          setHint('');
          return;
        case 'a':
          e.preventDefault();
          inputRef.current?.setSelectionRange(0, 0);
          return;
        case 'e':
          e.preventDefault();
          inputRef.current?.setSelectionRange(input.length, input.length);
          return;
      }
    }

    if (e.key === 'Enter') {
      if (input.trim()) {
        onSubmit(input.trim());
        setInput('');
        setHint('');
        setHistoryIndex(-1);
        setSavedInput('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        if (historyIndex === -1) setSavedInput(input);
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        const val = history[history.length - 1 - newIndex] || '';
        setInput(val);
        updateHint(val);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const val = history[history.length - 1 - newIndex] || '';
        setInput(val);
        updateHint(val);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput(savedInput);
        updateHint(savedInput);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      doComplete();
    } else if (e.key === 'ArrowRight' && hint) {
      e.preventDefault();
      setInput(input + hint);
      setHint('');
    }
  };

  if (disabled) return null;

  return (
    <div className="input-area">
      <span className="prompt-line">
        <span className="prompt-user">faran</span>
        <span className="prompt-at">@</span>
        <span className="prompt-host">portfolio</span>
        <span className="prompt-colon">:</span>
        <span className="prompt-path">{cwdPath}</span>
        <span className="prompt-symbol">$ </span>
      </span>
      <div className="input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        {hint && (
          <div className="input-ghost">
            <span className="input-ghost-typed">{input}</span>
            <span className="input-ghost-hint">{hint}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function commonPrefix(strings: string[]): string {
  if (strings.length === 0) return '';
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (!strings[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
}
