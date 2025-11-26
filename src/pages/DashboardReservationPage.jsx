import React from "react";
import Preloader from "../helper/Preloader";
import MasterLayout from "../layout/MasterLayout";
import DashboardReservation from "../components/DashboardReservation";


const DashboardReservationPage = () => {

  return (

    <>
      <MasterLayout>
        
        <Preloader />

        <DashboardReservation/>

      </MasterLayout>

    </>
  );
};

export default DashboardReservationPage;
