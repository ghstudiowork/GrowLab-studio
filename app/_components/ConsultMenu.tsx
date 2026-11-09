"use client";

import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { KAKAO_CONSULT_URL } from "../lib/links";

/**
 * '홈페이지 제작문의' CTA → 상담 방식 선택(카카오톡 상담 / 이메일 문의).
 * - popover: 버튼 바로 아래 오른쪽 정렬 드롭다운 (데스크톱·모바일 상단 바)
 * - inline : 버튼 아래로 펼쳐지는 영역 (모바일 전체 화면 메뉴 내부)
 * 열기/닫기: CTA 클릭 토글, 바깥 클릭, ESC(포커스는 CTA로 복귀), 포커스가 메뉴 밖으로 이동, 항목 선택.
 * 접근성: 디스클로저 패턴(button[aria-expanded] + aria-controls), 항목은 일반 링크.
 * 카카오톡 주소는 우측 하단 플로팅 버튼과 같은 KAKAO_CONSULT_URL을 사용합니다.
 */
type ConsultMenuProps = {
  /** 문의 폼 경로 — 메인 "#contact", 그 외 페이지 "/#contact" */
  contactHref: string;
  label: string;
  /** CTA 버튼 클래스 (기존 Navbar CTA 스타일 그대로) */
  buttonClassName: string;
  buttonStyle?: React.CSSProperties;
  /** CTA 뒤에 붙는 장식(예: 전체 화면 메뉴의 →) */
  buttonSuffix?: ReactNode;
  variant?: "popover" | "inline";
  /** 항목 선택 시 추가 동작(예: 모바일 전체 화면 메뉴 닫기) */
  onSelect?: () => void;
  /** 전체 화면 메뉴가 닫혀 있을 때 탭 이동에서 제외 */
  tabIndex?: number;
  className?: string;
};

function KakaoIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M12 3.5c-4.97 0-9 3.16-9 7.05 0 2.5 1.66 4.7 4.17 5.95l-.86 3.13c-.08.29.25.52.5.35l3.73-2.47c.48.06.97.09 1.46.09 4.97 0 9-3.16 9-7.05S16.97 3.5 12 3.5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  );
}

const itemClass =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-emerald-400";

export default function ConsultMenu({
  contactHref,
  label,
  buttonClassName,
  buttonStyle,
  buttonSuffix,
  variant = "popover",
  onSelect,
  tabIndex,
  className = "",
}: ConsultMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // 전체 화면 메뉴가 닫히면(tabIndex -1) 펼쳐 둔 선택지도 함께 접습니다.
  const hidden = tabIndex === -1;
  const isOpen = open && !hidden;

  // popover가 화면 밖으로 잘리지 않도록 좌우 16px 안으로 밀어 넣습니다.
  // (예: /portfolio 기본 Navbar는 좁은 화면에서 CTA가 줄바꿈되어 왼쪽에 놓임)
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!isOpen || variant !== "popover" || !panel) return;
    const fit = () => {
      panel.style.translate = "";
      const rect = panel.getBoundingClientRect();
      const min = 16;
      const max = document.documentElement.clientWidth - 16;
      const dx = rect.left < min ? min - rect.left : rect.right > max ? max - rect.right : 0;
      if (dx) panel.style.translate = `${dx}px 0`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [isOpen, variant]);

  const select = () => {
    setOpen(false);
    onSelect?.();
  };

  const panelClass =
    variant === "popover"
      ? // 오른쪽 정렬, 화면 폭이 좁으면 좌우 16px 여백 안으로 줄어듭니다. z-10: 모바일 전체 화면 메뉴 위에 표시
        "absolute right-0 top-full z-10 mt-2 w-[min(248px,calc(100vw-32px))]"
      : "mt-3 w-full";

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onBlur={(event) => {
        // 키보드 탭으로 메뉴 밖으로 나가면 닫기
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        tabIndex={tabIndex}
        className={buttonClassName}
        style={buttonStyle}
      >
        {label}
        {buttonSuffix}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!isOpen}
        className={`${panelClass} rounded-2xl border border-white/10 bg-zinc-900 p-1.5 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)]`}
      >
        <ul className="flex flex-col gap-0.5">
          <li>
            <a
              href={KAKAO_CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={select}
              className={itemClass}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                <KakaoIcon />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-sm font-semibold text-white">카카오톡 상담</span>
                <span className="text-xs text-zinc-400">채팅으로 편하게 문의하기</span>
              </span>
              <span className="sr-only">(새 창에서 열림)</span>
            </a>
          </li>
          <li>
            <Link href={contactHref} onClick={select} className={itemClass}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-zinc-200">
                <MailIcon />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-sm font-semibold text-white">이메일 문의</span>
                <span className="text-xs text-zinc-400">제작문의 양식 작성하기</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
