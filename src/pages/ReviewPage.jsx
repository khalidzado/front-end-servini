import React from "react";
import Preloader from "../helper/Preloader";
import MasterLayout from "../layout/MasterLayout";
import DashboardReview from "../components/DashboardReview";
const ReviewPage = () => {

  return (

    <>
      <MasterLayout>

        <Preloader />

        <DashboardReview />

      </MasterLayout>

    </>
  );
};

export default ReviewPage;
