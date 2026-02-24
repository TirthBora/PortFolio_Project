"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
    isLoaded: boolean;
}

export default function LoadingScreen({ isLoaded }: LoadingScreenProps) {
    const [show, setShow] = useState(true);
    const [statusText, setStatusText] = useState("Establishing connection...");

    useEffect(() => {
        const messages = [
            "Establishing connection...",
            "Verifying credentials...",
            "Decrypting secure channel...",
            "Loading encrypted assets...",
            "Initializing defense matrix...",
            "System ready.",
        ];

        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % messages.length;
            setStatusText(messages[index]);
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const timer = setTimeout(() => setShow(false), 800);
            return () => clearTimeout(timer);
        }
    }, [isLoaded]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
                    style={{ background: "#050505" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    {/* Central spinner */}
                    <div className="relative w-32 h-32 mb-12">
                        {/* Outer ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                                border: "1px solid rgba(0, 212, 255, 0.15)",
                            }}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                        </motion.div>

                        {/* Middle ring */}
                        <motion.div
                            className="absolute inset-4 rounded-full"
                            style={{
                                border: "1px solid rgba(168, 85, 247, 0.2)",
                            }}
                            animate={{ rotate: -360 }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
                        </motion.div>

                        {/* Inner ring */}
                        <motion.div
                            className="absolute inset-8 rounded-full"
                            style={{
                                border: "1px solid rgba(0, 255, 136, 0.15)",
                            }}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
                        </motion.div>

                        {/* Center dot */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="w-2 h-2 rounded-full bg-cyan-400/80 shadow-lg shadow-cyan-400/30" />
                        </motion.div>
                    </div>

                    {/* Title */}
                    <motion.h1
                        className="text-white/90 text-lg sm:text-xl tracking-[0.4em] uppercase font-extralight mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Secure Access
                    </motion.h1>

                    {/* Status text */}
                    <motion.p
                        className="text-white/30 text-xs font-mono tracking-wider"
                        key={statusText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {statusText}
                    </motion.p>

                    {/* Decorative scan line */}
                    <motion.div
                        className="absolute left-0 right-0 h-[1px]"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)",
                        }}
                        animate={{
                            top: ["0%", "100%"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    {/* Corner brackets */}
                    <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-white/10" />
                    <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-white/10" />
                    <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-white/10" />
                    <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-white/10" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
