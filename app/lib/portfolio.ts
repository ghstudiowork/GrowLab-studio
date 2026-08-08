export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  year: string;
  href: string;
  thumbnail: string;
  thumbnailAlt: string;
};

// 새 프로젝트는 이 배열에 추가하면 메인 홈(캐러셀)과 /portfolio에 자동 반영됩니다.
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "noirframe",
    title: "NOIRFRAME",
    category: "Fashion Commerce",
    description: "미니멀한 무드와 룩북 중심 쇼핑 경험을 설계한 패션 커머스 웹사이트",
    year: "2026",
    href: "https://noirframe-tmj7.vercel.app/",
    thumbnail: "/images/portfolio/noirframe-thumbnail.png",
    thumbnailAlt: "NOIRFRAME 웹사이트 스크린샷",
  },
  {
    slug: "morrow-roasters",
    title: "MORROW ROASTERS",
    category: "Cafe Website",
    description: "프리미엄 스페셜티 카페 브랜드를 위한 반응형 웹사이트",
    year: "2026",
    href: "https://growlab-morrow-roasters.vercel.app/",
    thumbnail: "/images/portfolio/morrow-thumbnail.png",
    thumbnailAlt: "MORROW ROASTERS 웹사이트 스크린샷",
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
  },
];
