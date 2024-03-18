import React, { useEffect, useState, useRef } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import ViewSubCategotyDetail from "../section/home/categories/view-sub-category-detail";
import EditSubCategory from "../section/home/categories/edit-sub-category";
const ViewSubCategory = () => {
  const [viewPage, setViewPage]= useState(false)
  React.useEffect(() => {
    document.title = "Sub ategory detail";
    const url = window.location.href
    if(url.includes('view-sub')){
      setViewPage(true)
    }
    console.log(url)
  }, [viewPage]);

  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
   {viewPage?<ViewSubCategotyDetail/>:""} 
   {!viewPage?<EditSubCategory/>:""} 
    
    <edit/>
    
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default ViewSubCategory;