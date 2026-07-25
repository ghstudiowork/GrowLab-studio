export default function Navbar() {
  return (
    <nav className="w-full py-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold tracking-wide text-black dark:text-zinc-50">
          GROWLAB STUDIO
        </p>
        <ul className="flex flex-wrap gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <li><a href="#services">서비스</a></li>
          <li><a href="#process">프로세스</a></li>
          <li><a href="#portfolio">포트폴리오</a></li>
          <li><a href="#contact">문의하기</a></li>
        </ul>
      </div>
    </nav>
  );
}
