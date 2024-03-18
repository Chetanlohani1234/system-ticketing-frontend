import React, {useEffect, useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
// import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataService from "../../../services/data.service";
const ContactUsContent = () => {
    const form = useRef();
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [maplat , setMapLat] = useState("");
    const [maplong , setMapLong] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] =useState(false);
    const [data, setData] = useState([])


    const onChangeAddress = (e) => {
        const data = e.target.value;
        setAddress(data);
    };
    const onChangeEmail = (e) => {
        const data = e.target.value;
        setEmail(data);
    };
    const onChangePhone = (e) => {
        const data = e.target.value;
        setPhone(data);
    };
    const onChangeMapLat = (e) => {
        const data = e.target.value;
        setMapLat(data);
    };
    const onChangeMapLong = (e) => {
        const data = e.target.value;
        setMapLong(data);
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        DataService.getContactUs(data).then((data) => {
            setData(data.data.data);
            setAddress(data.data.data?.address);
            setEmail(data.data.data?.email);
            setPhone(data.data.data?.phone);
            setMapLat(data.data.data?.map_lat);
            setMapLong(data.data.data?.map_lng);
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        const data = {
            address : address,
            email : email,
            phone : phone,
            map_lat : maplat,
            map_lng : maplong
        }
            DataService.addContactUs(data).then(
                () => {
                    setLoading(false);
                    toast.success('Data updated successfully !', {
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
        <div className="container-fluid">
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="d-flex w-100 justify-content-between align-items-center mb-4">
                    <h4 className="mb-0 f-700">Contact us</h4>

                </div>
            </div>
            <form className="mt-4" ref={form} onSubmit={handleSubmit}>
                    {message && (
                            <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                            </div>
                        )}
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-highlight mb-5">
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <label className="form-label">Address</label>
                                        <input 
                                        type="text" 
                                        required
                                        onChange={onChangeAddress}
                                        defaultValue={address}
                                        className="form-control" 
                                        placeholder="Address" />
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <label className="form-label">Email</label>
                                        <input 
                                        type="email" 
                                        required
                                        onChange={onChangeEmail}
                                        defaultValue={email}
                                        className="form-control" 
                                        placeholder="Email" />
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <label className="form-label">Phone Number</label>
                                        <input 
                                        type="tel" 
                                        required
                                        onChange={onChangePhone}
                                        defaultValue={phone}
                                        className="form-control" 
                                        placeholder="Phone Number" />
                                    </div>
                                    <div className="col-md-12">
                                    <label className="form-label">Location</label>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                    <input 
                                        type="text" 
                                        required
                                        onChange={onChangeMapLat}
                                        defaultValue={maplat}
                                        className="form-control" 
                                        placeholder="Map Latitude" />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                    <input 
                                        type="text" 
                                        required
                                        onChange={onChangeMapLong}
                                        defaultValue={maplong}
                                        className="form-control" 
                                        placeholder="Map Longitude" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Update</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ContactUsContent;