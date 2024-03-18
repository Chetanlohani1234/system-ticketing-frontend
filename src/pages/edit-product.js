import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import EditProductSection from "../section/home/products/edit-product-section";
const EditProduct = () => {
    return (
        <div className="bg-grey h-100">
            <Header />
            <section className="content-area mt-4">
                <Sidebar />
                <div className="Right-content">
                    <div className="main-content">
                        <EditProductSection />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default EditProduct;