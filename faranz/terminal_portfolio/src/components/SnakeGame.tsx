import { useRef, useEffect, useState, useCallback } from 'react';

const COLS = 40;
const ROWS = 20;
const TICK_MS = 120;

type Dir = 'up' | 'down' | 'left' | 'right';
type Point = { x: number; y: number };

interface SnakeGameProps {
  onExit: (finalScore: number) => void;
}

function placeFood(snake: Point[]): Point {
  let pos: Point;
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

function buildFrame(snake: Point[], food: Point, score: number, dead: boolean): string {
  const grid: string[][] = [];
  for (let y = 0; y < ROWS; y++) {
    grid.push(new Array(COLS).fill(' '));
  }

  grid[food.y][food.x] = '◆';

  for (let i = 0; i < snake.length; i++) {
    const s = snake[i];
    if (s.x >= 0 && s.x < COLS && s.y >= 0 && s.y < ROWS) {
      grid[s.y][s.x] = i === snake.length - 1 ? '@' : '█';
    }
  }

  const top = '┌' + '─'.repeat(COLS) + '┐';
  const bot = '└' + '─'.repeat(COLS) + '┘';
  const lines: string[] = [top];
  for (let y = 0; y < ROWS; y++) {
    lines.push('│' + grid[y].join('') + '│');
  }
  lines.push(bot);

  const scoreStr = ` Score: ${score}`;
  const status = dead ? '  GAME OVER' : '';
  lines.push(scoreStr + status);

  return lines.join('\n');
}

export default function SnakeGame({ onExit }: SnakeGameProps) {
  const dirRef = useRef<Dir>('right');
  const nextDirRef = useRef<Dir>('right');
  const snakeRef = useRef<Point[]>([]);
  const foodRef = useRef<Point>({ x: 0, y: 0 });
  const scoreRef = useRef(0);
  const deadRef = useRef(false);

  const [frame, setFrame] = useState('');
  const [dead, setDead] = useState(false);
  const [generation, setGeneration] = useState(0);

  const init = useCallback(() => {
    const startY = Math.floor(ROWS / 2);
    const startX = Math.floor(COLS / 4);
    const snake: Point[] = [];
    for (let i = 2; i >= 0; i--) snake.push({ x: startX - i, y: startY });
    snakeRef.current = snake;
    foodRef.current = placeFood(snake);
    dirRef.current = 'right';
    nextDirRef.current = 'right';
    scoreRef.current = 0;
    deadRef.current = false;
    setDead(false);
    setFrame(buildFrame(snake, foodRef.current, 0, false));
  }, []);

  useEffect(() => {
    init();

    function tick() {
      if (deadRef.current) return;
      dirRef.current = nextDirRef.current;
      const snake = snakeRef.current;
      const head = snake[snake.length - 1];
      const next: Point = { ...head };

      if (dirRef.current === 'up') next.y--;
      else if (dirRef.current === 'down') next.y++;
      else if (dirRef.current === 'left') next.x--;
      else next.x++;

      if (
        next.x < 0 || next.x >= COLS ||
        next.y < 0 || next.y >= ROWS ||
        snake.some(s => s.x === next.x && s.y === next.y)
      ) {
        deadRef.current = true;
        setDead(true);
        const sc = scoreRef.current;
        const prev = parseInt(localStorage.getItem('snake-highscore') || '0', 10);
        if (sc > prev) localStorage.setItem('snake-highscore', String(sc));
        setFrame(buildFrame(snake, foodRef.current, sc, true));
        return;
      }

      snake.push(next);
      if (next.x === foodRef.current.x && next.y === foodRef.current.y) {
        scoreRef.current++;
        foodRef.current = placeFood(snake);
      } else {
        snake.shift();
      }
      setFrame(buildFrame(snake, foodRef.current, scoreRef.current, false));
    }

    const interval = setInterval(tick, TICK_MS);
    return () => clearInterval(interval);
  }, [generation, init]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'q') {
        onExit(scoreRef.current);
        return;
      }

      if (deadRef.current) {
        if (e.key === 'r' || e.key === 'R' || e.key === ' ') {
          setGeneration(g => g + 1);
        }
        return;
      }

      const dir = dirRef.current;
      if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'k') && dir !== 'down') nextDirRef.current = 'up';
      else if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'j') && dir !== 'up') nextDirRef.current = 'down';
      else if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'h') && dir !== 'right') nextDirRef.current = 'left';
      else if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'l') && dir !== 'left') nextDirRef.current = 'right';

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onExit]);

  const highScore = parseInt(localStorage.getItem('snake-highscore') || '0', 10);

  return (
    <div className="terminal-body snake-term">
      <pre className="c-accent1">{'  ╔═══════════════════════════╗\n  ║        S N A K E          ║\n  ╚═══════════════════════════╝'}</pre>
      <pre className="snake-board">{frame}</pre>
      <div className="snake-status">
        <span className="c-dimmed">High: <span className="c-accent4">{Math.max(highScore, scoreRef.current)}</span></span>
        {dead && (
          <span className="c-accent5"> │ Press <span className="c-accent3">r</span> to restart</span>
        )}
      </div>
      <div className="c-dimmed snake-controls">
        <span>Move: <span className="c-accent3">wasd</span> / <span className="c-accent3">arrows</span> / <span className="c-accent3">hjkl</span></span>
        <span>  Quit: <span className="c-accent3">q</span> / <span className="c-accent3">esc</span></span>
      </div>
    </div>
  );
}
