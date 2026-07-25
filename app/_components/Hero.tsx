import HeroSceneLoader from "./HeroSceneLoader";

export default function Hero() {
  return (
    <main className="flex flex-1 items-center justify-center w-full">
      <section className="grid md:grid-cols-2 items-center gap-12 md:gap-20 w-full max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex flex-col items-start text-left gap-8">
          <p className="text-sm tracking-wide text-zinc-600 dark:text-zinc-400">
            GROWLAB STUDIO
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black dark:text-zinc-50">
            홈페이지 하나가
            <br />
            비즈니스를 성장시킵니다.
          </h1>
          <p className="text-xl leading-relaxed max-w-xl text-zinc-600 dark:text-zinc-400">
            브랜드의 첫인상을 바꾸고,
            <br />
            고객의 신뢰를 만드는 홈페이지를 제작합니다.
          </p>
          <div className="flex gap-4">
            <a href="#contact" className="px-8 py-4 text-lg rounded-xl bg-black text-white dark:bg-white dark:text-black">
              무료 상담하기
            </a>
            <a href="#portfolio" className="px-8 py-4 text-lg rounded-xl border border-black dark:border-white">
              포트폴리오 보기
            </a>
          </div>
        </div>
        <div className="hidden md:block md:h-[460px] lg:h-[560px] relative">
          <HeroSceneLoader />
        </div>
      </section>
    </main>
  );
}
