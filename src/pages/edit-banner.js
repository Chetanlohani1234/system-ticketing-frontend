import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import EditBanerDetail from "../section/home/banner/edit-banner";
const EditBanner = () => {
  React.useEffect(() => {
    document.title = "Edit banner";
  }, []);

  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
        <EditBanerDetail/>
    
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default EditBanner;