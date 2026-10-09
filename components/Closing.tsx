"use client";

import { motion } from "motion/react";
import { WEDDING } from "@/lib/wedding";
import { RoseSketch } from "./RoseSketch";
import styles from "./sections.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Closing() {
  return (
    <footer className={styles.closing}>
      <RoseSketch className={`${styles.sketch} ${styles.sketchClosingLeft}`} />
      <RoseSketch className={`${styles.sketch} ${styles.sketchClosingRight}`} />
      <motion.div
        className={styles.closingInner}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.25 }}
      >
        <motion.p
          className={styles.closingKicker}
          variants={{
            hidden: { opacity: 0, letterSpacing: "0.7em" },
            show: { opacity: 1, letterSpacing: "0.4em", transition: { duration: 1.2, ease: EASE } },
          }}
        >
          With love
        </motion.p>
        <motion.p
          className={styles.closingNames}
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.4, ease: EASE } },
          }}
        >
          {WEDDING.groom} &amp; {WEDDING.bride}
        </motion.p>
        <motion.p
          className={styles.closingDate}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 1.2 } },
          }}
        >
          {WEDDING.dateLabel}
        </motion.p>
      </motion.div>
    </footer>
  );
}
