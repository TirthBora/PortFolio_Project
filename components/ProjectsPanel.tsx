"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    tech: string[];
    features: string[];
    tag: string;
    color: string;
    icon: string;
}

const projects: Project[] = [
    {
        id: "ecommerce",
        title: "E-Commerce Platform",
        subtitle: "Amazon-style Frontend",
        description:
            "A fully responsive e-commerce frontend modeled after Amazon, featuring product browsing, cart management, and a modern UI. Built with clean HTML/CSS/JavaScript architecture.",
        tech: ["HTML", "CSS", "JavaScript", "React"],
        features: [
            "Product listing & search",
            "Shopping cart system",
            "Responsive design",
            "User authentication flow",
        ],
        tag: "FRONTEND",
        color: "#00d4ff",
        icon: "🛒",
    },
    {
        id: "cyber-portfolio",
        title: "Cybersecurity Portfolio",
        subtitle: "Scroll-linked Immersive Experience",
        description:
            "This portfolio itself — a cinematic scroll-driven website with canvas animations, floating particles, glassmorphism panels, and cyberpunk aesthetics. Built with Next.js, Framer Motion, and HTML5 Canvas.",
        tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Canvas"],
        features: [
            "192-frame scroll animation",
            "Mouse parallax particles",
            "Glassmorphism UI",
            "Custom cursor glow",
        ],
        tag: "FULLSTACK",
        color: "#a855f7",
        icon: "🔮",
    },
    {
        id: "security-tool",
        title: "Network Security Scanner",
        subtitle: "Vulnerability Assessment Tool",
        description:
            "A Python-based network security scanning tool for ethical penetration testing. Scans ports, detects common vulnerabilities, and generates detailed security reports.",
        tech: ["Python", "Socket", "Nmap", "Scapy"],
        features: [
            "Port scanning",
            "Vulnerability detection",
            "Report generation",
            "CLI interface",
        ],
        tag: "SECURITY",
        color: "#00ff88",
        icon: "🛡️",
    },
];

export default function ProjectsPanel() {
    const [expanded, setExpanded] = useState<string | null>(null);

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
                    <p className="text-cyber-green/50 text-xs font-mono tracking-[0.3em] mb-4">
                        {"$ ls -la ~/projects/"}
                    </p>
                    <motion.h2
                        className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: "200% 200%" }}
                    >
                        Projects
                    </motion.h2>
                    <p className="text-white/30 text-sm font-light max-w-lg">
                        Deployed exploits... I mean, applications. Each built to push the limits.
                    </p>
                </motion.div>

                {/* Project cards */}
                <div className="space-y-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div
                                className="rounded-xl border border-white/[0.06] cursor-pointer group hover:border-white/[0.12] transition-all duration-500 relative overflow-hidden"
                                style={{
                                    background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(5,5,5,0.9) 100%)",
                                }}
                                onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                            >
                                {/* Terminal header */}
                                <div className="flex items-center gap-2 px-6 py-3 border-b border-white/[0.04] bg-white/[0.01]">
                                    <span className="text-lg">{project.icon}</span>
                                    <span className="text-white/20 text-[10px] font-mono tracking-wider">
                                        ~/projects/{project.id}
                                    </span>
                                    <span
                                        className="ml-auto text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full border"
                                        style={{
                                            color: project.color,
                                            borderColor: `${project.color}22`,
                                            backgroundColor: `${project.color}08`,
                                        }}
                                    >
                                        {project.tag}
                                    </span>
                                </div>

                                <div className="p-8 sm:p-10">
                                    {/* Header row */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                                        <div>
                                            <h3 className="text-2xl sm:text-3xl text-white/90 font-semibold tracking-tight mb-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-white/40 text-base">{project.subtitle}</p>
                                        </div>

                                        <motion.div
                                            className="text-white/20 text-2xl flex-shrink-0 font-light"
                                            animate={{ rotate: expanded === project.id ? 45 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            +
                                        </motion.div>
                                    </div>

                                    {/* Tech stack */}
                                    <div className="flex flex-wrap gap-2.5 mb-4">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="text-white/40 text-xs px-3 py-1.5 rounded-lg border border-white/[0.06] font-mono bg-white/[0.01]"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Expanded content */}
                                    <AnimatePresence>
                                        {expanded === project.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-6 border-t border-white/[0.04]">
                                                    <p className="text-white/50 text-base leading-relaxed mb-8">
                                                        {project.description}
                                                    </p>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {project.features.map((feature) => (
                                                            <div key={feature} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.01] border border-white/[0.03]">
                                                                <div
                                                                    className="w-2 h-2 rounded-full flex-shrink-0"
                                                                    style={{ backgroundColor: project.color }}
                                                                />
                                                                <span className="text-white/50 text-sm">
                                                                    {feature}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Hover glow */}
                                <div
                                    className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                                    style={{
                                        background: `radial-gradient(circle, ${project.color} 0%, transparent 70%)`,
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
