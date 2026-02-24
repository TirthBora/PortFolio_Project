"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorGlow() {
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useSpring(0, { stiffness: 300, damping: 30 });
    const cursorY = useSpring(0, { stiffness: 300, damping: 30 });

    useEffect(() => {
        // Only show on non-touch devices
        const isTouchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            {/* Outer glow */}
            <div
                className="w-[300px] h-[300px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(0,212,255,0.08) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)",
                }}
            />
            {/* Inner glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
                }}
            />
        </motion.div>
    );
}
