"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "./motion-variants";

export default function Contact() {
  return (
    <section id="contact" className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-24 flex flex-col items-center text-center gap-8">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-3xl sm:text-4xl font-bold text-black dark:text-zinc-50"
      >
        프로젝트를 시작해보세요
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed"
      >
        카카오톡으로 빠르게 상담받으실 수 있으며,
        <br />
        이메일로도 문의를 남겨주실 수 있습니다.
      </motion.p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="flex flex-col sm:flex-row gap-4"
      >
        <a href="http://pf.kakao.com/_ZxixbxnX/chat" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-lg rounded-xl bg-black text-white dark:bg-white dark:text-black">
          카카오톡 상담하기
        </a>
        <a href="mailto:ghstudio.work@gmail.com" className="px-8 py-4 text-lg rounded-xl border border-black dark:border-white">
          이메일 문의하기
        </a>
      </motion.div>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-sm text-zinc-500 dark:text-zinc-500"
      >
        평일 기준 24시간 이내 답변드립니다.
      </motion.p>
    </section>
  );
}
