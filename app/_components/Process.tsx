"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "./motion-variants";

export default function Process() {
  return (
    <section id="process" className="w-full bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-24 flex flex-col items-center gap-12">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-[31px] sm:text-[41px] font-bold text-black dark:text-zinc-50 text-center"
        >
          홈페이지 제작은 이렇게 진행됩니다
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 text-center max-w-2xl"
        >
          무엇을 만들지 바로 결정하지 않습니다. 사업의 목적을 먼저 이해하고, 필요한 구조를 함께 정리한 뒤 제작합니다.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="grid sm:grid-cols-2 gap-8 w-full"
        >
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              01
            </p>
            <p className="text-lg sm:text-xl font-semibold text-black dark:text-zinc-50">
              상담 및 목표 확인
            </p>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              브랜드와 사업의 현재 상황, 홈페이지를 통해 얻고 싶은 결과와 필요한 기능을 확인합니다.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              02
            </p>
            <p className="text-lg sm:text-xl font-semibold text-black dark:text-zinc-50">
              기획 및 구조 설계
            </p>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              고객이 필요한 정보를 쉽게 찾고 문의까지 자연스럽게 이동할 수 있도록 페이지와 콘텐츠 흐름을 설계합니다.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              03
            </p>
            <p className="text-lg sm:text-xl font-semibold text-black dark:text-zinc-50">
              디자인 및 개발
            </p>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              확정된 기획을 바탕으로 브랜드의 분위기를 시각화하고, PC와 모바일에 최적화된 홈페이지를 제작합니다.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              04
            </p>
            <p className="text-lg sm:text-xl font-semibold text-black dark:text-zinc-50">
              검수 및 오픈
            </p>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              내용과 기능, 반응형 화면을 최종 검수하고 도메인과 기본 설정을 완료한 뒤 홈페이지를 오픈합니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
