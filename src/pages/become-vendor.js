import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import TermsConditionsContent from "../section/home/static-pages/terms-conditions-content";
import CookiesContent from "../section/home/static-pages/cookies-content";
import BecomeVendorContent from "../section/home/static-pages/become-vendor-content";
const BecomeVendor = () => {
    React.useEffect(() => {
        document.title = "Become Vendor";
    }, []);

    return (
        <div className="bg-grey h-100">
            <Header />
            <section className="content-area mt-4">
                <Sidebar />
                <div className="Right-content">
                    <div className="main-content">
                        <BecomeVendorContent />
                    </div>
                    <Footer />
                </div>
            </section>
        </div>
    );
};

export default BecomeVendor;