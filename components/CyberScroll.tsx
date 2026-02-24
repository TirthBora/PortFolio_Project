"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import TextOverlay from "./TextOverlay";

const FRAME_COUNT = 192;
const SCROLL_HEIGHT = "500vh";

function getFramePath(index: number): string {
    const num = String(index + 1).padStart(3, "0");
    return `/security-sequence/ffout${num}.gif`;
}

export default function CyberScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadProgress, setLoadProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const currentFrameRef = useRef(-1);
    const rafRef = useRef<number>(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload all frames
    useEffect(() => {
        let loaded = 0;
        const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
        let cancelled = false;

        const loadImage = (index: number): Promise<void> => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    if (cancelled) return;
                    loadedImages[index] = img;
                    loaded++;
                    setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
                    if (loaded === FRAME_COUNT) {
                        setImages(loadedImages);
                        setIsLoaded(true);
                    }
                    resolve();
                };
                img.onerror = () => {
                    loaded++;
                    setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
                    resolve();
                };
                img.src = getFramePath(index);
            });
        };

        // Load in batches
        const batchSize = 20;
        const loadBatch = async (startIdx: number) => {
            const promises: Promise<void>[] = [];
            for (let i = startIdx; i < Math.min(startIdx + batchSize, FRAME_COUNT); i++) {
                promises.push(loadImage(i));
            }
            await Promise.all(promises);
            if (!cancelled && startIdx + batchSize < FRAME_COUNT) {
                loadBatch(startIdx + batchSize);
            }
        };

        loadBatch(0);
        return () => { cancelled = true; };
    }, []);

    // Draw frame on canvas — object-fit: cover, centered
    const drawFrame = useCallback(
        (index: number) => {
            if (!canvasRef.current || !images.length) return;
            const ctx = canvasRef.current.getContext("2d");
            if (!ctx) return;

            const safeIndex = Math.max(0, Math.min(Math.round(index), FRAME_COUNT - 1));
            if (safeIndex === currentFrameRef.current) return;
            currentFrameRef.current = safeIndex;

            const img = images[safeIndex];
            if (!img) return;

            const canvas = canvasRef.current;
            // Use CSS pixel dimensions for cover-fit math (DPR already handled by ctx.scale)
            const dpr = window.devicePixelRatio || 1;
            const cw = canvas.width / dpr;
            const ch = canvas.height / dpr;

            ctx.clearRect(0, 0, cw, ch);

            // object-fit: cover — scale up to fill, shift down so head doesn't clip
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const canvasRatio = cw / ch;
            const DOWNWARD_OFFSET = ch * 0.10; // push content 10% down

            let drawW: number, drawH: number, drawX: number, drawY: number;
            if (canvasRatio > imgRatio) {
                drawW = cw;
                drawH = cw / imgRatio;
                drawX = 0;
                drawY = (ch - drawH) / 2 + DOWNWARD_OFFSET;
            } else {
                drawH = ch;
                drawW = ch * imgRatio;
                drawX = (cw - drawW) / 2;
                drawY = DOWNWARD_OFFSET;
            }

            ctx.drawImage(img, drawX, drawY, drawW, drawH);
        },
        [images]
    );

    // Subscribe to frame changes
    useEffect(() => {
        if (!isLoaded) return;

        const unsubscribe = frameIndex.on("change", (v) => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => drawFrame(v));
        });

        drawFrame(0);

        return () => {
            unsubscribe();
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isLoaded, frameIndex, drawFrame]);

    // Resize canvas with proper DPR handling
    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current) return;
            const dpr = window.devicePixelRatio || 1;
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvasRef.current.width = w * dpr;
            canvasRef.current.height = h * dpr;
            canvasRef.current.style.width = `${w}px`;
            canvasRef.current.style.height = `${h}px`;
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) ctx.scale(dpr, dpr);
            currentFrameRef.current = -1; // force redraw
            if (isLoaded) drawFrame(0);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, drawFrame]);

    return (
        <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Canvas — reduced opacity so text overlays are clearly visible */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full opacity-70"
                    style={{ background: "#050505" }}
                />

                {/* Gradient overlays for seamless blending */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute top-0 left-0 right-0 h-40"
                        style={{
                            background: "linear-gradient(to bottom, #050505 0%, transparent 100%)",
                        }}
                    />
                    <div
                        className="absolute bottom-0 left-0 right-0 h-40"
                        style={{
                            background: "linear-gradient(to top, #050505 0%, transparent 100%)",
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "radial-gradient(ellipse at center, transparent 40%, #050505 100%)",
                        }}
                    />
                </div>

                {/* Text overlays */}
                <TextOverlay scrollProgress={smoothProgress} />

                {/* Loading overlay */}
                {!isLoaded && (
                    <motion.div
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center"
                        style={{ background: "#050505" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-24 h-24 mb-8">
                            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-spin-slow" />
                            <div
                                className="absolute inset-2 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin"
                                style={{ animationDuration: "1s" }}
                            />
                            <div
                                className="absolute inset-4 rounded-full border border-t-transparent border-r-purple-500 border-b-transparent border-l-transparent animate-spin"
                                style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            </div>
                        </div>
                        <div className="w-48 mb-4">
                            <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        background: "linear-gradient(90deg, #00d4ff, #a855f7)",
                                        width: `${loadProgress}%`,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>
                        <p className="text-white/40 text-xs tracking-[0.3em] uppercase font-light">
                            Initializing Secure Environment
                        </p>
                        <p className="text-cyan-400/60 text-xs mt-2 font-mono">
                            {loadProgress}%
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
