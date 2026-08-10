import { Resend } from "resend";

const RECEIVER_EMAIL = "ghstudio.work@gmail.com";

// TODO(배포 전 필수): Resend 도메인 인증(verified domain) 완료 후,
// 아래 발신 주소를 인증된 도메인 주소(예: no-reply@growlab-studio.com)로 교체할 것.
// 현재는 도메인 인증 없이도 사용 가능한 Resend 공식 테스트 발신 주소를 사용 중.
const FROM_ADDRESS = "GrowLab Studio <onboarding@resend.dev>";

const MAX_BODY_LENGTH = 10_000;

const FIELD_LIMITS = {
  name: 100,
  phone: 30,
  email: 200,
  budget: 100,
  message: 2000,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BUDGET_LABELS: Record<string, string> = {
  landing: "20~50만 원 (랜딩페이지)",
  business: "100만 원~ (비즈니스 홈페이지)",
  custom: "200만 원~ (맞춤형 웹사이트)",
  undecided: "예산 미정 / 상담 후 결정",
};

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

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const budgetValue = typeof body.budget === "string" ? body.budget.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const privacyAgree = body.privacyAgree === true;

  if (!name || !phone || !email || !message || !privacyAgree) {
    return badRequest("필수 항목을 모두 입력해주세요.");
  }

  if (
    name.length > FIELD_LIMITS.name ||
    phone.length > FIELD_LIMITS.phone ||
    email.length > FIELD_LIMITS.email ||
    budgetValue.length > FIELD_LIMITS.budget ||
    message.length > FIELD_LIMITS.message
  ) {
    return badRequest("입력값이 너무 깁니다.");
  }

  if (!EMAIL_REGEX.test(email)) {
    return badRequest("올바른 이메일 형식이 아닙니다.");
  }

  const budgetLabel = BUDGET_LABELS[budgetValue] ?? "미입력";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return Response.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safeBudget = escapeHtml(budgetLabel);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const html = `
    <div style="font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #111;">
      <p><strong>이름:</strong> ${safeName}</p>
      <p><strong>연락처:</strong> ${safePhone}</p>
      <p><strong>이메일:</strong> ${safeEmail}</p>
      <p><strong>예산:</strong> ${safeBudget}</p>
      <p><strong>문의 내용:</strong><br />${safeMessage}</p>
    </div>
  `;

  const text = `이름: ${name}\n연락처: ${phone}\n이메일: ${email}\n예산: ${budgetLabel}\n문의 내용:\n${message}`;

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
