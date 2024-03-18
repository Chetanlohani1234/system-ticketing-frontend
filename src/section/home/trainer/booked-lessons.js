import React, { useEffect, useState, Fragment } from "react";
import { Link } from 'react-router-dom';
import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';



const BookedLesson = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
   

  

    //const storedUserId = JSON.parse(localStorage.getItem("userId"));
    
    //console.log(storedUserId)
    
    const getData = () => {
        
        DataService.getAllBookedLesson()
 
         .then((data) => {
             console.log(data);
             setData(data?.data?.data);
             setLoading(false);
         })
         .catch((error) => {
             setLoading(false);
             setMessage(error?.response?.data?.msg);
         });
         
     };
     
     useEffect(() => {
         getData();

     }, []);
    
    //console.log(filteredData)


    return (
      <div className = "scrol-container">  

                   

        <div className="row">
            <ToastContainer></ToastContainer>
            <div className="col-md-12">
                <h4 className="f-700 mb-4">All Booked Lesson</h4>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
               
                <div className="col-lg-6 m-auto">
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                </div>
                <table class="table table-striped">
                    <thead style={{ whiteSpace: 'nowrap' }}>
                        <tr>
                        <th scope="col">Lesson Name</th>
                            <th scope="col">Trainer Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Athlete Name</th>
                            <th scope="col"> Improvement Goals</th>
                            <th scope="col">Date</th>
                            <th scope="col">TimeSlot</th>
                            <th scope="col" className="text-end">Action</th>


                        </tr>
                    </thead>
                    <tbody style={{ whiteSpace: 'nowrap' }} >
                        {data.map((lesson) =>
                            lesson.dateAndTime &&
                            lesson.dateAndTime.map((dateObj, index) =>
                            dateObj &&
                            dateObj.timeSlots &&
                            dateObj.timeSlots.map((timeSlot, i) => (
                                <tr key={i}>
                                {/* Display lesson name only for the first row */}
                                {i === 0 && (
                                    <td>{lesson.lessonName}</td>
                                    // <td  className="d-flex align-items-center" rowSpan={dateObj.timeSlots.length}>
                                    // {lesson.lessonName}
                                    // </td>
                                )}
                                {/* Display date, start time, and end time for each time slot */}
                                {/* <td>{lesson.lessonName}</td> */}
                                <td>{lesson.instructor}</td>
                                <td>{lesson.email}</td>
                                <td>{lesson.phoneNo}</td>
                                <td>{lesson.athleteName}</td>
                                <td>{lesson.athleteNeedsConcerns}</td>
                                <td>{dateObj.date}</td>
                                <td>{timeSlot.time}</td>

                                <td>
                                    <span className="booked-cell">Booked</span>
                                </td>
                                </tr>
                            ))
                            )
                        )}
                        </tbody>


                    
                </table>
            
            </div>


        </div>
      </div>  
    );
};

export default BookedLesson;
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
