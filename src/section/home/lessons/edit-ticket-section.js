import React, { useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import TagsInput from '../../../common/TagsInput'
import 'react-toastify/dist/ReactToastify.css';
const styles = {
    input: {
        opacity: '0%', // dont want to see it
        position: 'absolute' // does not mess with other elements 
    }
}
const MAX_COUNT = 5;
//const serverUrl = 'opm-stream.onrender.com/'

let oldImages = [];
const EditTicketSection = () => {
    const params = useParams()
    const editorRef = useRef(null);
    const form = React.useRef();


    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [priority,setPriority] = useState("");

    const [eventName, setEventName] = useState("");

    const [location, setLocation] = useState("");
    const [attendies, setAttendies] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");
    const [reviews, setReviews] = useState("");
    

    const [lessonId, setLessonId] = useState("");
    const [message, setMessage] = useState("");
    const [details, setDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const inputFileRef = React.useRef();
    const imgRef = React.useRef();
    const navigate = useNavigate();
    const [allActive, setAllActive] = useState(false);
    const [type, setType] = useState('');
    const [data, setData] = useState('');



    const getSinglelesson = () => {
        DataService.getSingleTicket(params.id).then((data) => {
            setData(data?.data?.data);
            setHeading(data?.data?.data?.heading);
            setCategory(data?.data?.data?.category);
            setPriority(data?.data?.data?.priority);
            setDescription(data?.data?.data?.description)
            
            setLoading(false);
        });
    };
    console.log("Data:",data)
    useEffect(() => {
        getSinglelesson();
    }, [params.id])

    const onFileChangeCapture = (e) => {
        /*Selected files data can be collected here.*/
        const file = e.target.files[0]
        setFile(e.target.files)
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = function (theFile) {
            var image = new Image();
            image.src = theFile.target.result;
            imgRef.current.src = image.src

        }
    };
    const handleUploadedFiles = files => {
        const uploaded = (uploadedFiles ? uploadedFiles : []);
        let limitExceeded = false;
        let imageSrc = [];
        if (images.length) {
            images.map((img, i) => {
                imageSrc.push(img)
            });
        }
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                const reader = new FileReader();
                const url = reader.readAsDataURL(file);
                reader.onloadend = function (theFile) {
                    var image = new Image();
                    image.src = theFile.target.result;
                    imageSrc.push(image.src)
                }
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    toast.error(`You can only uploaded a maximun of ${MAX_COUNT} files`, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setFileLimit(true);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) {
            setUploadedFiles(uploaded);
            setImages(imageSrc);

        }
    }
    const onFileChangeCaptureMultiple = (e) => {
        const choosenFiles = Array.prototype.slice.call(e.target.files);
        handleUploadedFiles(choosenFiles)
    }

    const triggerFile = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };

    const onChangeCategory = (e) => {
        const category = e.target.value;
        setCategory(category);
    };

    const onChangeName = (e) => {
        const heading = e.target.value;
        setHeading(heading);
    };

    const onChangePriority = (e) => {
        const priority = e.target.value;
        setPriority(priority);
    };



    const storedUserId = JSON.parse(localStorage.getItem("userId"));

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        const data = new FormData();
        if (file && file.length > 0) {
            setLoading(true);
            data.append('image', file[0])
            if (uploadedFiles && uploadedFiles.length > 0) {
                uploadedFiles.some((file) => {
                    data.append('image', file)
                })
            }
            data.append('category',category);
            data.append('heading', heading);
           //data.append('description', editorRef.current.getContent());
            data.append('description', description);

            data.append('priority', priority);
           // data.append('ownerId',storedUserId);

            DataService.updateTicket(params.id,data).then(
                () => {
                    toast.success('Ticket Updated successfully', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(() => {
                        navigate("/ticket");
                        window.location.reload();
                    }, 2000); // Adjust the delay time as needed
                },
                    
                    //navigate("/ticket");
                    //window.location.reload();

                //},
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
        } else {
            toast.error('Please select Ticket thumbnail', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    return (


        <div className="container-fluid">
            <ToastContainer></ToastContainer>

                <div className="row">
                    {/* <div className="col-xxl-3 col-lg-4">
                    <div className="card mb-4">
                    </div>

                    </div> */}

                   <div className="col-xxl-7 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">
                                {heading} {"   "} 
                                {new Date(data.createdAt).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}<br/><br/>
                                {description}
                            </div>
                       </div>
                    </div>


                    <div className="col-xxl-5 col-lg-4 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">
                                <h5>Ticket Status:</h5>

                                <div className="mb-3">
                                <label className="form-label">Category:</label>
                                    <select
                                        className="form-select"
                                        required
                                        value={category}
                                        onChange={onChangeCategory}
                                        style={{ width: '150px', height: '40px', backgroundColor: 'lightgray', border: '1px solid gray', display: 'inline-block',marginLeft:'25px' }}

                                    >
                                        <option value="" disabled selected>Select Category</option>
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>

                               <div className="mb-3">
                                <label className="form-label">Priority:</label>
                                <select
                                    className="form-select"
                                    required
                                    value={priority}
                                    onChange={onChangePriority}
                                    style={{ width: '150px', height: '40px', backgroundColor: 'lightgray', border: '1px solid gray', display: 'inline-block',marginLeft:'40px' }}
                                >

                                
                                    <option value="" disabled selected>Select Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                    {/* Add more options as needed */}
                                </select>
                                </div>


                            </div>
                       </div>
                    </div>

                    
                    <div className="col-xxl-7 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">
                            <Editor
                                apiKey="1nolfd56snnawdzchbfmu06ihvzd2nkhvgvdj5i85do1bws6"
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue=" "
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    ],
                                    toolbar:
                                    "undo redo | blocks | " +
                                    "bold italic forecolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                    content_style: "body { font-size:14px }",
                                }}
                />
                            </div>
                       </div>
                    </div>

                    <div className="col-xxl-5 col-lg-4 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">
                              <div className="mb-3">
                                <h4>Ticket Details</h4><br/>
                                <h6 style={{fontSize:'15px'}}>Tracking ID:{data._id}</h6>
                                <h6 style={{fontSize:'15px'}}>Created on: {data.createdAt}</h6>
                                <h6 style={{fontSize:'15px'}}>Updated: {data.updatedAt}</h6>
                              </div>   

                            </div>
                       </div>
                    </div>

                </div>
        </div>
       
    );
};

export default EditTicketSection;