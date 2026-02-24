"use client";

import { motion } from "framer-motion";

interface Certification {
    title: string;
    issuer: string;
    detail?: string;
    color: string;
}

const certifications: Certification[] = [
    {
        title: "Foundation Level Data Science",
        issuer: "IIT Madras",
        detail: "BS Degree program — completed foundational courses in data science with distinction",
        color: "#00d4ff",
    },
    {
        title: "Abacus & Mental Math Certification",
        issuer: "International Abacus Academy",
        detail: "Advanced level certification in mental arithmetic — international competition level",
        color: "#FFD700",
    },
    {
        title: "Cybersecurity Fundamentals",
        issuer: "Industry Certification",
        detail: "Network security, ethical hacking principles, vulnerability assessment & risk management",
        color: "#00ff88",
    },
];

export default function CertificationsPanel() {
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
                    <p className="text-cyber-cyan/50 text-xs font-mono tracking-[0.3em] mb-4">
                        {"$ openssl verify --certs"}
                    </p>
                    <motion.h2
                        className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-500 bg-clip-text text-transparent"
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: "200% 200%" }}
                    >
                        Certifications
                    </motion.h2>
                    <p className="text-white/30 text-sm font-light max-w-lg">
                        Verified credentials. Each certificate cryptographically signed and validated.
                    </p>
                </motion.div>

                {/* Certification cards */}
                <div className="space-y-6">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            className="group relative overflow-hidden rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
                            style={{
                                background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(5,5,5,0.9) 100%)",
                            }}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            {/* Scan line on hover */}
                            <motion.div
                                className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `linear-gradient(to bottom, transparent, ${cert.color}, transparent)`,
                                }}
                            />

                            <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-8 sm:p-10">
                                {/* Index */}
                                <div
                                    className="flex-shrink-0 w-16 h-16 rounded-xl border flex items-center justify-center"
                                    style={{
                                        borderColor: `${cert.color}15`,
                                        backgroundColor: `${cert.color}05`,
                                    }}
                                >
                                    <span
                                        className="text-lg font-mono font-bold"
                                        style={{ color: `${cert.color}80` }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl sm:text-2xl text-white/90 font-semibold tracking-tight mb-2">
                                        {cert.title}
                                    </h3>
                                    <p className="text-white/40 text-sm font-mono tracking-wider mb-2">
                                        {cert.issuer}
                                    </p>
                                    {cert.detail && (
                                        <p className="text-white/25 text-sm font-light leading-relaxed">
                                            {cert.detail}
                                        </p>
                                    )}
                                </div>

                                {/* Verified badge */}
                                <div className="flex items-center gap-3 flex-shrink-0 px-5 py-3 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                                    <div className="w-3 h-3 rounded-full bg-cyber-green/60 animate-pulse" />
                                    <span className="text-cyber-green/50 text-xs font-mono tracking-wider">
                                        VERIFIED
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
