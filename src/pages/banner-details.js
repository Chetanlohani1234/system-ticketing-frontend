import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import ViewBannerDetail from "../section/home/banner/view-banner-details";
const BannerDetails = () => {
  React.useEffect(() => {
    document.title = "Brand detail";
  }, []);

  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
      <ViewBannerDetail/>   
      
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default BannerDetails;