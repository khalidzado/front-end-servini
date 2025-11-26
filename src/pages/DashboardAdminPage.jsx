import React from "react";
import Preloader from "../helper/Preloader";
import MasterLayoutv2 from "../layout/MasterLayoutv2";
import DashboardAdmin from "../components/DashboardAdmin";
const DashboardAdminPage = () => {

  return (

    <>
      <MasterLayoutv2>

        <Preloader />

        <DashboardAdmin />

      </MasterLayoutv2>

    </>
  );
};

export default DashboardAdminPage;
