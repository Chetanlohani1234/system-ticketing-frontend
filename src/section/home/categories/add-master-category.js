import React, { useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const styles = {
    input: {
        opacity: '0%', // dont want to see it
        position: 'absolute' // does not mess with other elements 
    }
}
const AddMasterCategorySection = () => {
    const form = useRef();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const inputFileRef = React.useRef(); 
    const imgRef = React.useRef(); 
    const navigate = useNavigate();
    const onFileChangeCapture = ( e)=> {
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
    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };
    const triggerFile = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
      };

   
   
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
    
        const data = {
            name: name,
            //parentId:parentId,
            type: 0,
            // Add other fields as needed
        };
    
        DataService.addCategory(data).then(
            () => {
                // navigate("/master-categories");
                // window.location.reload();
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
    };
    
    return (
        <div className="container-fluid">
             <ToastContainer></ToastContainer>
            <div className="row">
                <div className="d-flex w-100 justify-content-between align-items-center mb-4">
                    <h4 className="mb-0 f-700">Add Master Category</h4>
                   
                </div>
                <form onSubmit={handleSubmit} className="mt-4 login" ref={form}>
                    {message && (
                            <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                            </div>
                        )}
    

                <div className="col-xxl-9 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">

                                <div className="mb-4">
                                    <input 
                                    type="text" 
                                    required
                                    className="form-control my-4" 
                                    onChange={onChangeName}
                                    placeholder="Enter Master Category Name"/>
                                </div>
                                <div className="d-flex justify-content-start btn-min-width">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Save</span>
                                </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
              </form>

            </div>
        </div>
    );
};

export default AddMasterCategorySection;