"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "./motion-variants";
import PortfolioCarousel from "./PortfolioCarousel";

export default function Portfolio() {
  return (
    <section id="portfolio" className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-24 flex flex-col items-center gap-12">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-[31px] sm:text-[41px] font-bold text-black dark:text-zinc-50 text-center"
      >
        포트폴리오
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 text-center max-w-2xl"
      >
        브랜드의 목적과 고객 경험을 고려해 기획한 GrowLab Studio의 웹 프로젝트를 소개합니다.
      </motion.p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full"
      >
        <PortfolioCarousel />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-black dark:text-zinc-50"
        >
          <span className="relative">
            모든 프로젝트 보기
            <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </span>
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
