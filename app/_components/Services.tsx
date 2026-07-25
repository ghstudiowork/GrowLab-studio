"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./motion-variants";

export default function Services() {
  return (
    <section id="services" className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-24 flex flex-col items-center gap-12">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-3xl sm:text-4xl font-bold text-black dark:text-zinc-50 text-center"
      >
        우리가 만드는 것
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-zinc-600 dark:text-zinc-400 text-center max-w-2xl"
      >
        브랜드의 목적과 고객의 행동에 맞춰 필요한 웹사이트를 설계하고 제작합니다.
      </motion.p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 gap-8 w-full"
      >
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2"
        >
          <p className="text-lg font-semibold text-black dark:text-zinc-50">
            기업·브랜드 홈페이지
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            신뢰도와 브랜드 이미지를 높이는 공식 홈페이지
          </p>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2"
        >
          <p className="text-lg font-semibold text-black dark:text-zinc-50">
            랜딩페이지
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            광고와 캠페인의 전환을 높이는 단일 페이지
          </p>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2"
        >
          <p className="text-lg font-semibold text-black dark:text-zinc-50">
            홈페이지 리뉴얼
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            오래된 디자인과 구조를 현재 기준에 맞게 개선
          </p>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2"
        >
          <p className="text-lg font-semibold text-black dark:text-zinc-50">
            유지보수
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            오픈 이후에도 안정적으로 운영할 수 있도록 관리
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
