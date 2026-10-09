"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./ScrollHint.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A floating prompt telling guests the venue is further down the page.
 * It stays on screen until the details section has been reached.
 */
export function ScrollHint() {
  const [reached, setReached] = useState(false);

  useEffect(() => {
    const details = document.getElementById("details");
    if (!details) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hidden while the details are on screen, and once scrolled past them.
        setReached(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    observer.observe(details);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.dock}>
      <AnimatePresence>
        {!reached && (
          <motion.a
            href="#details"
            className={styles.hint}
            initial={{ opacity: 0, y: 28, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.9, transition: { duration: 0.35, ease: EASE } }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
          >
            <span className={styles.bob}>
              <span className={styles.pin} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21.5c-4.2-4.6-6.5-8-6.5-11a6.5 6.5 0 0 1 13 0c0 3-2.3 6.4-6.5 11Z" />
                  <circle cx="12" cy="10.3" r="2.4" />
                </svg>
              </span>
              <span className={styles.text}>
                <span className={styles.lead}>Scroll down</span>
                <span className={styles.what}>for the location</span>
              </span>
              <span className={styles.chevrons} aria-hidden="true">
                {[0, 1].map((i) => (
                  <svg
                    key={i}
                    viewBox="0 0 16 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 2l6 6 6-6" />
                  </svg>
                ))}
              </span>
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
