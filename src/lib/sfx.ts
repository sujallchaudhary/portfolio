/**
 * Tiny WebAudio sound effects, synthesized on the fly — no audio assets.
 * All sounds are quiet by design and respect the persisted mute switch.
 */

let ctx: AudioContext | null = null;
let muted: boolean | null = null;

function getMuted(): boolean {
  if (muted === null) {
    muted =
      typeof window !== "undefined" &&
      localStorage.getItem("sfx-muted") === "1";
  }
  return muted;
}

export function isMuted(): boolean {
  return getMuted();
}

export function setMuted(value: boolean) {
  muted = value;
  localStorage.setItem("sfx-muted", value ? "1" : "0");
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

interface ToneOptions {
  type?: OscillatorType;
  duration?: number;
  gain?: number;
  delay?: number;
  slideTo?: number;
}

function tone(
  freq: number,
  { type = "sine", duration = 0.1, gain = 0.05, delay = 0, slideTo }: ToneOptions = {}
) {
  const c = getCtx();
  if (!c || getMuted()) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + duration);
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

/** Small random detune so repeated clicks never sound identical */
function jitter(freq: number, spread = 0.12) {
  return freq * (1 + (Math.random() * 2 - 1) * spread);
}

/** Short filtered noise burst — the basis of paper/pencil textures */
function noiseBurst({
  duration = 0.08,
  gain = 0.04,
  freq = 2200,
  q = 1.1,
}: { duration?: number; gain?: number; freq?: number; q?: number } = {}) {
  const c = getCtx();
  if (!c || getMuted()) return;
  const t0 = c.currentTime;
  const length = Math.ceil(c.sampleRate * duration);
  const buffer = c.createBuffer(1, length, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  src.connect(filter);
  filter.connect(g);
  g.connect(c.destination);
  src.start(t0);
}

export const sfx = {
  /** Soft pen tick — plain links; pitch varies slightly every time */
  tick: () =>
    tone(jitter(1250), { type: "square", duration: 0.045, gain: 0.015 }),
  /** Low rubber-stamp thock — buttons and button-like CTAs */
  stamp: () =>
    tone(jitter(220, 0.08), {
      type: "triangle",
      duration: 0.09,
      gain: 0.07,
      slideTo: 90,
    }),
  /** Bubbly pop — stickers and eggs */
  pop: () => tone(420, { duration: 0.12, gain: 0.06, slideTo: 950 }),
  /** Pencil-on-paper scratch — copy actions and small utilities */
  scratch: () =>
    noiseBurst({ duration: 0.09, gain: 0.045, freq: jitter(2400, 0.15) }),
  /** Two-note success chime */
  ding: () => {
    tone(880, { duration: 0.3, gain: 0.05 });
    tone(1318.5, { duration: 0.45, gain: 0.035, delay: 0.07 });
  },
  /** Low error buzz */
  buzz: () => tone(140, { type: "sawtooth", duration: 0.18, gain: 0.05 }),
  /** Little unlock arpeggio for easter eggs */
  unlock: () => {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      tone(f, { duration: 0.18, gain: 0.05, delay: i * 0.09 })
    );
  },
};
