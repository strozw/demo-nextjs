"use client";

import { useEffect, useState } from "react";

export function useClientTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, []);

  return time;
}
