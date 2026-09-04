import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import WhyChooseUs from "./_components/WhyChooseUs";
import Services from "./_components/Services";
import Process from "./_components/Process";
import Portfolio from "./_components/Portfolio";
import Pricing from "./_components/Pricing";
import Faq from "./_components/Faq";
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
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Services />
      <Process />
      <Portfolio />
      <Pricing />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}
