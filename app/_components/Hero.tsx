import HeroSceneLoader from "./HeroSceneLoader";

export default function Hero() {
  return (
    <main className="flex flex-1 items-center justify-center w-full">
      <section className="grid md:grid-cols-2 items-center gap-12 md:gap-20 w-full max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex flex-col items-start text-left gap-8">
          <p className="text-sm tracking-wide text-zinc-600 dark:text-zinc-400">
            GROWLAB STUDIO
          </p>
          {/* 구절 단위로 줄을 나누고(block) break-keep으로 단어 중간 줄바꿈을 막습니다. */}
          <h1 className="text-[length:clamp(2.25rem,10vw,3rem)] sm:text-5xl lg:text-[56px] xl:text-6xl font-bold leading-[1.1] text-black dark:text-zinc-50 break-keep">
            <span className="block">브랜드를 이해하고,</span>
            <span className="block">목적에 맞는</span>
            <span className="block">홈페이지를 만듭니다.</span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed max-w-xl text-zinc-600 dark:text-zinc-400 break-keep">
            <span className="block">기업·브랜드 홈페이지부터 랜딩페이지까지.</span>
            <span className="block">기획, 디자인, 개발, 오픈을 함께합니다.</span>
          </p>
          {/* 1023px 이하: 버튼을 세로로 쌓아 문구가 두 줄로 깨지지 않게 함. 1024px 이상은 기존 가로 배치 */}
          <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:gap-4">
            <a href="#contact" className="px-8 py-4 text-lg rounded-xl bg-black text-white dark:bg-white dark:text-black whitespace-nowrap text-center">
              홈페이지 제작 문의하기
            </a>
            <a href="#portfolio" className="px-8 py-4 text-lg rounded-xl border border-black dark:border-white whitespace-nowrap text-center">
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
