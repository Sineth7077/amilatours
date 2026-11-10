import { useEffect, useState } from "react";

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Floating "back to top" control with a reading-progress ring.
 * Appears once the visitor has scrolled past the first screen.
 */
const BackToTop = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(Math.max(ratio, 0), 1));
      setVisible(window.scrollY > 400);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`progress-wrap ${visible ? "active-progress" : ""}`}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg
        className="progress-circle"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          className="progress-track"
          cx="30"
          cy="30"
          r={RADIUS}
          fill="none"
          strokeWidth="3"
        />
        <circle
          className="progress-indicator"
          cx="30"
          cy="30"
          r={RADIUS}
          fill="none"
          strokeWidth="3"
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: CIRCUMFERENCE * (1 - progress),
          }}
        />
      </svg>
      <span className="progress-arrow" aria-hidden="true">
        ↑
      </span>
    </button>
  );
};

export default BackToTop;
