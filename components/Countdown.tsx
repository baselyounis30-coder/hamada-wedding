"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { WEDDING } from "@/lib/wedding";
import { RoseSketch } from "./RoseSketch";
import { SectionHeading } from "./SectionHeading";
import styles from "./sections.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const TARGET = Math.floor(WEDDING.date.getTime() / 1000);

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}
const getNow = () => Math.floor(Date.now() / 1000);
// The clock is unknown on the server; render placeholders until hydrated.
const getServerNow = () => null;

function Unit({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <motion.div
      className={styles.unit}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
    >
      <span className={styles.num}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            className={styles.numValue}
            initial={{ y: "70%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-70%", opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className={styles.unitLabel}>{label}</span>
    </motion.div>
  );
}

export function Countdown() {
  const now = useSyncExternalStore<number | null>(subscribe, getNow, getServerNow);
  const left = now === null ? null : Math.max(0, TARGET - now);
  const arrived = left === 0;

  const pad = (n: number) => String(n).padStart(2, "0");
  const units =
    left === null
      ? [
          { label: "Days", value: "––" },
          { label: "Hours", value: "––" },
          { label: "Minutes", value: "––" },
          { label: "Seconds", value: "––" },
        ]
      : [
          { label: "Days", value: String(Math.floor(left / 86400)) },
          { label: "Hours", value: pad(Math.floor((left % 86400) / 3600)) },
          { label: "Minutes", value: pad(Math.floor((left % 3600) / 60)) },
          { label: "Seconds", value: pad(left % 60) },
        ];

  return (
    <section id="countdown" className={styles.section}>
      <RoseSketch className={`${styles.sketch} ${styles.sketchLeft}`} />
      <RoseSketch className={`${styles.sketch} ${styles.sketchRight}`} />
      <SectionHeading
        kicker={arrived ? "The day is here" : "Until we say I do"}
        title={arrived ? "Our forever has begun" : "Counting down to forever"}
      />
      <div
        className={styles.countGrid}
        role="timer"
        aria-label={`Time until ${WEDDING.dateLabel}, ${WEDDING.timeLabel}`}
      >
        {units.map((unit, i) => (
          <Unit key={unit.label} index={i} {...unit} />
        ))}
      </div>
    </section>
  );
}
