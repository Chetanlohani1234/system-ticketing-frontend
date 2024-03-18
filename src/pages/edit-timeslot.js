import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import EditTrainerTimeSlot from "../section/home/trainer/edit-trainer-timeslot";

const EditTimeSlot = () => {
  React.useEffect(() => {
    document.title = "Vendor detail";
  }, []);

  return (
    <div className="bg-grey h-100">
      <Header />

      <section className="content-area mt-4">
        <Sidebar />
        <div className="Right-content">
          <div className="main-content">
            <EditTrainerTimeSlot />

            <edit />

          </div>
          <Footer />
        </div>
      </section>


    </div>
  );
};

export default EditTimeSlot;