import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import BreadcrumbFive from "../components/BreadcrumbFive";
import Contact from "../components/Contact";
const ContactPage = () => {

  return (
    <>
      <Preloader />

      <HeaderOne />

      <BreadcrumbFive />

      <Contact />

      <FooterOne />
    </>
  );
};

export default ContactPage;
