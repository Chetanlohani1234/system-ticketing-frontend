import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import DataService from "../../../services/data.service";
const SubCategoryList = () => {
    const [mastercategory, setAData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setfilteredData] = useState([]);
    //console.log(props)

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = () => {
        DataService.getCategory('1').then((data) => {
            setAData(data.data.categories);
            setfilteredData(data.data.categories)
            setLoading(false);
        });
    };
    const onChangeSearch =(e)=>{
        if(e.target.value){
            const result = mastercategory.filter(value=>{
                return value.name.toLowerCase().includes(e.target.value.toLowerCase());
            })
            setfilteredData(result)
        }else{
            setfilteredData(mastercategory)
        }
        
      }
      const onChangeStatus = (e) => {
        if (e.target.value !== "All") {
            const result = mastercategory.filter(value => {
                return value.status === e.target.value;
            })
            setfilteredData(result)
        } else {
            setfilteredData(mastercategory)
        }
    }
    return (
        <div className="row">
            <div className="col-md-12">
                <h4 className="f-700 mb-4">All Sub Categories</h4>
                <div className="table-header d-flex align-items-center">
                    {/* <div className="table-search">
                        <i><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.7422 10.8439C12.5329 9.7673 13 8.4382 13 7C13 3.41015 10.0899 0.5 6.5 0.5C2.91015 0.5 0 3.41015 0 7C0 10.5899 2.91015 13.5 6.5 13.5C7.93858 13.5 9.26801 13.0327 10.3448 12.2415L10.3439 12.2422C10.3734 12.2822 10.4062 12.3204 10.4424 12.3566L14.2929 16.2071C14.6834 16.5976 15.3166 16.5976 15.7071 16.2071C16.0976 15.8166 16.0976 15.1834 15.7071 14.7929L11.8566 10.9424C11.8204 10.9062 11.7822 10.8734 11.7422 10.8439ZM12 7C12 10.0376 9.53757 12.5 6.5 12.5C3.46243 12.5 1 10.0376 1 7C1 3.96243 3.46243 1.5 6.5 1.5C9.53757 1.5 12 3.96243 12 7Z" fill="#707070" fill-opacity="0.5" />
                        </svg>
                        </i>
                        <input type="search" onChange={onChangeSearch} name="search" placeholder="Search category" />
                    </div> */}
                    <div class="d-flex align-items-center ms-auto">
                    <label className="me-3">Status</label>
                        <select class="form-select me-3 "  onChange={onChangeStatus}>
                        <option value="All">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <Link to={"/add-sub-categories"} className="btn btn-secondary">Add Sub Category</Link>

                    </div>
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
                            <th scope="col"></th>
                            <th scope="col">Sub Category  </th>
                            <th scope="col">Status</th>
                            <th scope="col" className="text-end">Action</th>


                        </tr>
                    </thead>
                    <tbody>
                        {filteredData && filteredData.length > 0
                            ? filteredData.map((item, i) => (
                                <tr>

                                   <td className="align-items-center">
                                        <svg width="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 2.75C0.5 1.50736 1.50736 0.5 2.75 0.5L7.25 0.5C8.49264 0.5 9.5 1.50736 9.5 2.75V7.25C9.5 8.49264 8.49264 9.5 7.25 9.5H2.75C1.50736 9.5 0.5 8.49264 0.5 7.25L0.5 2.75ZM12.5 2.75C12.5 1.50736 13.5074 0.5 14.75 0.5L19.25 0.5C20.4926 0.5 21.5 1.50736 21.5 2.75V7.25C21.5 8.49264 20.4926 9.5 19.25 9.5H14.75C13.5074 9.5 12.5 8.49264 12.5 7.25V2.75ZM0.5 14.75C0.5 13.5074 1.50736 12.5 2.75 12.5H7.25C8.49264 12.5 9.5 13.5074 9.5 14.75V19.25C9.5 20.4926 8.49264 21.5 7.25 21.5H2.75C1.50736 21.5 0.5 20.4926 0.5 19.25L0.5 14.75ZM12.5 14.75C12.5 13.5074 13.5074 12.5 14.75 12.5H19.25C20.4926 12.5 21.5 13.5074 21.5 14.75V19.25C21.5 20.4926 20.4926 21.5 19.25 21.5H14.75C13.5074 21.5 12.5 20.4926 12.5 19.25V14.75Z" fill="#F6F5FA" stroke="#161616"></path></svg>
                                    </td>
                                    
                                    <td className="d-flex align-items-center">
                                    {(item.image ? 
                                        <span className="thumb-img me-2"><img src={item.image.filePath} className="product-img" alt="product" /></span>
                                    : <span className="thumb-img me-2"></span>
                                    )}{item.name}
                                    </td>

                                    <td><span className={item.status == "Active" ? "status active" : "status inactive"}>{item.status}</span></td>
                                    <td><span className="d-flex justify-content-end">
                                    {/* <Link to={"/view-sub-category-detail/"+item._id} href="#" className="mx-2"><svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.6951 6.47656C16.6951 6.47656 13.6951 0.976562 8.69507 0.976562C3.69507 0.976562 0.695068 6.47656 0.695068 6.47656C0.695068 6.47656 3.69507 11.9766 8.69507 11.9766C13.6951 11.9766 16.6951 6.47656 16.6951 6.47656ZM1.86777 6.47656C1.92469 6.38977 1.98961 6.29333 2.06234 6.18898C2.39723 5.70849 2.89138 5.06947 3.52718 4.43367C4.8161 3.14474 6.57569 1.97656 8.69507 1.97656C10.8145 1.97656 12.574 3.14474 13.863 4.43367C14.4988 5.06947 14.9929 5.70849 15.3278 6.18898C15.4005 6.29333 15.4654 6.38977 15.5224 6.47656C15.4654 6.56335 15.4005 6.65979 15.3278 6.76414C14.9929 7.24463 14.4988 7.88366 13.863 8.51946C12.574 9.80838 10.8145 10.9766 8.69507 10.9766C6.57569 10.9766 4.8161 9.80838 3.52718 8.51946C2.89138 7.88366 2.39723 7.24463 2.06234 6.76414C1.98961 6.65979 1.92469 6.56335 1.86777 6.47656Z" fill="#c7001f" />
                                        <path d="M8.69507 3.97656C7.31436 3.97656 6.19507 5.09585 6.19507 6.47656C6.19507 7.85727 7.31436 8.97656 8.69507 8.97656C10.0758 8.97656 11.1951 7.85727 11.1951 6.47656C11.1951 5.09585 10.0758 3.97656 8.69507 3.97656ZM5.19507 6.47656C5.19507 4.54357 6.76207 2.97656 8.69507 2.97656C10.6281 2.97656 12.1951 4.54357 12.1951 6.47656C12.1951 8.40956 10.6281 9.97656 8.69507 9.97656C6.76207 9.97656 5.19507 8.40956 5.19507 6.47656Z" fill="#c7001f" />
                                    </svg>
                                    </Link> */}

                                        <Link to={"/edit-sub-category-detail/"+item._id} className="mx-2"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.8415 0.623009C13.0368 0.427747 13.3534 0.427747 13.5486 0.623009L16.5486 3.62301C16.7439 3.81827 16.7439 4.13485 16.5486 4.33012L6.54864 14.3301C6.50076 14.378 6.44365 14.4157 6.38078 14.4408L1.38078 16.4408C1.19507 16.5151 0.982961 16.4715 0.84153 16.3301C0.700098 16.1887 0.656561 15.9766 0.730845 15.7909L2.73084 10.7909C2.75599 10.728 2.79365 10.6709 2.84153 10.623L12.8415 0.623009ZM11.9022 2.97656L14.1951 5.26946L15.488 3.97656L13.1951 1.68367L11.9022 2.97656ZM13.488 5.97656L11.1951 3.68367L4.69508 10.1837V10.4766H5.19508C5.47123 10.4766 5.69508 10.7004 5.69508 10.9766V11.4766H6.19508C6.47123 11.4766 6.69508 11.7004 6.69508 11.9766V12.4766H6.98798L13.488 5.97656ZM3.72673 11.152L3.62121 11.2575L2.09261 15.079L5.9141 13.5504L6.01963 13.4449C5.83003 13.3739 5.69508 13.191 5.69508 12.9766V12.4766H5.19508C4.91894 12.4766 4.69508 12.2527 4.69508 11.9766V11.4766H4.19508C3.98068 11.4766 3.79779 11.3416 3.72673 11.152Z" fill="#2166a5" />
                                        </svg>
                                        </Link>

                                    </span></td>
                                </tr>
                            ))
                            : !loading && (
                                <div
                                    className="container text-center no-padding"
                                    style={{ padding: "100px" }}
                                >
                                    <div className="col-lg-6 m-auto">
                                        <p className="data_not_found">No data found</p>
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

export default SubCategoryList;