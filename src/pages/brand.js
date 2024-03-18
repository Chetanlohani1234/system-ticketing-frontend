import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import BrandList from "../section/home/brand/brand-list";
const Brand = () => {
  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
      <BrandList/>   
      
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default Brand;