import React, {useEffect, useState, useRef } from "react";
import DataService from "../services/data.service"
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import AllOrders from "../section/home/all-orders";
import NotificationSection from "../section/home/notification-section";
const Notification = () => {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const storedUserId = JSON.parse(localStorage.getItem("userId"));

  React.useEffect(() => {
    document.title = "Notifications";
    getData();
  }, []);

  const getData = async ()=>{
      setLoading(true)
        await DataService.getNotifications(storedUserId).then((data) => {
            setLoading(false);
            const response = data?.data?.data
            setData(data?.data?.data)
           
      }).catch((error)=>{
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.msg) ||
            error.message ||
            error.toString();
            setLoading(false);
      })
  }
  return (
    <div className="bg-grey h-100">
      <Header />
      
<section className="content-area mt-4">
    <Sidebar/>
    <div className="Right-content">
      <div className="main-content">
        {loading ?
              <div className="col-lg-6 m-auto">
              {loading && (
                  <div className="main_spinner">
               </div>
              )}
              </div>
              :
            <NotificationSection data={data}/>
          }  
      </div> 
      <Footer />
    </div>
</section>
      
     
    </div>
  );
};

export default Notification;