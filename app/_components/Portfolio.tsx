"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./motion-variants";

export default function Portfolio() {
  return (
    <section id="portfolio" className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-24 flex flex-col items-center gap-12">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-3xl sm:text-4xl font-bold text-black dark:text-zinc-50 text-center"
      >
        포트폴리오
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-zinc-600 dark:text-zinc-400 text-center max-w-2xl"
      >
        브랜드의 목적과 고객 경험을 고려해 기획한 GrowLab Studio의 웹 프로젝트를 소개합니다.
      </motion.p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid sm:grid-cols-3 gap-8 w-full"
      >
        <motion.div variants={fadeInUp} className="flex flex-col gap-4">
          <div className="aspect-[4/3] w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900" />
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
              자체 기획 프로젝트
            </p>
            <p className="text-xs uppercase tracking-wide font-semibold text-emerald-600 dark:text-emerald-400">
              기업 홈페이지
            </p>
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              브랜드 홈페이지
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              브랜드의 신뢰와 정체성을 전달하는 기업 홈페이지
            </p>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex flex-col gap-4">
          <div className="aspect-[4/3] w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900" />
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
              자체 기획 프로젝트
            </p>
            <p className="text-xs uppercase tracking-wide font-semibold text-emerald-600 dark:text-emerald-400">
              랜딩페이지
            </p>
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              카페 랜딩페이지
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              메뉴와 공간의 분위기를 효과적으로 보여주는 랜딩페이지
            </p>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex flex-col gap-4">
          <div className="aspect-[4/3] w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900" />
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
              자체 기획 프로젝트
            </p>
            <p className="text-xs uppercase tracking-wide font-semibold text-emerald-600 dark:text-emerald-400">
              반응형 홈페이지
            </p>
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              병원 홈페이지
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              정보 전달과 사용자 편의성을 고려한 반응형 홈페이지
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
