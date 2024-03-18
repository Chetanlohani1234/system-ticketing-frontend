
import React, { useEffect, useState, Fragment } from "react";
import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

//import dashboard_section from "../Dashboard/dashboard_section";



const TrainerTimeSlot = () => {

  const today = new Date().toISOString().split('T')[0];

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


  // useEffect(() => {
  //   document.title = "Trainers";
  //   getData();
  // }, []);

  // const getData = () => {
  //   DataService.getTrainer().then((data) => {
  //     setData(data?.data?.data);
  //     setfilteredData(data?.data?.data);
  //     setLoading(false);
  //   });
  // };


  useEffect(() => {
    // Update dateAndTime state when schedule changes
    const newDateAndTime = schedule.map(slot => ({
        
        date: slot.selectedDate,
        timeSlots: [
            {
                startTime: slot.startTime,
                endTime: slot.endTime
            }
            // Add more time slots if needed
        ]

    }));
    setDateAndTime(newDateAndTime);
}, [schedule]);



  React.useEffect(() => {
    document.title = "Dashboard";
    // getData();
  }, []);

  const addTimeSlot = () => {
    const newTimeSlot = { selectedDate, startTime, endTime };
    setSchedule([...schedule, newTimeSlot]);
};

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
    console.log("Selected Trainer ID:", selectedTrainerId);
  
   // Find the selected trainer's name using the ID
   const selectedTrainer = trainer.find((train) => train && train._id && train._id.toString() === selectedTrainerId);
   const selectedTrainerName = selectedTrainer ? selectedTrainer.name : "";
   
   // Update the trainerName state with the selected trainer's name
     setTrainerName(selectedTrainerName);
     console.log("Selected Trainer Name: ", selectedTrainerName);


    
     

     // Call your lesson API with the selected lesson
     DataService.getTrainer(selectedTrainerName)
     .then(response => {
       // Handle the lesson details, e.g., update state
       console.log("Lesson details:", response.data);
     })
     .catch(error => {
       console.error("Error fetching lesson details:", error);
     });

  }


  
  

  




  //const storedUserId = JSON.parse(localStorage.getItem("userId"));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    const data = {
      lesson: lessonName,
      trainnerName:trainerName,
      trainnerId: trainerId,
        //userId:  storedUserId ,
        dateAndTime: [],
    };

    //console.log("Data Object Before API Call:", data);
    console.log("Lesson Name:", lessonName);
    console.log("Trainer Name:", trainerName);
    console.log("Lesson Id:",trainerId);

    dateAndTime.forEach((entry, index) => {
        data.dateAndTime.push({
            date: entry.date,
            timeSlots: [],
        });

        entry.timeSlots.forEach((timeSlot, timeIndex) => {
            data.dateAndTime[index].timeSlots.push({
                startTime: timeSlot.startTime,
                endTime: timeSlot.endTime,
            });
        });
    });

    DataService.addTrainerTime(data)
        .then(response => {
          
            console.log("API Response:", response);
            console.log("Data:", response.data);
            navigate("/view-timeslot");
            toast.success('Time Slot Added successfully', {
              position: toast.POSITION.TOP_RIGHT
          });
          setLoading(false);

           
        })
        .catch(error => {
            // Handle error
            console.error("Error adding time slot:", error);
            // Uncomment the following line if you want to show error messages
            // toast.error('Error adding time slot', {
            //     position: toast.POSITION.TOP_RIGHT,
            //     autoClose: 2000
            // });
        });
};

  


  const timeSlot = () => {
    let date, startTime, endTime;
  
    // Assign values to date, startTime, and endTime
    date = document.getElementById('date').value;
    startTime = document.getElementById('startTime').value;
    endTime = document.getElementById('endTime').value;
  
    if (selectedDate !== undefined && startTime !== undefined && endTime !== undefined) {
      // Check if the selected time slot already exists
      const existingDateEntry = dateAndTime.find(entry => entry.date === selectedDate);
  
      if (existingDateEntry) {
        const timeSlotExists = existingDateEntry.timeSlots.some(slot =>
          slot.startTime === startTime && slot.endTime === endTime
        );
  
        if (timeSlotExists) {
          alert('This time slot is already selected for this date Select another Time Slot.');
          return; // Don't proceed further if the time slot already exists
        }
      }
  
      if (date && startTime && endTime) {
        addTimeSlot(selectedDate, startTime, endTime);
      } else {
        alert('Please enter Date and time');
      }
  
      // Reset the input fields
      setStartTime("");
      setEndTime("");
      setSelectedDate("");
  
    } else {
      alert('Please enter Date and time');
    }
  };

  const handleEdit = (index) => {
    // Set the editing index and prefill the inputs
    setIsEditMode(true);

    const slot = dateAndTime[index];
  
    if (slot) {
        // Check if both the date and time slots exist
        setSelectedDate(slot.date);
        setStartTime(slot.timeSlots[0]?.startTime || "");
        setEndTime(slot.timeSlots[0]?.endTime || "");
    } else {
        // Handle the case where the slot doesn't exist
        console.error(`Invalid slot data at index ${index}`);
    }
  
  
    setEditingIndex(index);

  };

const deleteLesson = (index) => {
    // Clear the editing state
    const updatedDateTime = [...dateAndTime];
    updatedDateTime.splice(index,1);
    setDateAndTime(updatedDateTime);
    setSelectedDate("");
    setStartTime("");
    setEndTime("");
    setIsEditMode(false);
  };


  const saveEdit = () => {
    // Implement the save logic
    const updatedDateTime = [...dateAndTime];
    updatedDateTime[editingIndex] = {
      date: selectedDate,
      timeSlots: [{ startTime, endTime }],
    };
   // console.log(updatedDateTime);
    setDateAndTime(updatedDateTime);
    

    // Clear the editing state
    setEditingIndex(null);
    setSelectedDate("");
    setStartTime("");
    setEndTime("");
    setIsEditMode(false);
    // Reset mode to "add"
    //setMode("add");
  };

 

  return (
         <div className="scroll-container">
              <div className="main-form">
                <h2>Add Time Slot</h2> 
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
                    
                        
                        {!isEditMode && (
                            <button className="btn btn-secondary" onClick={timeSlot}>Add Time Slot</button>
                        )}
                        {isEditMode && (
                            <button className="btn btn-secondary" onClick={saveEdit}>Save</button>
                        )}

                       {/* <button className="btn-submit">Submit</button> */}
                       <ul style={{ listStyle: "none" }}>
                            {dateAndTime.map((slot, index) => (
                            <li key={index}>
                                Date: {slot.date}, Time: {slot.timeSlots[0]?.startTime} - {slot.timeSlots[0]?.endTime}
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(index)} style={{ cursor: 'pointer', color: "#2596be", marginLeft: '32%' }} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteLesson(index)} style={{ cursor: 'pointer', color: "#ED5E68", marginLeft: '5%' }} />
                            </li>
                          ))}
                        </ul>

                       <button className="btn-submit" type="submit" onClick={handleSubmit}>

                            <span>Submit</span>
                        </button>

                       


                       

                       

            </div>
          </div>  

              
           
     
  );
};

export default TrainerTimeSlot;