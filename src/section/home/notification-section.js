import React, { Fragment } from "react";
import { format } from 'date-fns'

const NotificationSection = (props) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-8 col-md-12">
                    <h4 className="f-700">Notification</h4>
                    <ul className="notifications mt-5">
                    {props.data && props.data.length > 0
                        ? props.data.map((item, i) => (
                            <>
                            <li>
                                <figure className="img-circle me-3 mb-0"><img src='../assets/img/Bell.png' alt='profie image' /></figure>
                                <div className="w-100">
                                    <p className="mb-0">{item.message}</p>
                                    {/* <p className="text-end mb-0"><small>{format ( new Date(item.createdAt), 'd MMMM Y')}</small></p> */}
                                </div>
                            </li>

                            </>
                        ))
                        :
                        <>
                         <li>
                            <div className="no_product_main">
                                <p>You have no pending notifications</p>
                            </div>
                        </li>
                        </>
                    }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NotificationSection;