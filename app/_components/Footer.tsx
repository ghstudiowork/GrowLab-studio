export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-black dark:text-zinc-50">
            GrowLab Studio
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            브랜드의 성장을 위한 홈페이지를 제작합니다.
          </p>
        </div>
        <div>
          <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Services</li>
            <li>Portfolio</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-12">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © 2026 GrowLab Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
