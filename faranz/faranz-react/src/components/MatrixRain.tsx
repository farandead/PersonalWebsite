import { useRef, useEffect, useCallback } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const FONT_SIZE = 14;
const FADE_ALPHA = 0.05;
const DROP_SPEED_MIN = 0.4;
const DROP_SPEED_MAX = 1.2;

interface MatrixRainProps {
  duration?: number;
  onComplete?: () => void;
  className?: string;
}

export default function MatrixRain({ duration = 5000, onComplete, className = '' }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const dropsRef = useRef<{ y: number; speed: number; char: string }[]>([]);
  const fadingRef = useRef(false);
  const opacityRef = useRef(1);

  const dismiss = useCallback(() => {
    if (fadingRef.current) return;
    fadingRef.current = true;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      canvas!.width = canvas!.offsetWidth * devicePixelRatio;
      canvas!.height = canvas!.offsetHeight * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
      initDrops();
    }

    function initDrops() {
      const cols = Math.ceil(canvas!.offsetWidth / FONT_SIZE);
      dropsRef.current = Array.from({ length: cols }, () => ({
        y: Math.random() * -canvas!.offsetHeight,
        speed: DROP_SPEED_MIN + Math.random() * (DROP_SPEED_MAX - DROP_SPEED_MIN),
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
      }));
    }

    resize();
    window.addEventListener('resize', resize);
    startRef.current = performance.now();

    function draw(now: number) {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      const elapsed = now - startRef.current;

      if (duration > 0 && elapsed > duration && !fadingRef.current) {
        fadingRef.current = true;
      }

      if (fadingRef.current) {
        opacityRef.current -= 0.025;
        if (opacityRef.current <= 0) {
          cancelAnimationFrame(animRef.current);
          onComplete?.();
          return;
        }
      }

      ctx!.fillStyle = `rgba(0, 0, 0, ${FADE_ALPHA})`;
      ctx!.fillRect(0, 0, w, h);

      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * FONT_SIZE;

        if (Math.random() > 0.96) {
          drop.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        const brightness = 180 + Math.floor(Math.random() * 75);
        ctx!.fillStyle = `rgba(0, ${brightness}, 65, ${opacityRef.current})`;
        ctx!.font = `${FONT_SIZE - 2}px 'JetBrains Mono', monospace`;
        ctx!.fillText(drop.char, x, drop.y);

        if (Math.random() > 0.92) {
          ctx!.fillStyle = `rgba(180, 255, 180, ${opacityRef.current * 0.9})`;
          ctx!.fillText(drop.char, x, drop.y);
        }

        drop.y += FONT_SIZE * drop.speed;

        if (drop.y > h + FONT_SIZE) {
          drop.y = Math.random() * -100;
          drop.speed = DROP_SPEED_MIN + Math.random() * (DROP_SPEED_MAX - DROP_SPEED_MIN);
          drop.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [duration, onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'q') dismiss();
    };
    const clickHandler = () => dismiss();
    window.addEventListener('keydown', handler);
    window.addEventListener('click', clickHandler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('click', clickHandler);
    };
  }, [dismiss]);

  return (
    <canvas
      ref={canvasRef}
      className={`matrix-rain ${className}`}
    />
  );
}
