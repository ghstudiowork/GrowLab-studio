"use client";

import { useEffect, useRef, type ReactNode, type Ref } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/**
 * 실적 지표 공개 여부 — 운영자 확인 후 공개(true).
 * false로 바꾸면 운영 빌드(next build)에서는 숨겨지고 로컬 개발 서버에서만 표시됩니다.
 */
const STATS_VERIFIED = true;
const SHOW_STATS = STATS_VERIFIED || process.env.NODE_ENV !== "production";

type Stat = {
  value: number;
  decimals: number;
  suffix: string;
  title: string;
  description: string;
};

const STATS: Stat[] = [
  { value: 100, decimals: 0, suffix: "%", title: "프로젝트 완료율", description: "모든 프로젝트를 완벽하게 마무리합니다" },
  { value: 100, decimals: 0, suffix: "%", title: "일정 준수율", description: "철저한 일정 관리로 약속을 지킵니다" },
  { value: 5, decimals: 1, suffix: "점", title: "고객 만족도", description: "만족한 고객님들의 추천으로 성장합니다" },
];

/** 카운트업 시작 간격(초)·지속 시간(초)·easing(천천히 출발 → 부드럽게 감속) */
const COUNT_STAGGER = 0.15;
const COUNT_DURATION = 1.8;
const COUNT_EASE = [0.45, 0, 0.15, 1] as const;

/** 스크롤 진행도에 맞춰 한 구절씩 밝아지는 텍스트 조각 */
function Phrase({
  progress,
  index,
  total,
  className = "",
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  className?: string;
  children: ReactNode;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const y = useTransform(progress, [start, end], [14, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      // prefers-reduced-motion은 CSS로 덮어씁니다. (SSR 값과 클라이언트 값이 달라 생기는 하이드레이션 불일치 방지)
      className={`will-change-[opacity,transform] motion-reduce:translate-none! motion-reduce:transform-none! motion-reduce:opacity-100! ${className}`}
    >
      {children}
    </motion.span>
  );
}

/**
 * 0 → value 카운트업.
 * - 서버/초기 HTML은 최종 값을 그대로 렌더링하고(JS 미실행·SEO 대비), 마운트 후 0으로 되돌린 뒤 화면 진입 시 1회 재생합니다.
 * - 숫자는 React 상태가 아닌 textContent로 갱신해 매 프레임 리렌더를 만들지 않습니다.
 * - 재생이 끝나면 최종 값을 정확히 다시 기록합니다.
 * - prefers-reduced-motion이면 최종 값을 그대로 둡니다.
 */
function CountUp({ stat, inView, index }: { stat: Stat; inView: boolean; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceRef = useRef(false);
  const { value, decimals } = stat;
  const finalText = value.toFixed(decimals);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceRef.current) el.textContent = (0).toFixed(decimals);
  }, [decimals]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduceRef.current) return;
    // 데스크톱 3열에서는 세 숫자가 함께 보이므로 순차 지연을 두고,
    // 모바일 세로 배치에서는 각 항목이 화면에 들어올 때 바로 시작합니다.
    const delay = window.matchMedia("(min-width: 768px)").matches ? index * COUNT_STAGGER : 0;
    const controls = animate(0, value, {
      duration: COUNT_DURATION,
      delay,
      ease: COUNT_EASE,
      onUpdate: (latest) => {
        el.textContent = latest.toFixed(decimals);
      },
      onComplete: () => {
        el.textContent = finalText;
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, finalText, index]);

  return (
    // 3자리 고정 폭(100 / 5.0) + tabular-nums: 숫자가 바뀌어도 레이아웃이 흔들리지 않습니다.
    <span ref={ref} className="inline-block w-[3ch] text-right tabular-nums">
      {finalText}
    </span>
  );
}

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <motion.li
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
      className="flex flex-col items-center px-4 text-center"
    >
      {index > 0 && (
        <span aria-hidden="true" className="mb-10 block h-12 w-px bg-white/15 md:hidden dark:bg-black/15" />
      )}
      <p className="text-[44px] font-bold leading-[1.3] tracking-[-0.03em] md:text-[52px]">
        <CountUp stat={stat} inView={inView} index={index} />
        <span className={stat.suffix === "점" ? "ml-0.5" : ""}>{stat.suffix}</span>
      </p>
      <motion.p
        variants={rise}
        className="mt-2 text-[19px] font-bold tracking-[-0.02em] break-keep md:mt-3 md:text-[22px]"
      >
        {stat.title}
      </motion.p>
      <motion.p
        variants={rise}
        className="mt-2 text-sm leading-[1.6] text-zinc-400 break-keep md:text-[15px] dark:text-zinc-600"
      >
        {stat.description}
      </motion.p>
    </motion.li>
  );
}

export default function WhyChooseUs({ ref }: { ref?: Ref<HTMLElement> }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.82", "end 0.42"],
  });

  // 첫 문장은 한 줄, 이어지는 구절은 화면 너비에 맞춰 자연스럽게 줄바꿈됩니다.
  const phrases: { content: ReactNode; className: string }[] = [
    { content: "브랜드에 집중하세요.", className: "block" },
    { content: "홈페이지는", className: "inline-block" },
    { content: "GrowLab Studio가", className: "inline-block" },
    {
      content: (
        <>
          고민하겠습니다<span className="text-emerald-400 dark:text-emerald-600">.</span>
        </>
      ),
      className: "inline-block",
    },
  ];

  return (
    <section
      id="approach"
      ref={ref}
      className="relative z-10 w-full scroll-mt-[var(--gl-nav-h)] rounded-t-[28px] bg-zinc-950 text-zinc-50 md:rounded-t-[48px] dark:bg-zinc-100 dark:text-black"
    >
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-24 sm:px-12 md:pb-36 md:pt-36">
        <h2
          ref={headingRef}
          className="mx-auto max-w-3xl text-center text-[26px] font-bold leading-[1.45] tracking-[-0.03em] break-keep md:text-[30px] lg:text-[34px]"
        >
          {phrases.map((phrase, i) => (
            <span key={i}>
              <Phrase progress={scrollYProgress} index={i} total={phrases.length} className={phrase.className}>
                {phrase.content}
              </Phrase>
              {i > 0 && i < phrases.length - 1 ? " " : null}
            </span>
          ))}
        </h2>

        {SHOW_STATS && (
          <ol className="mx-auto mt-20 max-w-5xl md:mt-24 md:grid md:grid-cols-3 md:divide-x md:divide-white/15 lg:mt-28 dark:md:divide-black/15">
            {STATS.map((stat, i) => (
              <StatItem key={stat.title} stat={stat} index={i} />
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
