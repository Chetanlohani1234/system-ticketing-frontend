import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import AddCustomerDetail from "../section/home/customers/add-customer-detail";
import EditCustomerDetail from "../section/home/customers/edit-customer-detail";
import { useParams } from "react-router-dom"
const AddCustomer = () => {
  const params = useParams();
  React.useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
      {params?.id ?<EditCustomerDetail/>:<AddCustomerDetail />
          }     
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default AddCustomer;