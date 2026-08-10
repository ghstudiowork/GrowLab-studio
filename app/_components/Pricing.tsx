"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./motion-variants";

type PricingPlan = {
  name: string;
  priceMain: string;
  priceSuffix: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  badge?: string;
};

const plans: PricingPlan[] = [
  {
    name: "LANDING",
    priceMain: "20",
    priceSuffix: "~ 50만 원",
    description: "브랜드와 서비스를 빠르게 소개하는\n원페이지 중심의 랜딩페이지",
    features: [
      "원페이지 랜딩페이지",
      "반응형 디자인",
      "기본 애니메이션",
      "기본 SEO 설정",
      "문의 / 카카오톡 연결",
      "30일 무료 A/S",
    ],
    cta: "상담 신청",
    href: "#contact",
  },
  {
    name: "BUSINESS",
    priceMain: "100",
    priceSuffix: "만 원부터",
    description: "기업과 브랜드의 신뢰도를 높이는\n맞춤형 비즈니스 홈페이지",
    features: [
      "5 Page 내외",
      "맞춤형 디자인",
      "인터랙션 효과",
      "SEO 기본 최적화",
      "문의 / 상담 기능",
      "60일 무료 A/S",
    ],
    cta: "상담 신청",
    href: "#contact",
    highlighted: true,
    badge: "가장 인기",
  },
  {
    name: "CUSTOM",
    priceMain: "200",
    priceSuffix: "만 원부터",
    description: "복잡한 기능과 높은 완성도가 필요한\n맞춤형 웹사이트 및 웹서비스",
    features: [
      "프로젝트별 맞춤 구성",
      "고급 인터랙션 / 애니메이션",
      "회원 · 예약 · 결제 기능",
      "관리자 기능 개발",
      "외부 API / 서비스 연동",
      "90일 무료 A/S",
    ],
    cta: "견적 문의",
    href: "#contact",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="w-full bg-white dark:bg-zinc-950">
      <div className="max-w-[84rem] mx-auto px-6 sm:px-12 py-24 flex flex-col items-center gap-12">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-[31px] sm:text-[41px] font-bold text-black dark:text-zinc-50 text-center"
        >
          필요한 만큼, 명확하게.
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 text-center max-w-2xl"
        >
          프로젝트 규모와 필요한 기능에 맞춰
          <br />
          합리적인 제작 범위를 제안합니다.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="-mt-4 grid w-full grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.article
              key={plan.name}
              variants={fadeInUp}
              aria-label={`${plan.name} 요금제`}
              className={`relative flex h-full flex-col gap-10 rounded-2xl border-2 bg-white px-9 py-12 transition-colors duration-300 dark:bg-zinc-900 lg:min-h-[540px] ${
                plan.highlighted
                  ? "border-emerald-600/60 shadow-lg shadow-emerald-500/10 hover:border-emerald-600 dark:border-emerald-400/50 dark:shadow-emerald-400/10 dark:hover:border-emerald-400"
                  : "border-zinc-200 shadow-sm hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white dark:bg-emerald-500">
                  {plan.badge}
                </span>
              )}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                    {plan.name}
                  </h3>
                  <p
                    className="flex items-baseline gap-2 whitespace-nowrap"
                    aria-label={`${plan.priceMain}${plan.priceSuffix}`}
                  >
                    <span className="text-5xl font-bold leading-none tracking-tight text-black dark:text-zinc-50">
                      {plan.priceMain}
                    </span>
                    <span className="text-lg font-medium leading-none text-zinc-500 dark:text-zinc-400">
                      {plan.priceSuffix}
                    </span>
                  </p>
                </div>
                <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {plan.description}
                </p>
              </div>
              <hr className="border-t border-zinc-200 dark:border-zinc-800" />
              <ul className="flex flex-col gap-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`mt-auto inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold ${
                  plan.highlighted
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "border border-black dark:border-white"
                }`}
              >
                {plan.cta}
              </a>
            </motion.article>
          ))}
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center gap-2 text-center"
        >
          <p className="max-w-xl text-base text-zinc-500 dark:text-zinc-500">
            프로젝트 규모와 기능에 따라 최종 견적 및 제작 기간이 달라질 수 있습니다.
          </p>
          <p className="max-w-xl text-base text-zinc-500 dark:text-zinc-500">
            무료 A/S 이후 신규 기능·페이지 추가는 별도 견적이 적용됩니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
