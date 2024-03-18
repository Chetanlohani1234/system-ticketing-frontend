import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import AllOrders from "../section/home/all-orders";
import MyProfileBanner from "../section/home/my-profile/my-profile-banner";
import MyProfileDetail from "../section/home/my-profile/my-profile-detail";
import SocialMediaAnalyticsBanner from "../section/home/social-media-analytics/social-media-analytics-banner";
import AnalyticsList from "../section/home/social-media-analytics/analytics";
const SocialMediaAnalytics = () => {
  React.useEffect(() => {
    document.title = "Social media analytics";
  }, []);

  return (
    <div className="bg-grey h-100">
      <Header />
      <section className="content-area mt-4">
        <Sidebar />
        <div className="Right-content">
        <SocialMediaAnalyticsBanner/>
          <div className="main-content">
           <AnalyticsList/>
          </div>
          <Footer />
        </div>
      </section>


    </div>
  );
};

export default SocialMediaAnalytics;