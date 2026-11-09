"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";

/**
 * Hero → Approach 스크롤 전환.
 * - Hero(디자인 변경 없음)를 sticky 레이어로 감싸 화면 뒤에 고정하고, Approach 패널이 그 위로 올라오며 덮습니다.
 * - 진행도 = 스크롤 거리 / Hero 레이어 높이 (패널 상단이 네비 아래에 닿으면 1).
 *   이 동안 Hero가 미세하게 축소·상승하고 어두워집니다. (transform / opacity만 사용)
 * - Hero 레이어가 화면보다 높으면(짧은 화면) 고정을 해제해 콘텐츠가 가려지지 않게 합니다.
 * - 래퍼가 끝나면 sticky가 해제되므로 이후 섹션에는 영향이 없습니다.
 */
/**
 * 첫 진입 시 Hero 레이어 높이 = 화면 높이 − 네비 − Approach 패널 노출분(화면의 약 7%, 44~72px).
 * 패널은 둥근 상단 모서리만 살짝 보이고, 본문·지표는 보이지 않습니다.
 * svh(가장 작은 뷰포트 높이) 기준이라 모바일 주소창이 접히고 펴져도 레이아웃이 다시 계산되지 않습니다.
 */
const HERO_LAYER_MIN_HEIGHT = "calc(100svh - var(--gl-nav-h) - clamp(44px, 7svh, 72px))";

export default function IntroStack() {
  const layerRef = useRef<HTMLDivElement>(null);
  const layerHeight = useMotionValue(1);
  const pinned = useMotionValue(1);
  const [canPin, setCanPin] = useState(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const measure = () => {
      const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gl-nav-h")) || 0;
      const height = layer.offsetHeight;
      const fits = height <= window.innerHeight - navHeight;
      layerHeight.set(Math.max(height, 1));
      pinned.set(fits ? 1 : 0);
      setCanPin(fits);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(layer);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [layerHeight, pinned]);

  const progress = useTransform([scrollY, layerHeight, pinned], ([y, h, p]: number[]) =>
    p ? Math.min(Math.max(y / h, 0), 1) : 0,
  );
  const scale = useTransform(progress, [0, 1], [1, 0.94]);
  const y = useTransform(progress, [0, 1], [0, -32]);
  const dim = useTransform(progress, [0, 1], [0, 0.55]);

  return (
    // reducedMotion="user": 사용자가 동작 줄이기를 설정한 경우 등장 애니메이션의 이동(transform)을 생략합니다.
    <MotionConfig reducedMotion="user">
      <div className="relative w-full">
        <div
          ref={layerRef}
          className={`${canPin ? "sticky top-[var(--gl-nav-h)]" : "relative"} w-full overflow-hidden bg-zinc-50 dark:bg-black`}
        >
          <motion.div
            style={{ scale, y, minHeight: HERO_LAYER_MIN_HEIGHT }}
            // prefers-reduced-motion: 축소·이동은 끄고 어두워지는 전환(opacity)만 유지합니다.
            // flex-col: Hero의 기존 flex-1 + items-center가 늘어난 높이 안에서 콘텐츠를 세로 중앙에 둡니다.
            className="flex origin-top flex-col py-10 will-change-transform motion-reduce:transform-none!"
          >
            <Hero />
          </motion.div>
          <motion.div
            aria-hidden="true"
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 bg-black"
          />
        </div>
        <WhyChooseUs />
      </div>
    </MotionConfig>
  );
}
