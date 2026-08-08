"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { portfolioProjects, type PortfolioProject } from "../lib/portfolio";

const CARD_GAP_PX = 24; // Tailwind gap-6

function CarouselCard({ project }: { project: PortfolioProject }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} 프로젝트 보기 (새 탭에서 열림)`}
      draggable={false}
      className="group flex h-full flex-col gap-5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black dark:focus-visible:outline-white"
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-zinc-200 shadow-sm transition-colors duration-300 group-hover:border-zinc-400 dark:border-zinc-800 dark:group-hover:border-zinc-600">
        <Image
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          fill
          draggable={false}
          sizes="(min-width: 1280px) 34vw, (min-width: 768px) 50vw, 82vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <p className="text-xs uppercase tracking-wide font-semibold text-emerald-600 dark:text-emerald-400">
          {project.category}
        </p>
        <p className="text-lg font-semibold text-black dark:text-zinc-50">
          {project.title}
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-black dark:text-zinc-50">
        프로젝트 보기
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </a>
  );
}

export default function PortfolioCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ isDown: false, startX: 0, startScrollLeft: 0, moved: 0 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= maxScrollLeft - 1);
  }, []);

  // 카드 너비/개수(=단일 소스 데이터 배열 길이)가 바뀌어도 스크롤 가능 범위를 실측해서
  // prev/next 비활성 상태를 판단하므로, 프로젝트가 늘어나도 별도 수정 없이 그대로 동작합니다.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateEdges);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateEdges);
      cancelAnimationFrame(raf);
    };
  }, [updateEdges]);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current;
    const card = firstCardRef.current;
    if (!el || !card) return;
    const step = card.getBoundingClientRect().width + CARD_GAP_PX;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(maxScrollLeft, el.scrollLeft + direction * step));
    el.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = { isDown: true, startX: event.pageX, startScrollLeft: el.scrollLeft, moved: 0 };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !dragRef.current.isDown) return;
    const delta = event.pageX - dragRef.current.startX;
    dragRef.current.moved = Math.max(dragRef.current.moved, Math.abs(delta));
    el.scrollLeft = dragRef.current.startScrollLeft - delta;
  };

  const endDrag = () => {
    dragRef.current.isDown = false;
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragRef.current.moved > 6) {
      event.preventDefault();
      event.stopPropagation();
    }
    dragRef.current.moved = 0;
  };

  return (
    <div className="relative w-full">
      <div
        ref={scrollerRef}
        role="region"
        aria-label="포트폴리오 프로젝트 슬라이더"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onClickCapture={handleClickCapture}
        onDragStart={(event) => event.preventDefault()}
        className="flex w-full cursor-grab select-none gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black [&::-webkit-scrollbar]:hidden dark:focus-visible:outline-white [scrollbar-width:none]"
      >
        {portfolioProjects.map((project, i) => (
          <div
            key={project.slug}
            ref={i === 0 ? firstCardRef : undefined}
            className="w-[82%] shrink-0 snap-start md:w-[50%] xl:w-[34%]"
          >
            <CarouselCard project={project} />
          </div>
        ))}
      </div>

      <div className="mt-6 hidden items-center justify-end gap-3 md:flex">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="이전 프로젝트"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-black transition-colors duration-300 hover:border-black disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-50 dark:hover:border-white dark:disabled:hover:border-zinc-700"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="다음 프로젝트"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-black transition-colors duration-300 hover:border-black disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-50 dark:hover:border-white dark:disabled:hover:border-zinc-700"
        >
          →
        </button>
      </div>
    </div>
  );
}
