import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      life: number;
      maxLife: number;
    }> = [];

    // Colors matching the premium "AU Toolkit" palette
    const colors = ['#e6cc98', '#ffffff', '#c8a96e', '#8a6f3a', '#cca66b'];

    let mouseX = -100;
    let mouseY = -100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Glitter emit function
    const emitParticles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        // Random direction and velocity
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 1.5 + 0.2;
        
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          size: Math.random() * 2 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.cos(angle) * velocity,
          speedY: Math.sin(angle) * velocity - 0.5, // slight upward float
          life: 0,
          maxLife: Math.random() * 30 + 15
        });
      }
    };

    let lastTime = 0;
    let prevX = -100;
    let prevY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Calculate distance to emit smooth trail
      if (prevX > 0 && prevY > 0) {
        const dx = mouseX - prevX;
        const dy = mouseY - prevY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Emit more particles if moving fast, but cap it so it doesn't drop frames
        const emitCount = Math.min(Math.floor(distance / 8), 5);
        
        if (emitCount > 0) {
          for (let i = 0; i < emitCount; i++) {
            const t = i / emitCount;
            emitParticles(prevX + dx * t, prevY + dy * t, 3);
          }
        }
      }

      prevX = mouseX;
      prevY = mouseY;
    };

    let animationFrameId: number;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      // const deltaTime = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.speedX;
        p.y += p.speedY;
        // Gravity / float effect
        p.speedY += 0.02; // slight gravity
        p.speedX *= 0.98; // friction
        
        p.life++;

        const progress = p.life / p.maxLife;
        // Alpha fades out smoothly
        const alpha = Math.max(0, 1 - progress);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        
        // Occasional sparkle
        if (Math.random() > 0.8 && alpha > 0.5) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Filter out dead particles
      particles = particles.filter(p => p.life < p.maxLife);

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ mixBlendMode: 'plus-lighter' }}
      />
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-[22px] h-[22px] rounded-full pointer-events-none z-[9999] bg-[#cbb07e]/30 border-[1.5px] border-[#8a6f3a]/40 backdrop-blur-[3px] shadow-[0_2px_10px_rgba(138,111,58,0.2)] -ml-[11px] -mt-[11px] transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
};
