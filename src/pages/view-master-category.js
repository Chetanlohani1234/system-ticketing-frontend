import React, { useEffect, useState, useRef } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import ViewMasterCategotyDetail from "../section/home/categories/View-master-category-detail";
import EditMasterCategory from "../section/home/categories/edit-master-category";
const ViewMasterCategory = () => {
  const [viewPage, setViewPage]= useState(false)
  React.useEffect(() => {
    document.title = "Master category detail";
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
      {viewPage?<ViewMasterCategotyDetail/>:""} 
   {!viewPage?<EditMasterCategory/>:""}     
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default ViewMasterCategory;