"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { FAQ_ITEMS } from "../lib/faq";


const ease = [0.22, 1, 0.36, 1] as const;

/**
 * FAQ 아코디언 (WAI-ARIA Accordion 패턴)
 * - 질문은 <button aria-expanded aria-controls>, 답변은 role="region" aria-labelledby
 * - Enter/Space로 열고 닫기, ↑/↓/Home/End로 질문 간 이동
 * - 답변은 접혀 있어도 HTML에 남아 있어 검색엔진이 읽을 수 있고, 접힌 상태에서는 inert로 포커스·낭독에서 제외됩니다.
 * - 높이·투명도만 부드럽게 전환(바운스 없음), 동작 줄이기 설정 시 즉시 전환
 */
export default function Faq() {
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set());
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = FAQ_ITEMS.length - 1;
    const target =
      event.key === "ArrowDown" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowUp" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (target === null) return;
    event.preventDefault();
    buttonsRef.current[target]?.focus();
  };

  return (
    <ul className="w-full border-t border-zinc-200 dark:border-zinc-800">
      {FAQ_ITEMS.map((item, i) => {
        const open = openSet.has(i);
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <li key={item.question} className="border-b border-zinc-200 dark:border-zinc-800">
            <h2>
              <button
                ref={(el) => {
                  buttonsRef.current[i] = el;
                }}
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                onKeyDown={(event) => onKeyDown(event, i)}
                className="group flex w-full items-start gap-4 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:gap-6 sm:py-8 dark:focus-visible:outline-white"
              >
                <span className="w-7 shrink-0 pt-[3px] text-sm font-semibold tabular-nums text-zinc-400 sm:w-9 sm:pt-1 sm:text-base">
                  Q{i + 1}
                </span>
                <span className="flex-1 text-[17px] font-semibold leading-[1.5] tracking-[-0.02em] text-black break-keep sm:text-xl dark:text-zinc-50">
                  {item.question}
                </span>
                {/* + → − 아이콘: 세로선이 회전하며 사라집니다 */}
                <span aria-hidden="true" className="relative mt-[7px] flex h-4 w-4 shrink-0 items-center justify-center sm:mt-2">
                  <span className="absolute h-px w-4 bg-zinc-500 transition-colors group-hover:bg-black dark:group-hover:bg-zinc-50" />
                  <span
                    className={`absolute h-4 w-px bg-zinc-500 transition-transform duration-300 ease-out group-hover:bg-black motion-reduce:transition-none dark:group-hover:bg-zinc-50 ${
                      open ? "rotate-90 scale-y-0" : "rotate-0 scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h2>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              initial={false}
              animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.45, ease }, opacity: { duration: 0.3, ease } }}
              className="overflow-hidden"
            >
              <p className="pb-7 pl-11 pr-8 text-[15px] leading-[1.8] text-zinc-600 break-keep sm:pb-9 sm:pl-[60px] sm:pr-12 sm:text-base dark:text-zinc-400">
                {item.answer}
              </p>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}
