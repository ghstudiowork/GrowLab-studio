"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * 개인정보 처리방침 — 문의 폼(Contact.tsx) 안의 펼쳐보기 영역으로 제공합니다. (별도 페이지 없음)
 * - 푸터의 '개인정보 처리방침' 링크(/#privacy-policy)로 이동하면 자동으로 펼쳐집니다.
 * - 처리 항목은 문의 폼과 /api/contact 가 실제로 전송하는 값 기준입니다. (app/lib/contact.ts)
 *
 * 운영자 확인 전 항목은 값을 비워 두면 화면에 표시되지 않습니다. 확인 후 아래 상수를 채워주세요.
 */
const PRIVACY_POLICY_ID = "privacy-policy"; // Footer.tsx 링크(/#privacy-policy)와 같은 값

const PRIVACY_CONTACT_EMAIL = "ghstudio.work@gmail.com";

/** TODO(운영자 확인): 시행일 (예: "2026년 12월 1일") */
const EFFECTIVE_DATE = "";

/** TODO(운영자 확인): 개인정보 보호책임자 성명·직책 (예: "홍길동 (대표)") */
const PRIVACY_OFFICER = "";

type Processor = {
  name: string;
  task: string;
  /** TODO(운영자 확인): 실제 처리(이전) 국가 — 서비스 제공업체 문서·계약 기준으로 확인 후 입력 */
  country: string;
  /** TODO(운영자 확인): 이전받는 자의 연락처(개인정보 담당 부서 이메일 등) */
  contact: string;
  /** TODO(운영자 확인): 이전받는 자의 보유·이용 기간(서비스 제공업체의 로그·백업 보관 기간 포함) */
  retention: string;
};

const PROCESSORS: Processor[] = [
  {
    name: "Resend",
    task: "문의 폼 내용을 운영자 이메일로 전달(이메일 발송)",
    country: "",
    contact: "",
    retention: "",
  },
  {
    name: "Google (Gmail)",
    task: "전달받은 문의 메일의 수신·보관",
    country: "",
    contact: "",
    retention: "",
  },
  {
    name: "Vercel",
    task: "홈페이지 호스팅 및 문의 폼 전송 처리(서버 기능 실행)",
    country: "",
    contact: "",
    retention: "",
  },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-1">
      <h4 className="font-semibold text-zinc-700 dark:text-zinc-200">{title}</h4>
      {children}
    </section>
  );
}

const listClass = "grid gap-0.5 pl-4 [&>li]:list-disc";

export default function PrivacyPolicy() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // 푸터 링크(/#privacy-policy)로 들어오거나 같은 페이지에서 링크를 누르면 펼칩니다.
  useEffect(() => {
    const open = () => {
      const details = detailsRef.current;
      if (!details) return;
      details.open = true;
      details.scrollIntoView({ block: "start" });
    };

    if (window.location.hash === `#${PRIVACY_POLICY_ID}`) open();

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (anchor && anchor.hash === `#${PRIVACY_POLICY_ID}` && anchor.pathname === window.location.pathname) {
        if (detailsRef.current) detailsRef.current.open = true;
      }
    };
    const onHashChange = () => {
      if (window.location.hash === `#${PRIVACY_POLICY_ID}`) open();
    };

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const overseasRows = PROCESSORS.filter((p) => p.country || p.contact || p.retention);

  return (
    <details
      ref={detailsRef}
      id={PRIVACY_POLICY_ID}
      className="group ml-6 scroll-mt-28 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400"
    >
      <summary className="w-fit cursor-pointer list-none underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-200 [&::-webkit-details-marker]:hidden">
        개인정보 처리방침 보기
      </summary>
      <div
        tabIndex={0}
        aria-label="개인정보 처리방침"
        className="mt-2 grid max-h-80 gap-3 overflow-y-auto rounded-lg bg-zinc-50 p-3 break-keep focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40 dark:bg-zinc-800/60"
      >
        <p>
          GrowLab Studio(이하 &lsquo;운영자&rsquo;)는 「개인정보 보호법」에 따라 홈페이지 문의 과정에서 처리하는
          개인정보를 다음과 같이 안내합니다.
        </p>

        <Section title="1. 개인정보의 처리 목적">
          <p>홈페이지 제작 문의 접수·확인, 상담 및 견적 안내를 위한 연락에 한해 처리합니다.</p>
        </Section>

        <Section title="2. 처리하는 개인정보 항목">
          <ul className={listClass}>
            <li>필수: 이름, 연락처, 이메일, 문의 유형, 문의 내용, 개인정보 수집·이용 동의 여부</li>
            <li>
              선택: 업체명·브랜드명, 예산 범위, 예상 페이지 수, 희망 오픈 시기, 참고 사이트 URL, 기존 홈페이지
              URL(리뉴얼 문의 시)
            </li>
          </ul>
          <p>문의 내용에는 개인정보를 필요한 범위를 넘어 적지 않도록 유의해주세요.</p>
        </Section>

        <Section title="3. 처리 및 보유 기간">
          <p>
            문의일로부터 최대 1년간 보유하며, 상담 목적이 달성되면 보유 기간 내라도 불필요한 정보는 삭제합니다.
          </p>
        </Section>

        <Section title="4. 개인정보의 파기 절차 및 방법">
          <p>
            문의 메일은 Gmail에서 관리하며, 상담 목적 달성 후 불필요한 정보는 삭제하고 최대 보유 기간을 초과하지
            않도록 정기적으로 점검합니다. 전자적 파일 형태의 정보는 복구할 수 없도록 삭제합니다.
          </p>
        </Section>

        <Section title="5. 개인정보의 제3자 제공">
          <p>운영자는 정보주체의 개인정보를 제3자에게 제공하지 않습니다.</p>
        </Section>

        <Section title="6. 개인정보 처리의 위탁">
          <p>원활한 문의 처리를 위해 다음 업무를 위탁하고 있습니다.</p>
          <ul className={listClass}>
            {PROCESSORS.map((p) => (
              <li key={p.name}>
                {p.name}: {p.task}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="7. 개인정보의 국외 이전">
          <p>
            위 수탁업체는 해외 사업자로, 문의 폼 전송 시점에 네트워크를 통해 2항의 개인정보가 해당 업체의
            서버로 전송되어 위 위탁 업무 목적으로 처리됩니다.
          </p>
          {overseasRows.length > 0 && (
            <ul className={listClass}>
              {overseasRows.map((p) => (
                <li key={p.name}>
                  {p.name}
                  {p.country && ` / 이전 국가: ${p.country}`}
                  {p.contact && ` / 연락처: ${p.contact}`}
                  {p.retention && ` / 보유·이용 기간: ${p.retention}`}
                </li>
              ))}
            </ul>
          )}
          <p>
            국외 이전을 원하지 않으면 문의 폼을 이용하지 않거나 아래 연락처로 처리정지를 요청할 수 있으며, 이 경우 문의
            폼을 통한 접수가 제한됩니다.
          </p>
        </Section>

        <Section title="8. 정보주체의 권리와 행사 방법">
          <p>
            정보주체는 언제든지 개인정보 열람·정정·삭제·처리정지 및 동의 철회를 요청할 수 있습니다. 아래 이메일로
            요청하시면 본인 확인 후 지체 없이 조치합니다. 법정대리인이나 위임을 받은 대리인을 통해서도 요청할 수
            있습니다.
          </p>
          <p>
            요청 및 문의:{" "}
            <a
              href={`mailto:${PRIVACY_CONTACT_EMAIL}`}
              className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              {PRIVACY_CONTACT_EMAIL}
            </a>
          </p>
        </Section>

        <Section title="9. 개인정보의 안전성 확보 조치">
          <ul className={listClass}>
            <li>홈페이지에 별도의 데이터베이스를 두지 않고, 문의 내용은 운영자 이메일로만 전달합니다.</li>
            <li>문의 내용은 암호화된 통신(HTTPS)으로 전송됩니다.</li>
            <li>문의 메일은 운영자만 접근할 수 있는 계정에서 관리합니다.</li>
          </ul>
        </Section>

        <Section title="10. 쿠키 등 자동 수집 장치">
          <p>홈페이지는 쿠키 등 개인정보 자동 수집 장치를 설치·운영하지 않습니다.</p>
        </Section>

        <Section title="11. 개인정보 보호책임자 및 문의처">
          <p>
            GrowLab Studio{PRIVACY_OFFICER && ` · 개인정보 보호책임자 ${PRIVACY_OFFICER}`} · {PRIVACY_CONTACT_EMAIL}
          </p>
        </Section>

        <Section title="12. 권익침해 구제 방법">
          <p>개인정보 침해에 대한 신고·상담이 필요한 경우 아래 기관에 문의할 수 있습니다.</p>
          <ul className={listClass}>
            <li>개인정보침해 신고센터: (국번없이) 118 / privacy.kisa.or.kr</li>
            <li>개인정보 분쟁조정위원회: 1833-6972 / www.kopico.go.kr</li>
            <li>대검찰청: (국번없이) 1301 / www.spo.go.kr</li>
            <li>경찰청: (국번없이) 182 / ecrm.police.go.kr</li>
          </ul>
        </Section>

        {EFFECTIVE_DATE && (
          <Section title="13. 처리방침의 시행 및 변경">
            <p>이 개인정보 처리방침은 {EFFECTIVE_DATE}부터 적용되며, 변경 시 이 영역을 통해 안내합니다.</p>
          </Section>
        )}
      </div>
    </details>
  );
}
