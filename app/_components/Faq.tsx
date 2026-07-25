"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "./motion-variants";

export default function Faq() {
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
          자주 묻는 질문
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-zinc-600 dark:text-zinc-400 text-center max-w-2xl"
        >
          홈페이지 제작을 의뢰하기 전에 많이 궁금해하시는 내용을 정리했습니다.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="w-full max-w-3xl flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800"
        >
          <div className="py-8 flex flex-col gap-2">
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              Q. 홈페이지 제작 기간은 얼마나 걸리나요?
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              페이지 수와 기능에 따라 다르지만, 일반적인 기업 홈페이지는 기획부터 오픈까지 약 3~6주 정도 소요됩니다.
            </p>
          </div>
          <div className="py-8 flex flex-col gap-2">
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              Q. 제작 비용은 어떻게 결정되나요?
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              페이지 수, 디자인 범위, 필요한 기능과 자료 준비 상태를 확인한 뒤 프로젝트에 맞는 견적을 안내드립니다.
            </p>
          </div>
          <div className="py-8 flex flex-col gap-2">
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              Q. 홈페이지 오픈 후 유지보수도 가능한가요?
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              네. 텍스트와 이미지 수정, 기능 점검 등 필요한 유지보수 범위를 협의하여 진행할 수 있습니다.
            </p>
          </div>
          <div className="py-8 flex flex-col gap-2">
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              Q. 도메인과 호스팅도 함께 진행할 수 있나요?
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              네. 프로젝트에 적합한 도메인과 호스팅을 안내하고 연결 및 기본 설정을 지원합니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
