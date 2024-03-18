import React, { useEffect, useState, useRef } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import ViewCategotyDetail from "../section/home/categories/view-category-detail";
import EditCategory from "../section/home/categories/edit-category";
const ViewCategory = () => {
  const [viewPage, setViewPage]= useState(false)
  React.useEffect(() => {
    document.title = "Category detail";
    const url = window.location.href
    if(url.includes('view')){
      setViewPage(true)
    }
  }, [viewPage]);

  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
      {viewPage?<ViewCategotyDetail/>:""} 
      {!viewPage?<EditCategory/>:""} 
    <edit/>
    
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default ViewCategory;