"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
    return (
        <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
        >
            <p className="text-white/30 text-[10px] sm:text-xs tracking-[0.35em] uppercase font-light">
                Access System
            </p>
            <motion.div
                className="flex flex-col items-center"
                animate={{ y: [0, 6, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <svg
                    width="16"
                    height="24"
                    viewBox="0 0 16 24"
                    fill="none"
                    className="opacity-30"
                >
                    <path
                        d="M8 4L8 18M8 18L14 12M8 18L2 12"
                        stroke="url(#arrow-gradient)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <defs>
                        <linearGradient
                            id="arrow-gradient"
                            x1="8"
                            y1="4"
                            x2="8"
                            y2="18"
                        >
                            <stop stopColor="#00d4ff" stopOpacity="0.3" />
                            <stop offset="1" stopColor="#00d4ff" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>
        </motion.div>
    );
}
