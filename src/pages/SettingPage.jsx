import React from "react";
import Preloader from "../helper/Preloader";
import MasterLayout from "../layout/MasterLayout";
import DashboardSetting from "../components/DashboardSetting";
const SettingPage = () => {

  return (

    <>
      <MasterLayout>

        <Preloader />

        <DashboardSetting />

      </MasterLayout>

    </>
  );
};

export default SettingPage;
