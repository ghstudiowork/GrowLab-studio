import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full py-6 bg-zinc-50/80 dark:bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold tracking-wide text-black dark:text-zinc-50">
          GROWLAB STUDIO
        </p>
        <ul className="flex flex-wrap gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <li><Link href="/#services">서비스</Link></li>
          <li><Link href="/#process">프로세스</Link></li>
          <li><Link href="/portfolio">포트폴리오</Link></li>
          <li><Link href="/#pricing">요금제</Link></li>
          <li><Link href="/#contact">문의하기</Link></li>
        </ul>
      </div>
    </nav>
  );
}
