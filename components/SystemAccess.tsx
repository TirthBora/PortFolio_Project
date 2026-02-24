"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SystemAccess() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const lines = [
        { text: "[OK] Establishing encrypted connection...", delay: 0 },
        { text: "[OK] Bypassing firewall restrictions...", delay: 0.3 },
        { text: "[OK] Loading personnel database...", delay: 0.6 },
        { text: "[OK] Decrypting classified files...", delay: 0.9 },
        { text: "[>>] ACCESS GRANTED", delay: 1.3, highlight: true },
    ];

    return (
        <section
            ref={ref}
            className="relative z-10 py-48 px-6 flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Scan line */}
            {isInView && (
                <motion.div
                    className="absolute left-0 right-0 h-[2px]"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 0%, #00ff88 30%, #00ff88 70%, transparent 100%)",
                        boxShadow: "0 0 20px #00ff88, 0 0 40px #00ff8840",
                    }}
                    initial={{ top: "0%", opacity: 0 }}
                    animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2.5, ease: "linear" }}
                />
            )}

            {/* Terminal boot sequence */}
            <div className="max-w-3xl w-full mb-16">
                <div className="rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: "rgba(5,5,5,0.8)" }}>
                    {/* Terminal bar */}
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.04] bg-white/[0.01]">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        <span className="ml-3 text-white/15 text-[10px] font-mono">root@tirth-sec:~#</span>
                    </div>

                    {/* Boot log */}
                    <div className="p-6 font-mono text-sm space-y-2">
                        {lines.map((line, i) => (
                            <motion.p
                                key={i}
                                className={line.highlight ? "text-cyber-green font-bold" : "text-white/40"}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: line.delay + 0.5, duration: 0.4 }}
                            >
                                {line.text}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Access Granted text */}
            <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, delay: 2, ease: "easeOut" }}
            >
                <motion.div
                    className="w-32 h-[1px] bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent mx-auto mb-8"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.2, duration: 0.6 }}
                />

                <motion.h2
                    className="text-5xl sm:text-6xl md:text-8xl font-bold text-white/95 tracking-tight mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.4, duration: 0.8 }}
                >
                    Personnel File
                </motion.h2>

                <motion.p
                    className="text-white/30 text-sm tracking-[0.2em] font-light font-mono"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.8, duration: 0.6 }}
                >
                    CLASSIFIED // SECURITY CLEARANCE LEVEL 5
                </motion.p>
            </motion.div>

            {/* Corner brackets */}
            <div className="absolute top-16 left-6 w-16 h-16 border-t-2 border-l-2 border-cyber-green/10" />
            <div className="absolute top-16 right-6 w-16 h-16 border-t-2 border-r-2 border-cyber-green/10" />
            <div className="absolute bottom-16 left-6 w-16 h-16 border-b-2 border-l-2 border-cyber-green/10" />
            <div className="absolute bottom-16 right-6 w-16 h-16 border-b-2 border-r-2 border-cyber-green/10" />
        </section>
    );
}
