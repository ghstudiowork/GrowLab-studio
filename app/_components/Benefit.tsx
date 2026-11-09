"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";

/** ease-out (빠르게 출발 → 부드럽게 감속). 확대·회전·바운스 없이 opacity + translateY만 사용합니다. */
const ease = [0.22, 1, 0.36, 1] as const;

const intro: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const backdrop: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

const cardList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ---------- 라인 아이콘 (24×24, stroke 1.5, currentColor) ---------- */
function IconShell({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 md:h-7 md:w-7"
    >
      {children}
    </svg>
  );
}

/** 웹사이트 레이아웃: 브라우저 창 + 헤더 + 사이드/콘텐츠 블록 */
function LayoutIcon() {
  return (
    <IconShell>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8.5h18" />
      <path d="M9 8.5V20" />
      <path d="M12 12h6M12 15.5h4" />
    </IconShell>
  );
}

/** 사용자 인터랙션: 커서 + 클릭 파동 */
function ClickIcon() {
  return (
    <IconShell>
      <path d="M9.5 9.5l9.5 3.6-4.1 1.6-1.6 4.1z" />
      <path d="M5.5 5.5L3.9 3.9M9.5 3.5V1.8M3.5 9.5H1.8M13 5l1.3-1.3M5 13l-1.3 1.3" />
    </IconShell>
  );
}

/** 체크리스트 / 프로젝트 완료 */
function ChecklistIcon() {
  return (
    <IconShell>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M7.5 8.5l1.5 1.5 2.5-2.5M7.5 14.5l1.5 1.5 2.5-2.5" />
      <path d="M14 9h3M14 15h3" />
    </IconShell>
  );
}

const BENEFITS: { title: string; description: string; Icon: () => ReactNode }[] = [
  {
    title: "어디서나 본 듯한 홈페이지는 만들지 않습니다.",
    description: "브랜드의 성격과 목표를 먼저 이해하고, 그에 맞는 구조와 디자인을 설계합니다.",
    Icon: LayoutIcon,
  },
  {
    title: "보여주기 위한 디자인에 그치지 않습니다.",
    description: "방문자가 브랜드를 이해하고 신뢰하며, 실제 문의까지 이어질 수 있도록 고민합니다.",
    Icon: ClickIcon,
  },
  {
    title: "처음부터 끝까지 함께합니다.",
    description: "기획부터 디자인, 개발, 오픈까지 하나의 흐름으로 진행하며 필요한 과정을 안내합니다.",
    Icon: ChecklistIcon,
  },
];

export default function Benefit() {
  return (
    // reducedMotion="user": 동작 줄이기 설정 시 이동(transform)을 생략하고 opacity만 전환합니다.
    <MotionConfig reducedMotion="user">
      <section
        id="benefit"
        aria-labelledby="benefit-title"
        // Approach · DIFFERENCE와 같은 배경 토큰(라이트 zinc-950 / 다크 zinc-100)으로 하나의 연속된 패널처럼 이어집니다.
        // 상단 둥근 모서리·구분선 없음. 위쪽 간격은 Approach의 하단 여백과 합쳐집니다.
        className="relative w-full overflow-hidden bg-zinc-950 text-zinc-50 dark:bg-zinc-100 dark:text-black"
      >
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-12 md:pb-28 md:pt-24">
          {/* 상단: 배경 타이포그래피 → 헤드라인 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={intro}
            className="relative text-center"
          >
            <motion.p
              aria-hidden="true"
              variants={backdrop}
              className="pointer-events-none absolute inset-x-0 -top-10 select-none whitespace-nowrap text-center text-[length:clamp(3.5rem,17vw,13rem)] font-black leading-none tracking-[-0.04em] text-white/[0.06] md:-top-20 dark:text-black/[0.06]"
            >
              BENEFIT
            </motion.p>

            <motion.h2
              id="benefit-title"
              variants={rise}
              className="relative pt-6 text-[length:clamp(1.625rem,7vw,2.5rem)] font-bold leading-[1.3] tracking-[-0.04em] break-keep md:pt-14 md:text-5xl md:leading-[1.25] lg:text-[56px]"
            >
              <span className="block">홈페이지의 차이는,</span>
              <span className="block">
                만드는 과정에서 시작됩니다<span className="text-emerald-500">.</span>
              </span>
            </motion.h2>
          </motion.div>

          {/* 카드: 세로로 쌓인 가로형 카드 3개, 순차 등장 */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardList}
            className="mt-14 flex flex-col gap-4 md:mt-20 md:gap-5"
          >
            {BENEFITS.map(({ title, description, Icon }) => (
              <motion.li
                key={title}
                variants={rise}
                className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-zinc-900 px-6 py-7 sm:flex-row sm:items-center sm:gap-8 sm:px-8 sm:py-8 md:gap-10 md:px-12 md:py-10 dark:border-zinc-200 dark:bg-white"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400 md:h-16 md:w-16 dark:bg-emerald-500/10 dark:text-emerald-600">
                  <Icon />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold leading-[1.4] tracking-[-0.03em] break-keep text-zinc-50 sm:text-xl md:text-2xl dark:text-black">
                    {title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.7] text-zinc-400 break-keep sm:text-base md:mt-3 md:text-[17px] dark:text-zinc-600">
                    {description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </MotionConfig>
  );
}
