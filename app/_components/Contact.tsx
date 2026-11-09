"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./motion-variants";
import {
  BUDGET_OPTIONS,
  EMAIL_REGEX,
  FIELD_LIMITS,
  INQUIRY_TYPE_OPTIONS,
  PAGE_COUNT_OPTIONS,
  TIMELINE_OPTIONS,
  normalizeUrl,
  type Option,
} from "../lib/contact";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const GENERIC_ERROR = "문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.";

const fieldClass =
  "w-full rounded-lg border border-zinc-300 bg-transparent px-4 py-2.5 text-sm text-black placeholder:text-zinc-400 transition-colors duration-300 focus:border-emerald-600 focus:outline-none dark:border-zinc-700 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-emerald-400";

const labelClass = "text-sm font-medium text-zinc-700 dark:text-zinc-300";

const selectClass = `${fieldClass} [color-scheme:light] dark:[color-scheme:dark]`;

const optionClass = "bg-white text-black dark:bg-zinc-900 dark:text-white";

const helpClass = "text-xs text-zinc-500 dark:text-zinc-500";

const Required = () => <span className="text-emerald-600 dark:text-emerald-400">*</span>;

function SelectField({
  id,
  name,
  label,
  placeholder,
  options,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: Option[];
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <select id={id} name={name} defaultValue="" className={selectClass}>
        <option value="" disabled className={optionClass}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className={optionClass}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState(GENERIC_ERROR);
  const [inquiryType, setInquiryType] = useState("");

  const fail = (message: string) => {
    setErrorMessage(message);
    setStatus("error");
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const read = (key: string) => String(formData.get(key) ?? "").trim();

    const name = read("name");
    const phone = read("phone");
    const email = read("email");
    const company = read("company");
    const selectedInquiryType = read("inquiryType");
    const budget = read("budget");
    const pageCount = read("pageCount");
    const timeline = read("timeline");
    const referenceUrlRaw = read("referenceUrl");
    const currentSiteUrlRaw = selectedInquiryType === "renewal" ? read("currentSiteUrl") : "";
    const message = read("message");
    const privacyAgree = formData.get("privacyAgree") === "on";

    // 서버(api/contact)와 동일한 필수값 검증
    if (!name || !phone || !email || !selectedInquiryType || !message || !privacyAgree) {
      fail("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      fail("올바른 이메일 형식이 아닙니다.");
      return;
    }

    const referenceUrl = normalizeUrl(referenceUrlRaw);
    const currentSiteUrl = normalizeUrl(currentSiteUrlRaw);
    if (referenceUrl === null || currentSiteUrl === null) {
      fail("올바른 홈페이지 주소를 입력해주세요.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          company,
          inquiryType: selectedInquiryType,
          budget,
          pageCount,
          timeline,
          referenceUrl,
          currentSiteUrl,
          message,
          privacyAgree,
        }),
      });

      if (!response.ok) {
        // 400(입력값 문제)은 서버 안내 문구를 그대로, 그 외는 공통 실패 문구
        const data: unknown = await response.json().catch(() => null);
        const serverMessage =
          response.status === 400 && data && typeof data === "object" && "error" in data && typeof data.error === "string"
            ? data.error
            : GENERIC_ERROR;
        fail(serverMessage);
        return;
      }

      setStatus("success");
      setInquiryType("");
      form.reset();
    } catch {
      fail(GENERIC_ERROR);
    }
  };

  return (
    // 상단 여백: 바로 위 Portfolio(pb-24)와 같은 배경으로 이어지므로 py-24 대신 축소
    // 1024px 이상: 왼쪽 안내(42%) / 오른쪽 폼(58%) 2열, 상단 정렬. 그 이하: 1열(안내 → 폼).
    // 고정(sticky)·스크롤 연동 없이 일반 문서 흐름을 따릅니다.
    <section
      id="contact"
      className="mx-auto grid w-full max-w-7xl scroll-mt-28 items-start gap-8 px-6 pb-24 pt-4 sm:px-12 sm:pt-8 lg:grid-cols-[42fr_58fr] lg:gap-14"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="flex min-w-0 flex-col gap-4 text-left"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400"
        >
          Start a Project
        </motion.p>
        {/*
          글자 크기 — 각 줄이 한 줄에 들어가도록 컬럼 폭 기준으로 계산합니다.
          모바일: 둘째 줄(약 12.9em)이 좌우 24px 여백 안에 들어가는 크기.
          1024px 이상: 왼쪽 컬럼 폭 ≈ (화면 폭 − 152px) × 0.42 (1280px부터 474px 고정)
                       → 헤드라인 = 컬럼 ÷ 13.6em, 설명 = 컬럼 ÷ 20.5em (여유 포함)
        */}
        <motion.h2
          variants={fadeInUp}
          className="text-[length:clamp(22px,6.6vw,31px)] font-bold leading-[1.3] text-black break-keep sm:text-[41px] lg:whitespace-nowrap lg:text-[length:min(calc(3.09vw_-_4.7px),35px)] dark:text-zinc-50"
        >
          <span className="block">당신의 브랜드를 위한</span>
          <span className="block">홈페이지, 여기서 시작하세요.</span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-base leading-relaxed text-zinc-600 break-keep sm:text-lg lg:whitespace-nowrap lg:text-[length:min(calc(2.05vw_-_3.1px),18px)] lg:tracking-[-0.01em] dark:text-zinc-400"
        >
          <span className="block">프로젝트에 대해 간단히 알려주세요.</span>
          <span className="block">확인 후 제작 방향과 견적을 안내해 드립니다.</span>
        </motion.p>
      </motion.div>

      {/* 문의 폼 — 기존 폼 그대로, 컬럼 폭에 맞춤 */}
      <motion.form
        ref={formRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={fadeInUp}
        onSubmit={handleSubmit}
        className="flex w-full min-w-0 flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10 lg:p-8 xl:p-10 dark:border-zinc-800 dark:bg-zinc-900"
      >
          <h3 className="text-2xl font-bold text-black dark:text-zinc-50">
            프로젝트 문의
          </h3>

          {/* gap-y-6: 모바일 1열에서도 다른 항목과 같은 세로 간격 */}
          <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
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
            <label htmlFor="contact-company" className={labelClass}>
              업체명 / 브랜드명
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={FIELD_LIMITS.company}
              placeholder="그로우랩 스튜디오"
              className={fieldClass}
            />
          </div>

          <fieldset className="flex min-w-0 flex-col gap-1.5">
            <legend className={`${labelClass} mb-1.5`}>
              문의 유형 <Required />
            </legend>
            {/* 라디오(sr-only)는 키보드 선택·필수 검증용으로 유지, 선택 상태는 테두리·글자색으로 표시 */}
            {/* 1024~1279px: 폼 컬럼이 좁아 선택 시(굵은 글씨) 문구가 넘치지 않도록 1열 */}
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {INQUIRY_TYPE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="relative flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-700 transition-colors duration-300 hover:border-zinc-400 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-600/5 has-[:checked]:font-semibold has-[:checked]:text-emerald-700 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-600/40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:has-[:checked]:border-emerald-400 dark:has-[:checked]:bg-emerald-400/10 dark:has-[:checked]:text-emerald-400 dark:has-[:focus-visible]:ring-emerald-400/40"
                >
                  <input
                    type="radio"
                    name="inquiryType"
                    value={option.value}
                    required
                    checked={inquiryType === option.value}
                    onChange={(event) => setInquiryType(event.target.value)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <SelectField
            id="contact-budget"
            name="budget"
            label="예산 범위"
            placeholder="예산을 선택해주세요."
            options={BUDGET_OPTIONS}
          />

          {/* 1024~1279px: 폼 컬럼이 좁아 선택 문구가 잘리지 않도록 1열 */}
          <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <SelectField
              id="contact-page-count"
              name="pageCount"
              label="예상 페이지 수"
              placeholder="페이지 수를 선택해주세요."
              options={PAGE_COUNT_OPTIONS}
            />
            <SelectField
              id="contact-timeline"
              name="timeline"
              label="희망 오픈 시기"
              placeholder="오픈 시기를 선택해주세요."
              options={TIMELINE_OPTIONS}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-reference-url" className={labelClass}>
              참고 사이트 URL
            </label>
            <input
              id="contact-reference-url"
              name="referenceUrl"
              type="text"
              inputMode="url"
              autoComplete="url"
              maxLength={FIELD_LIMITS.url}
              placeholder="https://example.com"
              aria-describedby="contact-reference-url-help"
              className={fieldClass}
            />
            <p id="contact-reference-url-help" className={helpClass}>
              마음에 드는 홈페이지가 있다면 공유해주세요.
            </p>
          </div>

          {inquiryType === "renewal" && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-current-site-url" className={labelClass}>
                기존 홈페이지 URL
              </label>
              <input
                id="contact-current-site-url"
                name="currentSiteUrl"
                type="text"
                inputMode="url"
                maxLength={FIELD_LIMITS.url}
                placeholder="https://example.com"
                aria-describedby="contact-current-site-url-help"
                className={fieldClass}
              />
              <p id="contact-current-site-url-help" className={helpClass}>
                리뉴얼할 현재 홈페이지 주소를 알려주세요.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-message" className={labelClass}>
              문의 내용 <span className="text-emerald-600 dark:text-emerald-400">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              maxLength={FIELD_LIMITS.message}
              placeholder={
                "제작 목적, 필요한 기능, 원하는 디자인 등을 자유롭게 알려주세요.\n예: 업종, 필요한 페이지, 참고 사이트, 원하는 기능 등"
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
                {errorMessage}
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
    </section>
  );
}
