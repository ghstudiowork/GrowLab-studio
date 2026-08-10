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

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
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
