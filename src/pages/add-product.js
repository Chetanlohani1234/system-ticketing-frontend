import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import AddProductSection from "../section/home/products/add-product-section";
const AddProduct = () => {
    React.useEffect(() => {
        document.title = "Dashboard";
    }, []);

    return (
        <div className="bg-grey h-100">
            <Header />

            <section className="content-area mt-4">
                <Sidebar />

                <div className="Right-content">
                    <div className="main-content">
                        <AddProductSection />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AddProduct;