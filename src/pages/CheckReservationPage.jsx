import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import CheckReservation from "../components/CheckReservation";

const CheckReservationPage = () => {

  return (

    <>
      <Preloader />

      <HeaderOne />

      <CheckReservation/>

      <FooterOne />
    </>
  );
};

export default CheckReservationPage;
