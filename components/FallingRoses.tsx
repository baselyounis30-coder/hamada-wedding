import type { CSSProperties } from "react";
import { Petal, Rose, type PaletteName } from "./Rose";
import styles from "./FallingRoses.module.css";

const PALETTE_ORDER: PaletteName[] = ["blush", "rose", "blush", "plum", "rose"];

// Seeded so the server render is stable from one request to the next.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildItems(count: number, seed: number, front: boolean) {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => {
    // Only loose petals pass in front, so whole roses never cover the text.
    const isRose = !front && i % 5 < 2;
    const depth = rand();
    const scale = front ? 1.5 : 1;
    const size = (isRose ? 30 + depth * 34 : 15 + depth * 17) * scale;
    const dur = (front ? 10 : 14) + (1 - depth) * 12 + rand() * 4;
    return {
      isRose,
      palette: PALETTE_ORDER[Math.floor(rand() * PALETTE_ORDER.length)],
      // One slot per item keeps them spread across the width.
      left: ((i + rand()) / count) * 100,
      size,
      dur,
      delay: -rand() * dur,
      sway: 18 + rand() * 46,
      swayDur: 3 + rand() * 3.5,
      spinDur: 7 + rand() * 12,
      reverse: rand() > 0.5,
      opacity: front ? 0.9 : 0.55 + depth * 0.45,
    };
  });
}

const BACK = buildItems(24, 611, false);
const FRONT = buildItems(6, 2026, true);

/** Roses and loose petals drifting down the viewport. */
export function FallingRoses({ front = false }: { front?: boolean }) {
  const items = front ? FRONT : BACK;
  return (
    <div className={`${styles.layer} ${front ? styles.front : ""}`} aria-hidden="true">
      {items.map((item, i) => (
        <span
          key={i}
          className={styles.fall}
          style={
            {
              "--x": `${item.left.toFixed(2)}%`,
              "--size": `${item.size.toFixed(1)}px`,
              "--dur": `${item.dur.toFixed(2)}s`,
              "--delay": `${item.delay.toFixed(2)}s`,
              "--sway": `${item.sway.toFixed(1)}px`,
              "--sway-dur": `${item.swayDur.toFixed(2)}s`,
              "--spin-dur": `${item.spinDur.toFixed(2)}s`,
              "--spin-dir": item.reverse ? "reverse" : "normal",
              "--o": item.opacity.toFixed(2),
            } as CSSProperties
          }
        >
          <span className={styles.sway}>
            <span className={item.isRose ? styles.spin : styles.flutter}>
              {item.isRose ? <Rose palette={item.palette} /> : <Petal palette={item.palette} />}
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}
