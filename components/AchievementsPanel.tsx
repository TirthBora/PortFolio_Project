"use client";

import { motion } from "framer-motion";

interface Achievement {
    title: string;
    description: string;
    level: "international" | "national" | "regional";
    icon: string;
    year?: string;
}

const achievements: Achievement[] = [
    {
        title: "International Abacus Competition",
        description: "Represented at the international level in mental arithmetic and abacus competition — competing against 50+ countries.",
        level: "international",
        icon: "🌍",
        year: "2019",
    },
    {
        title: "Winner — AI Solutions Track",
        description: "Code2Create hackathon — Built an AI-driven solution in a competitive 48-hour coding sprint with 200+ participants.",
        level: "national",
        icon: "🏆",
        year: "2024",
    },
    {
        title: "National-Level Academic Awards",
        description: "Multiple recognitions at national-level academic and technical competitions across cybersecurity and data science.",
        level: "national",
        icon: "🥇",
        year: "2023",
    },
    {
        title: "Regional Excellence Awards",
        description: "Awarded for outstanding performance in regional academic competitions, olympiads, and STEM events.",
        level: "regional",
        icon: "⭐",
        year: "2022",
    },
];

const levelColors: Record<string, string> = {
    international: "#FFD700",
    national: "#00d4ff",
    regional: "#a855f7",
};

const levelLabels: Record<string, string> = {
    international: "INTERNATIONAL",
    national: "NATIONAL",
    regional: "REGIONAL",
};

export default function AchievementsPanel() {
    return (
        <section className="relative z-10 py-32 px-6">
            <div className="max-w-[96rem] mx-auto">
                {/* Section header */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-xs font-mono tracking-[0.3em] mb-4" style={{ color: "#FFD70080" }}>
                        {"$ cat /var/log/achievements.log"}
                    </p>
                    <motion.h2
                        className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 bg-clip-text text-transparent"
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: "200% 200%" }}
                    >
                        Achievements
                    </motion.h2>
                    <p className="text-white/30 text-sm font-light max-w-lg">
                        Trophies unlocked. Each milestone earned through skill, persistence, and code.
                    </p>
                </motion.div>

                {/* Achievement cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => {
                        const color = levelColors[achievement.level];
                        return (
                            <motion.div
                                key={index}
                                className="group relative overflow-hidden rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
                                style={{
                                    background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(5,5,5,0.9) 100%)",
                                }}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {/* Card header */}
                                <div className="flex items-center gap-2 px-6 py-3 border-b border-white/[0.04] bg-white/[0.01]">
                                    <span className="text-lg">{achievement.icon}</span>
                                    <span className="text-white/20 text-[10px] font-mono tracking-wider">
                                        achievement_{String(index + 1).padStart(2, "0")}.log
                                    </span>
                                    <span
                                        className="ml-auto text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full border"
                                        style={{
                                            color: color,
                                            borderColor: `${color}22`,
                                            backgroundColor: `${color}08`,
                                        }}
                                    >
                                        {levelLabels[achievement.level]}
                                    </span>
                                </div>

                                <div className="p-8 sm:p-10">
                                    {/* Year badge */}
                                    {achievement.year && (
                                        <p className="text-white/20 text-[11px] font-mono tracking-wider mb-3">
                                            [{achievement.year}]
                                        </p>
                                    )}

                                    <h3 className="text-xl sm:text-2xl text-white/90 font-semibold tracking-tight mb-3">
                                        {achievement.title}
                                    </h3>
                                    <p className="text-white/40 text-base font-light leading-relaxed">
                                        {achievement.description}
                                    </p>
                                </div>

                                {/* Glow */}
                                <div
                                    className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-700"
                                    style={{
                                        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
