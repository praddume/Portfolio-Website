import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cursor = cursorRef.current!;
    if (!cursor) return;

    // Use gsap.quickTo for smooth, optimized updates
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    let hover = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!hover) {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    const elements = document.querySelectorAll("[data-cursor]");
    const elementListeners: { element: HTMLElement; over: (e: MouseEvent) => void; out: () => void }[] = [];

    elements.forEach((item) => {
      const element = item as HTMLElement;
      
      const over = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          xTo(rect.left);
          yTo(rect.top);
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };

      const out = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };

      element.addEventListener("mouseover", over as any);
      element.addEventListener("mouseout", out);
      elementListeners.push({ element, over: over as any, out });
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      elementListeners.forEach(({ element, over, out }) => {
        element.removeEventListener("mouseover", over as any);
        element.removeEventListener("mouseout", out);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
