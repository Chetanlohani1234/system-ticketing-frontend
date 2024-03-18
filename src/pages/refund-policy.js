import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import RefundPolicyContent from "../section/home/static-pages/refunds-policy-content";
const RefundPolicy = () => {
    React.useEffect(() => {
        document.title = "Returns and Refunds Policy";
    }, []);

    return (
        <div className="bg-grey h-100">
            <Header />
            <section className="content-area mt-4">
                <Sidebar />
                <div className="Right-content">
                    <div className="main-content">
                        <RefundPolicyContent />
                    </div>
                    <Footer />
                </div>
            </section>
        </div>
    );
};

export default RefundPolicy;