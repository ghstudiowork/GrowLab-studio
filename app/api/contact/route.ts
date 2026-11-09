import { Resend } from "resend";
import {
  BUDGET_OPTIONS,
  EMAIL_REGEX,
  FIELD_LIMITS,
  INQUIRY_TYPE_OPTIONS,
  LEGACY_BUDGET_LABELS,
  PAGE_COUNT_OPTIONS,
  TIMELINE_OPTIONS,
  findLabel,
  normalizeUrl,
} from "../../lib/contact";

const RECEIVER_EMAIL = "ghstudio.work@gmail.com";

// TODO(배포 전 필수): Resend 도메인 인증(verified domain) 완료 후,
// 아래 발신 주소를 인증된 도메인 주소(예: no-reply@growlab-studio.com)로 교체할 것.
// 현재는 도메인 인증 없이도 사용 가능한 Resend 공식 테스트 발신 주소를 사용 중.
const FROM_ADDRESS = "GrowLab Studio <onboarding@resend.dev>";

const MAX_BODY_LENGTH = 10_000;

const EMPTY_LABEL = "미입력";

const GENERIC_ERROR = "문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

function readString(body: Record<string, unknown>, key: string) {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

/** 선택형 값: 비어 있으면 EMPTY_LABEL, 허용되지 않은 값이면 undefined(→ 400). */
function resolveOptional(value: string, labelFor: (v: string) => string | undefined) {
  if (!value) return EMPTY_LABEL;
  return labelFor(value);
}

export async function POST(request: Request) {
  const rawBody = await request.text();

  if (rawBody.length > MAX_BODY_LENGTH) {
    return badRequest("요청 내용이 너무 깁니다.");
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return badRequest("잘못된 요청입니다.");
  }

  if (typeof payload !== "object" || payload === null) {
    return badRequest("잘못된 요청입니다.");
  }

  const body = payload as Record<string, unknown>;

  const name = readString(body, "name");
  const phone = readString(body, "phone");
  const email = readString(body, "email");
  const company = readString(body, "company");
  const inquiryType = readString(body, "inquiryType");
  const budgetValue = readString(body, "budget");
  const pageCountValue = readString(body, "pageCount");
  const timelineValue = readString(body, "timeline");
  const referenceUrlRaw = readString(body, "referenceUrl");
  const currentSiteUrlRaw = readString(body, "currentSiteUrl");
  const message = readString(body, "message");
  const privacyAgree = body.privacyAgree === true;

  if (!name || !phone || !email || !inquiryType || !message || !privacyAgree) {
    return badRequest("필수 항목을 모두 입력해주세요.");
  }

  if (
    name.length > FIELD_LIMITS.name ||
    phone.length > FIELD_LIMITS.phone ||
    email.length > FIELD_LIMITS.email ||
    company.length > FIELD_LIMITS.company ||
    referenceUrlRaw.length > FIELD_LIMITS.url ||
    currentSiteUrlRaw.length > FIELD_LIMITS.url ||
    message.length > FIELD_LIMITS.message
  ) {
    return badRequest("입력값이 너무 깁니다.");
  }

  if (!EMAIL_REGEX.test(email)) {
    return badRequest("올바른 이메일 형식이 아닙니다.");
  }

  const inquiryTypeLabel = findLabel(INQUIRY_TYPE_OPTIONS, inquiryType);
  const budgetLabel = resolveOptional(
    budgetValue,
    (v) => findLabel(BUDGET_OPTIONS, v) ?? LEGACY_BUDGET_LABELS[v],
  );
  const pageCountLabel = resolveOptional(pageCountValue, (v) => findLabel(PAGE_COUNT_OPTIONS, v));
  const timelineLabel = resolveOptional(timelineValue, (v) => findLabel(TIMELINE_OPTIONS, v));

  if (!inquiryTypeLabel || !budgetLabel || !pageCountLabel || !timelineLabel) {
    return badRequest("잘못된 요청입니다.");
  }

  const referenceUrl = normalizeUrl(referenceUrlRaw);
  // 기존 홈페이지 주소는 리뉴얼 문의일 때만 받습니다.
  const currentSiteUrl = inquiryType === "renewal" ? normalizeUrl(currentSiteUrlRaw) : "";
  if (referenceUrl === null || currentSiteUrl === null) {
    return badRequest("올바른 홈페이지 주소를 입력해주세요.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return Response.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  const rows: [string, string][] = [
    ["이름", name],
    ["연락처", phone],
    ["이메일", email],
    ["업체명 / 브랜드명", company || EMPTY_LABEL],
    ["문의 유형", inquiryTypeLabel],
    ["예산", budgetLabel],
    ["예상 페이지 수", pageCountLabel],
    ["희망 오픈 시기", timelineLabel],
    ["참고 사이트 URL", referenceUrl || EMPTY_LABEL],
  ];
  if (inquiryType === "renewal") {
    rows.push(["기존 홈페이지 URL", currentSiteUrl || EMPTY_LABEL]);
  }

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding: 6px 16px 6px 0; white-space: nowrap; color: #555; font-weight: 600;">${escapeHtml(label)}</th><td style="padding: 6px 0; word-break: break-all;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const html = `
    <div style="font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #111;">
      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">${htmlRows}</table>
      <p style="margin-top: 16px;"><strong>문의 내용:</strong><br />${safeMessage}</p>
    </div>
  `;

  const text = `${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\n문의 내용:\n${message}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [RECEIVER_EMAIL],
      replyTo: email,
      subject: `[GrowLab Studio 문의] ${name}님의 홈페이지 제작 문의`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend send error:", error);
      return Response.json({ error: GENERIC_ERROR }, { status: 500 });
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return Response.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
