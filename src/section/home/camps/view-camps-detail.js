import React, { useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

const ViewCampsDetails = (props) => {
    const form = React.useRef();
    
 
    return (
        <div className="row">
            <div className="col-md-12">
                <h3>Camp Details</h3>
                <div className="row">
                    <div className="col-md-8">
                        <table class="table table-bordered tf-12 product-detail">
                            <thead class="table-secondary">
                                <tr>
                                    <th scope="col" class="f-700 w-50">Location</th>
                                    <th scope="col">{props.data.location}</th>
                                </tr>
                            </thead>
                            <tbody>
                              
                                <tr>
                                    <td class="f-700">Camp Name</td>
                                    <td>{props.data.campName}</td>
                                </tr>
                                
                                <tr>
                                    <td class="f-700">Camp Type</td>
                                    <td>{props.data.type}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Email</td>
                                    <td>{props.data.email}</td>
                                </tr>
                            
                                <tr>
                                    <td class="f-700">Phone Number</td>
                                    <td>{props.data.phoneNo}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Age Group</td>
                                    <td>{props.data.ageGroup}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Gender</td>
                                    <td>{props.data.gender}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Birth Year</td>
                                    <td>{props.data.birthYear}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Skill Level</td>
                                    <td>{props.data.skillLevel}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Position</td>
                                    <td>{props.data.position}</td>
                                </tr>
                                <tr>
                                    <td class="f-700">Improvement Goals</td>
                                    <td>{props.data.improvementGoals}</td>
                                </tr>
                               

                            </tbody>
                        </table>

          
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default ViewCampsDetails;