"use client";

import { useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export default function HeroSceneLoader() {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [ready, setReady] = useState(false);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-500 ease-out"
      style={{ opacity: ready ? 1 : 0 }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-zinc-50 dark:bg-black" />
      <div className="relative h-full w-full">
        {isDesktop && <HeroScene onReady={() => setReady(true)} />}
      </div>
    </div>
  );
}
