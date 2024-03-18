import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import InvioceListing from "../section/home/invoice/invoice-list";
const Invoice = () => {
    React.useEffect(() => {
        document.title = "Invoice list";
    }, []);

    return (
        <div className="bg-grey h-100">
            <Header />
            <section className="content-area mt-4">
                <Sidebar />
                <div className="Right-content">
                    <div className="main-content">
                        <InvioceListing />
                    </div>
                    <Footer />
                </div>
            </section>
        </div>
    );
};

export default Invoice;