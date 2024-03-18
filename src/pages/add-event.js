import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";

import AddCampSection from "../section/home/camps/add-camp-section";
const AddEvent = () => {
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
                        <AddCampSection />
                        <Footer />
                    </div>
                </div>
            </section>

           
        </div>
    );
};

export default AddEvent;