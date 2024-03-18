import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import ContactUsContent from "../section/home/static-pages/contact-us-content";
const ContactUs = () => {
  React.useEffect(() => {
    document.title = "Contact us";
  }, []);

  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
    <ContactUsContent/>
    
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default ContactUs;