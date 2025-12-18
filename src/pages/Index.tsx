import Header from "@/components/Header";
import Hero from "@/components/Hero";

import About from "@/components/About";
import WorkStages from "@/components/WorkStages";
import Services from "@/components/Services";
import GoogleAdsCTA from "@/components/GoogleAdsCTA";
import GoogleAdsResults from "@/components/GoogleAdsResults";
import WorkingPrinciples from "@/components/WorkingPrinciples";
import Portfolio from "@/components/Portfolio";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsAndFAQ from "@/components/StatsAndFAQ";
import Blog from "@/components/Blog";
import { Helmet } from "react-helmet";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>PIXEL - شركة بيكسل للتسويق الإلكتروني | Digital Marketing</title>
        <meta name="description" content="شركة بيكسل الرائدة في التسويق الإلكتروني وتصميم المواقع والمتاجر الإلكترونية. نقدم خدمات SEO، إعلانات جوجل، وتسويق السوشيال ميديا بأعلى جودة في مصر والوطن العربي." />
        <meta name="keywords" content="تسويق إلكتروني, تصميم مواقع, SEO, إعلانات جوجل, سوشيال ميديا, PIXEL, بيكسل" />
        <link rel="canonical" href="https://pixelmarketng.com/" />
        <meta property="og:url" content="https://pixelmarketng.com/" />
      </Helmet>
      <Header />
      <Hero />
      <About />
      <WorkStages />
      <Services />
      <GoogleAdsCTA />
      <GoogleAdsResults />
      <WorkingPrinciples />
      <Portfolio />
      <WhyChooseUs />
      <StatsAndFAQ />
      <Blog />
      <GlobalCTA />
      <Footer />
    </div>
  );
};

export default Index;
