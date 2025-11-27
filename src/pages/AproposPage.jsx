import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import HowItWork from "../components/HowItWork";
import Statistics from "../components/Statistics";
import BecomeProviderOne from "../components/BecomeProviderOne";
import Breadcrumbtwo from "../components/Breadcrumbtwo";
import FooterOne from "../components/FooterOne";
import Apropos from "../components/Apropos"

const AproposPage = () => {
  
  return (
    <section className="change-gradient">
    <Preloader />
    <HeaderOne />
  <Breadcrumbtwo />
    <Apropos />

    <FooterOne />
  </section>
  );
};

export default AproposPage;
