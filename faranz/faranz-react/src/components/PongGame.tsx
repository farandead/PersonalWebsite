import { useRef, useEffect, useState, useCallback } from 'react';

const COLS = 50;
const ROWS = 20;
const TICK_MS = 50;
const PADDLE_H = 5;
const WIN_SCORE = 7;

interface PongGameProps {
  onExit: (playerScore: number, aiScore: number) => void;
}

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

function buildFrame(
  ball: { x: number; y: number },
  p1: number,
  p2: number,
  s1: number,
  s2: number,
  over: boolean,
  winner: string,
): string {
  const grid: string[][] = [];
  for (let y = 0; y < ROWS; y++) {
    const row = new Array(COLS).fill(' ');
    if (y === 0 || y === ROWS - 1) row.fill('─');
    grid.push(row);
  }

  const mid = Math.floor(COLS / 2);
  for (let y = 1; y < ROWS - 1; y++) {
    grid[y][mid] = y % 2 === 0 ? '·' : ' ';
  }

  for (let i = 0; i < PADDLE_H; i++) {
    const y1 = p1 + i;
    const y2 = p2 + i;
    if (y1 >= 1 && y1 < ROWS - 1) grid[y1][1] = '█';
    if (y2 >= 1 && y2 < ROWS - 1) grid[y2][COLS - 2] = '█';
  }

  const bx = Math.round(ball.x);
  const by = Math.round(ball.y);
  if (bx >= 0 && bx < COLS && by >= 1 && by < ROWS - 1) {
    grid[by][bx] = '●';
  }

  const scoreBar = `  YOU: ${s1}` + ' '.repeat(COLS - 16) + `AI: ${s2}  `;

  const lines: string[] = [scoreBar, '┌' + '─'.repeat(COLS) + '┐'];
  for (let y = 0; y < ROWS; y++) {
    lines.push('│' + grid[y].join('') + '│');
  }
  lines.push('└' + '─'.repeat(COLS) + '┘');

  if (over) {
    lines.push(`  ${winner} wins!`);
  }

  return lines.join('\n');
}

export default function PongGame({ onExit }: PongGameProps) {
  const ballRef = useRef({ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) });
  const velRef = useRef({ dx: 1, dy: 0.5 });
  const p1Ref = useRef(Math.floor((ROWS - PADDLE_H) / 2));
  const p2Ref = useRef(Math.floor((ROWS - PADDLE_H) / 2));
  const s1Ref = useRef(0);
  const s2Ref = useRef(0);
  const overRef = useRef(false);
  const winnerRef = useRef('');
  const inputRef = useRef<'up' | 'down' | null>(null);

  const [frame, setFrame] = useState('');
  const [over, setOver] = useState(false);
  const [generation, setGeneration] = useState(0);

  const resetBall = useCallback((toRight: boolean) => {
    ballRef.current = { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) };
    const angle = (Math.random() * 0.8 - 0.4);
    velRef.current = { dx: toRight ? 1 : -1, dy: angle };
  }, []);

  const init = useCallback(() => {
    p1Ref.current = Math.floor((ROWS - PADDLE_H) / 2);
    p2Ref.current = Math.floor((ROWS - PADDLE_H) / 2);
    s1Ref.current = 0;
    s2Ref.current = 0;
    overRef.current = false;
    winnerRef.current = '';
    inputRef.current = null;
    setOver(false);
    resetBall(Math.random() > 0.5);
    setFrame(buildFrame(ballRef.current, p1Ref.current, p2Ref.current, 0, 0, false, ''));
  }, [resetBall]);

  useEffect(() => {
    init();

    function tick() {
      if (overRef.current) return;

      // Player paddle
      if (inputRef.current === 'up') {
        p1Ref.current = clamp(p1Ref.current - 1, 1, ROWS - 1 - PADDLE_H);
      } else if (inputRef.current === 'down') {
        p1Ref.current = clamp(p1Ref.current + 1, 1, ROWS - 1 - PADDLE_H);
      }

      // AI paddle - tracks ball with slight lag
      const aiCenter = p2Ref.current + PADDLE_H / 2;
      const diff = ballRef.current.y - aiCenter;
      if (Math.abs(diff) > 1) {
        p2Ref.current = clamp(p2Ref.current + (diff > 0 ? 1 : -1), 1, ROWS - 1 - PADDLE_H);
      }

      // Ball movement
      const ball = ballRef.current;
      const vel = velRef.current;
      ball.x += vel.dx;
      ball.y += vel.dy;

      // Top/bottom bounce
      if (ball.y <= 1) { ball.y = 1; vel.dy = Math.abs(vel.dy); }
      if (ball.y >= ROWS - 2) { ball.y = ROWS - 2; vel.dy = -Math.abs(vel.dy); }

      // Player paddle hit
      if (ball.x <= 2 && ball.y >= p1Ref.current && ball.y < p1Ref.current + PADDLE_H) {
        ball.x = 2;
        vel.dx = Math.abs(vel.dx) * 1.05;
        const hit = (ball.y - p1Ref.current - PADDLE_H / 2) / (PADDLE_H / 2);
        vel.dy = hit * 1.2;
      }

      // AI paddle hit
      if (ball.x >= COLS - 3 && ball.y >= p2Ref.current && ball.y < p2Ref.current + PADDLE_H) {
        ball.x = COLS - 3;
        vel.dx = -Math.abs(vel.dx) * 1.05;
        const hit = (ball.y - p2Ref.current - PADDLE_H / 2) / (PADDLE_H / 2);
        vel.dy = hit * 1.2;
      }

      // Clamp speed
      const spd = Math.sqrt(vel.dx * vel.dx + vel.dy * vel.dy);
      const maxSpd = 2.5;
      if (spd > maxSpd) { vel.dx *= maxSpd / spd; vel.dy *= maxSpd / spd; }

      // Scoring
      if (ball.x <= 0) {
        s2Ref.current++;
        if (s2Ref.current >= WIN_SCORE) {
          overRef.current = true;
          winnerRef.current = 'AI';
          setOver(true);
        } else {
          resetBall(true);
        }
      } else if (ball.x >= COLS - 1) {
        s1Ref.current++;
        if (s1Ref.current >= WIN_SCORE) {
          overRef.current = true;
          winnerRef.current = 'YOU';
          setOver(true);
        } else {
          resetBall(false);
        }
      }

      setFrame(buildFrame(ball, p1Ref.current, p2Ref.current, s1Ref.current, s2Ref.current, overRef.current, winnerRef.current));
    }

    const interval = setInterval(tick, TICK_MS);
    return () => clearInterval(interval);
  }, [generation, init, resetBall]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'q') { onExit(s1Ref.current, s2Ref.current); return; }

      if (overRef.current) {
        if (e.key === 'r' || e.key === 'R' || e.key === ' ') setGeneration(g => g + 1);
        return;
      }

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'k') inputRef.current = 'up';
      else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'j') inputRef.current = 'down';

      if (['ArrowUp', 'ArrowDown', ' '].includes(e.key)) e.preventDefault();
    };

    const up = (e: KeyboardEvent) => {
      if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'k') && inputRef.current === 'up') inputRef.current = null;
      if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'j') && inputRef.current === 'down') inputRef.current = null;
    };

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [onExit]);

  return (
    <div className="terminal-body snake-term">
      <pre className="c-accent1">{'  ╔═══════════════════════════╗\n  ║         P O N G           ║\n  ╚═══════════════════════════╝'}</pre>
      <pre className="snake-board">{frame}</pre>
      {over && (
        <div className="snake-status">
          <span className="c-accent5">Press <span className="c-accent3">r</span> to rematch</span>
        </div>
      )}
      <div className="c-dimmed snake-controls">
        <span>Paddle: <span className="c-accent3">w/s</span> / <span className="c-accent3">↑↓</span></span>
        <span>  First to <span className="c-accent3">{WIN_SCORE}</span> wins</span>
        <span>  Quit: <span className="c-accent3">q</span> / <span className="c-accent3">esc</span></span>
      </div>
    </div>
  );
}
