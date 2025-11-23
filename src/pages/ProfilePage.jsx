import React from "react";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import BreadcrumbFour from "../components/BreadcrumbFour";
import Profile from "../components/Profile";

const ProfilePage = () => {

  return (

    <>
      <Preloader />

      <HeaderOne />

      <BreadcrumbFour />

      <Profile />

      <FooterOne />
    </>
  );
};

export default ProfilePage;
