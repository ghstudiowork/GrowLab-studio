"use client";

import { KAKAO_CONSULT_URL } from "../lib/links";

/**
 * 우측 하단 고정 버튼: TOP(맨 위로) + 카카오톡 상담.
 * - 루트 레이아웃에서 한 번 렌더링되어 모든 페이지(메인·포트폴리오·고객센터)에 공통 적용됩니다.
 * - z-40: 네비게이션·모바일 메뉴(z-50)보다 아래.
 * - 모바일 전체 화면 메뉴가 열리면(html[data-gl-menu="open"], Navbar에서 설정) 숨겨집니다.
 * - 첫 등장 시 짧은 fade-in(globals.css의 .gl-fade, 동작 줄이기 시 생략).
 */
export default function FloatingActions() {
  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // html에 scroll-smooth가 걸려 있어 reduced-motion일 때는 "instant"로 명시해야 즉시 이동합니다.
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
  };

  return (
    <>
      {/*
        1440px 미만: 페이지 맨 아래에서 Footer 문구가 버튼에 가려지지 않도록 스크롤 여유를 둡니다.
        (Footer 콘텐츠 오른쪽 끝이 버튼 영역(오른쪽 24~124px) 안에 들어오는 구간. 1440px 이상은 겹치지 않음. 페이지 배경색과 동일)
      */}
      <div aria-hidden="true" className="h-[120px] w-full bg-zinc-50 min-[1440px]:hidden dark:bg-black" />
      <FloatingButtons onTop={scrollToTop} />
    </>
  );
}

function FloatingButtons({ onTop }: { onTop: () => void }) {
  const scrollToTop = onTop;
  return (
    <div
      // 위치 — 모바일(~767px): right 16px, bottom 80px + 안전 영역 / 태블릿(768~1023px): right 20px, bottom 90px
      //        데스크톱(1024px~): right 24px, bottom clamp(80px, 12vh, 140px)
      className="gl-fade fixed bottom-[calc(80px_+_env(safe-area-inset-bottom,0px))] right-4 z-40 w-[100px] overflow-hidden rounded-[10px] shadow-[0_8px_24px_-6px_rgba(15,23,42,0.28)] ring-1 ring-black/5 transition-[opacity,visibility] duration-200 md:bottom-[90px] md:right-5 lg:bottom-[clamp(80px,12vh,140px)] lg:right-6 [html[data-gl-menu=open]_&]:invisible [html[data-gl-menu=open]_&]:opacity-0"
      style={{ "--gl-d": "400ms" } as React.CSSProperties}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="페이지 맨 위로 이동"
        className="flex h-[38px] w-full items-center justify-center gap-1.5 bg-white text-[13px] font-bold tracking-[0.04em] text-[#14213d] transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#14213d]"
      >
        <svg aria-hidden="true" viewBox="0 0 10 8" className="h-2 w-2.5 fill-current">
          <path d="M5 0 10 8H0z" />
        </svg>
        TOP
      </button>
      <a
        href={KAKAO_CONSULT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 상담 (새 창에서 열림)"
        className="flex h-[45px] w-full items-center justify-center bg-[#00C896] text-[14px] font-semibold text-[#052D22] transition-colors duration-200 hover:bg-[#00B889] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#052D22]"
      >
        카카오톡
      </a>
    </div>
  );
}
