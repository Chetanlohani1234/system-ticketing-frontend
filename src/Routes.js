import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import {HashRouter, Routes, Route } from "react-router-dom";
import Loginpage from "./pages/login";
import Dashboard from "./pages/dashboard";
import Otp from "./pages/otp";
//import ForgotPassword from "./pages/forgot-password";
//import AddProduct from "./pages/add-product";
//import Product from "./pages/products";
// import Orders from "./pages/orders";
import MasterCategory from "./pages/master-category";

// import ArtistCategory from "./pages/artist-category";
// import AddArtistCategory from "./pages/add-artist-category";

import AddMasterCategory from "./pages/add-master-category";
 import ViewMasterCategory from "./pages/view-master-category";
 import ViewSubCategory from "./pages/view-sub-category";
// import AddCategory from "./pages/add-category";
// import Categories from "./pages/categories";
import AddSubCategory from "./pages/add-sub-category";
import SubCategories from "./pages/sub-categories";
// import ViewCategory from "./pages/view-category";
// import Customers from "./pages/cutomers";
// import CustomerDetail from "./pages/customer-detail";
// import AddCustomer from "./pages/add-customer";
// import Vendor from "./pages/vendor";
// import ViewVendor from "./pages/view-vendor";
// import EditVendor from "./pages/edit-vendor";
// import AddVendor from "./pages/add-vendor";
import { RestrictedAccess } from "./private-component/RestrictedAccess";
// import Banner from "./pages/banner";
// import BannerDetails from "./pages/banner-details";
// import AddBanner from "./pages/add-banner";
// import EditBanner from "./pages/edit-banner";
// import Brand from "./pages/brand";
// import ViewBrand from "./pages/view-brand";
// import AddNewBrand from "./pages/add-new-brands";
// import Faq from "./pages/faq";
// import ViewFaq from "./pages/view-faq";
// import AddNewFaq from "./pages/add-new-faq";
// import AboutUs from "./pages/about-us";
// import PrivacyNotice from "./pages/privacy-notice";
// import RefundPolicy from "./pages/refund-policy";
// import TermsConditions from "./pages/terms-conditions";
// import Cookies from "./pages/cookies";
// import BecomeVendor from "./pages/become-vendor";
// import SignUpFields from "./pages/signup-field";
import MyProfile from "./pages/myprofile";
import EditProfile from "./pages/edit-profile";
import Notification from "./pages/notification";
//import SocialMediaAnalytics from "./pages/social-media-analytics";
//import Blogs from "./pages/blog";
//import AddBlog from "./pages/add-blog";
//import EditBlog from "./pages/edit-blog";
//import Invoice from "./pages/invoice";
//import InvoiceDetails from "./pages/invoice-details";
//import ViewProduct from "./pages/view-product";
//import ViewCamps from "./section/home/camps/view-camps";
import ViewReview from "./pages/review";
import ReviewDetails from "./pages/review-detail";
//import EditProduct from "./pages/edit-product";
//import SocialMediaLinks from './pages/social-media-links';
//import ContactUs from "./pages/contact-us";
//import NewsLetters from "./pages/newsletters";
import OrderDetails from "./pages/order-details";
import Forgot from "./pages/Forgot";
import Resetpassword from "./pages/reset-password";
import SingleReviewDetail from "./section/home/review/view-review";
import ProductReviews from "./section/home/review/product-reviews";

import AddTicket from "./pages/add-ticket";
import Ticket from "./pages/ticket";
import EditTicket from "./pages/edit-ticket";


import EditEvent from "./pages/edit-event";

//import ViewLesson from "./pages/view-lesson";
import Event from "./pages/Events";
//import ViewCamp from "./pages/view-camp";
import AddEvent from "./pages/add-event";

// import Artist from "./pages/artist";
// import ViewTrainer from "./pages/view-trainer";
// import EditTrainer from "./pages/edit-trainer";
// import AddArtist from "./pages/add-artist";
// import AddTimeSlot from "./pages/add-timeslot";
// import ViewTimeSlot from "./pages/view-timeslot";
// import EditTimeSlot from "./pages/edit-timeslot";
// import BookedTimeSlot from "./pages/booked-timeslot";
// import BookEvent from "./pages/book-event";



export default function App() {
    return (
      <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
        <Routes>
          <Route path="/" element={<Loginpage />}/>
            <Route exact path="/Login" element={<Loginpage />} />
            <Route exact path="/otp" element={<Otp />} />
            {/* <Route exact path="/forgot-password" element={<ForgotPassword />} /> */}
            <Route path="/forgot" element={<Forgot/>}/>
            <Route path="/reset-password/:token" element={<Resetpassword/>} /> 
            <Route element={<RestrictedAccess />}>

            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/add-event" element={<AddEvent />} />

            <Route exact path="/add-ticket" element={<AddTicket />} />
            <Route exact path="/ticket" element={<Ticket />} />
            <Route exact path="/edit-ticket/:id" element={<EditTicket />} />
            
            <Route exact path="/Events" element={<Event />} />
            <Route exact path="/edit-event/:id" element={<EditEvent />} />

            <Route exact path="/master-categories" element={<MasterCategory />} />
            <Route exact path="/add-master-categories" element={<AddMasterCategory />} />
            <Route exact path="/sub-categories" element={<SubCategories />} />
            <Route exact path="/add-sub-categories" element={<AddSubCategory />} />
            <Route exact path="/view-master-category-detail/:id" element={<ViewMasterCategory />} />
            <Route exact path="/edit-master-category-detail/:id" element={<ViewMasterCategory />} />
            <Route exact path="/edit-sub-category-detail/:id" element={<ViewSubCategory />} />
            <Route exact path="/view-sub-category-detail/:id" element={<ViewSubCategory />} />






            {/* <Route exact path="/add-product" element={<AddProduct />} />
            <Route exact path="/edit-product/:id" element={<EditProduct />} />
            <Route exact path="/products" element={<Product />} />
            <Route exact path="/view-product/:id" element={<ViewProduct />} />
            <Route exact path="/view-camps/:id" element={<ViewCamps />} /> */}
            

            
           
           
            {/* <Route exact path="/view-lesson/:id" element={<ViewLesson />} />
            
            
            
            <Route exact path="/view-camp/:id" element={<ViewCamp />} />
            <Route exact path="/book-event" element={<BookEvent />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/order-details/:id" element={<OrderDetails />} />
           
            <Route exact path="/artist-category" element={<ArtistCategory />} />
            <Route exact path="/add-artist-category" element={<AddArtistCategory />} />
            

            
           
            <Route exact path="/categories" element={<Categories />} />
            <Route exact path="/add-categories" element={<AddCategory />} />
          
            <Route exact path="/view-category-detail/:id" element={<ViewCategory />} />
            <Route exact path="/edit-category-detail/:id" element={<ViewCategory />} />
            
            <Route exact path="/customers" element={<Customers />} />
            <Route exact path="/view-customer/:id" element={<CustomerDetail />} />
            <Route exact path="/edit-customer/:id" element={<AddCustomer />} />
            <Route exact path="/add-customer" element={<AddCustomer />} />
            <Route exact path="/vendor" element={<Vendor />} />
            <Route exact path="/view-vendor/:id" element={<ViewVendor />} />
            <Route exact path="/edit-vendor/:id" element={<EditVendor />} />
            <Route exact path="/add-vendor" element={<AddVendor />} />
            <Route exact path="/artist" element={<Artist />} />
            <Route exact path="/view-trainer/:id" element={<ViewTrainer />} />
            <Route exact path="/edit-trainer/:id" element={<EditTrainer />} />
            <Route exact path="/add-artist" element={<AddArtist />} />
            <Route exact path="/add-timeslot" element={<AddTimeSlot />} />
            <Route exact path="/view-timeslot" element={<ViewTimeSlot />} />
            <Route exact path="/booked-timeslot" element={<BookedTimeSlot />} />
            <Route exact path="/edit-timeslot/:lessonId/:dateId" element={<EditTimeSlot />} /> */}






            {/* <Route exact path="/banner/:type" element={<Banner />} />            
            <Route exact path="/banner-details/:id" element={<BannerDetails />} />            
            <Route exact path="/add-banner-details/:type" element={<AddBanner />} /> 
            <Route exact path="/edit-banner-details/:id" element={<EditBanner />} />            
            <Route exact path="/brand" element={<Brand />} />            
            <Route exact path="/brand-details/:id" element={<ViewBrand />} />            
            <Route exact path="/add-brand" element={<AddNewBrand />} />  
            <Route exact path="/edit-brand/:id" element={<AddNewBrand />} />          
            <Route exact path="/faqs" element={<Faq />} />            
            <Route exact path="/faq-details/:id" element={<ViewFaq />} />            
            <Route exact path="/add-faq" element={<AddNewFaq />} />  
            <Route exact path="/edit-faq/:id" element={<AddNewFaq />} />          
            <Route exact path="/static-page/about-us" element={<AboutUs />} /> 
            <Route exact path="/static-page/contact-us" element={<ContactUs />} />            
            <Route exact path="/static-page/privacy-notice" element={<PrivacyNotice />} />          
            <Route exact path="/static-page/refund-policy" element={<RefundPolicy />} />          
            <Route exact path="/static-page/terms-conditions" element={<TermsConditions />} />          
            <Route exact path="/static-page/cookies" element={<Cookies />} />          
            <Route exact path="/static-page/become-vendor" element={<BecomeVendor />} />          
            <Route exact path="/sign-up-fields" element={<SignUpFields />} />           */}
            <Route exact path="/my-profile" element={<MyProfile />} />          
            <Route exact path="/edit-profile/:id" element={<MyProfile />} />          
            <Route exact path="/notification" element={<Notification />} />          
            {/* <Route exact path="/social-media-analytics" element={<SocialMediaAnalytics />} />          
            <Route exact path="/blogs" element={<Blogs />} />          
            <Route exact path="/add-blog" element={<AddBlog />} />  
            <Route exact path="/edit-blog/:id" element={<EditBlog />} />          
            <Route exact path="/invoice" element={<Invoice />} />          
            <Route exact path="/invoice-details/:id" element={<InvoiceDetails />} />            */}
            <Route exact path="/review" element={<ViewReview />} />          
            <Route exact path="/review-details" element={<ReviewDetails />} />
            <Route exact path="/review-details" element={<ReviewDetails />} /> 
            {/* <Route exact path="/social-media-links" element={<SocialMediaLinks />} />  
            <Route exact path="/newsletters" element={<NewsLetters />} />          */}
            <Route path="/order-details/:id" element={<OrderDetails/>}/> 
            <Route path="/view-review/:id" element={<SingleReviewDetail/>}/>
            <Route path="/product-reviews/:id" element={<ProductReviews/>}/>

          </Route>

        </Routes>
      </HashRouter>
    );
  }