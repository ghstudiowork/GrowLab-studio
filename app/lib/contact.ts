/**
 * 문의 폼 공용 정의 — 클라이언트(Contact.tsx)와 서버(api/contact/route.ts)가 함께 사용합니다.
 * 옵션 값·필수 여부·길이 제한·URL 검증을 한 곳에서 관리해 양쪽 검증이 어긋나지 않도록 합니다.
 */

export type Option = { value: string; label: string };

export const INQUIRY_TYPE_OPTIONS: Option[] = [
  { value: "new", label: "신규 홈페이지 제작" },
  { value: "renewal", label: "기존 홈페이지 리뉴얼" },
  { value: "maintenance", label: "유지보수 및 수정" },
];

export const BUDGET_OPTIONS: Option[] = [
  { value: "under-50", label: "50만 원 미만" },
  { value: "50-100", label: "50만 원 ~ 100만 원" },
  { value: "100-200", label: "100만 원 ~ 200만 원" },
  { value: "200-300", label: "200만 원 ~ 300만 원" },
  { value: "over-300", label: "300만 원 이상" },
  { value: "undecided", label: "아직 정해지지 않았어요" },
];

/** 이전 버전 폼(캐시된 페이지 등)에서 들어오는 예산 값 — 서버에서만 라벨 변환에 사용합니다. */
export const LEGACY_BUDGET_LABELS: Record<string, string> = {
  landing: "20~50만 원 (랜딩페이지)",
  business: "100만 원~ (비즈니스 홈페이지)",
  custom: "200만 원~ (맞춤형 웹사이트)",
};

export const PAGE_COUNT_OPTIONS: Option[] = [
  { value: "undecided", label: "아직 정해지지 않았어요" },
  { value: "1", label: "1페이지" },
  { value: "2-5", label: "2~5페이지" },
  { value: "6-10", label: "6~10페이지" },
  { value: "11+", label: "11페이지 이상" },
];

export const TIMELINE_OPTIONS: Option[] = [
  { value: "flexible", label: "일정 협의" },
  { value: "within-1m", label: "1개월 이내" },
  { value: "1-2m", label: "1~2개월" },
  { value: "after-3m", label: "3개월 이후" },
];

export const FIELD_LIMITS = {
  name: 100,
  phone: 30,
  email: 200,
  company: 100,
  url: 300,
  message: 2000,
} as const;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function findLabel(options: Option[], value: string) {
  return options.find((option) => option.value === value)?.label;
}

/**
 * 선택 입력 URL 정규화. 빈 값은 "" 그대로, 스킴이 없으면 https://를 붙입니다.
 * http/https 형식의 올바른 주소가 아니면 null을 반환합니다.
 */
export function normalizeUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return "";
  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}
