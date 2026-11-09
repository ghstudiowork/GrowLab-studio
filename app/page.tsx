import Navbar from "./_components/Navbar";
import IntroStack from "./_components/IntroStack";
import Benefit from "./_components/Benefit";
import Difference from "./_components/Difference";
import Process from "./_components/Process";
import Portfolio from "./_components/Portfolio";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";
import { SITE_NAME, SITE_URL } from "./lib/seo";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar variant="home" />
      <IntroStack />
      <Benefit />
      <Difference />
      <Process />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}
