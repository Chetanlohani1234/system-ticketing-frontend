import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import EditVendorDetail from "../section/home/vendor/edit-vendor-detail";
const EditVendor = () => {
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
            <EditVendorDetail />

            <edit />

          </div>
          <Footer />
        </div>
      </section>


    </div>
  );
};

export default EditVendor;