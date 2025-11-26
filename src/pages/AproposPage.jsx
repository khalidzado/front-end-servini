import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import HowItWork from "../components/HowItWork";
import Statistics from "../components/Statistics";
import BecomeProviderOne from "../components/BecomeProviderOne";
import FooterOne from "../components/FooterOne";

const AproposPage = () => {
  
  return (
    <section className="change-gradient">
    <Preloader />

    <HeaderOne />

    <HowItWork />

    <Statistics />

    <BecomeProviderOne />

    <FooterOne />
  </section>
  );
};

export default AproposPage;
