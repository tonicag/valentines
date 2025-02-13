"use client";
import React, { useEffect, useRef } from "react";
import anime from "animejs";
import "./style.css";

type HeartBackgroundProps = {
  itemCount: number;
};

export default function HeartBackground({ itemCount }: HeartBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<anime.AnimeInstance | null>(null);

  useEffect(() => {
    const createHearts = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;

      // Clear existing hearts
      container.innerHTML = "";

      for (let i = 0; i <= itemCount; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        const emojis = [
          "💖",
          "💕",
          "💓",
          "💗",
          "💘",
          "❤️",
          "❤️‍🔥",
          "💝",
          "💞",
          "🥵",
          "😈",
        ];
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.fontSize = `${Math.random() * 10 + 35}px`;
        container.appendChild(heart);
      }
    };

    const animateHearts = () => {
      // Stop existing animation if it's running
      if (animationRef.current) {
        animationRef.current.pause();
      }

      animationRef.current = anime({
        targets: ".heart",
        translateX: function () {
          return anime.random(-400, 400);
        },
        translateY: function () {
          return anime.random(-500, 500);
        },
        scale: function () {
          return anime.random(1, 3);
        },
        easing: "easeInOutBack",
        duration: 3000,
        delay: anime.stagger(10),
        complete: animateHearts,
      });
    };

    createHearts();
    animateHearts();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, [itemCount]);

  return (
    <div
      ref={containerRef}
      className="anime-container fixed inset-0 z-0 overflow-hidden pointer-events-none"
    />
  );
}
