import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import ViewCustomer from "../section/home/customers/view-customer";
import PreviousOrder from "../section/home/customers/previous-order";
const CustomerDetail = () => {
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
      <ViewCustomer/>
    <PreviousOrder/>
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default CustomerDetail;