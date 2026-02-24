"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    href?: string;
    className?: string;
}

export default function MagneticButton({
    children,
    href,
    className = "",
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const x = useSpring(0, { stiffness: 300, damping: 20 });
    const y = useSpring(0, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.3);
        y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setHovered(false);
    };

    const Tag = href ? "a" : "div";

    return (
        <motion.div
            ref={ref}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
        >
            <Tag
                href={href}
                className={`glass px-8 py-4 inline-flex items-center gap-3 cursor-pointer transition-all duration-300 group ${hovered ? "border-glow" : ""
                    } ${className}`}
            >
                <span className="text-white/70 text-sm tracking-wider font-light group-hover:text-white/90 transition-colors">
                    {children}
                </span>
                <motion.span
                    className="text-cyber-blue/60 group-hover:text-cyber-blue transition-colors"
                    animate={{ x: hovered ? 4 : 0 }}
                >
                    →
                </motion.span>
            </Tag>
        </motion.div>
    );
}
