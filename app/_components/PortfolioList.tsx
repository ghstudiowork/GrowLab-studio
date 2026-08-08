"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./motion-variants";
import { portfolioProjects, type PortfolioProject } from "../lib/portfolio";

function ProjectRow({ project, index }: { project: PortfolioProject; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.li variants={fadeInUp}>
      <Link
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} 프로젝트 보기 (새 탭에서 열림)`}
        className="group flex flex-col gap-4 rounded-lg px-4 py-6 -mx-4 transition-colors duration-300 hover:bg-zinc-100/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:flex-row sm:items-center sm:gap-6 dark:hover:bg-zinc-900/50 dark:focus-visible:outline-white"
      >
        <span className="text-sm text-zinc-400 tabular-nums dark:text-zinc-600 sm:w-8 sm:shrink-0">
          {number}
        </span>
        <span className="relative aspect-[16/11] w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 sm:w-40 sm:shrink-0 md:w-48">
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            fill
            sizes="(min-width: 640px) 12rem, 100vw"
            className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          />
        </span>
        <span className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
          <span className="relative inline-block w-fit text-xl font-semibold text-black dark:text-zinc-50 sm:flex-1 sm:text-2xl">
            {project.title}
            <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:w-44">
            {project.category}
          </span>
          <span className="text-sm text-zinc-500 tabular-nums dark:text-zinc-400 sm:w-14">
            {project.year}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="self-end text-lg text-zinc-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black dark:text-zinc-600 dark:group-hover:text-zinc-50 sm:self-auto sm:shrink-0"
        >
          →
        </span>
      </Link>
    </motion.li>
  );
}

export default function PortfolioList() {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="w-full divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800"
    >
      {portfolioProjects.map((project, index) => (
        <ProjectRow key={project.slug} project={project} index={index} />
      ))}
    </motion.ul>
  );
}
