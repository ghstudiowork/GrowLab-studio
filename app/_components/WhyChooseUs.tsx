"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "./motion-variants";

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-24 flex flex-col items-center gap-12">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-3xl sm:text-4xl font-bold text-black dark:text-zinc-50 text-center"
        >
          왜 GrowLab Studio인가
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="grid sm:grid-cols-3 gap-8 w-full"
        >
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              브랜드를 성장시키는 홈페이지
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              모바일까지 완벽한 반응형 제작
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              기획 · 디자인 · 개발 원스톱
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
