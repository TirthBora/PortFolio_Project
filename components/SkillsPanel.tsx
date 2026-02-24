"use client";

import { motion, Variants } from "framer-motion";

interface SkillCategory {
    title: string;
    tag: string;
    skills: { name: string; level: number }[];
    color: string;
}

const skillCategories: SkillCategory[] = [
    {
        title: "Programming",
        tag: "LANG",
        skills: [
            { name: "Python", level: 90 },
            { name: "Java", level: 75 },
            { name: "JavaScript", level: 85 },
            { name: "Pascal", level: 60 },
            { name: "C", level: 70 },
            { name: "C++", level: 72 },
        ],
        color: "#00d4ff",
    },
    {
        title: "Web Technologies",
        tag: "WEB",
        skills: [
            { name: "HTML", level: 95 },
            { name: "CSS", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "React", level: 80 },
            { name: "Next.js", level: 75 },
        ],
        color: "#a855f7",
    },
    {
        title: "Databases",
        tag: "DB",
        skills: [
            { name: "SQL", level: 85 },
            { name: "MySQL", level: 80 },
            { name: "PostgreSQL", level: 70 },
        ],
        color: "#00ff88",
    },
    {
        title: "Tools & Platforms",
        tag: "TOOLS",
        skills: [
            { name: "Git", level: 85 },
            { name: "VS Code", level: 95 },
            { name: "Linux", level: 80 },
            { name: "Wireshark", level: 75 },
        ],
        color: "#ff6b35",
    },
    {
        title: "Core CS",
        tag: "CORE",
        skills: [
            { name: "DSA", level: 80 },
            { name: "OOP", level: 85 },
            { name: "DBMS", level: 78 },
            { name: "Networks", level: 82 },
        ],
        color: "#00fff0",
    },
    {
        title: "Analytical",
        tag: "MATH",
        skills: [
            { name: "Logic", level: 90 },
            { name: "Statistics", level: 78 },
            { name: "Probability", level: 75 },
            { name: "Linear Algebra", level: 72 },
        ],
        color: "#ffd700",
    },
    {
        title: "Interests",
        tag: "INT",
        skills: [
            { name: "Robotics", level: 70 },
            { name: "AI/ML", level: 75 },
            { name: "Cybersecurity", level: 88 },
            { name: "Ethical Hacking", level: 82 },
        ],
        color: "#ff3366",
    },
];

const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function SkillsPanel() {
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
                        {"$ nmap --skill-scan"}
                    </p>
                    <motion.h2
                        className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: "200% 200%" }}
                    >
                        Technical Arsenal
                    </motion.h2>
                    <p className="text-white/30 text-sm font-light max-w-lg">
                        Scanning ports... 7 skill modules detected. Running vulnerability assessment.
                    </p>
                </motion.div>

                {/* Skills grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {skillCategories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={cardVariants}
                            className="group relative overflow-hidden rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
                            style={{
                                background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(5,5,5,0.9) 100%)",
                            }}
                        >
                            {/* Terminal header */}
                            <div className="flex items-center gap-2 px-5 py-2.5 border-b border-white/[0.04] bg-white/[0.01]">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${category.color}60` }} />
                                <span className="text-white/25 text-[10px] font-mono tracking-wider">
                                    module://{category.tag.toLowerCase()}
                                </span>
                                <span
                                    className="ml-auto text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full border"
                                    style={{
                                        color: category.color,
                                        borderColor: `${category.color}22`,
                                        backgroundColor: `${category.color}08`,
                                    }}
                                >
                                    {category.tag}
                                </span>
                            </div>

                            <div className="p-6 sm:p-8">
                                <h3 className="text-white/85 text-lg font-semibold tracking-wide mb-6">
                                    {category.title}
                                </h3>

                                {/* Skills with progress bars */}
                                <div className="space-y-4">
                                    {category.skills.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-white/60 text-sm">{skill.name}</span>
                                                <span className="text-white/25 text-[10px] font-mono">
                                                    {skill.level}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        background: `linear-gradient(90deg, ${category.color}40, ${category.color})`,
                                                    }}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Hover glow */}
                            <div
                                className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                                style={{
                                    background: `radial-gradient(circle, ${category.color} 0%, transparent 70%)`,
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
