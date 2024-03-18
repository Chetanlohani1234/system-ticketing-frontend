import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import AddBrandDetail from "../section/home/brand/add-brand-detail";
import EditBrandDetail from "../section/home/brand/edit-brand-detail";
import { useParams } from "react-router-dom";
const AddNewBrand = () => {
  const params = useParams();
  React.useEffect(() => {
    document.title = "Add Brand";
  }, []);

  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
      {params?.id ?<EditBrandDetail/>:<AddBrandDetail />
          }    
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default AddNewBrand;