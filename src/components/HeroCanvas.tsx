import React, { useEffect, useRef } from "react";

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const exprs = [
      'wiggle(3, 15)',
      'loopOut("pingpong")',
      'loopOut("cycle")',
      'sourceRectAtTime()',
      'linear(time, 0, 1)',
      'Math.round(value)',
      'thisComp.layer("Ctrl")',
      'effect("Slider")("Slider")',
      'time * 360',
      'posterizeTime(12)',
      'var fps = 24;',
      'value + [50, 0]',
      'transform.position',
      'thisLayer.inPoint',
      'comp("Main")',
      'numLayers',
      'timeToFrames(time)',
      '// ExtendScript',
      'app.project.activeItem',
      'effect("Scale")(1)',
      'easeIn(t, t1, t2, v1, v2)',
      'degreesToRadians(45)',
      'framesToTime(24)',
      'thisComp.width / 2',
      'opacity * 0.5',
      'key(1).time',
      'nearestKey(time)',
      'loopIn("cycle")',
      'length(a, b)',
      'random(0, 100)',
      'seedRandom(1, true)',
      'thisComp.name',
      'comp.frameDuration',
    ];

    const colors = [
      [200, 169, 110], // warm gold
      [90, 127, 168],  // cyan
      [148, 113, 196], // violet
      [92, 158, 138],  // jade green
      [192, 96, 96],   // rose
    ];

    const particles = Array.from({ length: 42 }, (_, i) => {
      const col = colors[i % colors.length];
      return {
        text: exprs[Math.floor(Math.random() * exprs.length)],
        x: Math.random() * (canvas.width || window.innerWidth),
        y: Math.random() * (canvas.height || window.innerHeight) * 1.5,
        vy: -(Math.random() * 0.25 + 0.1),
        opacity: Math.random() * 0.28 + 0.12,
        fontSize: Math.floor(Math.random() * 5 + 11),
        col: col,
      };
    });

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.vy;
        
        // Wrap around vertically
        if (p.y < -40) {
          p.y = canvas.height + 60;
          p.x = Math.random() * canvas.width;
          p.text = exprs[Math.floor(Math.random() * exprs.length)];
          p.opacity = Math.random() * 0.28 + 0.12;
          p.fontSize = Math.floor(Math.random() * 5 + 11);
        }

        ctx.font = `400 ${p.fontSize}px "JetBrains Mono", monospace`;
        const [r, g, b] = p.col;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
        
        // parallax shift
        const renderY = p.y - scrollY * 0.18;
        ctx.fillText(p.text, p.x, renderY);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none block"
    />
  );
};
