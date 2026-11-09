"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";
import { MotionConfig, motion, useInView, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------------- 단계별 라인 아이콘 (24px, stroke 1.5) ---------------- */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ICONS: ReactNode[] = [
  // 01 상담 문의 — 말풍선
  <svg key="chat" {...iconProps}>
    <path d="M20 12.5a7.5 7.5 0 0 1-10.9 6.7L4.5 20.5l1.3-4.2A7.5 7.5 0 1 1 20 12.5Z" />
    <path d="M9 12h.01M12.5 12h.01M16 12h.01" strokeWidth={2.2} />
  </svg>,
  // 02 견적 및 계약 — 문서 + 서명
  <svg key="contract" {...iconProps}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M8.5 13h7M8.5 16.5h4" />
  </svg>,
  // 03 자료 전달 — 폴더 + 업로드
  <svg key="folder" {...iconProps}>
    <path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7.5Z" />
    <path d="M12 16v-5M9.5 13.5 12 11l2.5 2.5" />
  </svg>,
  // 04 디자인·개발 — 모니터 + 코드
  <svg key="code" {...iconProps}>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4M10 8.5 7.5 10.5 10 12.5M14 8.5l2.5 2 -2.5 2" />
  </svg>,
  // 05 검수 및 수정 — 돋보기 + 체크
  <svg key="review" {...iconProps}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m20 20-4.6-4.6M8 10.6l1.8 1.8 3.2-3.4" />
  </svg>,
  // 06 오픈 및 안내 — 로켓
  <svg key="launch" {...iconProps}>
    <path d="M12.5 15.5 8.5 11.5c1.6-4.5 5-7.5 11-8-.5 6-3.5 9.4-8 11Z" />
    <path d="M8.5 11.5 5 11l2.5-3.5h4M12.5 15.5 13 19l3.5-2.5v-4M5.5 18.5c.4-1.7 1.3-2.6 3-3" />
  </svg>,
];

const STEPS = [
  { title: "상담 문의", description: "프로젝트의 목적과 요구사항을 확인합니다." },
  { title: "견적 및 계약", description: "작업 범위와 비용, 일정을 안내합니다." },
  { title: "자료 전달", description: "제작에 필요한 자료를 전달받습니다." },
  { title: "디자인·개발", description: "브랜드에 맞는 디자인과 기능을 구현합니다." },
  { title: "검수 및 수정", description: "완성된 화면을 함께 확인하고 조정합니다." },
  { title: "오픈 및 안내", description: "최종 확인 후 홈페이지를 공개합니다." },
];

const TOTAL = STEPS.length;

/** 단계 전환 간격(ms). 6단계도 같은 시간만큼 유지된 뒤 1단계로 돌아갑니다. */
const STEP_INTERVAL = 1500;

/* 외부 상태 구독: 탭 표시 여부 / 동작 줄이기 설정 (서버 렌더 시에는 "보임·동작 허용"으로 가정) */
function subscribeVisibility(cb: () => void) {
  document.addEventListener("visibilitychange", cb);
  return () => document.removeEventListener("visibilitychange", cb);
}
const getTabVisible = () => document.visibilityState === "visible";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduce(cb: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReduce = () => window.matchMedia(REDUCE_QUERY).matches;

/**
 * 자동 재생 단계.
 * - 섹션이 40% 이상 보이고 탭이 활성 상태일 때만 타이머 1개가 동작합니다.
 * - 화면을 벗어나거나 탭이 숨겨지면 타이머를 정리하고, 다시 보이면 멈춘 단계부터 이어서 진행합니다.
 * - prefers-reduced-motion이면 자동 반복을 하지 않고 모든 단계를 읽을 수 있게 표시합니다(showAll).
 * - 활성 단계가 바뀌어도 스크롤 위치에는 손대지 않습니다.
 */
function useAutoStep(targetRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(0);
  const inView = useInView(targetRef, { amount: 0.4 });
  const tabVisible = useSyncExternalStore(subscribeVisibility, getTabVisible, () => true);
  const reduceMotion = useSyncExternalStore(subscribeReduce, getReduce, () => false);
  const running = inView && tabVisible && !reduceMotion;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % TOTAL);
    }, STEP_INTERVAL);
    return () => window.clearInterval(id);
  }, [running]);

  return { active, showAll: reduceMotion };
}

/** 연결선 채움: 현재 단계까지 (1단계 0 → 6단계 1) */
const fillTransition = { duration: 0.7, ease };

/* 원형 아이콘: 활성 단계만 흰 배경 + 진한 아이콘 (색상은 CSS transition으로 부드럽게 변화) */
function StepCircle({ index, active, size }: { index: number; active: boolean; size: "lg" | "sm" }) {
  return (
    <span
      className={`relative z-10 flex shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-500 ease-out motion-reduce:transition-none ${
        size === "lg" ? "h-[72px] w-[72px] [&>svg]:h-7 [&>svg]:w-7" : "h-12 w-12 [&>svg]:h-[22px] [&>svg]:w-[22px]"
      } ${
        active
          ? "scale-105 border-white bg-white text-black shadow-[0_0_0_8px_rgba(255,255,255,0.06)]"
          : "scale-100 border-zinc-800 bg-zinc-900 text-zinc-500"
      }`}
    >
      {ICONS[index]}
    </span>
  );
}

const headIntro: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

function Header() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={headIntro}
      className="relative"
    >
      <motion.p
        aria-hidden="true"
        variants={fadeUp}
        className="pointer-events-none absolute -top-8 right-0 select-none whitespace-nowrap text-right text-[length:clamp(4rem,19vw,11rem)] font-black leading-none tracking-[-0.04em] text-white/[0.07] md:-top-12"
      >
        PROCESS
      </motion.p>
      <motion.h2
        id="process-title"
        variants={fadeUp}
        className="relative pt-10 text-right text-[26px] font-bold leading-[1.4] tracking-[-0.03em] text-white break-keep md:pt-16 md:text-4xl lg:text-[40px]"
      >
        홈페이지 제작 과정,
        <br />
        처음부터 끝까지 함께합니다<span className="text-emerald-400">.</span>
      </motion.h2>
    </motion.div>
  );
}

type TimelineProps = { active: number; showAll: boolean };

/* ---------------- 데스크톱(lg+): 가로 6단계 타임라인 ---------------- */
function DesktopTimeline({ active, showAll }: TimelineProps) {
  return (
    <ol className="relative mt-20 grid grid-cols-6 xl:mt-24">
      {/* 연결선: 첫 원 중심 ~ 마지막 원 중심, 원(72px)의 세로 중앙(36px)을 정확히 통과 */}
      <span aria-hidden="true" className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-9 h-px -translate-y-1/2 bg-zinc-800" />
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleX: showAll ? 1 : active / (TOTAL - 1) }}
        transition={fillTransition}
        className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-9 h-px origin-left -translate-y-1/2 bg-white/70"
      />
      {STEPS.map((step, i) => {
        const isActive = !showAll && i === active;
        const bright = showAll || isActive;
        return (
          <li key={step.title} aria-current={isActive ? "step" : undefined} className="flex flex-col items-center px-3 text-center">
            <StepCircle index={i} active={isActive} size="lg" />
            <p
              className={`mt-7 text-[19px] font-bold tracking-[-0.02em] transition-colors duration-500 motion-reduce:transition-none xl:text-xl ${
                bright ? "text-white" : "text-zinc-500"
              }`}
            >
              <span className="mr-1.5 tabular-nums">{String(i + 1).padStart(2, "0")}.</span>
              {step.title}
            </p>
            <p
              className={`mt-2.5 text-[14px] leading-[1.6] break-keep transition-colors duration-500 motion-reduce:transition-none xl:text-[15px] ${
                bright ? "text-zinc-300" : "text-zinc-600"
              }`}
            >
              {step.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------- 모바일·태블릿(<lg): 세로 타임라인 ---------------- */
function MobileTimeline({ active, showAll }: TimelineProps) {
  return (
    <ol className="relative mt-16 md:mt-20">
      {/* 세로 연결선: 원(48px) 중심(24px)을 통과 */}
      <span aria-hidden="true" className="absolute bottom-12 left-6 top-6 w-px -translate-x-1/2 bg-zinc-800" />
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleY: showAll ? 1 : active / (TOTAL - 1) }}
        transition={fillTransition}
        className="absolute bottom-12 left-6 top-6 w-px origin-top -translate-x-1/2 bg-white/70"
      />
      {STEPS.map((step, i) => {
        const isActive = !showAll && i === active;
        const bright = showAll || isActive;
        return (
          <li key={step.title} aria-current={isActive ? "step" : undefined} className="relative flex gap-5 pb-11 last:pb-0">
            <StepCircle index={i} active={isActive} size="sm" />
            <div className="pt-2.5">
              <p
                className={`text-lg font-bold tracking-[-0.02em] transition-colors duration-500 motion-reduce:transition-none md:text-xl ${
                  bright ? "text-white" : "text-zinc-500"
                }`}
              >
                <span className="mr-1.5 tabular-nums">{String(i + 1).padStart(2, "0")}.</span>
                {step.title}
              </p>
              <p
                className={`mt-1.5 text-[15px] leading-[1.6] break-keep transition-colors duration-500 motion-reduce:transition-none md:text-base ${
                  bright ? "text-zinc-300" : "text-zinc-500"
                }`}
              >
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  // 섹션이 40% 이상 보이는 동안 1.5초 간격으로 1 → 6 단계를 자동 재생하고 반복합니다.
  const { active, showAll } = useAutoStep(sectionRef);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="process"
        ref={sectionRef}
        aria-labelledby="process-title"
        className="relative w-full scroll-mt-[var(--gl-nav-h)] overflow-hidden bg-black text-white"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-12 md:py-32 lg:py-36">
          <Header />
          <div className="hidden lg:block">
            <DesktopTimeline active={active} showAll={showAll} />
          </div>
          <div className="lg:hidden">
            <MobileTimeline active={active} showAll={showAll} />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
