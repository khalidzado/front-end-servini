import React from "react";
import Preloader from "../helper/Preloader";
import MasterLayout from "../layout/MasterLayout";
import DashboardInner from "../components/DashboardInner";
const DashboardPage = () => {

  return (

    <>
      <MasterLayout>

        <Preloader />

        <DashboardInner />

      </MasterLayout>

    </>
  );
};

export default DashboardPage;
