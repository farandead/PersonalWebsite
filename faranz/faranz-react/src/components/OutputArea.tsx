import { useEffect, useRef, type ReactNode } from 'react';

interface OutputAreaProps {
  lines: ReactNode[];
}

export default function OutputArea({ lines }: OutputAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [lines.length]);

  return (
    <div className="terminal-body" ref={containerRef}>
      {lines.map((line, i) => (
        <div key={i} className="output-line">
          {line}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
