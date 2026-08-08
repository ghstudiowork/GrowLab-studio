import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import PortfolioList from "../_components/PortfolioList";
import { portfolioProjects } from "../lib/portfolio";

export const metadata: Metadata = {
  title: "PORTFOLIO",
  description:
    "GrowLab Studio가 제작한 모든 프로젝트를 소개합니다. 브랜드의 목적과 고객 경험을 고려해 기획한 웹 프로젝트를 확인해보세요.",
  alternates: {
    canonical: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <main className="flex w-full flex-1 flex-col items-center">
        <section className="flex w-full max-w-7xl flex-col gap-4 px-6 pt-16 pb-16 sm:px-12 sm:pt-24">
          <p className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Selected Works
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
              PORTFOLIO
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {portfolioProjects.length} Projects
            </p>
          </div>
        </section>
        <section className="w-full max-w-7xl px-6 pb-24 sm:px-12">
          <PortfolioList />
        </section>
      </main>
      <Footer />
    </div>
  );
}
