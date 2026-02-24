"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
 * Calm, techy ambient pad — inspired by Blade Runner / lo-fi cyberpunk.
 * Uses heavily filtered, detuned oscillators blended into a warm wash.
 * Everything runs through a master low-pass filter so nothing sounds harsh.
 */
function createAmbientPad(): { ctx: AudioContext; stop: () => void } {
    const ctx = new AudioContext();

    // ── Master chain: everything → filter → compressor → gain → output ──
    const masterFilter = ctx.createBiquadFilter();
    masterFilter.type = "lowpass";
    masterFilter.frequency.value = 800; // Cut everything above 800Hz for warmth
    masterFilter.Q.value = 0.7;

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.ratio.value = 4;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.85, ctx.currentTime + 3); // Slow 3s fade-in

    masterFilter.connect(compressor).connect(master).connect(ctx.destination);

    // ── Helper: create a soft pad voice (2 detuned oscillators) ──
    function createPadVoice(
        freq: number,
        detuneCents: number,
        vol: number,
        type: OscillatorType = "sine"
    ) {
        const osc1 = ctx.createOscillator();
        osc1.type = type;
        osc1.frequency.value = freq;
        osc1.detune.value = -detuneCents;

        const osc2 = ctx.createOscillator();
        osc2.type = type;
        osc2.frequency.value = freq;
        osc2.detune.value = detuneCents;

        const gain = ctx.createGain();
        gain.gain.value = vol;

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(masterFilter);

        osc1.start();
        osc2.start();
        return [osc1, osc2];
    }

    // ── Pad voices — a C minor 7 chord spread across octaves ──
    // Very soft, each pair of oscillators slightly detuned for a chorus/pad effect

    // C2 (65 Hz) — deep warmth
    const bass = createPadVoice(65.41, 4, 0.45, "sine");

    // Eb3 (155 Hz) — minor third, gives it that moody feel
    const mid1 = createPadVoice(155.56, 6, 0.2, "sine");

    // G3 (196 Hz) — fifth, adds body
    const mid2 = createPadVoice(196.0, 5, 0.15, "sine");

    // Bb3 (233 Hz) — minor seventh, the "cyber" tension
    const mid3 = createPadVoice(233.08, 8, 0.1, "sine");

    // ── Slow LFO on the master filter cutoff for gentle movement ──
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.08; // Very slow — one cycle every ~12 seconds
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 200; // Sweep filter between 600-1000 Hz
    lfo.connect(lfoGain).connect(masterFilter.frequency);
    lfo.start();

    // ── Soft filtered noise — like distant rain / air ──
    const noiseLen = ctx.sampleRate * 4;
    const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
    const noiseData = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) {
        noiseData[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 400;
    noiseFilter.Q.value = 0.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.1; // Audible texture

    noise.connect(noiseFilter).connect(noiseGain).connect(masterFilter);
    noise.start();

    // ── Collect all oscillator nodes for cleanup ──
    const allOscs = [...bass, ...mid1, ...mid2, ...mid3, lfo];

    const stop = () => {
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 2); // 2s fade-out
        setTimeout(() => {
            allOscs.forEach((o) => {
                try { o.stop(); } catch { /* already stopped */ }
            });
            try { noise.stop(); } catch { /* already stopped */ }
            ctx.close();
        }, 2200);
    };

    return { ctx, stop };
}

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const synthRef = useRef<{ ctx: AudioContext; stop: () => void } | null>(null);

    const togglePlay = useCallback(() => {
        setHasInteracted(true);

        if (isPlaying && synthRef.current) {
            synthRef.current.stop();
            synthRef.current = null;
            setIsPlaying(false);
        } else {
            try {
                synthRef.current = createAmbientPad();
                setIsPlaying(true);
            } catch {
                // Web Audio not supported
            }
        }
    }, [isPlaying]);

    return (
        <>
            {/* Floating audio toggle */}
            <motion.button
                onClick={togglePlay}
                className="fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 group"
                style={{
                    background: isPlaying
                        ? "rgba(0, 212, 255, 0.06)"
                        : "rgba(5, 5, 5, 0.85)",
                    backdropFilter: "blur(12px)",
                    borderColor: isPlaying
                        ? "rgba(0, 212, 255, 0.25)"
                        : "rgba(255,255,255,0.08)",
                    boxShadow: isPlaying ? "0 0 24px rgba(0,212,255,0.12)" : "none",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.5, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={isPlaying ? "Mute ambient" : "Play ambient music"}
            >
                {/* Sound wave bars */}
                <div className="flex items-end gap-[3px] h-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                            key={i}
                            className="w-[2.5px] rounded-full"
                            style={{
                                backgroundColor: isPlaying ? "#00d4ff" : "rgba(255,255,255,0.25)",
                            }}
                            animate={
                                isPlaying
                                    ? {
                                        height: [3, 10 + i * 2, 4, 12 - i, 3],
                                    }
                                    : { height: 3 }
                            }
                            transition={
                                isPlaying
                                    ? {
                                        duration: 1.2 + i * 0.15,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }
                                    : { duration: 0.3 }
                            }
                        />
                    ))}
                </div>
            </motion.button>

            {/* Initial prompt */}
            <AnimatePresence>
                {!hasInteracted && (
                    <motion.div
                        className="fixed bottom-10 right-24 z-[100] px-4 py-2.5 rounded-lg border border-white/[0.08] text-white/50 text-xs font-mono tracking-wider"
                        style={{
                            background: "rgba(5, 5, 5, 0.85)",
                            backdropFilter: "blur(12px)",
                        }}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: 4, duration: 0.5 }}
                    >
                        🎵 Enable ambient
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
