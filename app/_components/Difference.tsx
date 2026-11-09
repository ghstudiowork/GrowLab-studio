"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const TEMPLATE_ITEMS = [
  "정해진 레이아웃을 활용한 제작",
  "디자인 변경 범위에 제약",
  "빠른 초기 구축에 적합",
  "브랜드별 차별화에 한계가 있을 수 있음",
  "복잡한 인터랙션 구현에 제약이 있을 수 있음",
];

const GROWLAB_ITEMS = [
  "브랜드 목적을 이해하는 기획",
  "브랜드에 맞춘 디자인 설계",
  "PC·태블릿·모바일 반응형 구성",
  "사용자 경험을 고려한 인터랙션",
  "기획부터 개발·오픈까지 진행",
];

/* ---------- 상단: 배경 텍스트 → 헤드라인 마스크 리빌 → 서브 카피 ---------- */
const intro: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const backdrop: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
};

const maskGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const maskLine: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/* ---------- 카드: 아래에서 등장 → 항목 순차 등장 ---------- */
const card = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, delay, when: "beforeChildren", staggerChildren: 0.07 },
  },
});

const listItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const vs: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease, delay: 0.35 } },
};

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-[3px] h-5 w-5 shrink-0">
      <circle cx="10" cy="10" r="10" className="fill-emerald-400/15" />
      <path d="M6 10.4l2.6 2.6L14 7.6" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="stroke-emerald-400" />
    </svg>
  );
}

function DashIcon() {
  return (
    <span aria-hidden="true" className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center">
      <span className="h-px w-3 bg-zinc-500 dark:bg-zinc-400" />
    </span>
  );
}

export default function Difference() {
  return (
    // reducedMotion="user": 동작 줄이기 설정 시 이동·확대(transform)를 생략하고 바로 표시합니다.
    <MotionConfig reducedMotion="user">
      <section
        id="difference"
        aria-labelledby="difference-title"
        // Approach 패널과 완전히 같은 배경 토큰(라이트 zinc-950 / 다크 zinc-100)을 사용해 하나의 연속된 패널처럼 이어집니다.
        // 상단 둥근 모서리·구분선 없음. 위쪽 여백은 Approach의 하단 여백과 합쳐 간격을 이룹니다.
        // scroll-mt: 네비게이션 '서비스'(#difference) 링크로 이동할 때 고정 네비 아래에서 섹션이 시작되도록 합니다.
        className="relative w-full scroll-mt-[var(--gl-nav-h)] overflow-hidden bg-zinc-950 text-zinc-50 dark:bg-zinc-100 dark:text-black"
      >
        <div className="mx-auto max-w-6xl px-5 pb-28 pt-10 sm:px-12 md:pb-40 md:pt-16">
          {/* 상단 콘텐츠 */}
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
              DIFFERENCE
            </motion.p>

            <motion.h2
              id="difference-title"
              variants={maskGroup}
              className="relative pt-6 text-[length:clamp(1.875rem,8.4vw,2.5rem)] font-bold leading-[1.2] tracking-[-0.04em] break-keep md:pt-14 md:text-5xl lg:text-[56px]"
            >
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span variants={maskLine} className="block">
                  비교하면 차이가 보입니다<span className="text-emerald-500">.</span>
                </motion.span>
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="relative mt-6 text-base leading-[1.7] text-zinc-400 break-keep sm:text-lg md:mt-8 dark:text-zinc-600"
            >
              비슷해 보이는 홈페이지도,
              <br />
              만드는 방식은 다릅니다.
            </motion.p>
          </motion.div>

          {/* 비교 카드: 모바일은 세로(왼쪽 → VS → 오른쪽), 데스크톱은 좌우 2열 + 경계 중앙의 VS */}
          <div className="relative mt-16 flex flex-col gap-4 md:mt-24 md:grid md:grid-cols-2 md:items-center md:gap-6">
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={card(0)}
              aria-labelledby="difference-template"
              className="rounded-[28px] border border-white/10 bg-zinc-900 px-7 pb-14 pt-9 md:px-10 md:py-12 lg:px-12 lg:py-14 dark:border-zinc-200 dark:bg-white"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400 sm:text-xs">
                Template
              </p>
              <h3
                id="difference-template"
                className="mt-3 text-2xl font-bold tracking-[-0.03em] text-zinc-200 md:text-[28px] lg:text-[30px] dark:text-zinc-800"
              >
                템플릿 중심 제작
              </h3>
              <ul className="mt-7 divide-y divide-white/10 border-t border-white/10 md:mt-9 dark:divide-zinc-200 dark:border-zinc-200">
                {TEMPLATE_ITEMS.map((text) => (
                  <motion.li
                    key={text}
                    variants={listItem}
                    className="flex gap-3 py-4 text-[15px] leading-[1.55] text-zinc-400 break-keep sm:text-base lg:text-[17px] dark:text-zinc-600"
                  >
                    <DashIcon />
                    {text}
                  </motion.li>
                ))}
              </ul>
            </motion.article>

            {/*
              VS — 모바일: 두 카드 사이에 놓고 음수 마진으로 위아래 카드의 안쪽 여백(56px)에 28px씩만 겹칩니다.
                   데스크톱: 두 카드 경계(가운데 열 간격)의 세로 중앙에 겹쳐 두며, 카드 좌우 여백(40~48px) 안에서만 겹칩니다.
            */}
            <div
              aria-hidden="true"
              className="pointer-events-none relative z-10 -my-11 flex justify-center md:absolute md:left-1/2 md:top-1/2 md:my-0 md:-translate-x-1/2 md:-translate-y-1/2"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                // amount 1(완전히 보임)은 서브픽셀 반올림으로 감지되지 않는 경우가 있어 0.5로 둡니다.
                viewport={{ once: true, amount: 0.5 }}
                variants={vs}
                className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-zinc-950 text-[26px] font-black tracking-[-0.04em] text-zinc-50 ring-1 ring-white/15 md:h-24 md:w-24 md:text-[34px] dark:bg-zinc-100 dark:text-black dark:ring-zinc-300"
              >
                VS
              </motion.div>
            </div>

            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              // 데스크톱에서는 두 카드가 함께 보이므로 오른쪽 카드를 조금 늦게 등장시킵니다.
              variants={card(0.15)}
              aria-labelledby="difference-growlab"
              className="rounded-[28px] bg-emerald-900 px-7 pb-9 pt-14 text-white shadow-[0_30px_60px_-30px_rgba(2,44,34,0.6)] ring-1 ring-emerald-400/25 md:px-10 md:py-14 lg:px-12 lg:py-16 dark:bg-emerald-950 dark:ring-0"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300/80 sm:text-xs">
                Custom Build
              </p>
              <h3
                id="difference-growlab"
                className="mt-3 text-2xl font-bold tracking-[-0.02em] md:text-[28px] lg:text-[32px]"
              >
                GROWLAB STUDIO
              </h3>
              <ul className="mt-7 divide-y divide-white/10 border-t border-white/10 md:mt-9">
                {GROWLAB_ITEMS.map((text) => (
                  <motion.li
                    key={text}
                    variants={listItem}
                    className="flex gap-3 py-4 text-[15px] font-medium leading-[1.55] text-emerald-50 break-keep sm:text-base lg:text-[17px]"
                  >
                    <CheckIcon />
                    {text}
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-emerald-200/60">* 맞춤형 제작 서비스 기준</p>
            </motion.article>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
