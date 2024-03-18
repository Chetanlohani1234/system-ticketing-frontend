import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import DataService from "../services/data.service";
import HelperService  from "../services/helper.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns'
import html2pdf from 'html2pdf.js';
import Header from "../common/Header";
import Footer from "../common/Footer";
import Sidebar from "../common/sidebar";



const InvoiceDetails = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        document.title = "Invoice Details"
        getData()
    }, []);
    const getData = async() => {
        setLoading(true);
        await DataService.getOrderDetail(params.id).then((data) => {
            setData(data?.data?.data);
            setLoading(false);
        }).catch((error)=>{
            const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                toast.error(resMessage, {
                    position: toast.POSITION.TOP_RIGHT
                });
        });
        
    }

    const downloadInv = (e) => {
        var element = document.getElementById('invoice_details_wrap');
        html2pdf().set({ margin: 3, filename: 'order.pdf', html2canvas:  { scale: 2 }}).from(element).save();
    }
    return (
        <div className="bg-grey h-100">
            <Header />
            <section className="content-area mt-4">
                <Sidebar />
                <div className="Right-content">
                    <div className="main-content">
                    <div className="container p-4 mb-5">
        <ToastContainer></ToastContainer>
        <div className="row">
        <div className="col-6  mt-4">
            <h2>Invoice Details</h2>
        </div>
        <div className="col-6 text-end mt-4">
            <button className="btn btn-primary" onClick={(e) => downloadInv(e)}>Download</button>
        </div>
        </div>
        <div className="row" id="invoice_details_wrap">

            {!loading?
            <>
            <div id="invoice_details">
                <div className="row py-4"><div className="col-xl-4 col-lg-4 col-md-6 mb-md-3">
                    <div className="bg-grey align-items-center justify-content-between d-flex p-4 py-5" style={{borderRadius: '5px',background:'#F6F5FA'}}>
                                <div className="pe-2">
                                    <h4>Billing Address</h4>
                                    <h6>
                                        {data?.BillingAddress?.first_name} {data?.BillingAddress?.last_name},<br></br>
                                        {data?.BillingAddress?.address},<br></br>
                                        {data?.BillingAddress?.city}, {data?.BillingAddress?.region} {data?.BillingAddress?.landmark ? "("+data?.BillingAddress?.landmark+")" : ""}<br></br>
                                        {data?.BillingAddress?.phone}
                                        <br></br>
                                    </h6>
                                </div>
                                <i>
                                <svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg" className="order-detail-svg">
                                        <path d="M113.335 45.3333H90.668C87.268 45.3333 85.0013 47.5999 85.0013 50.9999V90.6666H56.668V96.3333C56.668 99.7333 58.9346 102 62.3346 102H90.668C90.668 95.7666 95.768 90.6666 102.001 90.6666C108.235 90.6666 113.335 95.7666 113.335 102H119.001C122.401 102 124.668 99.7333 124.668 96.3333V73.6666L113.335 45.3333Z" fill="black" />
                                        <path opacity="0.3" d="M113.332 102C113.332 108.233 108.232 113.333 101.999 113.333C95.7654 113.333 90.6654 108.233 90.6654 102C90.6654 95.7667 95.7654 90.6667 101.999 90.6667C108.232 90.6667 113.332 95.7667 113.332 102ZM84.9987 22.6667C84.9987 19.2667 82.732 17 79.332 17H16.9987C13.5987 17 11.332 19.2667 11.332 22.6667V73.6667C11.332 77.0667 13.5987 79.3333 16.9987 79.3333H84.9987V22.6667ZM33.9987 90.6667C27.7654 90.6667 22.6654 95.7667 22.6654 102C22.6654 108.233 27.7654 113.333 33.9987 113.333C40.232 113.333 45.332 108.233 45.332 102C45.332 95.7667 40.232 90.6667 33.9987 90.6667Z" fill="#F4AC3D" />
                                    </svg>

                                </i>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                        <div className="bg-grey align-items-center justify-content-between d-flex p-4 py-5" style={{borderRadius: '5px',background:'#F6F5FA'}}>
                                <div className="pe-2">
                                    <h4>Shipping Address</h4>
                                    <h6>
                                        {data?.Address?.first_name} {data?.Address?.last_name},<br></br>
                                        {data?.Address?.address},<br></br>
                                        {data?.Address?.city}, {data?.Address?.region} {data?.Address?.landmark ? "("+data?.Address?.landmark+")" : ""}<br></br>
                                        {data?.Address?.phone}
                                        <br></br>
                                    </h6>
                                </div>
                                <i>
                                    <svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg" className="order-detail-svg">
                                        <path d="M113.335 45.3333H90.668C87.268 45.3333 85.0013 47.5999 85.0013 50.9999V90.6666H56.668V96.3333C56.668 99.7333 58.9346 102 62.3346 102H90.668C90.668 95.7666 95.768 90.6666 102.001 90.6666C108.235 90.6666 113.335 95.7666 113.335 102H119.001C122.401 102 124.668 99.7333 124.668 96.3333V73.6666L113.335 45.3333Z" fill="black" />
                                        <path opacity="0.3" d="M113.332 102C113.332 108.233 108.232 113.333 101.999 113.333C95.7654 113.333 90.6654 108.233 90.6654 102C90.6654 95.7667 95.7654 90.6667 101.999 90.6667C108.232 90.6667 113.332 95.7667 113.332 102ZM84.9987 22.6667C84.9987 19.2667 82.732 17 79.332 17H16.9987C13.5987 17 11.332 19.2667 11.332 22.6667V73.6667C11.332 77.0667 13.5987 79.3333 16.9987 79.3333H84.9987V22.6667ZM33.9987 90.6667C27.7654 90.6667 22.6654 95.7667 22.6654 102C22.6654 108.233 27.7654 113.333 33.9987 113.333C40.232 113.333 45.332 108.233 45.332 102C45.332 95.7667 40.232 90.6667 33.9987 90.6667Z" fill="#F4AC3D" />
                                    </svg>


                                </i>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                        <div className="bg-grey p-4 rounded-2" style={{borderRadius: '5px',background:'#F6F5FA'}}>
                            <h4 className="f-700">Order Details (#A5{data.id})</h4>
                            <div className="w-100 d-flex justify-content-between align-items-center border-bottom py-2">
                                <span><i className="me-2"> 
                                <img src="../assets/img/file-earmark-text.png"/>
                                </i> Invoice Id</span>
                                <span><h6>#A5{data.id}</h6></span>
                            </div>
                            <div className="w-100 d-flex justify-content-between align-items-center border-bottom py-2">
                                <span><i className="me-2"> <img src="../assets/img/truck.png"/>

                                </i> Payment Method</span>
                                <span><h6>{data?.payment_method}</h6></span>
                            </div>

                            <div className="w-100 d-flex justify-content-between align-items-center py-2">
                                <span><i className="me-2">
                                <img src="../assets/img/order_bag.png"/>

                                </i> Order Id</span>
                                <span><h6>#{data?.id}</h6></span>
                            </div>
                            <div className="w-100 d-flex justify-content-between align-items-center py-2">
                                <span>
                                <i className="me-2">
                                    <img src="../assets/img/file-earmark-text.png" />
                                </i>{" "}
                                Status
                                </span>
                                <span>
                                <h6>{HelperService.orderStatus()[data.status] }</h6>
                                </span>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-12 mt-5">
                    <table class="table table-striped invoice-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">SKU</th>
                                        <th scope="col">QTY</th>
                                        <th scope="col" className="text-end">UNIT PRICE</th>
                                        <th scope="col" className="text-end">PRICE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.OrderItems && data?.OrderItems.length > 0 ?
                                        data?.OrderItems?.map((item, i) => (
                                            <tr style={{textDecoration: (item.status == 'inactive' ? 'line-through' : '')}}>
                                                <td className="d-flex align-items-center">
                                                    <div><p className="mb-0">{item?.Product?.name}{(item?.variant ? " - "+item?.variant : "")}</p>
                                                    </div>
                                                </td>
                                                <td>{item?.Product?.sku}</td>
                                                <td>{item.quantity}</td>
                                                <td className="text-end">{item?.price.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</td>
                                                <td><h6 className="mb-0 text-end text-dark-grey">{item.quantity*item.price}</h6></td>
                                            </tr>
                                        )) : ""}
                                    <tr>
                                        <td colSpan="4" className="text-end">Subtotal</td>
                                        <td><h6 className="mb-0 text-end text-dark-grey ">KSh. {data.item_amount}</h6></td>
                                    </tr>
                                    {/* <tr>
                                        <td colSpan="4" className="text-end">VAT</td>
                                        <td><h6 className="mb-0 text-end text-dark-grey ">KSh. {data.tax_amount}</h6></td>
                                    </tr> */}
                                    <tr>
                                        <td colSpan="4" className="text-end">Shipping Charges</td>
                                        <td><h6 className="mb-0 text-end text-dark-grey ">{data.shipping_amount > 0 ? "KSh."+ data.shipping_amount.toLocaleString(navigator.language, { minimumFractionDigits: 2 }) : "Free"}</h6></td>
                                    </tr>
                                    {data.cancel_amount > 0 && 
                                    <tr>
                                        <td colSpan="4" className="text-end">Refund</td>
                                        <td><h6 className="mb-0 text-end text-dark-grey ">KSh. {data.cancel_amount}</h6></td>
                                    </tr>
                                    }
                                    <tr>
                                        <td colSpan="4" className="text-end">Grand Total</td>
                                        <td><h6 className="mb-0 text-end text-dark-grey ">KSh. {(data.cancel_amount > 0 ? (data.total_amount-data.cancel_amount) : data.total_amount)}</h6></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </>
                :  <div className="col-lg-6 m-auto">
                {loading && (
                <span className="spinner-border spinner-border-sm"></span>
                )}
             </div>}
        </div>

    </div>
                    </div>
                    <Footer />
                </div>
            </section>
        </div>
      
    );
};

export default InvoiceDetails;