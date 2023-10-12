"use client";
import { useRef, useCallback, useEffect } from "react";

type OnClickOutsideType = () => void;

export default function useOutsideClick(onClickOutside: OnClickOutsideType) {
  const ref = useRef<HTMLDivElement | null>(null);
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current != null) {
        const inside = ref.current.contains(e.target as Node);
        if (inside) return;
        onClickOutside();
      }
    },
    [onClickOutside, ref]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);
  return ref;
}
