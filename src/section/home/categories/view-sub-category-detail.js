import React, {useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewSubCategotyDetail = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const params = useParams();
    useEffect(() => {
        getData();
    }, []);
    const getData = () => {
        DataService.getCategoryDetail(params.id).then((data) => {
                setData(data?.data?.category);   
        });
    }
    return (
        <div className="row">
            <div className="col-md-12">
                <h3>{data?.name}</h3>
                <table class="table table-bordered tf-12 product-detail">
                   
                    <tbody>
                        <tr>
                            <td className="f-700">Sub Category</td>
                            <td>{data?.name}</td>
                        </tr>
                        <tr>
                            <td className="f-700">Category</td>
                            <td>{data?.parentcategory?.name}</td>
                        </tr>
                        <tr>
                            <td className="f-700">Master Category</td>
                            <td>{data?.parentcategory?.parentcategory?.name}</td>
                        </tr>

                        <tr>
                            <td className="f-700">Status</td>
                            <td>{data?.status}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewSubCategotyDetail;