import { useId } from "react";

export const PALETTES = {
  blush: { light: "#fdeceb", mid: "#f6cfd0", deep: "#e9a9b1", core: "#cf7f91", edge: "#e6a9b2" },
  rose: { light: "#efb9c3", mid: "#d98a9d", deep: "#b85a74", core: "#84324c", edge: "#f8dade" },
  plum: { light: "#c4b0b7", mid: "#957885", deep: "#6c4e5b", core: "#432c36", edge: "#dccdd2" },
} as const;

export type PaletteName = keyof typeof PALETTES;

// Petal rings from the outside in; each ring is rotated so petals interleave.
export const RINGS = [
  { n: 6, r: 50, w: 37, rot: 0 },
  { n: 5, r: 39, w: 30, rot: 36 },
  { n: 5, r: 29, w: 22, rot: 8 },
  { n: 4, r: 19.5, w: 15.5, rot: 40 },
  { n: 3, r: 11, w: 9.5, rot: 15 },
];

const fix = (v: number) => +v.toFixed(2);

/** A broad petal with its base at the origin and its tip at (0, -r). */
export function petalPath(r: number, w: number) {
  return (
    `M0 0C${fix(-w)} ${fix(-r * 0.22)} ${fix(-w * 0.92)} ${fix(-r)} 0 ${fix(-r)}` +
    `C${fix(w * 0.92)} ${fix(-r)} ${fix(w)} ${fix(-r * 0.22)} 0 0Z`
  );
}

function mix(a: string, b: string, t: number) {
  const ch = (hex: string, i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16);
  return (
    "#" +
    [0, 1, 2]
      .map((i) =>
        Math.round(ch(a, i) + (ch(b, i) - ch(a, i)) * t)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

type RoseHeadProps = {
  palette?: PaletteName;
  cx?: number;
  cy?: number;
  size?: number;
  rot?: number;
};

/** A top-view rose as an SVG group, for composing inside a larger drawing. */
export function RoseHead({ palette = "blush", cx = 0, cy = 0, size = 104, rot = 0 }: RoseHeadProps) {
  const id = useId().replace(/\W/g, "");
  const p = PALETTES[palette];
  const fills = [p.light, mix(p.light, p.mid, 0.6), p.mid, mix(p.mid, p.deep, 0.7), p.deep];
  const shades = [p.mid, p.deep, p.deep, p.core, p.core];

  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${fix(size / 104)})`}>
      <defs>
        {RINGS.map((ring, i) => {
          const next = RINGS[i + 1];
          return (
            <radialGradient
              key={i}
              id={`${id}r${i}`}
              gradientUnits="userSpaceOnUse"
              cx="0"
              cy="0"
              r={ring.r}
            >
              <stop offset={next ? fix(next.r / ring.r - 0.14) : 0} stopColor={shades[i]} />
              <stop offset="1" stopColor={fills[i]} />
            </radialGradient>
          );
        })}
      </defs>
      {RINGS.map((ring, i) => (
        <g
          key={i}
          fill={`url(#${id}r${i})`}
          stroke={p.edge}
          strokeOpacity="0.55"
          strokeWidth="0.7"
        >
          {Array.from({ length: ring.n }, (_, k) => (
            <path
              key={k}
              d={petalPath(ring.r, ring.w)}
              transform={`rotate(${fix(ring.rot + (k * 360) / ring.n)})`}
            />
          ))}
        </g>
      ))}
      <path
        d="M-2.6 1.4a3.3 3.3 0 1 1 4.4 1.7"
        fill="none"
        stroke={p.core}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.75"
      />
    </g>
  );
}

type RoseProps = { palette?: PaletteName; className?: string };

export function Rose({ palette, className }: RoseProps) {
  return (
    <svg viewBox="-52 -52 104 104" className={className} aria-hidden="true">
      <RoseHead palette={palette} />
    </svg>
  );
}

/** A single loose petal. */
export function Petal({ palette = "blush", className }: RoseProps) {
  const id = useId().replace(/\W/g, "");
  const p = PALETTES[palette];
  return (
    <svg viewBox="-22 -22 44 44" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}p`} x1="0" y1="1" x2="0.25" y2="0">
          <stop offset="0" stopColor={p.deep} />
          <stop offset="0.55" stopColor={p.mid} />
          <stop offset="1" stopColor={p.light} />
        </linearGradient>
      </defs>
      <path
        d={petalPath(38, 26)}
        transform="translate(0 19)"
        fill={`url(#${id}p)`}
        stroke={p.edge}
        strokeOpacity="0.5"
        strokeWidth="0.6"
      />
    </svg>
  );
}
