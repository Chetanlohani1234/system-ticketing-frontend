import React, {useEffect, useState, useRef } from "react";
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
const AddCategorySection = () => {
    const form = useRef();
    const [name, setName] = useState("");
    const [parentId, setparentId] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const inputFileRef = React.useRef(); 
    const imgRef = React.useRef(); 
    const navigate = useNavigate();
    const [mastercategory, setAData] = useState([]);
    //console.log(props)

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = () => {
        DataService.getCategory('0').then((data) => {
            const masterCatData = data.data.categories.filter(value => (value.status==='active'))
            setAData(masterCatData);
            console.log(masterCatData)
        });
    }
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
    const handleChange = (e) => {
        const parentId = e.target.value;
        setparentId(parentId);
    };
    const triggerFile = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
      };

    const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const data = new FormData();
    if(file && file.length>0){
        data.append('image', file[0])
    }
    data.append('name',name);
    data.append('parentId',parentId)
    data.append('type',1)
    DataService.addCategory(data).then(
        () => {
        navigate("/categories");
            window.location.reload();
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
                    <h4 className="mb-0 f-700">Add Category</h4>
                   
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 login" ref={form}>
                    {message && (
                            <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                            </div>
                        )}
                <div className="row">
                    <div className="col-xxl-3 col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text=center">
                                <h4 className="f-700">Thumbnail</h4>
                                <div className="Delete-image"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.410582 0.410749C0.736019 0.0853125 1.26366 0.0853125 1.58909 0.410749L5.99984 4.82149L10.4106 0.410749C10.736 0.0853125 11.2637 0.0853125 11.5891 0.410749C11.9145 0.736186 11.9145 1.26382 11.5891 1.58926L7.17835 6.00001L11.5891 10.4108C11.9145 10.7362 11.9145 11.2638 11.5891 11.5893C11.2637 11.9147 10.736 11.9147 10.4106 11.5893L5.99984 7.17852L1.58909 11.5893C1.26366 11.9147 0.736019 11.9147 0.410582 11.5893C0.0851447 11.2638 0.0851447 10.7362 0.410582 10.4108L4.82133 6.00001L0.410582 1.58926C0.0851447 1.26382 0.0851447 0.736186 0.410582 0.410749Z" fill="black" />
                                </svg>
                                </div>
                                <div className="Product-thumbnail" onClick={triggerFile}>
                                    <img src="../assets/img/img-placeholder.svg"  ref={imgRef} />
                                </div>

                                <p className="text-center">Set the product thumbnail image. Only
                                    *.png, *.jpg and *.jpeg image files
                                    are accepted</p>
                            </div>
                                <input
                                    type="file"
                                    ref={inputFileRef}
                                    style={styles.input}
                                    onChangeCapture={onFileChangeCapture}
                                />
                        </div>

                       
                    </div>
                    <div className="col-xxl-9 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">

                                <div className="mb-4">
                                <label className="form-label">Select Master Category</label>
                                    <select required className="form-select" onChange={handleChange} >
                                        <option value="">Select Master Category</option>
                                    {mastercategory && mastercategory.length > 0
                        ? mastercategory.map((item, i) => (
                                        <><option value= {item._id}>{item.name}</option></>
                                        ))
                                        : ""} 
                                    </select>
                                    <input 
                                    type="text" 
                                    required
                                    className="form-control my-4" 
                                    onChange={onChangeName}
                                    placeholder="Enter Category Name"/>
                                </div>
                                <div className="d-flex justify-content-end btn-min-width">
                                <button className="btn btn-primary" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Save</span>
                                </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddCategorySection;