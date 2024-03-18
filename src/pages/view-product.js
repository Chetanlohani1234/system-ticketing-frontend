import React, { useEffect, useState, useRef } from "react";
import DataService from "../services/data.service";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import ViewProductDetails from "../section/home/products/view-product-detail";
import 'react-toastify/dist/ReactToastify.css'
const ViewProduct = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    React.useEffect(() => {
        document.title = "View product";
        getProduct();
    },[]);
    const getProduct = async (categoryData)=>{
        await DataService.getProductDetail(params.id).then((data) => {
            setLoading(false);
            const productData = data.data.data;
            setProduct(productData)
            
        }).catch((error)=>{
            const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            toast.error(resMessage, {
                position: toast.POSITION.TOP_RIGHT
            });
            setLoading(false);
        })
       
    }
    return (
        <div className="bg-grey h-100">
            <Header />

            <section className="content-area mt-4">
                <Sidebar />
                <div className="Right-content">
                    <div className="main-content">
                    <ToastContainer></ToastContainer>
                    {!loading?
                        <ViewProductDetails data={product} />
                        : <span className="spinner-border spinner-border-sm"></span>
                    }
                        

                        <edit />

                    </div>
                    <Footer />
                </div>
            </section>


        </div>
    );
};

export default ViewProduct;