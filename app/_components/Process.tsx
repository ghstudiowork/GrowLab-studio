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
          className="text-3xl sm:text-4xl font-bold text-black dark:text-zinc-50 text-center"
        >
          홈페이지 제작은 이렇게 진행됩니다
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-zinc-600 dark:text-zinc-400 text-center max-w-2xl"
        >
          상담부터 오픈 이후까지, 각 단계를 명확하게 공유하며 진행합니다.
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
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              상담 및 요구사항 정리
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              브랜드와 사업 목적, 필요한 기능과 원하는 방향을 확인합니다.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              02
            </p>
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              기획 및 구조 설계
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              사용자가 자연스럽게 행동할 수 있도록 페이지 구성과 흐름을 설계합니다.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              03
            </p>
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              디자인 및 개발
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              확정된 기획을 바탕으로 디자인하고 반응형 홈페이지를 제작합니다.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              04
            </p>
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              검수 및 오픈
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              최종 검수와 수정을 마친 뒤 홈페이지를 정식으로 오픈합니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
