"use client";

import { motion, type Variants } from "motion/react";
import { useId } from "react";
import { RINGS, petalPath } from "./Rose";

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, delay: i * 0.06, ease: "easeInOut" },
      opacity: { duration: 0.2, delay: i * 0.06 },
    },
  }),
};

const rotations = (ring: (typeof RINGS)[number]) =>
  Array.from({ length: ring.n }, (_, k) => +(ring.rot + (k * 360) / ring.n).toFixed(2));

const LEAF = "M0 0C17 -18 18 -54 0 -80C-18 -54 -17 -18 0 0ZM0 -3V-68";
const LEAVES = [
  "translate(-30 26) rotate(-128) scale(0.78)",
  "translate(32 24) rotate(132) scale(0.72)",
  "translate(4 38) rotate(176) scale(0.66)",
];

// Ring 0 is outermost, so the innermost ring gets the earliest stagger slots
// and the rose appears to be sketched from its heart outwards.
const firstSlot = (ringIndex: number) =>
  RINGS.slice(ringIndex + 1).reduce((sum, ring) => sum + ring.n, 0);
const PETAL_COUNT = firstSlot(-1);

/** A line-drawn rose that sketches itself in when scrolled into view. */
export function RoseSketch({ className }: { className?: string }) {
  const id = useId().replace(/\W/g, "");

  return (
    <motion.svg
      viewBox="-100 -64 200 168"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <defs>
        {/* One mask per ring hiding whatever sits beneath that ring's petals,
            so lines stop where a petal would overlap them. */}
        {RINGS.map((ring, i) => (
          <mask
            key={i}
            id={`${id}m${i}`}
            maskUnits="userSpaceOnUse"
            x="-100"
            y="-64"
            width="200"
            height="168"
          >
            <rect x="-100" y="-64" width="200" height="168" fill="#fff" stroke="none" />
            <g fill="#000" stroke="none">
              {rotations(ring).map((rot) => (
                <path key={rot} d={petalPath(ring.r, ring.w)} transform={`rotate(${rot})`} />
              ))}
              <circle r={ring.r * 0.6} />
            </g>
          </mask>
        ))}
      </defs>

      <g mask={`url(#${id}m0)`}>
        {LEAVES.map((transform, i) => (
          <g key={i} transform={transform}>
            <motion.path d={LEAF} variants={draw} custom={PETAL_COUNT + i * 2} />
          </g>
        ))}
      </g>

      {RINGS.map((ring, i) => (
        <g key={i} mask={i < RINGS.length - 1 ? `url(#${id}m${i + 1})` : undefined}>
          {rotations(ring).map((rot, k) => (
            <g key={rot} transform={`rotate(${rot})`}>
              <motion.path
                d={petalPath(ring.r, ring.w)}
                variants={draw}
                custom={firstSlot(i) + k}
              />
            </g>
          ))}
        </g>
      ))}
    </motion.svg>
  );
}
