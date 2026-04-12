"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
  loop?: boolean;
  cursor?: boolean;
  className?: string;
}

export function Typewriter({
  texts,
  speed = 80,
  deleteSpeed = 40,
  pause = 1500,
  loop = true,
  cursor = true,
  className,
}: TypewriterProps) {
  const [displayed, setDisplayed] = React.useState("");
  const [textIndex, setTextIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (texts.length === 0) return;

    if (isPaused) {
      const timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pause);
      return () => clearTimeout(timer);
    }

    const current = texts[textIndex];

    if (!isDeleting) {
      if (displayed.length < current.length) {
        const timer = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, speed);
        return () => clearTimeout(timer);
      } else {
        if (!loop && textIndex === texts.length - 1) return;
        setIsPaused(true);
      }
    } else {
      if (displayed.length > 0) {
        const timer = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setTextIndex((i) => (i + 1) % texts.length);
      }
    }
  }, [displayed, isDeleting, isPaused, textIndex, texts, speed, deleteSpeed, pause, loop]);

  return (
    <span className={cn("inline", className)}>
      {displayed}
      {cursor && (
        <span className="animate-[blink_1s_step-end_infinite] border-r-2 border-current ml-0.5" />
      )}
    </span>
  );
}
