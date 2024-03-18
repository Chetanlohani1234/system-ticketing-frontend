import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";

import TrainerList from "../section/home/trainer/trainer-list";
const Artist = () => {
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
      <TrainerList/>
    
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default Artist;