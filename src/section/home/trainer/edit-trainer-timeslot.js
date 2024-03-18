
import React, { useEffect, useState, Fragment } from "react";
import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';





const EditTrainerTimeSlot = () => {

  const today = new Date().toISOString().split('T')[0];

  const params = useParams()
  const navigate = useNavigate();
  const [trainerId, setTrainerId] = useState('');
  const [selectedDate,setSelectedDate] = useState('');
  const [message, setMessage] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [lessons, setLessons] = useState([]);
  const [trainerName,setTrainerName] = useState(" ");
  const [trainer,setTrainer] = useState([]);
  const [loading, setLoading] = useState(false);
  const[startTime,setStartTime] = useState('');
  const[endTime,setEndTime] = useState('');
  const [dateAndTime, setDateAndTime] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [schedule,setSchedule] = useState([]);
  const [data, setData] = useState([]);


  useEffect(() => {

    DataService.getLessons()
     .then(response => {
      setLessons(response.data.data);
     
     })
     .catch(error => {
      console.error("Error fetching lessons: ",error);
     })

  },[])

  useEffect(() => {

    DataService.getTrainer()
     .then(response => {
      console.log("Trainer API Response:", response.data);
      setTrainer(response.data.data);
      
     })
     .catch(error => {
      console.error("Error fetching trainer: ",error);
     })

  },[])




  React.useEffect(() => {
    document.title = "Dashboard";
    // getData();
  }, []);



  const onChangeLesson = (e) => {
    const selectedLessonName = e.target.value;
    //console.log(selectedLessonName);
    setLessonName(selectedLessonName);
    console.log(lessonName)

     // Call your lesson API with the selected lesson
     DataService.getLessons(selectedLessonName)
     .then(response => {
       // Handle the lesson details, e.g., update state
       console.log("Lesson details:", response.data);
     })
     .catch(error => {
       console.error("Error fetching lesson details:", error);
     });

  }
  


  const onChangeTrainer = (e) => {
    const selectedTrainerId = e.target.value;
    setTrainerId(selectedTrainerId);
  }

  useEffect(() => {
    // Find the selected trainer's name using the ID
    const selectedTrainer = trainer.find((train) => train && train._id && train._id.toString() === trainerId);
    const selectedTrainerName = selectedTrainer ? selectedTrainer.name : "";
    setTrainerName(selectedTrainerName);

    // Call your lesson API with the selected lesson
    DataService.getTrainer(selectedTrainerName)
      .then(response => {
        // Handle the lesson details, e.g., update state
        console.log("Lesson details:", response.data);
      })
      .catch(error => {
        console.error("Error fetching lesson details:", error);
      });
  }, [trainerId, trainer]);

  const getSingleLessonTrainer = async() => {
    await DataService.getSingleLessonTrainer(params.dateId, params.lessonId).then((data) => {
      console.log("API Response trainer:", data);

          setData(data.data);
          setLessonName(data.data.lesson);
          console.log("lesson Name : ",data.data.lesson);
          //setTrainerName(data.data.trainnerName);
          setTrainerId(data.data.trainnerId)
          console.log("Trainer Name : ",data.data.trainnerName);
          const dateObject = data.data.dateObject || {};
                  const dateAndTimeData = dateObject.timeSlots || [];
          
                  if (dateAndTimeData.length > 0) {
                    setSelectedDate(dateObject.date);
                    setStartTime(dateAndTimeData[0].startTime);
                    setEndTime(dateAndTimeData[0].endTime);
                  }
  
    });
  }
  
  
  
  useEffect(() => {
    console.log("Inside useEffect");
    getSingleLessonTrainer();
  }, [params.dateId, params.lessonId]);


  //const storedUserId = JSON.parse(localStorage.getItem("userId"));
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setMessage("");
//     const data = {
//       lesson: lessonName,
//       trainnerName:trainerName,
//         //userId:  storedUserId ,
//         dateAndTime: [],
//     };

//     //console.log("Data Object Before API Call:", data);
//     console.log("Lesson Name:", lessonName);
//     console.log("Trainer Name:", trainerName);

//     dateAndTime.forEach((entry, index) => {
//         data.dateAndTime.push({
//             date: entry.date,
//             timeSlots: [],
//         });

//         entry.timeSlots.forEach((timeSlot, timeIndex) => {
//             data.dateAndTime[index].timeSlots.push({
//                 startTime: timeSlot.startTime,
//                 endTime: timeSlot.endTime,
//             });
//         });
//     });

//     DataService.addTrainerTime(data)
//         .then(response => {
          
//             console.log("API Response:", response);
//             console.log("Data:", response.data);
//             navigate("/view-timeslot");
//             toast.success('Time Slot Added successfully', {
//               position: toast.POSITION.TOP_RIGHT
//           });
//           setLoading(false);

           
//         })
//         .catch(error => {
//             // Handle error
//             console.error("Error adding time slot:", error);
           
//         });
// };

const handleSubmit = (e) => {
  e.preventDefault();
  setMessage("");
  
  const data = {
    lesson: lessonName,
    trainnerName:trainerName,
    trainnerId: trainerId,
    dateAndTime: 
      {
        date: selectedDate,
        timeSlots: [
          {
            startTime: startTime,
            endTime: endTime,
          },
        ],
      },
  };


  DataService.updateTrainerTime(params.dateId, params.lessonId, data)
    .then(response => {
      // Handle success
      console.log(response.data);
      navigate("/view-timeslot");
      toast.success('Updated successfully', {
        position: toast.POSITION.TOP_RIGHT
    });
    setLoading(false);
    })
    .catch(error => {
      // Handle error
      console.error("Error updating time slots:", error);
    });
};

 

  return (
         <div className="scroll-container">
              <div className="main-form">
                <h2>Edit Time Slot</h2> 
                 <label className="me-3">Lesson</label>

                 <select
                  className="form-select me-3"
                  required
                  onChange={onChangeLesson}
                  value={lessonName}
                >
                  {lessons.map((lesson, index) => (
                    <option key={index} value={lesson.lessonName}>
                      {lesson.lessonName}
                    </option>
                  ))}
                 </select>



                <label className="me-3">Trainer Name</label>
                    <select
                      className="form-select me-3"
                      required
                      onChange={onChangeTrainer}
                      value={trainerId}
                    >
                      {trainer.map((train, index) => (
                        <option key={index} value={train._id}>

                          {train.name}
                        </option>
                        
                      ))}
                    </select>


                        <div>
                          <label className="me-3">Date</label>
                          <input
                           type="date"
                           id="date"
                           value={selectedDate}
                           className="form-control"
                           onChange={(e) => setSelectedDate(e.target.value)}
                           min={today}
                          /> 
                          <div className="mb-3 row">
                            <div className="col-sm-6">
                              <label className="me-3">Start Time</label>
                                  <input
                                  type="time"
                                  id="startTime"
                                  value={startTime}
                                  className="form-control"
                                  onChange={(e) => setStartTime(e.target.value)}
                                />
                          </div>
                          <div className="col-sm-6">
                          <label className="me-3">End Time</label>
                          <input
                           type="time"
                           id="endTime"
                           value={endTime}
                           className="form-control"
                           onChange={(e) => setEndTime(e.target.value)}
                          />  
                          </div>
                          </div>
                        </div>
                   

                       <button className="btn-submit" type="submit" onClick={handleSubmit}>

                            <span>Save</span>
                        </button>

            </div>
          </div>  

              
           
     
  );
};

export default EditTrainerTimeSlot;