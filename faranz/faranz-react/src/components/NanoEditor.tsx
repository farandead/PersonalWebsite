import { useState, useRef, useEffect, useCallback } from 'react';

interface NanoEditorProps {
  fileName: string;
  initialContent: string;
  readonly: boolean;
  onSave: (content: string) => string | null; // returns error or null
  onExit: () => void;
}

export default function NanoEditor({ fileName, initialContent, readonly, onSave, onExit }: NanoEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [saved, setSaved] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSave = useCallback(() => {
    if (readonly) {
      setStatusMsg('[ File is read-only ]');
      setTimeout(() => setStatusMsg(''), 2000);
      return;
    }
    const err = onSave(content);
    if (err) {
      setStatusMsg(`[ Error: ${err} ]`);
      setTimeout(() => setStatusMsg(''), 3000);
    } else {
      setSaved(true);
      setStatusMsg('[ Saved ]');
      setTimeout(() => setStatusMsg(''), 2000);
    }
  }, [content, readonly, onSave]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'x') {
      e.preventDefault();
      onExit();
    } else if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  }, [onExit, handleSave]);

  return (
    <div className="nano-editor" onKeyDown={handleKeyDown}>
      <div className="nano-header">
        <span className="c-bold"> GNU nano 7.2</span>
        <span className="nano-filename">
          {fileName}{!saved && !readonly ? ' (modified)' : ''}
        </span>
        {readonly && <span className="nano-readonly">[ Read-Only ]</span>}
      </div>
      <textarea
        ref={textareaRef}
        className="nano-textarea"
        value={content}
        onChange={e => {
          if (!readonly) {
            setContent(e.target.value);
            setSaved(false);
          }
        }}
        readOnly={readonly}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      {statusMsg && (
        <div className="nano-status-msg c-accent2">{statusMsg}</div>
      )}
      <div className="nano-footer">
        <span><span className="nano-key">^S</span> Save</span>
        <span><span className="nano-key">^X</span> Exit</span>
      </div>
    </div>
  );
}
