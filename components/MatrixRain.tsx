"use client";

import { useEffect, useRef } from "react";

const CHARS = "01アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF";

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = window.innerWidth;
        let h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;

        const fontSize = 14;
        const cols = Math.floor(w / fontSize);
        const drops: number[] = new Array(cols).fill(0).map(() => Math.random() * -100);

        const draw = () => {
            ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
            ctx.fillRect(0, 0, w, h);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < cols; i++) {
                const char = CHARS[Math.floor(Math.random() * CHARS.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Gradient from bright to dim
                const alpha = Math.random() * 0.15 + 0.02;
                const green = Math.random() > 0.95 ? "#00ff88" : `rgba(0, 255, 136, ${alpha})`;
                ctx.fillStyle = green;
                ctx.fillText(char, x, y);

                // Occasionally make a bright "head"
                if (Math.random() > 0.98) {
                    ctx.fillStyle = "rgba(0, 255, 255, 0.4)";
                    ctx.fillText(char, x, y);
                }

                if (y > h && Math.random() > 0.98) {
                    drops[i] = 0;
                }
                drops[i] += 0.5;
            }
        };

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-30"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
