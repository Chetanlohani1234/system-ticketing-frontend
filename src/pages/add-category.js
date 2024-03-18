import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import AddCategorySection from "../section/home/categories/add-category";
const AddMasterCategory = () => {
  React.useEffect(() => {
    document.title = "Add Category";
  }, []);

  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
      <AddCategorySection/>
    
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default AddMasterCategory;