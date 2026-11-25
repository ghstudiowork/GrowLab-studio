// 공식 프로덕션 도메인
export const SITE_URL = "https://growlabstudio.kr";
export const SITE_NAME = "GrowLab Studio";
export const SITE_TITLE = "GrowLab Studio | 브랜드 성장을 위한 홈페이지 제작 스튜디오";
export const SITE_DESCRIPTION =
  "GrowLab Studio는 전략 기획부터 디자인, 개발까지 브랜드의 성장을 위한 홈페이지를 제작하는 웹 스튜디오입니다.";

/**
 * 하위 페이지에서 openGraph/twitter를 따로 지정하면 루트의 opengraph-image·twitter-image가 상속되지 않으므로
 * 공유 미리보기 이미지가 빠지지 않도록 이 값을 함께 지정합니다. (이미지는 app/opengraph-image.tsx에서 생성)
 */
export const SHARE_IMAGE_ALT = "GrowLab Studio — 브랜드 성장을 위한 홈페이지 제작 스튜디오";
export const OG_IMAGES = [{ url: "/opengraph-image", width: 1200, height: 630, alt: SHARE_IMAGE_ALT }];
export const TWITTER_IMAGES = [{ url: "/twitter-image", width: 1200, height: 630, alt: SHARE_IMAGE_ALT }];
