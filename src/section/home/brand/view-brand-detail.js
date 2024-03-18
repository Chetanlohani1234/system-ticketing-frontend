import React, {useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ViewBrandDetail = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category_ids, setCategoryIds] = useState([]);
    const [mastercategory, setAData] = useState([]);
    const params = useParams();
    //console.log(props)

    useEffect(() => {
        getCategory()
        getData()
    }, []);

    const getCategory = () => {
        DataService.getCategory('0').then((data) => {
            const masterCatData = data.data.categories.filter(value => (value.status==='Active'))
            setAData(masterCatData);
        });
    }
    
    const getData = async() => {
        await DataService.getBrandDetail(params.id).then((data) => {
            setData(data.data.data);
            setCategoryIds(data?.data?.data?.category_ids.split(","))
        });
        
    }
   const updateBrand = (value)=>{
    const data = new FormData();
    data.append('status',value)
    DataService.updateBrand(data,params.id).then(
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
   }
    return (
        <div className="row">
            <ToastContainer></ToastContainer>
            <div className="col-md-12">
                <h3>Brand Details</h3>
                <div className="row">
                    <div className="col-md-8">
                        <table class="table table-bordered tf-12 product-detail">
                            <thead class="table-secondary">
                                <tr>
                                    <th scope="col" class="f-700" width="200">Brand Name</th>
                                    <th scope="col">{data.name}</th>
                                </tr>
                            </thead>
                            <tbody>                              
                                <tr>
                                    <td class="f-700">Brand Description</td>
                                    <td>{data.description}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Categories</td>
                                    <td>{category_ids.length > 0 ?   
                                        category_ids.map((id) => {
                                            return mastercategory.map((item) => {
                                                return (id == item.id  ? item.name+", " : "")
                                            })
                                        })
                                     
                                     : ""}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Status</td>
                                    <td>{data.status}</td>
                                </tr>

                            </tbody>
                        </table>
                        <div className="row mt-5">
                            <div className="col-12">
                                <div class="mb-3">
                                    {data.status==='Pending'?
                                        <><button onClick={() => { if (window.confirm('Are you sure you want to published this brand ?'))  updateBrand('Published') } }  data-value="Published" className="btn btn-primary me-3">Published</button><button onClick={() => { if (window.confirm('Are you sure you want to rejected this brand ?'))  updateBrand('Rejected') } }   className="btn btn-danger">Reject</button></>:""
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                    {(data.file_path ? 
                                   <img src={"opm-stream.onrender.com/"+data.file_path} className="w-100" alt={data.name} />
                                : ""
                                )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBrandDetail;