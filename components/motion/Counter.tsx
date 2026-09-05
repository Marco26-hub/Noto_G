"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => `${new Intl.NumberFormat("it-IT").format(Math.round(v))}${suffix}`);

  useEffect(() => {
    if (inView) animate(value, to, { duration: 2, ease: "easeOut" });
  }, [inView, to, value]);

  return (
    <span ref={ref} className={className}>
      {inView ? <motion.span>{text}</motion.span> : `0${suffix}`}
    </span>
  );
}
