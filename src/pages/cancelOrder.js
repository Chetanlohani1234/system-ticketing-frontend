import React, {useEffect, useState, useRef } from "react";
import DataService from "../services/data.service";
import { toast } from 'react-toastify';

let ids = [];

const CancelOrder = (props) => {

    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [cancelItems, setCancelItems] = useState([]);
    const [reason, setReason] = useState("");

    const itemsChange = (e)=>{
        ids = [];
        const chk = document.querySelectorAll(".form-check-input:checked");
        chk.forEach(element => {
          if (ids.indexOf(element.value) <= -1) {
            ids.push(element.value)
          }
        })
        setCancelItems(ids)
    }

    const onChangeReason = (e)=>{
        setReason(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(ids.length > 0){
            setLoading(true);
            const data = {};
            data.items =  ids;
            data.reason = reason;
            DataService.cancelOrder(data, props.data.id).then(
                () => {
                    setLoading(false);
                    toast.success('Order cancelled!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500);
                
                setLoading(false);
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
        }else{
            toast.error("Please select the item(s) you want to cancel.", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
      };
  return (
    
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-md">
        <div className="modal-content">
            <div className="modal-header border-0">
                <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}  ref={form}>
                <div className="modal-body px-3 px-lg-5">
                    <div class="d-flex justify-content-between align-items-start align-items-md-center flex-column flex-md-row border-bottom">
                        <div><h2 className="fw-bold">Cancel Order</h2></div>
                    </div>

                    {props.data.OrderItems && props.data.OrderItems.length > 0
                        ? props.data.OrderItems.map((item, i) => (
                            <div className="select-address-list d-flex align-items-center relative">
                                
                                <label className="form-check-label w-100 cursor-pointer" htmlFor={item.id}>
                                    <div className="d-flex align-items-top mt-3 p-3 address-main border-bottom rounded-0">
                                        <div className="flex-grow-1">
                                            <div className="d-flex">
                                                <div className="phone-number">
                                                    <div className="radio-btn" style={{left: 0}}>
                                                        <input className="form-check-input radio" disabled={item.status === 'inactive' ? true : false} onChange={itemsChange} type="checkbox" name="items" id={item.id}  value={item.id}  />
                                                        <span className="checkmark" ></span>
                                                    </div>
                                                 </div>
                                                <div className="phone-number" style={{marginLeft: '30px', marginRight: '15px'}}>
                                                    <img src={item.Product.file_path ? "opm-stream.onrender.com/" + item.Product.file_path : ""} alt="product" srcset="" width="50" />
                                                </div>
                                                <div className="place-name" style={{fontSize: '18px'}}>
                                                    {item?.Product?.name}{(item?.variant ? " - "+item?.variant : "")}
                                                   <br></br> 
                                                   <span style={{fontSize: '14px'}}>
                                                    {item.status == 'active' && `KSh. ${item?.price}`}
                                                    {item.status == 'inactive' &&  <div className="address-tag bg-danger">Cancelled</div>}
                                                   </span>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        )):""
                    }
                    <br></br>
                    <div className="col-lg-12 mb-3">
                        <label>Reason for Cancellation:</label>
                        <input 
                        type="text"
                        required
                        onChange={onChangeReason}
                        className="form-control bg-light-grey border-0 rounded-0 f-16" 
                        placeholder="Type reason" />
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-end">
                    <button  type="submit" className="btn btn-primary px-5" disabled={loading} >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Submit</span>
                    </button>
                </div>
            </form>

        </div>
    </div>
</div>
  );
};

export default CancelOrder;