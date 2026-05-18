import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { asciiArt } from '../data/ascii-art';

const bootLines = [
  '[boot] loading kernel modules...',
  '[boot] mounting filesystem...',
  '[boot] initializing network interfaces...',
  '[boot] starting gpu drivers...',
  '[boot] connecting to portfolio-db...',
  '[boot] loading faran-os v2.0.26...',
  '',
];

const welcomeBox = [
  '╭──────────────────────────────────────────────╮',
  '│  Faran Zafar                                 │',
  '│  AI/ML Engineer · Founder · Builder          │',
  '│                                              │',
  '│  Currently @ RealityMine                     │',
  '│  Previously @ Google DeepMind                │',
  '│  6x Hackathon Winner                         │',
  '╰──────────────────────────────────────────────╯',
];

interface BootSequenceProps {
  onComplete: (outputLines: ReactNode[]) => void;
}

function BootHero() {
  return (
    <div className="about-layout">
      <pre className="ascii-art about-art c-accent1">
        {asciiArt}
      </pre>
      <div className="about-info">
        {welcomeBox.map((line, i) => (
          <div key={i} className="c-accent1">{line}</div>
        ))}
        <div style={{ marginTop: '12px' }}>
          Type '<span className="c-accent1">help</span>' to see available commands, or click the tabs above.
        </div>
      </div>
    </div>
  );
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<'boot' | 'art' | 'done'>('boot');
  const [skipped, setSkipped] = useState(false);
  const [showHero, setShowHero] = useState(false);

  const buildFinalOutput = useCallback((): ReactNode[] => {
    const output: ReactNode[] = [];

    for (const line of bootLines) {
      output.push(<span className="c-dimmed">{line}</span>);
    }

    output.push(<BootHero />);
    output.push(<span>{''}</span>);

    return output;
  }, []);

  useEffect(() => {
    const handleSkip = () => {
      if (phase !== 'done') setSkipped(true);
    };
    const handleKeySkip = (e: globalThis.KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      handleSkip();
    };
    window.addEventListener('click', handleSkip);
    window.addEventListener('keydown', handleKeySkip);
    return () => {
      window.removeEventListener('click', handleSkip);
      window.removeEventListener('keydown', handleKeySkip);
    };
  }, [phase]);

  useEffect(() => {
    if (skipped && phase !== 'done') {
      setPhase('done');
      onComplete(buildFinalOutput());
    }
  }, [skipped, phase, onComplete, buildFinalOutput]);

  useEffect(() => {
    if (phase !== 'boot' || skipped) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines(prev => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setPhase('art');
      }
    }, 200);
    return () => clearInterval(interval);
  }, [phase, skipped]);

  useEffect(() => {
    if (phase !== 'art' || skipped) return;
    setShowHero(true);
    const t = setTimeout(() => {
      setPhase('done');
      onComplete(buildFinalOutput());
    }, 600);
    return () => clearTimeout(t);
  }, [phase, skipped, onComplete, buildFinalOutput]);

  if (phase === 'done') return null;

  return (
    <div className="terminal-body">
      {lines.map((line, i) => (
        <div key={i} className="output-line c-dimmed">
          {line}
        </div>
      ))}
      {showHero && <BootHero />}
      <div className="output-line c-dimmed" style={{ marginTop: '12px', fontSize: '11px', opacity: 0.4 }}>
        press any key to skip...
      </div>
    </div>
  );
}
