import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import AddFaqDetail from "../section/home/faq/add-faq-detail";
import EditFaqDetail from "../section/home/faq/edit-faq-detail";
import { useParams } from "react-router-dom";
const AddNewFaq = () => {
  const params = useParams();
  React.useEffect(() => {
    document.title = "Add Faq";
  }, []);

  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
      {params?.id ?<EditFaqDetail/>:<AddFaqDetail />
          }    
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default AddNewFaq;