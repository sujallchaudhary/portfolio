/**
 * DOM-based ink-splat burst: scatters pen glyphs from a point.
 * Colors read from the theme variables so it works in blueprint mode too.
 */

const GLYPHS = ["✳", "✦", "+", "•", "~"];
const COLOR_VARS = ["--blue", "--red", "--ink"];

/** Alternate glyph sets for themed eggs */
export const HEART_GLYPHS = ["♥", "✿", "✩", "•", "~"];
export const STAR_GLYPHS = ["✦", "✧", "★", "✩", "·"];

export function inkBurst(x: number, y: number, count = 18, glyphs = GLYPHS) {
  if (typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "ink-splat";
    el.setAttribute("aria-hidden", "true");
    el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.color = `rgb(var(${COLOR_VARS[i % COLOR_VARS.length]}))`;
    el.style.fontSize = `${12 + Math.random() * 14}px`;
    el.style.transform = "translate(-50%, -50%) scale(1)";
    el.style.opacity = "1";
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 120;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 40; // slight upward bias
    const rot = (Math.random() - 0.5) * 540;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rot}deg) scale(0.4)`;
        el.style.opacity = "0";
      });
    });

    setTimeout(() => el.remove(), 850);
  }
}

/** Easter egg: glyphs rain down the whole page like spilled ink */
export function inkRain(count = 40, glyphs = GLYPHS) {
  if (typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "ink-splat";
    el.setAttribute("aria-hidden", "true");
    el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.top = "-30px";
    el.style.color = `rgb(var(${COLOR_VARS[i % COLOR_VARS.length]}))`;
    el.style.fontSize = `${14 + Math.random() * 16}px`;
    el.style.opacity = "1";
    const duration = 1.4 + Math.random() * 1.6;
    const delay = Math.random() * 0.8;
    el.style.transition = `transform ${duration}s cubic-bezier(0.45, 0, 0.7, 1) ${delay}s, opacity 0.4s ease-out ${delay + duration - 0.4}s`;
    document.body.appendChild(el);

    const drift = (Math.random() - 0.5) * 120;
    const rot = (Math.random() - 0.5) * 720;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transform = `translate(${drift}px, ${window.innerHeight + 60}px) rotate(${rot}deg)`;
        el.style.opacity = "0";
      });
    });

    setTimeout(() => el.remove(), (delay + duration) * 1000 + 100);
  }
}
