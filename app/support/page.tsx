import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import Faq from "../_components/Faq";
import { FAQ_ITEMS } from "../lib/faq";

const DESCRIPTION =
  "GrowLab Studio 홈페이지 제작 기간, 비용, 유지보수, 도메인 및 호스팅에 관한 자주 묻는 질문을 확인하세요.";

export const metadata: Metadata = {
  // 루트 레이아웃의 title template("%s | GrowLab Studio")이 적용되어 "고객센터 | GrowLab Studio"가 됩니다.
  title: "고객센터",
  description: DESCRIPTION,
  alternates: {
    canonical: "/support",
  },
  openGraph: {
    title: "고객센터 | GrowLab Studio",
    description: DESCRIPTION,
    url: "/support",
  },
  twitter: {
    title: "고객센터 | GrowLab Studio",
    description: DESCRIPTION,
  },
};

/** 검색엔진용 FAQ 구조화 데이터 (화면에 표시되는 질문·답변과 동일) */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function SupportPage() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar variant="home" />
      <main className="flex w-full flex-1 flex-col items-center">
        <section className="w-full max-w-4xl px-5 pb-12 pt-16 sm:px-12 sm:pb-16 sm:pt-24 md:pt-28">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
            Support / FAQ
          </p>
          <h1 className="mt-4 text-[34px] font-bold leading-[1.2] tracking-[-0.04em] text-black sm:text-5xl dark:text-zinc-50">
            자주 묻는 질문
          </h1>
          <p className="mt-5 max-w-xl text-base leading-[1.7] text-zinc-600 break-keep sm:text-lg dark:text-zinc-400">
            홈페이지 제작을 의뢰하기 전에 많이 궁금해하시는 내용을 정리했습니다.
          </p>
        </section>

        <section aria-label="자주 묻는 질문 목록" className="w-full max-w-4xl px-5 sm:px-12">
          <Faq />
        </section>

        <section className="w-full max-w-4xl px-5 pb-24 pt-20 sm:px-12 sm:pb-32 sm:pt-28">
          <div className="flex flex-col gap-8 border-t border-zinc-900 pt-10 sm:flex-row sm:items-end sm:justify-between sm:pt-12 dark:border-zinc-100">
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-black sm:text-[32px] dark:text-zinc-50">
                더 궁금한 점이 있으신가요?
              </h2>
              <p className="mt-3 text-base leading-[1.7] text-zinc-600 break-keep sm:text-lg dark:text-zinc-400">
                프로젝트에 대한 궁금한 점을 편하게 문의해 주세요.
              </p>
            </div>
            <Link
              href="/#contact"
              className="group inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-black px-7 text-base font-semibold text-white transition-colors duration-300 hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black dark:bg-zinc-50 dark:text-black dark:hover:bg-white dark:focus-visible:outline-white"
            >
              홈페이지 제작문의
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
