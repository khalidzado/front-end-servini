import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import BannerOne from "../components/BannerOne";
import ServicesSection from "../components/ServicesSection";
import SectionOne from "../components/SectionOne";
import HowItWork from "../components/HowItWork";
import Statistics from "../components/Statistics";
import BecomeProviderOne from "../components/BecomeProviderOne";
import FooterOne from "../components/FooterOne";

const HomePage = () => {
  
  return (
    <section className="change-gradient">
    <Preloader />

    <HeaderOne />

    <BannerOne />

    <ServicesSection />

    <SectionOne />

    <HowItWork />

    <Statistics />

    <BecomeProviderOne />

    <FooterOne />
  </section>
  );
};

export default HomePage;
