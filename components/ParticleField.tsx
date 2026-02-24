"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    char: string;
    color: string;
}

const CHARS = "01001011001101010111001100101010110010110001011010".split("");
const HEX_CHARS = "0123456789ABCDEF".split("");
const COLORS = [
    "rgba(0, 212, 255, ",  // cyan
    "rgba(168, 85, 247, ", // purple
    "rgba(0, 255, 136, ",  // green
];

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        };

        resize();

        // Create particles
        const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
        const particles: Particle[] = [];

        for (let i = 0; i < count; i++) {
            const isHex = Math.random() > 0.6;
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 10 + 8,
                opacity: Math.random() * 0.15 + 0.05,
                char: isHex
                    ? HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]
                    : CHARS[Math.floor(Math.random() * CHARS.length)],
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            });
        }
        particlesRef.current = particles;

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", resize);

        // Animate
        const animate = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            particlesRef.current.forEach((p) => {
                // Mouse parallax influence
                const dx = mouseRef.current.x - p.x;
                const dy = mouseRef.current.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    const force = (200 - dist) / 200;
                    p.vx -= (dx / dist) * force * 0.02;
                    p.vy -= (dy / dist) * force * 0.02;
                }

                // Apply velocity
                p.x += p.vx;
                p.y += p.vy;

                // Damping
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Wrap around
                if (p.x < -20) p.x = window.innerWidth + 20;
                if (p.x > window.innerWidth + 20) p.x = -20;
                if (p.y < -20) p.y = window.innerHeight + 20;
                if (p.y > window.innerHeight + 20) p.y = -20;

                // Flicker
                const flicker = Math.sin(Date.now() * 0.001 + p.x * 0.01) * 0.02;

                // Draw
                ctx.font = `${p.size}px monospace`;
                ctx.fillStyle = `${p.color}${(p.opacity + flicker).toFixed(2)})`;
                ctx.fillText(p.char, p.x, p.y);
            });

            rafRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
}
