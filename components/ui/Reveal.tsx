"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/reduced-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const animate =
    mounted && !reduced && typeof IntersectionObserver !== "undefined";

  return (
    <motion.div
      key={animate ? "animated" : "static"}
      className={className}
      initial={
        animate
          ? { opacity: 0, y: 28 }
          : false
      }
      whileInView={
        animate
          ? { opacity: 1, y: 0 }
          : undefined
      }
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1], // systematic clean cubic-bezier
      }}
    >
      {children}
    </motion.div>
  );
}
