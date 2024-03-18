import React, { useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

const ViewProductDetails = (props) => {
    const form = React.useRef();
    const [newArrival, setNewArrival] = useState(null);
    const [topDeal, setTopDeal] = useState(null);
    const [bestSeller, setBestSeller] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    
    const onChangeStatus = (e) => {
        const data = e.target.value;
        setStatus(data);
        setDisabled(false);
    };
    const onChangeNewArrival = (event) => {
        const data = (event.target.checked)?'1':'0';
        setNewArrival(data);
        setDisabled(false);
    };
    const onChangeTopDeal = (event) => {
        const data = (event.target.checked)?'1':'0';
        setTopDeal(data);
        setDisabled(false);
    };
    const onChangeBestSeller = (event) => {
        const data = (event.target.checked)?'1':'0';
        setBestSeller(data);
        setDisabled(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        if(newArrival != null){
            data.append('new_arrival', newArrival);
        }
        if(topDeal != null){
            data.append('top_deal', topDeal);
        }
        if(bestSeller != null){
            data.append('best_seller', bestSeller);
        }
        if(status){
            data.append('status',status)
        }
       
        DataService.updateProduct(data, props?.data?.id).then(
            () => {
                setLoading(false);
                toast.success('Product updated successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            },
            (error) => {
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
            }
        );
    };
 
    return (
        <div className="row">
            <div className="col-md-12">
                <h3>Product Details</h3>
                <div className="row">
                    <div className="col-md-8">
                        <table class="table table-bordered tf-12 product-detail">
                            <thead class="table-secondary">
                                <tr>
                                    <th scope="col" class="f-700 w-50">Product</th>
                                    <th scope="col">{props.data.productName}</th>
                                </tr>
                            </thead>
                            <tbody>
                              
                                <tr>
                                    <td class="f-700">Category</td>
                                    <td>{props?.data?.category?.productName}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Sub Category</td>
                                    <td>{props?.data?.subcategory?.name}</td>
                                </tr>
                            
                                <tr>
                                    <td class="f-700">SKU</td>
                                    <td>{props.data.SKU_Number}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Product ID</td>
                                    <td>{props.data.productId}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Quantity</td>
                                    <td>{props.data.stockQuantity}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">MRP</td>
                                    <td>${props.data.MRP}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Cost Prise</td>
                                    <td>${props.data.costPrice}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Offered price</td>
                                    <td>${props.data.offerPrice}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Description</td>
                                    <td>{props.data.description}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Created At:</td>
                                    <td>{moment(props.data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">How To Get:</td>
                                    <td>{props.data.howToGet}</td>
                                </tr>

                            </tbody>
                        </table>

                        {/* <div className="row mt-5">
                            <div className="col-xl-4 col-md-5 col-12">
                            <form onSubmit={handleSubmit} ref={form}>
                                    <div class="mb-3">
                                        <label class="form-label"> Add Product in Clearance Deals</label>
                                        <div class="form-check form-switch">
                                            <input 
                                            defaultChecked={props?.data?.new_arrival===1? true:false}
                                            class="form-check-input" 
                                            type="checkbox"
                                            key={props?.data?.new_arrival}
                                            onChange={onChangeNewArrival} 
                                            role="switch" 
                                             />                                             
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label"> Add Product in Deals of the Day</label>
                                        <div class="form-check form-switch">
                                            <input 
                                            defaultChecked={props?.data?.top_deal===1? true:false}
                                            class="form-check-input" 
                                            type="checkbox"
                                            key={props?.data?.top_deal}
                                            onChange={onChangeTopDeal} 
                                            role="switch" 
                                             />                                             
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label"> Add Product in Crazy Offers</label>
                                        <div class="form-check form-switch">
                                            <input 
                                            defaultChecked={props?.data?.best_seller===1? true:false}
                                            class="form-check-input" 
                                            type="checkbox"
                                            key={props?.data?.best_seller}
                                            onChange={onChangeBestSeller} 
                                            role="switch" 
                                             />                                             
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Change Status</label>
                                        <select key={props?.data?.status} defaultValue={props?.data?.status} className="form-select" onChange={onChangeStatus}>
                                            <option value="Published">Published</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                    <button disabled={disabled || loading} className="btn btn-primary">
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Save</span>
                                        </button>
                                    </div>
                                </form>
                            </div>


                        </div> */}
                    </div>

                    {/* <div className="col-md-4">
                       <div className="bg-grey">
                        <div className="preview p-3 d-flex align-items-center justify-content-center">
                        {(props.data.file_path ? 
                                    <img width="200" src={"opm-stream.onrender.com/"+props.data.file_path}  alt="product" />
                                : ""
                                )}
                        </div>
                        <ul className="img-thumb">
                        {images && images.length > 0
                                    ? images.map((item, i) => (
                                        <li>
                                            <img width="27"  src={"opm-stream.onrender.com/"+item.file_path} alt='product'/>
                                        </li>
                                    )):""
                        }      
                        </ul>
                       </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ViewProductDetails;