import React, {useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ViewCustomer = () => {
    const form = React.useRef()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [disabled, setDisabled] = useState(true);
    const params = useParams();
    //console.log(props)

    useEffect(() => {
        getData()
    }, []);
    const getData = async() => {
        await DataService.getCustomerDetail(params.id).then((data) => {
            setData(data.data.data);
        //setLoading(false);
        });
        
    }
    const onChangeStatus = (e) => {
        const data = e.target.value;
        setStatus(data);
        setDisabled(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        if(status){
            data.append('status',status)
        }      
        DataService.updateCustomerDetail(params?.id, data).then(
            () => {
                setLoading(false);
                toast.success('Customer updated successfully!', {
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
            <ToastContainer></ToastContainer>
            <div className="col-md-12">
                <h3>Customer Details</h3>
                <div className="row">
                    <div className="col-md-8">
                        <table class="table table-bordered tf-12 product-detail">
                            <thead class="table-secondary">
                                <tr>
                                    <th scope="col" class="f-700">Customer Name</th>
                                    <th scope="col">{data.user_name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="f-700">Email</td>
                                    <td>{data.email}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Created date</td>
                                    <td>{data.createdAt}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Phone Number</td>
                                    <td>{data.phone ? "+"+data.phone : ''}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="row mt-5">
                            <div className="col-xl-3 col-md-5 col-12">
                            <form onSubmit={handleSubmit} ref={form}>
                        <div class="mb-3">
                                <label class="form-label">Change Status</label>
                                <select key={data?.status} defaultValue={data?.status} className="form-select" onChange={onChangeStatus}>
                                {data?.status==='active'?
                                    <><option value="active">Active</option><option value="inactive">Inactive</option></>
                                    :<><option value="active">Active</option><option value="inactive">Inactive</option><option value="approved">Approved</option><option value="reject">Rejected</option></>
                                    }
                                </select>
                            </div>  
                            <div class="mb-3">
                            <button disabled={disabled || loading} className="btn btn-primary">
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Update</span>
                                        </button>
                            </div>
                </form>
                            </div>
        </div>
                    </div>

                    <div className="col-md-4">
                    {(data.file_path ? 
                                <img src={"opm-stream.onrender.com/"+data.file_path} className="w-100" alt={data.first_name} />
                            : ""
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCustomer;