import React, { useEffect, useState, Fragment } from "react";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import Footer from "../common/Footer";
import { useParams } from "react-router-dom";
import DataService from "../services/data.service";
import HelperService  from "../services/helper.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import CancelOrder from "./cancelOrder";

const OrderDetails = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingnew, setLoadingNew] = useState(false);
  useEffect(() => {
    document.title = "Order Details";
    getData();
  }, []);
  const getData = async () => {
    setLoading(true);
    await DataService.getOrderDetail(params.id)
      .then((data) => {
        setData(data?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleStatusChange = async (e) => {
    setLoadingNew(true);
    const data1 = {};
    data1.status =  e.target.value;
    DataService.updateOrder(data?.id, data1).then(
        () => {
            setLoadingNew(false);
            toast.success('Status updated successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });
            getData();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.msg) ||
            error.message ||
            error.toString();

          setLoadingNew(false);
          toast.error(resMessage, {
            position: toast.POSITION.TOP_RIGHT
          });
          getData();
        }
      );
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
                {!loading ? (
                  <>
                    <div
                      id="dnld"
                      className="row py-4"
                      style={{ borderBottom: "1px solid #000000" }}
                    >
                      <div className="col-xl-4 col-lg-4 col-md-6 mb-md-3">
                        <div
                          className="bg-grey align-items-center justify-content-between d-flex p-4 py-5"
                          style={{ borderRadius: "5px" }}
                        >
                          <div className="pe-2">
                            <h4>Billing Address</h4>
                            <h6>
                              {data?.BillingAddress?.first_name}{" "}
                              {data?.BillingAddress?.last_name},<br></br>
                              {data?.BillingAddress?.address},<br></br>
                              {data?.BillingAddress?.city},{" "}
                              {data?.BillingAddress?.region}{" "}
                              {data?.BillingAddress?.landmark
                                ? "(" + data?.BillingAddress?.landmark + ")"
                                : ""}
                              <br></br>
                              {data?.BillingAddress?.phone}
                              <br></br>
                            </h6>
                          </div>
                          <i>
                            <svg
                              width="136"
                              height="136"
                              viewBox="0 0 136 136"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="order-detail-svg"
                            >
                              <path
                                d="M113.335 45.3333H90.668C87.268 45.3333 85.0013 47.5999 85.0013 50.9999V90.6666H56.668V96.3333C56.668 99.7333 58.9346 102 62.3346 102H90.668C90.668 95.7666 95.768 90.6666 102.001 90.6666C108.235 90.6666 113.335 95.7666 113.335 102H119.001C122.401 102 124.668 99.7333 124.668 96.3333V73.6666L113.335 45.3333Z"
                                fill="black"
                              />
                              <path
                                opacity="0.3"
                                d="M113.332 102C113.332 108.233 108.232 113.333 101.999 113.333C95.7654 113.333 90.6654 108.233 90.6654 102C90.6654 95.7667 95.7654 90.6667 101.999 90.6667C108.232 90.6667 113.332 95.7667 113.332 102ZM84.9987 22.6667C84.9987 19.2667 82.732 17 79.332 17H16.9987C13.5987 17 11.332 19.2667 11.332 22.6667V73.6667C11.332 77.0667 13.5987 79.3333 16.9987 79.3333H84.9987V22.6667ZM33.9987 90.6667C27.7654 90.6667 22.6654 95.7667 22.6654 102C22.6654 108.233 27.7654 113.333 33.9987 113.333C40.232 113.333 45.332 108.233 45.332 102C45.332 95.7667 40.232 90.6667 33.9987 90.6667Z"
                                fill="#F4AC3D"
                              />
                            </svg>
                          </i>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6">
                        <div
                          className="bg-grey align-items-center justify-content-between d-flex p-4 py-5"
                          style={{ borderRadius: "5px" }}
                        >
                          <div className="pe-2">
                            <h4>Shipping Address</h4>
                            <h6>
                              {data?.Address?.first_name}{" "}
                              {data?.Address?.last_name},<br></br>
                              {data?.Address?.address},<br></br>
                              {data?.Address?.city}, {data?.Address?.region}{" "}
                              {data?.Address?.landmark
                                ? "(" + data?.Address?.landmark + ")"
                                : ""}
                              <br></br>
                              {data?.Address?.phone}
                              <br></br>
                            </h6>
                          </div>
                          <i>
                            <svg
                              width="136"
                              height="136"
                              viewBox="0 0 136 136"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="order-detail-svg"
                            >
                              <path
                                d="M113.335 45.3333H90.668C87.268 45.3333 85.0013 47.5999 85.0013 50.9999V90.6666H56.668V96.3333C56.668 99.7333 58.9346 102 62.3346 102H90.668C90.668 95.7666 95.768 90.6666 102.001 90.6666C108.235 90.6666 113.335 95.7666 113.335 102H119.001C122.401 102 124.668 99.7333 124.668 96.3333V73.6666L113.335 45.3333Z"
                                fill="black"
                              />
                              <path
                                opacity="0.3"
                                d="M113.332 102C113.332 108.233 108.232 113.333 101.999 113.333C95.7654 113.333 90.6654 108.233 90.6654 102C90.6654 95.7667 95.7654 90.6667 101.999 90.6667C108.232 90.6667 113.332 95.7667 113.332 102ZM84.9987 22.6667C84.9987 19.2667 82.732 17 79.332 17H16.9987C13.5987 17 11.332 19.2667 11.332 22.6667V73.6667C11.332 77.0667 13.5987 79.3333 16.9987 79.3333H84.9987V22.6667ZM33.9987 90.6667C27.7654 90.6667 22.6654 95.7667 22.6654 102C22.6654 108.233 27.7654 113.333 33.9987 113.333C40.232 113.333 45.332 108.233 45.332 102C45.332 95.7667 40.232 90.6667 33.9987 90.6667Z"
                                fill="#F4AC3D"
                              />
                            </svg>
                          </i>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6">
                        <div className="bg-grey p-4 rounded-2">
                          <h4 className="f-700">
                            Order Details (#A5{data.id})
                          </h4>
                          <div className="w-100 d-flex justify-content-between align-items-center border-bottom py-2">
                            <span>
                              <i className="me-2">
                                <img src="../assets/img/file-earmark-text.png" />
                              </i>{" "}
                              Invoice Id
                            </span>
                            <span>
                              <h6>#A5{data.id}</h6>
                            </span>
                          </div>
                          <div className="w-100 d-flex justify-content-between align-items-center border-bottom py-2">
                            <span>
                              <i className="me-2">
                                {" "}
                                <img src="../assets/img/truck.png" />
                              </i>{" "}
                              Payment Method
                            </span>
                            <span>
                              <h6>{data?.payment_method}</h6>
                            </span>
                          </div>

                          <div className="w-100 d-flex justify-content-between align-items-center py-2">
                            <span>
                              <i className="me-2">
                                <img src="../assets/img/order_bag.png" />
                              </i>{" "}
                              Order Id
                            </span>
                            <span>
                              <h6>#{data?.id}</h6>
                            </span>
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
                      <div className="col-12 text-end mt-4">
                         {data?.status != 'cancelled' && 
                          <select value={data?.status} disabled={loadingnew ? true : false} className="select_procs_del" onChange={handleStatusChange}>
                            <option value="inprocess">In Process</option>
                            <option value="awb_generated">AWB Number Generated</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="order_rejected">Order Rejected</option>
                            <option value="lost_transit">Lost in Transit</option>
                            <option value="order_accepted">Order Accepted</option>
                            <option value="in_transit">In Transit</option>
                            <option value="refund_closed">Refund Closed</option>
                            <option value="refund_initiated">Refund Initiated</option>
                            <option value="return_received">Return Received</option>
                            <option value="return_initiated">Return Initiated</option>
                            <option value="oup_payment_gateway">OUP Payment Gateway</option>
                            <option value="ready_dispatch">Ready for Dispatch</option>
                          </select>
                        }
                        &nbsp;
                        <Link to={"/invoice-details/" + data.id}>
                          <button className="btn btn-primary">
                            View Invoice
                          </button>
                        </Link>
                        &nbsp;
                        {data?.status != "cancelled" && (
                          <button
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            style={{ padding: "12px" }}
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="pb-4">
                        {data?.OrderItems && data?.OrderItems.length > 0
                          ? data?.OrderItems?.map((item, i) => (
                              <div
                                className="row order-details-sec py-lg-5 py-md-3 py-sm-2"
                                style={{ borderBottom: "1px solid #000000" }}
                              >
                                <div className="col-lg-3 col-md-6 col-sm-12">
                                  <div className="order-detail-img text-center">
                                    <img
                                      src={
                                        item.Product.file_path
                                          ? "opm-stream.onrender.com/" +
                                            item.Product.file_path
                                          : ""
                                      }
                                      alt="product"
                                      srcset=""
                                      width="200"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-5 col-md-6 col-sm-12">
                                  <div className="order-detail-title">
                                    {item.status == "inactive" && (
                                      <div className="address-tag bg-danger">
                                        Cancelled
                                      </div>
                                    )}
                                    {item?.status == "inactive" ? (
                                      <div className="cancel_reason">
                                        <b>Reason : </b>
                                        {item?.cancel_reason} {(item.cancel_by == 1 ? "(Admin)" : "(User)")}
                                      </div>
                                    ) : (
                                      ""
                                    )}

                                    <h3>{item?.Product?.name}{(item?.variant ? " - "+item?.variant : "")}</h3>
                                    <h4>KSh. {item?.price}</h4>
                                    {/* <div className="address-tag">
                                      4.6 <i class="fas fa-star"></i>
                                    </div> */}
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12">
                                  <div className="bg-grey p-4 rounded-2">
                                    <h4 className="f-700">Vendor Details</h4>
                                    <div className="w-100 d-flex justify-content-between align-items-center border-bottom py-2">
                                      <span>
                                        <i className="me-2">
                                          <img src="../assets/img/file-earmark-text.png" />
                                        </i>
                                        Vendor
                                      </span>
                                      <span>
                                        <h6>
                                          {item?.User?.name
                                            ? item.User.name
                                            : "Dan Wilson"}
                                        </h6>
                                      </span>
                                    </div>
                                    {/* <div className="w-100 d-flex justify-content-between align-items-center border-bottom py-2">
                                <span><i className="me-2"> <img src="../assets/img/truck.png"/>

                                </i>Email</span>
                                <span><h6>{item?.User?.email ? item.User.email : "dam@consilting.com"}</h6></span>
                            </div>

                            <div className="w-100 d-flex justify-content-between align-items-center py-2">
                                <span><i className="me-2">
                                <img src="../assets/img/order_bag.png"/>

                                </i> Phone</span>
                                <span><h6>{item?.User?.phone ? item.User.phone : "+6141 234 567"}</h6></span>
                            </div> */}
                                  </div>
                                </div>
                              </div>
                            ))
                          : ""}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-lg-6 m-auto">
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {data?.status != "cancelled" && (
              <CancelOrder data={data}></CancelOrder>
            )}
          </div>
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
