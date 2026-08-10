"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./motion-variants";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const budgetOptions = [
  { value: "landing", label: "20~50만 원 (랜딩페이지)" },
  { value: "business", label: "100만 원~ (비즈니스 홈페이지)" },
  { value: "custom", label: "200만 원~ (맞춤형 웹사이트)" },
  { value: "undecided", label: "예산 미정 / 상담 후 결정" },
];

const kakaoInfo = [
  {
    number: "01",
    title: "빠른 상담",
    description: "확인 후 빠르게 답변드립니다.",
  },
  {
    number: "02",
    title: "비용 · 일정 상담",
    description: "예상 제작 비용과 기간을 안내해드립니다.",
  },
  {
    number: "03",
    title: "자료 전달",
    description: "참고 사이트 · 이미지 · 자료를 보내주셔도 됩니다.",
  },
];

const fieldClass =
  "w-full rounded-lg border border-zinc-300 bg-transparent px-4 py-2.5 text-sm text-black placeholder:text-zinc-400 transition-colors duration-300 focus:border-emerald-600 focus:outline-none dark:border-zinc-700 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-emerald-400";

const labelClass = "text-sm font-medium text-zinc-700 dark:text-zinc-300";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const budget = String(formData.get("budget") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const privacyAgree = formData.get("privacyAgree") === "on";

    if (!name || !phone || !email || !message || !privacyAgree) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, budget, message, privacyAgree }),
      });

      if (!response.ok) {
        throw new Error("submit_failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-24 flex flex-col items-center gap-8">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-[31px] sm:text-[41px] font-bold text-black dark:text-zinc-50 text-center"
      >
        어떤 홈페이지가 필요한지 아직 명확하지 않아도 괜찮습니다.
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl md:max-w-none md:whitespace-nowrap leading-relaxed text-pretty text-center"
      >
        사업의 현재 상황과 목표를 알려주시면 필요한 구성과 제작 방향부터 함께 정리해드립니다.
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid w-full items-stretch gap-8 lg:grid-cols-2"
      >
        <motion.div
          variants={fadeInUp}
          className="flex h-full flex-col gap-7 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex flex-col gap-4">
            <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
              카카오톡 상담
            </p>
            <p className="text-3xl font-bold leading-snug text-black dark:text-zinc-50">
              가장 빠르고 편하게,
              <br />
              상담을 시작하세요.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              간단한 문의부터 제작 비용과 일정까지
              <br />
              부담 없이 상담하실 수 있습니다.
            </p>
          </div>

          <div className="mt-3 flex flex-col gap-5">
            {kakaoInfo.map((item) => (
              <div key={item.number} className="flex items-start gap-3">
                <span className="w-6 shrink-0 text-base font-semibold text-emerald-600 dark:text-emerald-400">
                  {item.number}
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm sm:text-base font-semibold text-black dark:text-zinc-50">
                    {item.title}
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-4">
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              간단한 문의도 편하게 남겨주세요.
            </p>
            <a
              href="http://pf.kakao.com/_ZxixbxnX/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-xl border border-transparent bg-black px-8 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:border-emerald-600 dark:bg-white dark:text-black dark:hover:border-emerald-400"
            >
              카카오톡 상담하기
            </a>
          </div>
        </motion.div>

        <motion.form
          ref={formRef}
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="flex h-full flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h3 className="text-2xl font-bold text-black dark:text-zinc-50">
            문의 보내기
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className={labelClass}>
                이름 <span className="text-emerald-600 dark:text-emerald-400">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="홍길동"
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-phone" className={labelClass}>
                연락처 <span className="text-emerald-600 dark:text-emerald-400">*</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={30}
                placeholder="010-1234-5678"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className={labelClass}>
              이메일 <span className="text-emerald-600 dark:text-emerald-400">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
              placeholder="example@email.com"
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-budget" className={labelClass}>
              예산 범위
            </label>
            <select
              id="contact-budget"
              name="budget"
              defaultValue=""
              className={`${fieldClass} [color-scheme:light] dark:[color-scheme:dark]`}
            >
              <option value="" disabled className="bg-white text-black dark:bg-zinc-900 dark:text-white">
                예산을 선택해주세요.
              </option>
              {budgetOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-white text-black dark:bg-zinc-900 dark:text-white"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-message" className={labelClass}>
              문의 내용 <span className="text-emerald-600 dark:text-emerald-400">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              maxLength={2000}
              placeholder={
                "제작하려는 홈페이지와 필요한 기능을 자유롭게 알려주세요.\n예: 업종, 필요한 페이지, 참고 사이트, 원하는 기능 등"
              }
              className={`${fieldClass} resize-none`}
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <input
              type="checkbox"
              name="privacyAgree"
              required
              className="mt-0.5 h-4 w-4 accent-emerald-600 dark:accent-emerald-400"
            />
            <span>개인정보 수집·이용에 동의합니다. (필수)</span>
          </label>

          <div aria-live="polite" className="min-h-5">
            {status === "success" && (
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                문의가 접수되었습니다. 확인 후 빠르게 연락드리겠습니다.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            {status === "submitting" ? "전송 중..." : "문의 보내기"}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}
