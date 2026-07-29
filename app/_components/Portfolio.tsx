"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./motion-variants";

function MorrowThumbnail() {
  return (
    <div className="group relative aspect-[16/11] w-full rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <Image
        src="/images/portfolio/morrow-thumbnail.png"
        alt="MORROW ROASTERS 웹사이트 스크린샷"
        fill
        sizes="(min-width: 640px) 33vw, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
  );
}

function ArchiMonoThumbnail() {
  return (
    <div className="group relative aspect-[16/11] w-full rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <Image
        src="/images/portfolio/archi-mono-thumbnail.png"
        alt="ARCHI / MONO 웹사이트 스크린샷"
        fill
        sizes="(min-width: 640px) 33vw, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
  );
}

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
        className="grid sm:grid-cols-3 gap-8 w-full items-start"
      >
        <motion.div variants={fadeInUp} className="flex flex-col gap-5">
          <MorrowThumbnail />
          <div className="flex flex-col gap-1.5">
            <p className="text-xs uppercase tracking-wide font-semibold text-emerald-600 dark:text-emerald-400">
              CAFE WEBSITE
            </p>
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              MORROW ROASTERS
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              프리미엄 스페셜티 카페 브랜드를 위한 반응형 웹사이트
            </p>
          </div>
          <a
            href="https://growlab-morrow-roasters.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MORROW ROASTERS 프로젝트 보기 (새 탭에서 열림)"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg bg-black text-white dark:bg-white dark:text-black w-full sm:w-fit"
          >
            프로젝트 보기 ↗
          </a>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex flex-col gap-5">
          <ArchiMonoThumbnail />
          <div className="flex flex-col gap-1.5">
            <p className="text-xs uppercase tracking-wide font-semibold text-emerald-600 dark:text-emerald-400">
              건축 · 인테리어
            </p>
            <p className="text-lg font-semibold text-black dark:text-zinc-50">
              ARCHI / MONO
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              빛과 재료, 공간의 감도를 중심으로 설계한 건축 · 인테리어 스튜디오 웹사이트
            </p>
          </div>
          <a
            href="https://archi-mono.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ARCHI / MONO 프로젝트 보기 (새 탭에서 열림)"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg bg-black text-white dark:bg-white dark:text-black w-full sm:w-fit"
          >
            프로젝트 보기 ↗
          </a>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex flex-col gap-4">
          <div className="aspect-[4/3] w-full rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-center">
            <p className="text-sm font-medium text-zinc-400 dark:text-zinc-600">
              Coming Soon
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-600">
              다음 프로젝트 준비 중
            </p>
            <p className="text-xs uppercase tracking-wide font-semibold text-zinc-400 dark:text-zinc-600">
              반응형 홈페이지
            </p>
            <p className="text-lg font-semibold text-zinc-400 dark:text-zinc-600">
              병원 홈페이지
            </p>
            <p className="text-sm text-zinc-400 dark:text-zinc-600">
              정보 전달과 사용자 편의성을 고려한 반응형 홈페이지
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
