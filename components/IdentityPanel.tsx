"use client";

import { motion, Variants } from "framer-motion";

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const contactLinks = [
    { label: "Email", value: "tirthbora1@gmail.com", href: "mailto:tirthbora1@gmail.com", icon: "✉" },
    { label: "Phone", value: "+91 9552530862", href: "tel:+919552530862", icon: "📞" },
    { label: "LinkedIn", value: "linkedin.com/in/tirthbora", href: "https://linkedin.com/in/tirthbora", icon: "🔗" },
    { label: "GitHub", value: "github.com/tirthbora", href: "https://github.com/tirthbora", icon: "⚡" },
];

const stats = [
    { label: "THREAT LEVEL", value: "ELITE", color: "#ff3333" },
    { label: "CLEARANCE", value: "LVL.5", color: "#00d4ff" },
    { label: "STATUS", value: "ACTIVE", color: "#00ff88" },
    { label: "SECTOR", value: "INDIA", color: "#a855f7" },
];

export default function IdentityPanel() {
    return (
        <section className="relative z-10 py-32 px-6">
            <div className="max-w-[96rem] mx-auto">
                <motion.div
                    className="relative overflow-hidden rounded-2xl border border-white/[0.06]"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    style={{
                        background: "linear-gradient(135deg, rgba(0,212,255,0.03) 0%, rgba(5,5,5,0.95) 40%, rgba(168,85,247,0.03) 100%)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    {/* Top terminal bar */}
                    <div className="flex items-center gap-2 px-6 py-3 border-b border-white/[0.04] bg-white/[0.01]">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                        <span className="ml-4 text-white/20 text-[11px] font-mono tracking-wider">
                            tirth@cyber:~/identity — bash
                        </span>
                        <span className="ml-auto text-white/10 text-[10px] font-mono">PID 7734</span>
                    </div>

                    <div className="p-10 sm:p-14 md:p-20">
                        {/* Status indicator */}
                        <div className="absolute top-16 right-8 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                            <span className="text-cyber-green/60 text-[10px] font-mono tracking-wider">
                                ONLINE
                            </span>
                        </div>

                        {/* Stats row */}
                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] text-center"
                                >
                                    <p className="text-white/25 text-[9px] font-mono tracking-[0.2em] mb-1">
                                        {stat.label}
                                    </p>
                                    <p
                                        className="text-lg font-bold font-mono tracking-wider"
                                        style={{ color: stat.color }}
                                    >
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <motion.p variants={item} className="text-cyber-blue/50 text-xs font-mono tracking-[0.3em] mb-6">
                                {"$ cat /etc/identity.conf"}
                            </motion.p>

                            <motion.h2
                                variants={item}
                                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
                                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                style={{ backgroundSize: "200% 200%" }}
                            >                                Tirth Bora
                            </motion.h2>

                            <motion.p variants={item} className="text-2xl sm:text-3xl text-white/40 font-light tracking-wide mb-3">
                                Information Security Student
                            </motion.p>

                            <motion.p variants={item} className="text-base text-white/25 font-light mb-12 max-w-2xl">
                                B.Tech CSE (Data Science) — VIT Vellore &nbsp;|&nbsp; BS Data Science — IIT Madras
                            </motion.p>

                            {/* Divider with pulse */}
                            <motion.div variants={item} className="relative mb-12">
                                <div className="w-full h-[1px] bg-gradient-to-r from-cyber-blue/30 via-cyber-purple/20 to-transparent" />
                                <div className="absolute left-0 top-0 w-16 h-[1px] bg-cyber-blue/60 animate-pulse" />
                            </motion.div>

                            {/* Contact grid — larger */}
                            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {contactLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-5 p-5 rounded-xl border border-white/[0.05] hover:border-cyber-blue/20 transition-all duration-300 hover:bg-white/[0.02]"
                                    >
                                        <span className="text-2xl">{link.icon}</span>
                                        <div>
                                            <p className="text-white/30 text-[10px] font-mono tracking-wider uppercase mb-0.5">
                                                {link.label}
                                            </p>
                                            <p className="text-white/70 text-base group-hover:text-cyber-blue transition-colors duration-300">
                                                {link.value}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Decorative scanline */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                        <div
                            className="absolute inset-0 opacity-[0.015]"
                            style={{
                                backgroundImage:
                                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                            }}
                        />
                    </div>

                    {/* Corner glow */}
                    <div
                        className="absolute -top-32 -right-32 w-64 h-64 opacity-15"
                        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
                    />
                    <div
                        className="absolute -bottom-32 -left-32 w-64 h-64 opacity-10"
                        style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
