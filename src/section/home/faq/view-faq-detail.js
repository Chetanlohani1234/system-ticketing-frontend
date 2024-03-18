import React, {useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ViewFaqDetail = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    //console.log(props)

    useEffect(() => {
        getData()
    }, []);
    const getData = async() => {
        await DataService.getFaqDetail(params.id).then((data) => {
            setData(data.data.data);
        //setLoading(false);
        });
        
    }
   
    return (
        <div className="row">
            <ToastContainer></ToastContainer>
            <div className="col-md-12">
                <h3>Faq Details</h3>
                <div className="row">
                    <div className="col-md-8">
                        <table class="table table-bordered tf-12 product-detail">
                            <thead class="table-secondary">
                                <tr>
                                    <th scope="col" class="f-700" width="200">Question</th>
                                    <th scope="col">{data.question}</th>
                                </tr>
                            </thead>
                            <tbody>                              
                                <tr>
                                    <td class="f-700">Answer</td>
                                    <td dangerouslySetInnerHTML={{__html : data.answer}}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewFaqDetail;