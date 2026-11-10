import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
