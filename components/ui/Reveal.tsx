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
          ? { opacity: 0, y: 40, scale: 0.96 }
          : false
      }
      whileInView={
        animate
          ? { opacity: 1, y: 0, scale: 1 }
          : undefined
      }
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1], // fluid organic ease-out
      }}
    >
      {children}
    </motion.div>
  );
}
