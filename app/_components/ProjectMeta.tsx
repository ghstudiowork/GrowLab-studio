import { PROJECT_TYPE_LABEL, type PortfolioProject } from "../lib/portfolio";

/**
 * 프로젝트 성격(CONCEPT / CLIENT PROJECT)과 실제 수행 역할을 한 줄로 표시합니다.
 * 메인 캐러셀 카드와 /portfolio 목록에서 함께 사용합니다.
 */
export default function ProjectMeta({
  project,
  className = "",
}: {
  project: PortfolioProject;
  className?: string;
}) {
  const roles = project.roles.join(" · ");

  return (
    <span
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400 ${className}`}
    >
      <span className="whitespace-nowrap rounded-full border border-zinc-300 px-2 py-0.5 leading-none dark:border-zinc-700">
        {PROJECT_TYPE_LABEL[project.projectType]}
      </span>
      {roles && <span className="whitespace-nowrap normal-case tracking-normal">{roles}</span>}
    </span>
  );
}
