"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ConsultMenu from "./ConsultMenu";

type NavbarProps = {
  /**
   * "home" — 메인페이지 전용: 고정 높이 + 모바일 메뉴 버튼.
   * 생략 시 기존 네비게이션과 동일하게 렌더링됩니다(/portfolio 등).
   */
  variant?: "default" | "home";
};

type NavLink = { href: string; label: string };

/**
 * 고객센터 경로 — 독립 페이지(/support, FAQ). 어느 페이지에서든 같은 경로로 이동합니다.
 * null로 바꾸면 메뉴에서 고객센터가 숨겨집니다.
 */
const SUPPORT_HREF: string | null = "/support";

/** CTA 공통 스타일: 기존 Hero의 주요 버튼과 같은 흑백 반전 배색 */
const CTA_CLASS =
  "inline-flex items-center justify-center rounded-full bg-black font-semibold text-white transition-colors duration-300 hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-zinc-50 dark:text-black dark:hover:bg-white dark:focus-visible:outline-white";

export default function Navbar({ variant = "default" }: NavbarProps) {
  const pathname = usePathname();
  const prefix = pathname === "/" ? "" : "/";

  // 메인이 아닌 페이지(/portfolio 등)에서는 prefix "/"가 붙어 /#approach, /#contact로 이동합니다.
  const links: NavLink[] = [
    { href: `${prefix}#approach`, label: "소개" },
    { href: "/portfolio", label: "포트폴리오" },
    ...(SUPPORT_HREF ? [{ href: SUPPORT_HREF, label: "고객센터" }] : []),
  ];
  // 홈페이지 제작문의: 클릭 시 상담 방식 선택 메뉴(ConsultMenu) — 카카오톡 상담 / 이메일 문의(문의 섹션 #contact)
  const cta: NavLink = { href: `${prefix}#contact`, label: "홈페이지 제작문의" };

  if (variant === "home") {
    return <HomeNavbar links={links} cta={cta} />;
  }

  return (
    <nav className="sticky top-0 z-50 w-full py-6 bg-zinc-50/80 dark:bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold tracking-wide text-black dark:text-zinc-50">
          GROWLAB STUDIO
        </p>
        <ul className="flex flex-wrap items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <ConsultMenu contactHref={cta.href} label={cta.label} buttonClassName={`${CTA_CLASS} h-9 px-4 text-sm`} />
          </li>
        </ul>
      </div>
    </nav>
  );
}

function HomeNavbar({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // 우측 하단 플로팅 버튼(FloatingActions)이 메뉴가 열린 동안 숨겨지도록 표시합니다.
    document.documentElement.dataset.glMenu = "open";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.documentElement.dataset.glMenu;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <nav className="gl-nav sticky top-0 z-50 w-full bg-zinc-50/80 backdrop-blur-md dark:bg-black/80">
      <div className="mx-auto flex h-[var(--gl-nav-h)] max-w-7xl items-center justify-between gap-4 px-5 sm:px-12">
        <Link
          href="/"
          className="gl-fade text-[13px] font-semibold tracking-[0.14em] text-black dark:text-zinc-50 sm:text-sm sm:tracking-wide"
          style={{ "--gl-d": "0ms" } as React.CSSProperties}
        >
          GROWLAB STUDIO
        </Link>

        <div className="gl-fade hidden items-center gap-8 md:flex" style={{ "--gl-d": "80ms" } as React.CSSProperties}>
          <ul className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors duration-300 hover:text-black dark:hover:text-zinc-50">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ConsultMenu contactHref={cta.href} label={cta.label} buttonClassName={`${CTA_CLASS} h-9 px-4 text-sm`} />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          {/* 모바일 상단 바에서도 주요 CTA 노출 (아주 좁은 화면에서는 전체 화면 메뉴에서만 표시) */}
          <ConsultMenu
            contactHref={cta.href}
            label={cta.label}
            // 선택 시 전체 화면 메뉴가 열려 있었다면 함께 닫습니다.
            onSelect={() => setOpen(false)}
            className="hidden min-[360px]:block"
            buttonClassName={`gl-fade ${CTA_CLASS} h-8 px-3.5 text-[13px]`}
            buttonStyle={{ "--gl-d": "80ms" } as React.CSSProperties}
          />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="gl-mobile-menu"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            className="gl-fade relative -mr-2 flex h-11 w-11 items-center justify-center"
            style={{ "--gl-d": "80ms" } as React.CSSProperties}
          >
            <span
              aria-hidden="true"
              className={`absolute h-px w-5 bg-black transition-transform duration-300 ease-out dark:bg-zinc-50 ${open ? "rotate-45" : "-translate-y-[4px]"}`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-px w-5 bg-black transition-transform duration-300 ease-out dark:bg-zinc-50 ${open ? "-rotate-45" : "translate-y-[4px]"}`}
            />
          </button>
        </div>
      </div>

      <div
        id="gl-mobile-menu"
        className={`fixed inset-x-0 top-[var(--gl-nav-h)] h-[calc(100dvh-var(--gl-nav-h))] overflow-y-auto bg-zinc-50 transition-[opacity,visibility] duration-300 ease-out md:hidden dark:bg-black ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <ul className="flex flex-col px-5 pt-6">
          {links.map((link, i) => (
            <li key={link.label} className="border-b border-zinc-200 dark:border-zinc-800">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={`flex items-baseline justify-between py-5 text-[28px] font-semibold tracking-[-0.03em] text-black transition-[opacity,transform] duration-500 ease-out dark:text-zinc-50 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
              >
                {link.label}
                <span className="text-xs font-normal tabular-nums text-zinc-400">0{i + 1}</span>
              </Link>
            </li>
          ))}
          <li
            className={`pt-8 transition-[opacity,transform] duration-500 ease-out ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            style={{ transitionDelay: open ? `${80 + links.length * 40}ms` : "0ms" }}
          >
            {/* key: 전체 화면 메뉴를 닫았다 다시 열면 선택지가 접힌 상태로 시작합니다. */}
            <ConsultMenu
              key={open ? "menu-open" : "menu-closed"}
              variant="inline"
              contactHref={cta.href}
              label={cta.label}
              onSelect={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              buttonClassName={`${CTA_CLASS} h-14 w-full gap-2 text-[17px]`}
              buttonSuffix={<span aria-hidden="true">→</span>}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}
