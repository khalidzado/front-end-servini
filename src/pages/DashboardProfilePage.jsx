import React from "react";
import Preloader from "../helper/Preloader";
import MasterLayout from "../layout/MasterLayout";
import ProfileInner from "../components/ProfileInner";
const DashboardProfilePage = () => {

  return (

    <>
      <MasterLayout>

        <Preloader />

        <ProfileInner />

      </MasterLayout>

    </>
  );
};

export default DashboardProfilePage;
