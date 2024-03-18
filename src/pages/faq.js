import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import FaqList from "../section/home/faq/faq-list";
const Faq = () => {
  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
      <FaqList/>   
      
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default Faq;