import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import TermsConditionsContent from "../section/home/static-pages/terms-conditions-content";
const TermsConditions = () => {
    React.useEffect(() => {
        document.title = "Terms and conditions";
    }, []);

    return (
        <div className="bg-grey h-100">
            <Header />
            <section className="content-area mt-4">
                <Sidebar />
                <div className="Right-content">
                    <div className="main-content">
                        <TermsConditionsContent/>
                    </div>
                    <Footer />
                </div>
            </section>
        </div>
    );
};

export default TermsConditions;