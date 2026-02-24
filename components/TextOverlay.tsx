"use client";

import { useTransform, motion, MotionValue } from "framer-motion";

interface TextOverlayProps {
    scrollProgress: MotionValue<number>;
}

interface Beat {
    title: string;
    subtitle: string;
    tag?: string;
    range: [number, number, number, number];
}

const beats: Beat[] = [
    {
        title: "Securing The\nDigital Future",
        subtitle: "Information Security  ·  Ethical Hacking  ·  Cyber Defense",
        tag: "// SYSTEM.INIT",
        range: [0.0, 0.05, 0.15, 0.2],
    },
    {
        title: "Threats Are\nEvolving",
        subtitle: "So must defense.",
        tag: "// ALERT.DETECTED",
        range: [0.25, 0.3, 0.4, 0.45],
    },
    {
        title: "Building\nIntelligent Security",
        subtitle: "AI-driven cyber protection and proactive defense.",
        tag: "// AI.DEFENSE.ACTIVE",
        range: [0.5, 0.55, 0.65, 0.7],
    },
    {
        title: "Let's Build Secure\nSystems Together",
        subtitle: "Explore my projects and skills.",
        tag: "// CONNECTION.READY",
        range: [0.75, 0.8, 0.9, 0.95],
    },
];

function BeatOverlay({
    beat,
    scrollProgress,
}: {
    beat: Beat;
    scrollProgress: MotionValue<number>;
}) {
    const [fadeIn, full, fadeOutStart, fadeOutEnd] = beat.range;

    const opacity = useTransform(
        scrollProgress,
        [fadeIn, full, fadeOutStart, fadeOutEnd],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollProgress,
        [fadeIn, full, fadeOutStart, fadeOutEnd],
        [60, 0, 0, -40]
    );

    const scale = useTransform(
        scrollProgress,
        [fadeIn, full, fadeOutStart, fadeOutEnd],
        [0.95, 1, 1, 0.98]
    );

    const tagOpacity = useTransform(
        scrollProgress,
        [fadeIn, fadeIn + 0.03, fadeOutStart, fadeOutEnd],
        [0, 0.5, 0.5, 0]
    );

    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
            style={{ opacity, paddingTop: "15vh" }}
        >
            {/* Tag */}
            {beat.tag && (
                <motion.p
                    className="text-cyber-green/50 text-xs sm:text-sm font-mono tracking-[0.25em] mb-6"
                    style={{ opacity: tagOpacity }}
                >
                    {beat.tag}
                </motion.p>
            )}

            {/* Title */}
            <motion.h2
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white/95 text-center leading-[0.95] tracking-tight"
                style={{ y, scale }}
            >
                {beat.title.split("\n").map((line, i) => (
                    <span key={i} className="block">
                        {line}
                    </span>
                ))}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                className="text-sm sm:text-base md:text-lg text-white/50 mt-6 sm:mt-8 text-center tracking-wide max-w-xl font-light"
                style={{ y, opacity }}
            >
                {beat.subtitle}
            </motion.p>

            {/* Decorative line */}
            <motion.div
                className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent"
                style={{
                    width: "120px",
                    opacity,
                }}
            />
        </motion.div>
    );
}

export default function TextOverlay({ scrollProgress }: TextOverlayProps) {
    return (
        <div className="absolute inset-0 z-10">
            {beats.map((beat, index) => (
                <BeatOverlay
                    key={index}
                    beat={beat}
                    scrollProgress={scrollProgress}
                />
            ))}
        </div>
    );
}
