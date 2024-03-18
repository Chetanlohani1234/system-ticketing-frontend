import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import AboutUsContent from "../section/home/static-pages/about-us-content";
const AboutUs = () => {
  React.useEffect(() => {
    document.title = "About us";
  }, []);

  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
    <AboutUsContent/>
    
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default AboutUs;