"use client";

import { useSyncExternalStore } from "react";
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

  if (!isDesktop) return null;

  return (
    <div className="w-full h-full" aria-hidden="true">
      <HeroScene />
    </div>
  );
}
