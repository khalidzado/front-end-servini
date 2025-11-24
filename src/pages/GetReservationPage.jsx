import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import BreadcrumbThree from "../components/BreadcrumbThree";
import Reservation from "../components/Reservation";


const GetReservationPage = () => {

  return (

    <>
      <Preloader />

      <HeaderOne />

      <BreadcrumbThree />

      <Reservation />

      <FooterOne />
    </>
  );
};

export default GetReservationPage;
