"use client";

import { motion } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { GOOGLE_CALENDAR_URL, ICS_URL, MAPS_URL, WEDDING } from "@/lib/wedding";
import { RoseSketch } from "./RoseSketch";
import { SectionHeading } from "./SectionHeading";
import styles from "./sections.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

// Feeds the pointer position to the card's highlight.
function trackPointer(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  card.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

function Card({
  index,
  icon,
  label,
  primary,
  secondary,
  children,
}: {
  index: number;
  icon: ReactNode;
  label: string;
  primary: string;
  secondary: string;
  children: ReactNode;
}) {
  return (
    <motion.article
      className={styles.card}
      onPointerMove={trackPointer}
      initial={{ opacity: 0, y: 50, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1, delay: index * 0.15, ease: EASE }}
    >
      <span className={styles.cardIcon} aria-hidden="true">
        {icon}
      </span>
      <p className={styles.cardLabel}>{label}</p>
      <p className={styles.cardPrimary}>{primary}</p>
      <p className={styles.cardSecondary}>{secondary}</p>
      <div className={styles.actions}>{children}</div>
    </motion.article>
  );
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function Details() {
  return (
    <section id="details" className={styles.section}>
      <RoseSketch className={`${styles.sketch} ${styles.sketchRightLow}`} />
      <SectionHeading kicker="Save the date" title="When & Where" />
      <div className={styles.cards}>
        <Card
          index={0}
          label="The Date"
          primary={WEDDING.weekday}
          secondary={WEDDING.dateLabel}
          icon={
            <svg {...iconProps}>
              <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
              <path d="M3.5 10h17M8 3v4M16 3v4" />
              <path d="M12 17.2c-2.2-1.5-3.2-2.6-3.2-3.8a1.7 1.7 0 0 1 3.2-.8 1.7 1.7 0 0 1 3.2.8c0 1.2-1 2.3-3.2 3.8Z" />
            </svg>
          }
        >
          <a className={styles.button} href={ICS_URL} download="mohamed-nehal-wedding.ics">
            Add to calendar
          </a>
          <a className={styles.link} href={GOOGLE_CALENDAR_URL} target="_blank" rel="noreferrer">
            Google Calendar
          </a>
        </Card>
        <Card
          index={1}
          label="The Venue"
          primary={WEDDING.hall}
          secondary={WEDDING.venue}
          icon={
            <svg {...iconProps}>
              <path d="M12 21.5c-4.2-4.6-6.5-8-6.5-11a6.5 6.5 0 0 1 13 0c0 3-2.3 6.4-6.5 11Z" />
              <circle cx="12" cy="10.3" r="2.4" />
            </svg>
          }
        >
          <a className={styles.button} href={MAPS_URL} target="_blank" rel="noreferrer">
            Open in Maps
          </a>
        </Card>
      </div>
    </section>
  );
}
