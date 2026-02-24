"use client";

import { motion } from "framer-motion";

interface TimelineEntry {
    period: string;
    degree: string;
    institution: string;
    detail?: string;
    color: string;
    icon: string;
}

const education: TimelineEntry[] = [
    {
        period: "2023 — Present",
        degree: "B.Tech CSE (Data Science)",
        institution: "VIT Vellore",
        detail: "Specialization in Data Science with focus on Cybersecurity, AI & Machine Learning",
        color: "#00d4ff",
        icon: "🎓",
    },
    {
        period: "2023 — Present",
        degree: "BS in Data Science and Applications",
        institution: "IIT Madras",
        detail: "Online degree program — Foundation level completed with distinction",
        color: "#a855f7",
        icon: "📊",
    },
    {
        period: "2021 — 2023",
        degree: "Higher Secondary (12th)",
        institution: "Junior College",
        detail: "Science stream — Mathematics and Computer Science",
        color: "#00fff0",
        icon: "📚",
    },
    {
        period: "2019 — 2021",
        degree: "Secondary (10th)",
        institution: "Hutchings High School",
        detail: "Foundation in Science and Mathematics — National level awards",
        color: "#00ff88",
        icon: "🏫",
    },
];

export default function EducationPanel() {
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
                    <p className="text-cyber-blue/50 text-xs font-mono tracking-[0.3em] mb-4">
                        {"$ git log --education --oneline"}
                    </p>
                    <motion.h2
                        className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent"
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: "200% 200%" }}
                    >
                        Education
                    </motion.h2>
                    <p className="text-white/30 text-sm font-light max-w-lg">
                        Commit history of knowledge acquisition and skill development.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyber-blue/30 via-cyber-purple/20 to-transparent" />

                    {education.map((entry, index) => (
                        <motion.div
                            key={index}
                            className={`relative flex flex-col md:flex-row items-start mb-20 last:mb-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                                <div
                                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                                    style={{
                                        borderColor: entry.color,
                                        backgroundColor: `${entry.color}15`,
                                        boxShadow: `0 0 20px ${entry.color}30, 0 0 40px ${entry.color}10`,
                                    }}
                                >
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: entry.color }}
                                    />
                                </div>
                            </div>

                            {/* Content card */}
                            <div
                                className={`ml-20 md:ml-0 md:w-[44%] ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                                    }`}
                            >
                                <div
                                    className="rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 group overflow-hidden"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(5,5,5,0.9) 100%)",
                                    }}
                                >
                                    {/* Card header */}
                                    <div className="flex items-center gap-3 px-6 py-3 border-b border-white/[0.04] bg-white/[0.01]">
                                        <span className="text-lg">{entry.icon}</span>
                                        <span
                                            className="text-[11px] font-mono tracking-wider"
                                            style={{ color: `${entry.color}90` }}
                                        >
                                            {entry.period}
                                        </span>
                                    </div>

                                    <div className="p-6 sm:p-8">
                                        <h3 className="text-xl sm:text-2xl text-white/90 font-semibold tracking-tight mb-2">
                                            {entry.degree}
                                        </h3>
                                        <p className="text-white/50 text-base mb-4">{entry.institution}</p>
                                        {entry.detail && (
                                            <p className="text-white/30 text-sm font-light leading-relaxed">
                                                {entry.detail}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
