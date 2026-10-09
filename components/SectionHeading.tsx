"use client";

import { motion } from "motion/react";
import { Rose } from "./Rose";
import styles from "./sections.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <motion.header
      className={styles.heading}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.15 }}
    >
      <motion.p
        className={styles.kicker}
        variants={{
          hidden: { opacity: 0, letterSpacing: "0.7em" },
          show: { opacity: 1, letterSpacing: "0.4em", transition: { duration: 1.2, ease: EASE } },
        }}
      >
        {kicker}
      </motion.p>
      <motion.h2
        className={styles.title}
        variants={{
          hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
          show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: EASE } },
        }}
      >
        {title}
      </motion.h2>
      <div className={styles.ornament} aria-hidden="true">
        <motion.span
          className={styles.rule}
          style={{ originX: 1 }}
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease: EASE } } }}
        />
        <motion.span
          className={styles.ornamentRose}
          variants={{
            hidden: { opacity: 0, scale: 0, rotate: -120 },
            show: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { type: "spring", stiffness: 90, damping: 11 },
            },
          }}
        >
          <Rose palette="rose" />
        </motion.span>
        <motion.span
          className={styles.rule}
          style={{ originX: 0 }}
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease: EASE } } }}
        />
      </div>
    </motion.header>
  );
}
