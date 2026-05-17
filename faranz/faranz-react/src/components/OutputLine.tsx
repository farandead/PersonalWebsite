import { type ReactNode, useEffect, useRef } from 'react';

interface OutputLineProps {
  content: ReactNode;
  index: number;
}

export default function OutputLine({ content, index }: OutputLineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.animationDelay = `${index * 10}ms`;
    }
  }, [index]);

  return (
    <div ref={ref} className="output-line fade-in">
      {content}
    </div>
  );
}
