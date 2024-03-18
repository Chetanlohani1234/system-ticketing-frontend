import React, {useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const styles = {
    input: {
        opacity: '0%', // dont want to see it
        position: 'absolute' // does not mess with other elements 
    }
}

const EditCategory = () => {
    const form = useRef();
    const [name, setName] = useState("");
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [parentId, setparentId] = useState('');
    const [mastercategory, setAData] = useState([]);
    const [file, setFile] = useState(null);
    const inputFileRef = React.useRef();
    const imgRef = React.useRef();
    const params = useParams();
    useEffect(() => {
        getData();
    }, []);

    const getData = async() => {
        await DataService.getCategory('0').then((data) => {
            const masterCatData = data.data.categories.filter(value => (value.status==='active'))
            setAData(masterCatData);
        });
        
        await DataService.getCategoryDetail(params.id).then((data) => {
                setName(data?.data?.category?.name)
                setData(data?.data?.category);   
        });
    }
   
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

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };
    const onChangeStatus = (e) => {
        const data = e.target.value;
        setStatus(data);
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
        setLoading(true);
        const data = new FormData();
        data.append('name',name)
        if(status){
            data.append('status',status)
        }
        if(parentId){
            data.append('parent_id',parentId)
        }
        if(file && file.length>0){
            data.append('image', file[0])
        }
        
        DataService.updateCategory(data, params.id).then(
            () => {
                setLoading(false);
                    toast.success('Data updated successfully !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
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
        <div className="row mt-5">
            <ToastContainer></ToastContainer>
            <form onSubmit={handleSubmit}  ref={form}>
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
                                {(data.image ? 
                                    <img src={data.image.filePath} ref={imgRef} alt={data.name} />
                                : <img src="../assets/img/img-placeholder.svg" ref={imgRef} alt="product" />
                                )}
                                </div>

                                <p className="text-center">Set the category thumbnail image. Only
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
                        <div class="mb-3">
                            <label class="form-label">Change Status</label>
                            <select key={data?.status} defaultValue={data?.status} className="form-select" onChange={onChangeStatus}>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Active">Active</option>                                  
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Master Categories Name</label>
                            <select required key={data?.parent_id} defaultValue={data?.parent_id} className="form-select" onChange={handleChange} >
                                            <option value="">Select Master Category</option>
                                        {mastercategory && mastercategory.length > 0
                            ? mastercategory.map((item, i) => (
                                            <><option value= {item._id}>{item.name}</option></>
                                            ))
                                            : ""} 
                                        </select>
                        
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Categories Name</label>
                            <input 
                            type="text" 
                            class="form-control"
                            required 
                            defaultValue={data.name}
                            onChange={onChangeName} 
                            placeholder="Enter category name" />
                        </div>
                        <div class="mb-3">
                            <button className="btn btn-primary" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditCategory;