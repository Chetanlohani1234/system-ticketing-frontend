import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import ViewBrandDetail from "../section/home/brand/view-brand-detail";
const ViewBrand = () => {
  React.useEffect(() => {
    document.title = "View brand";
  }, []);

  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
    
   <ViewBrandDetail/>
    
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default ViewBrand;