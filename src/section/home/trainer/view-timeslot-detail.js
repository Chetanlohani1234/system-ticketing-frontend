import React, { useEffect, useState, Fragment } from "react";
import { Link, useParams } from 'react-router-dom';
import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


let page_no = 1;
let limit = 15;
let status = "";
const ViewTimeSlotDetail = () => {
    const params = useParams()
    const [data, setData] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    //const storedUserId = JSON.parse(localStorage.getItem("userId"));
    
    //console.log(storedUserId)
    
    const getData = () => {
        
       DataService.getAll()

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

    const onChangeSearch = (e) => {
         //getData();
        if (e.target.value) {
            const result = data.filter(value => {
                return value?.lessonName ? value.lessonName.toLowerCase().includes(e.target.value.toLowerCase()) : ''
            })
            setfilteredData(result)
        } else {
            setfilteredData(data)
        }

    }

    const deleteLesson  = (lesson,dateObj) =>{
        setLoading(true);
        console.log(lesson._id)
        console.log(dateObj._id)
        DataService.deleteLessonTrainer(lesson._id,dateObj._id).then(
            () => {
                toast.success('Lessson deleted successfully', {
                    position: toast.POSITION.TOP_RIGHT
                });
                setLoading(false);
                getData();
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
                <h4 className="f-700 mb-4">All TimeSlot</h4>
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
                    <thead>
                        <tr>
                            <th scope="col">Lesson Name</th>
                            <th scope="col">Trainer Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col" className="text-end">Action</th>


                        </tr>
                    </thead>
                    <tbody>
                    {data.map((lesson) => (
                // Use map to create a new row for each time slot
                        lesson.dateAndTime &&
                        lesson.dateAndTime.map((dateObj, index) =>
                        dateObj && dateObj.timeSlots && dateObj.timeSlots.map((timeSlot, i) => (
                            <tr key={i}>
                            {/* Display lesson name only for the first row */}
                            {i === 0 && (
                            
                               <td className="d-flex align-items-center" rowSpan={dateObj.timeSlots.length}>
                                {lesson.lesson}
                                </td>
                          
                               
                               
                            )}
                            {/* Display date, start time, and end time for each time slot */}
                            <td>{lesson.trainnerName}</td>
                            <td>{dateObj.date}</td>
                            <td>{timeSlot.startTime}</td>
                            <td>{timeSlot.endTime}</td>

                            <td width="150">
                                        <span className="d-flex justify-content-end">
                                       

                                        <Link to={"/edit-timeslot/" + (lesson._id+"/"+dateObj._id)} className="mx-2"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.8415 0.623009C13.0368 0.427747 13.3534 0.427747 13.5486 0.623009L16.5486 3.62301C16.7439 3.81827 16.7439 4.13485 16.5486 4.33012L6.54864 14.3301C6.50076 14.378 6.44365 14.4157 6.38078 14.4408L1.38078 16.4408C1.19507 16.5151 0.982961 16.4715 0.84153 16.3301C0.700098 16.1887 0.656561 15.9766 0.730845 15.7909L2.73084 10.7909C2.75599 10.728 2.79365 10.6709 2.84153 10.623L12.8415 0.623009ZM11.9022 2.97656L14.1951 5.26946L15.488 3.97656L13.1951 1.68367L11.9022 2.97656ZM13.488 5.97656L11.1951 3.68367L4.69508 10.1837V10.4766H5.19508C5.47123 10.4766 5.69508 10.7004 5.69508 10.9766V11.4766H6.19508C6.47123 11.4766 6.69508 11.7004 6.69508 11.9766V12.4766H6.98798L13.488 5.97656ZM3.72673 11.152L3.62121 11.2575L2.09261 15.079L5.9141 13.5504L6.01963 13.4449C5.83003 13.3739 5.69508 13.191 5.69508 12.9766V12.4766H5.19508C4.91894 12.4766 4.69508 12.2527 4.69508 11.9766V11.4766H4.19508C3.98068 11.4766 3.79779 11.3416 3.72673 11.152Z" fill="#2166a5" />
                                        </svg>
                                        </Link>
                                        
                                        

                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteLesson(lesson,dateObj)} style={{ cursor: 'pointer', color: "#ED5E68", marginLeft: '5%' }} />

                                       
                                    </span></td>

                                </tr>
                                    ))
                                    )
                                  ))}

                            
                            {/* : !loading && (
                                <div
                                    className="container text-center no-padding"
                                    style={{ padding: "100px" }}
                                >
                                    <div className="col-lg-6 m-auto">
                                        <p className="data_not_found">No data found</p>
                                    </div>
                                </div>
                            ) */}
                    </tbody>
                </table>
            
            </div>


        </div>
    );
};

export default ViewTimeSlotDetail;