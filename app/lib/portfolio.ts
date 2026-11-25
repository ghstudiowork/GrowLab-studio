export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  year: string;
  href: string;
  thumbnail: string;
  thumbnailAlt: string;
  /**
   * concept: 스튜디오 자체 기획 프로젝트 → "CONCEPT PROJECT" 표시
   * client : 실제 의뢰를 받아 제작한 프로젝트 → "CLIENT PROJECT" 표시 (의뢰 사실이 확인된 경우에만 지정)
   */
  projectType: "concept" | "client";
  /** 실제 수행한 역할. 확인된 역할만 기재하며, 빈 배열이면 표시하지 않습니다. */
  roles: string[];
};

export const PROJECT_TYPE_LABEL: Record<PortfolioProject["projectType"], string> = {
  concept: "CONCEPT PROJECT",
  client: "CLIENT PROJECT",
};

/** 운영자 확인(2026-11-24): 현재 등록된 6개 프로젝트 모두 자체 기획, 기획·디자인·개발 직접 수행 */
const FULL_ROLES = ["Planning", "Design", "Development"];

// 새 프로젝트는 이 배열에 추가하면 메인 홈(캐러셀)과 /portfolio에 자동 반영됩니다.
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "growlab-checkout",
    title: "GROWLAB CHECKOUT",
    category: "Interactive Web / UI·UX",
    description: "하나의 주문을 PAPER, BOLD, TERMINAL, FLOW 네 가지 디자인 언어로 표현한 인터랙티브 체크아웃",
    year: "2026",
    href: "https://growlab-checkout-mf3t.vercel.app",
    thumbnail: "/images/portfolio/growlab-checkout-thumbnail.png",
    thumbnailAlt: "GROWLAB CHECKOUT BOLD 디자인 결제 화면 스크린샷",
    projectType: "concept",
    roles: FULL_ROLES,
  },
  {
    slug: "forme",
    title: "FORME",
    category: "FURNITURE / LIVING",
    description: "형태와 기능의 균형을 담은 컨템포러리 가구 브랜드 웹사이트",
    year: "2026",
    href: "https://forme-furniture-one.vercel.app/",
    thumbnail: "/images/portfolio/forme-thumbnail.png",
    thumbnailAlt: "FORME 컨템포러리 가구 브랜드 웹사이트",
    projectType: "concept",
    roles: FULL_ROLES,
  },
  {
    slug: "slice-club",
    title: "SLICE CLUB",
    category: "Pizza Brand Website",
    description: "늦은 밤의 피자 문화를 감각적인 비주얼과 인터랙션으로 풀어낸 피자 브랜드 웹사이트",
    year: "2026",
    href: "https://slice-club-sedg.vercel.app/",
    thumbnail: "/images/portfolio/slice-club-thumbnail.png",
    thumbnailAlt: "SLICE CLUB 피자 브랜드 웹사이트",
    projectType: "concept",
    roles: FULL_ROLES,
  },
  {
    slug: "noirframe",
    title: "NOIRFRAME",
    category: "Fashion Commerce",
    description: "미니멀한 무드와 룩북 중심 쇼핑 경험을 설계한 패션 커머스 웹사이트",
    year: "2026",
    href: "https://noirframe-tmj7.vercel.app/",
    thumbnail: "/images/portfolio/noirframe-thumbnail.png",
    thumbnailAlt: "NOIRFRAME 웹사이트 스크린샷",
    projectType: "concept",
    roles: FULL_ROLES,
  },
  {
    slug: "archi-mono",
    title: "ARCHI / MONO",
    category: "건축 · 인테리어",
    description: "빛과 재료, 공간의 감도를 중심으로 설계한 건축 · 인테리어 스튜디오 웹사이트",
    year: "2026",
    href: "https://archi-mono.vercel.app/",
    thumbnail: "/images/portfolio/archi-mono-thumbnail.png",
    thumbnailAlt: "ARCHI / MONO 웹사이트 스크린샷",
    projectType: "concept",
    roles: FULL_ROLES,
  },
  {
    slug: "lumea",
    title: "LUMÉA",
    category: "Skin & Aesthetic Studio",
    description: "프리미엄 스킨 케어 스튜디오의 브랜드 경험과 예약 흐름을 설계한 에디토리얼 웹사이트",
    year: "2026",
    href: "https://lumea-htz1.vercel.app/",
    thumbnail: "/images/portfolio/lumea-thumbnail.png",
    thumbnailAlt: "LUMÉA 웹사이트 스크린샷",
    projectType: "concept",
    roles: FULL_ROLES,
  },
];
