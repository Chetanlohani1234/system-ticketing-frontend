import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import ViewFaqDetail from "../section/home/faq/view-faq-detail";
const ViewFaq = () => {
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
    
   <ViewFaqDetail/>
    
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default ViewFaq;