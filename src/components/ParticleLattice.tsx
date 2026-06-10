import React, { useEffect, useRef, useState } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
}

export default function ParticleLattice() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Projection and rotation angles
  const angleXRef = useRef<number>(-0.35);
  const angleYRef = useRef<number>(0.45);
  const targetAngleXRef = useRef<number>(-0.35);
  const targetAngleYRef = useRef<number>(0.45);

  // Drag interaction states
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Generate 3D points in a neat interlocking cube lattice structure
  const pointsRef = useRef<Point3D[]>([]);

  useEffect(() => {
    // Generate standard 3D double/triple cube lattice grid
    const points: Point3D[] = [];
    const spacing = 1.0;
    const countX = 3;
    const countY = 3;
    const countZ = 3;

    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        for (let z = 0; z < countZ; z++) {
          // Centered around 0
          const px = (x - (countX - 1) / 2) * spacing;
          const py = (y - (countY - 1) / 2) * spacing;
          const pz = (z - (countZ - 1) / 2) * spacing;

          // Introduce minor creative offsets to look like handcrafted tech drafting
          const jitter = 0.04;
          const rx = px + (Math.random() - 0.5) * jitter;
          const ry = py + (Math.random() - 0.5) * jitter;
          const rz = pz + (Math.random() - 0.5) * jitter;

          points.push({
            x: rx,
            y: ry,
            z: rz,
            baseX: rx,
            baseY: ry,
            baseZ: rz,
          });
        }
      }
    }
    pointsRef.current = points;
  }, []);

  // Resize and Canvas handling
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId: number;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    // Initialize dimensions
    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    const ctx = canvas.getContext("2d");

    // Live Render Loop
    const render = () => {
      if (!ctx || !canvas) return;

      // Damp/Smooth camera rotations
      angleXRef.current += (targetAngleXRef.current - angleXRef.current) * 0.08;
      angleYRef.current += (targetAngleYRef.current - angleYRef.current) * 0.08;

      // Slowly rotate continuously unless dragging
      if (!isDraggingRef.current) {
        targetAngleYRef.current += 0.0012;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      // scale for HighDPI
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const cosX = Math.cos(angleXRef.current);
      const sinX = Math.sin(angleXRef.current);
      const cosY = Math.cos(angleYRef.current);
      const sinY = Math.sin(angleYRef.current);

      const centerX = width / 2;
      const centerY = height / 2;

      // Adjust scale size matching smaller layouts beautifully
      const baseScale = Math.min(width, height) * 0.28;
      const cameraDistance = 3.8;

      // Project all coordinates
      const projected = pointsRef.current.map((pt) => {
        // Slow float wave animation to make points feel "live"
        const time = Date.now() * 0.001;
        const offset = Math.sin(time + pt.baseX * 2) * 0.03;
        
        const curX = pt.baseX + offset;
        const curY = pt.baseY + offset;
        const curZ = pt.baseZ + Math.cos(time + pt.baseY * 2) * 0.03;

        // Apply mouse magnetic attraction logic
        let dX = curX;
        let dY = curY;
        let dZ = curZ;

        // Y rotation
        let x1 = dX * cosY - dZ * sinY;
        let z1 = dX * sinY + dZ * cosY;

        // X rotation
        let y2 = dY * cosX - z1 * sinX;
        let z2 = dY * sinX + z1 * cosX;

        // Projected onto 2D viewport
        const perspective = cameraDistance / (cameraDistance + z2);
        const px = x1 * perspective * baseScale + centerX;
        const py = y2 * perspective * baseScale + centerY;

        return {
          px,
          py,
          depth: z2, // Store depth for z-indexing / shading
          alpha: Math.max(0.08, Math.min(0.85, (cameraDistance - z2) / (cameraDistance * 1.5))),
          size: Math.max(1, Math.min(4.5, (cameraDistance - z2) * 1.0))
        };
      });

      // Connections Logic: Connect vertices if distance in 3D space is close
      // Threshold 1.15 to connect adjacent nodes cleanly
      const connectionThresholdSq = 1.12 * 1.12;

      ctx.lineWidth = 0.5;

      for (let i = 0; i < pointsRef.current.length; i++) {
        for (let j = i + 1; j < pointsRef.current.length; j++) {
          const ptA = pointsRef.current[i];
          const ptB = pointsRef.current[j];

          // Compute 3D distance squared
          const dx = ptA.baseX - ptB.baseX;
          const dy = ptA.baseY - ptB.baseY;
          const dz = ptA.baseZ - ptB.baseZ;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectionThresholdSq) {
            const pA = projected[i];
            const pB = projected[j];

            // Blend depth values for line gradients
            const avgAlpha = (pA.alpha + pB.alpha) * 0.25;

            // Render thin connected lattice line
            ctx.beginPath();
            ctx.strokeStyle = `rgba(18, 18, 18, ${avgAlpha})`;
            
            // Retro-tech styled dotted and continuous lines blended by distance
            if (distSq > 0.9) {
              ctx.setLineDash([1.5, 3]);
            } else {
              ctx.setLineDash([]);
            }
            
            ctx.moveTo(pA.px, pB.py);
            ctx.lineTo(pB.px, pB.py); // Keep standard orthogonal connections or draw actual perspective line
            // Wait, we want to draw a real line between the actual projected points
            ctx.beginPath();
            ctx.moveTo(pA.px, pA.py);
            ctx.lineTo(pB.px, pB.py);
            ctx.stroke();
          }
        }
      }

      // Restore line dashes for nodes
      ctx.setLineDash([]);

      // Draw point-cloud joint nodes
      projected.forEach((p) => {
        ctx.beginPath();
        // Render core point
        ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 14, 14, ${p.alpha * 1.1})`;
        ctx.fill();

        // Render subtle radar/telemetry aura rings on closer points
        if (p.depth < -0.3) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * 2.8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(14, 14, 14, ${p.alpha * 0.15})`;
          ctx.stroke();
        }
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  // Pointer Interactivity handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };

    if (!isDraggingRef.current) {
      // Normal pointer movement subtle camera offset
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
        const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
        targetAngleYRef.current = angleYRef.current + relativeX * 0.15;
        targetAngleXRef.current = angleXRef.current + relativeY * 0.15;
      }
      return;
    }

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    targetAngleYRef.current += deltaX * 0.007;
    targetAngleXRef.current += deltaY * 0.007;

    // Strict rotation clamping to prevent complete inversion confusion
    targetAngleXRef.current = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, targetAngleXRef.current));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] md:h-[480px] lg:h-[540px] cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      <canvas ref={canvasRef} className="block w-full h-full" id="canvas_mesh3d" />
      
      {/* Decorative subtle coordinates indicators for ultra-elevated technical branding */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-charcoal/30 select-none">
        <span className="inline-block w-1.5 h-1.5 bg-charcoal/20 rounded-full animate-pulse-slow"></span>
        <span>LAT_MESH.V_3.5 (LIVE_ROTATION)</span>
      </div>
      <div className="absolute bottom-2 right-2 flex items-center gap-2 font-mono text-[9px] tracking-widest text-[#0e0e0e]/40 select-none">
        <span>X: {angleXRef.current.toFixed(2)}</span>
        <span>Y: {angleYRef.current.toFixed(2)}</span>
      </div>
    </div>
  );
}
