# Cybersecurity Portfolio — Project Overview

**Student:** Tirth Bora  
**Project:** Interactive Cybersecurity Portfolio Website  

---

## What We Built

We developed a **personal portfolio website** designed around a cybersecurity and hacker aesthetic. Unlike a traditional static resume page, this website delivers a cinematic, scroll-driven experience where the user's scroll controls an animation, and each resume section — identity, skills, education, projects, achievements, and certifications — is presented through visually rich, interactive cards with terminal-inspired styling, animated gradients, and layered background effects.

The final product feels like a blend of a movie intro sequence and a professional resume, with ambient synthesized audio, floating particle effects, and matrix-style rain running behind every section.

---

## How We Implemented It

### The Foundation — React Components

The entire website is built using **React** through the **Next.js** framework. We followed a component-based architecture, meaning each visual section of the site is an independent, self-contained module. For example, `IdentityPanel` handles the name and bio, `SkillsPanel` handles the skills grid, `EducationPanel` renders the education timeline, and so on. The main page simply imports and stacks these components vertically. This approach keeps the code organized and makes it easy to modify or add sections without affecting the rest of the site. All components are written in **TypeScript**, which adds type safety — we defined interfaces like `Skill`, `Achievement`, and `TimelineEntry` to structure the data feeding into each section.

### The Scroll Animation — HTML5 Canvas

The hero section at the top of the page is the most technically complex feature. We used the **HTML5 Canvas API** to create a frame-by-frame animation that responds to the user's scroll position. We pre-rendered 150 individual PNG frames and loaded them all into memory when the page opens. As the user scrolls, we calculate which frame corresponds to the current scroll position using a mathematical mapping function, then draw that frame onto a full-screen `<canvas>` element using the `drawImage()` method. The rendering uses custom logic to ensure the image fills the entire screen (similar to CSS `object-fit: cover`) while staying centered. Text overlays — titles, subtitles, and descriptions — fade in and out at specific scroll ranges using the **Framer Motion** animation library, creating a cinematic reveal effect synchronized with the visual animation.

### Styling — CSS and Tailwind

For styling, we used **Tailwind CSS**, a utility-first framework that lets us apply styles directly in the HTML markup using class names like `text-5xl`, `bg-gradient-to-r`, `rounded-xl`, and `backdrop-blur`. This made it very fast to build responsive layouts that adapt across mobile, tablet, and desktop screens. We also wrote custom CSS for specialized effects — defining a color palette using CSS custom properties (`--cyber-blue`, `--cyber-green`, `--cyber-purple`), styling the scrollbar, and creating glassmorphism effects using `backdrop-filter: blur()` which gives card backgrounds a frosted glass appearance. All section titles use **CSS gradient text** — we apply a `linear-gradient` as the background, clip it to the text shape, and then animate the gradient position with Framer Motion so the colors slowly shift and shimmer.

### Background Effects — Canvas Rendering

Three layered background effects run behind the main content to create visual depth:

**Particle Field** — A `<canvas>` element renders hundreds of small floating dots. Each particle has its own position, velocity, size, and opacity stored in a JavaScript array. A `requestAnimationFrame` loop continuously updates their positions and redraws them 60 times per second. When the mouse moves nearby, semi-transparent lines are drawn between the cursor and nearby particles, creating an interactive web effect.

**Matrix Rain** — Another `<canvas>` renders columns of falling green characters (including Japanese katakana), updating at a steady frame rate to simulate the iconic Matrix digital rain. It runs at very low opacity so it adds atmosphere without overwhelming the actual content.

**Cursor Glow** — A soft cyan-colored radial gradient follows the mouse cursor across the page, implemented by tracking mouse coordinates with a JavaScript event listener and applying CSS transforms to reposition the glow element in real time.

### Audio — Web Audio API Synthesis

We added ambient background music using the **Web Audio API**, which allows us to generate sound entirely within the browser without any external audio files. The synthesizer creates a warm chord by combining multiple oscillator nodes tuned to specific frequencies (C2, Eb3, G3, Bb3 — forming a C minor seventh chord). Each note actually uses two oscillators slightly detuned from each other, which produces a natural chorus/pad effect similar to a synthesizer keyboard. All audio is routed through a low-pass filter that removes harsh high frequencies, and a slow oscillator (LFO) gently sweeps the filter cutoff frequency every 12 seconds, creating subtle tonal movement. A small amount of filtered white noise adds an airy texture. The user controls playback through a floating button in the bottom-right corner, and the audio fades in and out smoothly over several seconds.

### Animations — Framer Motion

Almost every visual element on the page animates — cards slide up as they enter the viewport, progress bars fill to their target width, titles shimmer with shifting gradients, and hover effects elevate cards with glow. All of this is handled by **Framer Motion**, a React animation library. We used its `whileInView` feature to trigger animations only when elements scroll into view, `useScroll` and `useTransform` to link animation values to scroll position, and `animate` to run continuous looping effects like the gradient title shimmer.

---

## The Result

The finished website presents a cohesive cybersecurity portfolio where every element — from the terminal-style headers (`$ nmap --skill-scan`) to the ambient audio drone — reinforces the hacker theme. It demonstrates practical application of core web technologies: HTML5 for structure, CSS3 for styling and visual effects, JavaScript for interactivity and real-time rendering, and React for scalable component architecture. The project goes beyond basic web development by implementing low-level browser APIs for canvas rendering and audio synthesis, resulting in a portfolio that functions as both a professional resume and a technical showcase.
