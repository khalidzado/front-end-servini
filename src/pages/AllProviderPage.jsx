import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import AllProviders from "../components/AllProviders";
import FooterOne from "../components/FooterOne";



const AllProviderPage = () => {

  return (

    <>
      <Preloader />

      <HeaderOne />

      <Breadcrumb />

      <AllProviders />

      <FooterOne />
    </>
  );
};

export default AllProviderPage;
