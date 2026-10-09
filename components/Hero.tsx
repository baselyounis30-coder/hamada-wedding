"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WEDDING } from "@/lib/wedding";
import { Bouquet } from "./Bouquet";
import styles from "./Hero.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Reveals text one letter at a time while keeping words unbroken. */
function Letters({ text, delay, step = 0.035 }: { text: string; delay: number; step?: number }) {
  let index = 0;
  return (
    <>
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, w) => (
          <span key={w} className={styles.word}>
            {Array.from(word).map((char) => {
              const i = index++;
              return (
                <motion.span
                  key={i}
                  className={styles.letter}
                  initial={{ opacity: 0, y: "0.6em", filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: delay + i * step, ease: EASE }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </span>
    </>
  );
}

function Name({ children, delay }: { children: string; delay: number }) {
  return (
    <motion.span
      className={styles.name}
      // Wiped in left to right, like ink following a pen.
      initial={{ clipPath: "inset(-30% 110% -30% -10%)", opacity: 0 }}
      animate={{ clipPath: "inset(-30% -10% -30% -10%)", opacity: 1 }}
      transition={{
        clipPath: { duration: 1.6, delay, ease: [0.65, 0, 0.35, 1] },
        opacity: { duration: 0.4, delay },
      }}
    >
      {children}
    </motion.span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const topY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bottomY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section ref={ref} className={styles.hero}>
      <div className={styles.shade} />

      <motion.div className={`${styles.bouquet} ${styles.topRight}`} style={{ y: topY }}>
        <motion.div
          initial={{ opacity: 0, scale: 1.12, x: 40, y: -40 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <div className={styles.sway}>
            <Bouquet />
          </div>
        </motion.div>
      </motion.div>

      <motion.div className={`${styles.bouquet} ${styles.bottomLeft}`} style={{ y: bottomY }}>
        <motion.div
          initial={{ opacity: 0, scale: 1.12, x: -40, y: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.8, delay: 0.15, ease: EASE }}
        >
          <div className={styles.flip}>
            <div className={styles.sway}>
              <Bouquet />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className={styles.content} style={{ y: contentY, opacity: contentOpacity }}>
        <p className={styles.eyebrow}>
          <Letters text="Please reserve the date for our wedding" delay={0.5} />
        </p>

        <h1 className={styles.names}>
          <Name delay={1.3}>{WEDDING.groom}</Name>
          <motion.span
            className={styles.amp}
            initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 2.3 }}
          >
            &amp;
          </motion.span>
          <Name delay={2.6}>{WEDDING.bride}</Name>
        </h1>

        <motion.p className={styles.tagline} {...fadeUp(3.7)}>
          We can&rsquo;t wait to celebrate our forever with you.
        </motion.p>

        <p className={styles.date}>
          <Letters text={WEDDING.dateLabel} delay={4.1} step={0.05} />
        </p>

        <motion.p className={styles.time} {...fadeUp(4.7)}>
          {WEDDING.timeLabel}
        </motion.p>

        <motion.p className={styles.venue} {...fadeUp(5)}>
          {WEDDING.hall}
          <br />
          {WEDDING.venue}
        </motion.p>
      </motion.div>
    </section>
  );
}
