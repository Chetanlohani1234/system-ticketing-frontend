import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BrandList = () => {
    const [brand, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setfilteredData] = useState([]);
    //console.log(props)

    useEffect(() => {
        document.title = "Brand";
        getCategory();
    }, []);

    const getCategory = () => {
        DataService.getAllBrand().then((data) => {
            setData(data.data.data);
            setfilteredData(data.data.data)
            setLoading(false);
        });
    };
    const onChangeSearch =(e)=>{
        if(e.target.value){
            const result = brand.filter(value=>{
                return value.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
                        value.description.toLowerCase().includes(e.target.value.toLowerCase());
            })
            setfilteredData(result)
        }else{
            setfilteredData(brand)
        }
        
      }
      const onChangeStatus = (e)=>{
        console.log(e.target.value)
        if(e.target.value!=="All"){
            const result = brand.filter(value=>{
                return value.status===e.target.value;
            })
            setfilteredData(result)
        }else{
            setfilteredData(brand)
        }
      }

    const deleteBrand  = (item) =>{
        setLoading(true);
        DataService.deleteBrand(item?.id).then(
            () => {
                toast.success('Brand deleted successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });
                setLoading(false);
                getCategory();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.msg) ||
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
                <h4 className="f-700 mb-4">Brand</h4>
                <div className="table-header d-flex align-items-center">
                    <div className="table-search">
                        <i><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.7422 10.8439C12.5329 9.7673 13 8.4382 13 7C13 3.41015 10.0899 0.5 6.5 0.5C2.91015 0.5 0 3.41015 0 7C0 10.5899 2.91015 13.5 6.5 13.5C7.93858 13.5 9.26801 13.0327 10.3448 12.2415L10.3439 12.2422C10.3734 12.2822 10.4062 12.3204 10.4424 12.3566L14.2929 16.2071C14.6834 16.5976 15.3166 16.5976 15.7071 16.2071C16.0976 15.8166 16.0976 15.1834 15.7071 14.7929L11.8566 10.9424C11.8204 10.9062 11.7822 10.8734 11.7422 10.8439ZM12 7C12 10.0376 9.53757 12.5 6.5 12.5C3.46243 12.5 1 10.0376 1 7C1 3.96243 3.46243 1.5 6.5 1.5C9.53757 1.5 12 3.96243 12 7Z" fill="#707070" fill-opacity="0.5" />
                        </svg>
                        </i>
                        <input type="search" onChange={onChangeSearch} name="search" placeholder="Search brand" />
                    </div>
                    <form class="d-flex align-items-center ms-auto">
                        <label className="me-3">Status</label>
                        <select class="form-select me-3 " onChange={onChangeStatus}>
                            <option selected>All</option>
                            <option value="Published">Published</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <Link to={"/add-brand"} className="btn btn-secondary">Add New Brand</Link>

                    </form>
                </div>
                <div className="container-fluid text-center no-padding">
                    <div className="col-lg-6 m-auto">
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                    </div>
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" width="150">Brand Image </th>
                            <th scope="col">Brand Name   </th>
                            <th scope="col">Brand Description  </th>
                            <th scope="col">Status</th>
                            <th scope="col" className="text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredData && filteredData.length > 0
                            ? filteredData.map((item, i) => (
                    <tr>
                            <td className="d-flex align-items-center">
                                {(item.file_path ? 
                                    <span className="thumb-img me-2"><img src={"opm-stream.onrender.com/"+item.file_path} className="product-img" alt="product" /></span>
                                : <span className="thumb-img me-2"></span>
                                )}
                            </td>
                            <td>{item.name}</td>
                            <td>{item.description.length > 35? item.description.substring(0,35) + "..." : item.description}</td>
                            <td><span className={`status ${item.status.toLowerCase()}`}>{item.status}</span></td>
                            <td><span className="d-flex justify-content-end"><Link to={"/brand-details/"+item.id}  className="mx-2">
                                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.6951 6.47656C16.6951 6.47656 13.6951 0.976562 8.69507 0.976562C3.69507 0.976562 0.695068 6.47656 0.695068 6.47656C0.695068 6.47656 3.69507 11.9766 8.69507 11.9766C13.6951 11.9766 16.6951 6.47656 16.6951 6.47656ZM1.86777 6.47656C1.92469 6.38977 1.98961 6.29333 2.06234 6.18898C2.39723 5.70849 2.89138 5.06947 3.52718 4.43367C4.8161 3.14474 6.57569 1.97656 8.69507 1.97656C10.8145 1.97656 12.574 3.14474 13.863 4.43367C14.4988 5.06947 14.9929 5.70849 15.3278 6.18898C15.4005 6.29333 15.4654 6.38977 15.5224 6.47656C15.4654 6.56335 15.4005 6.65979 15.3278 6.76414C14.9929 7.24463 14.4988 7.88366 13.863 8.51946C12.574 9.80838 10.8145 10.9766 8.69507 10.9766C6.57569 10.9766 4.8161 9.80838 3.52718 8.51946C2.89138 7.88366 2.39723 7.24463 2.06234 6.76414C1.98961 6.65979 1.92469 6.56335 1.86777 6.47656Z" fill="#c7001f" />
                                    <path d="M8.69507 3.97656C7.31436 3.97656 6.19507 5.09585 6.19507 6.47656C6.19507 7.85727 7.31436 8.97656 8.69507 8.97656C10.0758 8.97656 11.1951 7.85727 11.1951 6.47656C11.1951 5.09585 10.0758 3.97656 8.69507 3.97656ZM5.19507 6.47656C5.19507 4.54357 6.76207 2.97656 8.69507 2.97656C10.6281 2.97656 12.1951 4.54357 12.1951 6.47656C12.1951 8.40956 10.6281 9.97656 8.69507 9.97656C6.76207 9.97656 5.19507 8.40956 5.19507 6.47656Z" fill="#c7001f" />
                                </svg>
                            </Link>
                                <Link to={"/edit-brand/"+item.id} className="mx-2">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.8415 0.623009C13.0368 0.427747 13.3534 0.427747 13.5486 0.623009L16.5486 3.62301C16.7439 3.81827 16.7439 4.13485 16.5486 4.33012L6.54864 14.3301C6.50076 14.378 6.44365 14.4157 6.38078 14.4408L1.38078 16.4408C1.19507 16.5151 0.982961 16.4715 0.84153 16.3301C0.700098 16.1887 0.656561 15.9766 0.730845 15.7909L2.73084 10.7909C2.75599 10.728 2.79365 10.6709 2.84153 10.623L12.8415 0.623009ZM11.9022 2.97656L14.1951 5.26946L15.488 3.97656L13.1951 1.68367L11.9022 2.97656ZM13.488 5.97656L11.1951 3.68367L4.69508 10.1837V10.4766H5.19508C5.47123 10.4766 5.69508 10.7004 5.69508 10.9766V11.4766H6.19508C6.47123 11.4766 6.69508 11.7004 6.69508 11.9766V12.4766H6.98798L13.488 5.97656ZM3.72673 11.152L3.62121 11.2575L2.09261 15.079L5.9141 13.5504L6.01963 13.4449C5.83003 13.3739 5.69508 13.191 5.69508 12.9766V12.4766H5.19508C4.91894 12.4766 4.69508 12.2527 4.69508 11.9766V11.4766H4.19508C3.98068 11.4766 3.79779 11.3416 3.72673 11.152Z" fill="#2166a5" />
                                    </svg>
                                </Link>
                                {/* <Link onClick={() => { if (window.confirm('Are you sure you want to delete this brand?'))  deleteBrand(item) } }  className="mx-2">
                                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 5.49991C4.27614 5.49991 4.5 5.72377 4.5 5.99991V11.9999C4.5 12.2761 4.27614 12.4999 4 12.4999C3.72386 12.4999 3.5 12.2761 3.5 11.9999V5.99991C3.5 5.72377 3.72386 5.49991 4 5.49991Z" fill="#C30E0E" />
                                        <path d="M6.5 5.49991C6.77614 5.49991 7 5.72377 7 5.99991V11.9999C7 12.2761 6.77614 12.4999 6.5 12.4999C6.22386 12.4999 6 12.2761 6 11.9999V5.99991C6 5.72377 6.22386 5.49991 6.5 5.49991Z" fill="#C30E0E" />
                                        <path d="M9.5 5.99991C9.5 5.72377 9.27614 5.49991 9 5.49991C8.72386 5.49991 8.5 5.72377 8.5 5.99991V11.9999C8.5 12.2761 8.72386 12.4999 9 12.4999C9.27614 12.4999 9.5 12.2761 9.5 11.9999V5.99991Z" fill="#C30E0E" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 2.99991C13 3.55219 12.5523 3.99991 12 3.99991H11.5V12.9999C11.5 14.1045 10.6046 14.9999 9.5 14.9999H3.5C2.39543 14.9999 1.5 14.1045 1.5 12.9999V3.99991H1C0.447715 3.99991 0 3.55219 0 2.99991V1.99991C0 1.44762 0.447715 0.999908 1 0.999908H4.5C4.5 0.447624 4.94772 -9.15527e-05 5.5 -9.15527e-05H7.5C8.05229 -9.15527e-05 8.5 0.447624 8.5 0.999908H12C12.5523 0.999908 13 1.44762 13 1.99991V2.99991ZM2.61803 3.99991L2.5 4.05893V12.9999C2.5 13.5522 2.94772 13.9999 3.5 13.9999H9.5C10.0523 13.9999 10.5 13.5522 10.5 12.9999V4.05893L10.382 3.99991H2.61803ZM1 2.99991V1.99991H12V2.99991H1Z" fill="#C30E0E" />
                                    </svg>

                                </Link> */}
                                <Link data-bs-toggle="modal" data-bs-target={`#staticBackdrop_${item.id}`}  className="mx-2"><svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.19312 5.979C4.46926 5.979 4.69312 6.20286 4.69312 6.479V12.479C4.69311 12.7551 4.46926 12.979 4.19312 12.979C3.91697 12.979 3.69312 12.7551 3.69312 12.479V6.479C3.69312 6.20286 3.91697 5.979 4.19312 5.979Z" fill="#C30E0E" />
                                            <path d="M6.69312 5.979C6.96926 5.979 7.19312 6.20286 7.19312 6.479V12.479C7.19312 12.7551 6.96926 12.979 6.69312 12.979C6.41697 12.979 6.19312 12.7551 6.19312 12.479V6.479C6.19312 6.20286 6.41697 5.979 6.69312 5.979Z" fill="#C30E0E" />
                                            <path d="M9.69312 6.479C9.69312 6.20286 9.46926 5.979 9.19312 5.979C8.91697 5.979 8.69312 6.20286 8.69312 6.479V12.479C8.69312 12.7551 8.91697 12.979 9.19312 12.979C9.46926 12.979 9.69312 12.7551 9.69312 12.479V6.479Z" fill="#C30E0E" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1931 3.479C13.1931 4.03129 12.7454 4.479 12.1931 4.479H11.6931V13.479C11.6931 14.5836 10.7977 15.479 9.69312 15.479H3.69312C2.58855 15.479 1.69312 14.5836 1.69312 13.479V4.479H1.19312C0.640831 4.479 0.193115 4.03129 0.193115 3.479V2.479C0.193115 1.92672 0.640831 1.479 1.19312 1.479H4.69312C4.69312 0.926719 5.14083 0.479004 5.69312 0.479004H7.69312C8.2454 0.479004 8.69312 0.926719 8.69312 1.479H12.1931C12.7454 1.479 13.1931 1.92672 13.1931 2.479V3.479ZM2.81115 4.479L2.69312 4.53802V13.479C2.69312 14.0313 3.14083 14.479 3.69312 14.479H9.69312C10.2454 14.479 10.6931 14.0313 10.6931 13.479V4.53802L10.5751 4.479H2.81115ZM1.19312 3.479V2.479H12.1931V3.479H1.19312Z" fill="#C30E0E" />
                                        </svg>
                                        </Link>
                                        <div class="modal fade" id={`staticBackdrop_${item.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    
                                                    <div class="modal-body py-5">
                                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                                        <i className="text-center"><svg width="100" viewBox="0 0 268 268" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g opacity="0.01">
                                                                <path d="M134 0.939941C60.5108 0.939941 0.939941 60.5108 0.939941 134C0.939941 207.489 60.5108 267.06 134 267.06C207.489 267.06 267.06 207.489 267.06 134C267.06 60.5108 207.489 0.939941 134 0.939941Z" fill="#C5D9F1" />
                                                                <path d="M134 0.939941C60.5108 0.939941 0.939941 60.5108 0.939941 134C0.939941 207.489 60.5108 267.06 134 267.06C207.489 267.06 267.06 207.489 267.06 134C267.06 60.5108 207.489 0.939941 134 0.939941Z" stroke="#F2F2F2" stroke-width="1.25" />
                                                            </g>
                                                            <path d="M90.5 102.991H177.5V192.378C177.5 197.714 173.169 202.045 167.833 202.045H100.167C94.8307 202.045 90.5 197.714 90.5 192.378V102.991ZM97.75 110.241V192.378C97.75 193.712 98.8327 194.795 100.167 194.795H167.833C169.167 194.795 170.25 193.712 170.25 192.378V110.241H97.75Z" fill="#2C5F2D" />
                                                            <path d="M88.5944 79.0569L175.594 79.0573C180.93 79.0573 185.261 83.388 185.261 88.724L185.261 108.057L78.9276 108.057L78.9277 88.7236C78.9277 83.3876 83.2584 79.0569 88.5944 79.0569ZM178.011 100.807L178.011 88.724C178.011 87.39 176.928 86.3073 175.594 86.3073L88.5944 86.3069C87.2604 86.3069 86.1777 87.3896 86.1777 88.7236L86.1776 100.807L178.011 100.807Z" fill="#2C5F2D" />
                                                            <path d="M124.361 62.3733L139.828 62.3734C144.097 62.3734 147.561 65.838 147.561 70.1068L147.561 83.5318L116.628 83.5317L116.628 70.1066C116.628 65.8378 120.092 62.3733 124.361 62.3733ZM141.761 70.1067C141.761 69.0395 140.895 68.1734 139.828 68.1734L124.361 68.1733C123.294 68.1733 122.428 69.0395 122.428 70.1067L122.428 77.7317L141.761 77.7318L141.761 70.1067Z" fill="#2C5F2D" />
                                                            <path d="M129.921 126C129.921 123.999 131.545 122.375 133.546 122.375C135.547 122.375 137.171 123.999 137.171 126V183.816C137.171 185.817 135.547 187.441 133.546 187.441C131.545 187.441 129.921 185.817 129.921 183.816V126ZM130.375 126C130.375 123.999 131.999 122.375 134 122.375C136.001 122.375 137.625 123.999 137.625 126V183.816C137.625 185.817 136.001 187.441 134 187.441C131.999 187.441 130.375 185.817 130.375 183.816V126ZM129.771 125.908C129.771 123.907 131.395 122.283 133.396 122.283C135.397 122.283 137.021 123.907 137.021 125.908V183.724C137.021 185.725 135.397 187.349 133.396 187.349C131.395 187.349 129.771 185.725 129.771 183.724V125.908Z" fill="#2C5F2D" />
                                                        </svg>
                                                        </i>

                                                        <h5 className="mt-4">Are you sure you want to delete this brand?</h5>
                                                        <div className="d-flex justify-content-center mt-3">
                                                        <button type="button" class="btn btn-default me-3" data-bs-dismiss="modal">No</button>
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => {deleteBrand(item) } }>Yes</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                        </div>
                            </span></td>
                        </tr>
                       )) : !loading && (
                            <div
                                className="container-fluid text-center no-padding"
                                style={{ padding: "100px" }}
                            >
                                <div className="col-lg-6 m-auto">
                                    <p>Data not added yet</p>
                                </div>
                            </div>
                        )}
                    </tbody>
                </table>
                {/* <ul className="pagination mt-5">
                    <li className="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">...</a></li>
                    <li><a href="#">5</a></li>
                </ul> */}
            </div>


        </div>
    );
};

export default BrandList;