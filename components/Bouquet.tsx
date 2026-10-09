import { useId } from "react";
import { RoseHead } from "./Rose";

const fix = (v: number) => +v.toFixed(2);

type Placed = { x: number; y: number; rot?: number; s?: number };

function Leaf({ x, y, rot = 0, s = 1, fill }: Placed & { fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0C17 -18 18 -54 0 -80C-18 -54 -17 -18 0 0Z" fill={fill} />
      <path d="M0 -3V-70" stroke="#8d7a6f" strokeOpacity="0.4" strokeWidth="1" fill="none" />
    </g>
  );
}

function Blossom({
  x,
  y,
  rot = 0,
  s = 1,
  petal,
  center,
}: Placed & { petal: string; center: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {[0, 1, 2, 3, 4].map((k) => (
        <path
          key={k}
          d="M0 0C-12 -6 -13 -24 0 -27C13 -24 12 -6 0 0Z"
          transform={`rotate(${k * 72})`}
          fill={petal}
        />
      ))}
      <circle r="4" fill={center} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <circle
          key={k}
          cx={fix(7.5 * Math.cos((k * Math.PI) / 3))}
          cy={fix(7.5 * Math.sin((k * Math.PI) / 3))}
          r="1.1"
          fill={center}
        />
      ))}
    </g>
  );
}

const BERRIES: [number, number, number][] = [
  [224, 13, 7], [213, 20, 6], [235, 21, 6], [223, 28, 5.5],
  [164, 76, 7], [176, 82, 6], [156, 87, 6], [169, 93, 5],
  [152, 9, 6.5], [141, 15, 5.5], [161, 17, 5.5],
  [118, 22, 4.5], [104, 30, 3.5], [96, 16, 3.5],
];

/**
 * The corner floral arrangement from the invitation, drawn to sit in the
 * top-right corner. Rotate it 180° for the bottom-left.
 */
export function Bouquet({ className }: { className?: string }) {
  const id = useId().replace(/\W/g, "");
  const leafA = `url(#${id}la)`;
  const leafB = `url(#${id}lb)`;
  const berry = `url(#${id}be)`;
  const dusty = `url(#${id}du)`;
  const pale = `url(#${id}pa)`;

  return (
    <svg viewBox="0 0 520 700" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}la`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#a39085" />
          <stop offset="1" stopColor="#d2c5b8" />
        </linearGradient>
        <linearGradient id={`${id}lb`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#c2b2a5" />
          <stop offset="1" stopColor="#ece3da" />
        </linearGradient>
        <radialGradient id={`${id}be`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#96506a" />
          <stop offset="1" stopColor="#56203a" />
        </radialGradient>
        <radialGradient id={`${id}du`} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="27">
          <stop offset="0.15" stopColor="#a84f68" />
          <stop offset="1" stopColor="#e3a0ad" />
        </radialGradient>
        <radialGradient id={`${id}pa`} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="27">
          <stop offset="0.1" stopColor="#eeb9c0" />
          <stop offset="1" stopColor="#fbe4e4" />
        </radialGradient>
        {/* Wobbles the edges slightly so the shapes read as painted. */}
        <filter id={`${id}wc`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="6" />
        </filter>
      </defs>

      <g filter={`url(#${id}wc)`}>
        {/* Berry sprig reaching along the top edge */}
        <g fill="none" stroke="#9c877c" strokeWidth="2" strokeLinecap="round">
          <path d="M310 78C262 44 205 52 118 22" />
          <path d="M236 50C226 38 222 28 224 13" />
          <path d="M200 46C192 60 180 70 164 76" />
          <path d="M170 36C160 26 154 18 152 9" />
          <path d="M132 27C122 30 112 30 104 30M128 25C116 22 106 18 96 16" />
        </g>
        <Leaf x={270} y={54} rot={-52} s={0.72} fill={leafB} />
        <Leaf x={196} y={44} rot={-118} s={0.7} fill={leafA} />
        <Leaf x={140} y={28} rot={-64} s={0.62} fill={leafA} />
        <Leaf x={250} y={50} rot={-150} s={0.6} fill={leafB} />
        {BERRIES.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={berry} />
        ))}

        {/* Hanging spray */}
        <g fill="none" stroke="#a8958a" strokeWidth="1.8" strokeLinecap="round">
          <path d="M455 430C462 500 438 560 452 668" />
          <path d="M470 435C492 478 488 520 498 560" />
          <path d="M440 435C420 478 418 500 404 528" />
        </g>
        <circle cx="419" cy="477" r="10" fill={leafB} />
        <circle cx="408" cy="500" r="8.5" fill={leafA} opacity="0.85" />
        <circle cx="427" cy="506" r="7" fill={leafB} />
        <Leaf x={452} y={632} rot={178} s={0.82} fill={leafA} />
        <Leaf x={447} y={604} rot={148} s={0.7} fill={leafB} />
        <Leaf x={457} y={612} rot={-152} s={0.7} fill={leafA} />
        <Leaf x={498} y={552} rot={168} s={0.6} fill={leafB} />

        {/* Leaves tucked behind the roses */}
        <Leaf x={236} y={112} rot={-100} s={1.2} fill={leafA} />
        <Leaf x={242} y={138} rot={-122} s={1.05} fill={leafB} />
        <Leaf x={276} y={186} rot={-152} s={1.1} fill={leafA} />
        <Leaf x={396} y={62} rot={-28} s={0.95} fill={leafB} />
        <Leaf x={346} y={266} rot={-84} s={0.95} fill={leafB} />
        <Leaf x={368} y={346} rot={-96} s={1.15} fill={leafA} />
        <Leaf x={376} y={386} rot={-126} s={1.05} fill={leafB} />
        <Leaf x={412} y={428} rot={-156} s={1.1} fill={leafA} />
        <Leaf x={492} y={432} rot={166} s={1} fill={leafB} />

        <RoseHead palette="blush" cx={322} cy={104} size={216} rot={12} />
        <RoseHead palette="plum" cx={462} cy={152} size={222} rot={44} />
        <RoseHead palette="rose" cx={452} cy={352} size={202} rot={-18} />
        <Blossom x={390} y={262} rot={14} s={2.3} petal={dusty} center="#3a1b28" />

        <Blossom x={478} y={478} rot={10} s={0.8} petal={pale} center="#4a2a36" />
        <Blossom x={432} y={500} rot={40} s={0.85} petal={pale} center="#4a2a36" />
        <Blossom x={492} y={528} rot={-20} s={0.75} petal={pale} center="#4a2a36" />
        <Blossom x={452} y={546} rot={25} s={0.9} petal={pale} center="#4a2a36" />
        <Blossom x={470} y={590} rot={-8} s={0.7} petal={pale} center="#4a2a36" />
        <Blossom x={404} y={530} rot={55} s={0.7} petal={pale} center="#4a2a36" />
      </g>
    </svg>
  );
}
