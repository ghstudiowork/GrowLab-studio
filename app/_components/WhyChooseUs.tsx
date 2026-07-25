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
          브랜드의 가치를 담아, 고객이 신뢰하는 홈페이지를 만듭니다.
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-zinc-600 dark:text-zinc-400 text-center max-w-2xl"
        >
          홈페이지의 목적은 단순히 정보를 보여주는 것이 아닙니다.
          <br />
          방문자가 브랜드를 신뢰하고 상담과 문의까지 자연스럽게 이어질 수 있도록
          <br />
          구조와 메시지를 함께 설계합니다.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="grid sm:grid-cols-3 gap-8 w-full"
        >
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2">
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              비즈니스 목적부터 시작하는 기획
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              업종과 고객, 홈페이지의 목적을 먼저 파악한 뒤 필요한 페이지와 사용자 흐름을 설계합니다.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2">
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              모든 화면에서 편리한 반응형 제작
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              PC와 모바일 어디서든 브랜드의 인상과 사용성이 자연스럽게 유지되도록 제작합니다.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-2">
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              기획부터 오픈까지 일관된 진행
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              기획, 디자인, 개발, 기본 SEO 설정까지 한 흐름으로 진행해 소통 과정의 혼선을 줄입니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
