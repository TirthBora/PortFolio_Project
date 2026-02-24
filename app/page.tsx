"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CursorGlow from "@/components/CursorGlow";
import ScrollIndicator from "@/components/ScrollIndicator";
import LoadingScreen from "@/components/LoadingScreen";
import AudioPlayer from "@/components/AudioPlayer";
import SystemAccess from "@/components/SystemAccess";
import IdentityPanel from "@/components/IdentityPanel";
import SkillsPanel from "@/components/SkillsPanel";
import EducationPanel from "@/components/EducationPanel";
import ProjectsPanel from "@/components/ProjectsPanel";
import AchievementsPanel from "@/components/AchievementsPanel";
import CertificationsPanel from "@/components/CertificationsPanel";

const CyberScroll = dynamic(() => import("@/components/CyberScroll"), {
  ssr: false,
});

const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});

const MatrixRain = dynamic(() => import("@/components/MatrixRain"), {
  ssr: false,
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen" style={{ background: "#050505" }}>
      {/* Loading screen */}
      <LoadingScreen isLoaded={isLoaded} />

      {/* Cursor glow */}
      <CursorGlow />

      {/* Audio player */}
      <AudioPlayer />
      <ParticleField />
      <MatrixRain />

      {/* ============================================ */}
      {/* SECTION 1: Cinematic Scroll Hero             */}
      {/* ============================================ */}
      <CyberScroll />

      {/* ============================================ */}
      {/* SECTION 2: System Access Transition           */}
      {/* ============================================ */}
      <SystemAccess />

      {/* ============================================ */}
      {/* SECTION 3: Identity / Profile                 */}
      {/* ============================================ */}
      <IdentityPanel />

      {/* ============================================ */}
      {/* SECTION 4: Skills Matrix                      */}
      {/* ============================================ */}
      <SkillsPanel />

      {/* ============================================ */}
      {/* SECTION 5: Education Timeline                 */}
      {/* ============================================ */}
      <EducationPanel />

      {/* ============================================ */}
      {/* SECTION 6: Projects                           */}
      {/* ============================================ */}
      <ProjectsPanel />

      {/* ============================================ */}
      {/* SECTION 7: Achievements                       */}
      {/* ============================================ */}
      <AchievementsPanel />

      {/* ============================================ */}
      {/* SECTION 8: Certifications                     */}
      {/* ============================================ */}
      <CertificationsPanel />

      {/* ============================================ */}
      {/* SECTION 9: Contact / Footer                   */}
      {/* ============================================ */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent mx-auto mb-16" />

          <p className="text-white/20 text-xs tracking-[0.4em] uppercase mb-8 font-light">
            {"// END.TRANSMISSION"}
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/90 tracking-tight mb-6">
            Ready to Connect
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-lg mx-auto mb-12 font-light leading-relaxed">
            Passionate about building secure digital systems.
            Let&apos;s collaborate on the next generation of cyber defense.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:tirthbora1@gmail.com"
              className="glass px-8 py-4 inline-flex items-center gap-3 cursor-pointer transition-all duration-300 hover:border-glow group"
            >
              <span className="text-white/70 text-sm tracking-wider font-light group-hover:text-white/90 transition-colors">
                Get In Touch
              </span>
              <span className="text-cyber-blue/60 group-hover:text-cyber-blue transition-colors group-hover:translate-x-1 transform duration-300">
                →
              </span>
            </a>
            <a
              href="https://github.com/tirthbora"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-8 py-4 inline-flex items-center gap-3 cursor-pointer transition-all duration-300 hover:border-glow group"
            >
              <span className="text-white/70 text-sm tracking-wider font-light group-hover:text-white/90 transition-colors">
                View GitHub
              </span>
              <span className="text-cyber-green/60 group-hover:text-cyber-green transition-colors group-hover:translate-x-1 transform duration-300">
                →
              </span>
            </a>
          </div>

          {/* Footer */}
          <div className="mt-32 pt-8 border-t border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/15 text-xs font-mono tracking-wider">
                TIRTH.BORA // SECURE.PORTFOLIO
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/tirthbora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/20 text-xs tracking-wider hover:text-cyber-blue transition-colors duration-300"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/tirthbora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/20 text-xs tracking-wider hover:text-cyber-blue transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:tirthbora1@gmail.com"
                  className="text-white/20 text-xs tracking-wider hover:text-cyber-blue transition-colors duration-300"
                >
                  Email
                </a>
              </div>
              <p className="text-white/15 text-xs font-mono">
                © 2026 Tirth Bora
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </main>
  );
}
