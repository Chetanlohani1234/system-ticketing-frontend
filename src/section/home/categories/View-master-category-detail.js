import React, {useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewMasterCategotyDetail = () => {
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
                    <thead class="table-secondary">
                        <tr>
                           <th scope="col" className="f-700">Category</th>
                            <th scope="col">Sub category</th>

                        </tr>
                    </thead>
                    <tbody>
                    {data?.Categories && data?.Categories.length > 0
                        ? data?.Categories.map((item, i) => (
                            <tr>
                                <td className="f-700">{item.name}</td>

                                <td>
                                {item?.Categories && item?.Categories.length > 0
                        ? item?.Categories.map((value, i) => (
                            value.name+', '
                        )):""}
                                </td>
                            </tr>
                        )):""
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewMasterCategotyDetail;