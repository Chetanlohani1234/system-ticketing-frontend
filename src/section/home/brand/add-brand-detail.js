import React, {useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate } from "react-router-dom";
const AddBrandDetail = () => {
    const form = useRef();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category_ids, setCategoryIds] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [mastercategory, setAData] = useState([]);
    const inputFileRef = React.useRef(); 
    const imgRef = React.useRef(); 
    const navigate = useNavigate();
    //console.log(props)

    useEffect(() => {
        getCategory()
    }, []);

    const getCategory = () => {
        DataService.getCategory('0').then((data) => {
            const masterCatData = data.data.categories.filter(value => (value.status==='Active'))
            setAData(masterCatData);
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

    const handleChangeCategory = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setCategoryIds(value);
    };
  
    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    }
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
        data.append('category_ids', category_ids);
        data.append('description',description)
        DataService.addBrand(data).then(
            () => {
            navigate("/brand");
              window.location.reload();
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setLoading(false);
              setMessage(resMessage);
            }
          );
      };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="d-flex w-100 justify-content-between align-items-center mb-4">
                    <h4 className="mb-0 f-700">Add New Brands</h4>

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
                    <div className="col-md-12">
                        <div className="card mb-5">
                            <div className="card-body p-4">
                               <div className="mb-4">
                                    <label className="form-label">Brand Name</label>
                                    <input 
                                    type="text" 
                                    required
                                    className="form-control"
                                    onChange={onChangeName} 
                                    placeholder="Enter Brand Name" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Select Categories</label>
                                    <select  style={{height:'200px'}} required className="form-select" multiple onChange={handleChangeCategory}>
                                        {mastercategory && mastercategory.length > 0
                                        ? mastercategory.map((item, i) => (
                                            <><option value={item.id}>{item.name}</option></>
                                        ))
                                        : ""}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Description</label>
                                    <textarea 
                                    className="form-control" 
                                    rows={"5"} 
                                    onChange={onChangeDescription}
                                    placeholder="Description"/>
                                </div>                               
                                <div className="mb-4">
                                <div className="add_brandUpload">
                                    <div className="upload-box">
                                        <i><svg width="47" height="39" viewBox="0 0 47 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M32 27.5L24 19.5L16 27.5" stroke="#F4AC3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M24 19.5V37.5" stroke="#F4AC3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M40.7799 32.28C42.7306 31.2165 44.2716 29.5337 45.1597 27.4972C46.0477 25.4607 46.2323 23.1864 45.6843 21.0334C45.1363 18.8803 43.8869 16.971 42.1333 15.6069C40.3796 14.2427 38.2216 13.5014 35.9999 13.5H33.4799C32.8745 11.1585 31.7462 8.98464 30.1798 7.14195C28.6134 5.29927 26.6496 3.83567 24.4361 2.86118C22.2226 1.8867 19.817 1.42669 17.4002 1.51573C14.9833 1.60478 12.6181 2.24057 10.4823 3.3753C8.34649 4.51003 6.49574 6.11417 5.06916 8.06713C3.64259 10.0201 2.6773 12.271 2.24588 14.6508C1.81446 17.0305 1.92813 19.477 2.57835 21.8065C3.22856 24.136 4.3984 26.2877 5.99992 28.1" stroke="#F4AC3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M32 27.5L24 19.5L16 27.5" stroke="#F4AC3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        </i>

                                        <div className="ms-3">
                                            <h5>Select a file or drag and drop here</h5>
                                            <p className="mb-0 text-secondary">JPG, PNG or PDF, file size no more than 10MB</p>
                                        </div>
                                        <div class="upload-btn-wrapper ms-auto ms-3">
                                            <button class="btn-file">Select file</button>
                                            <input
                                            type="file" 
                                            name="myfile"
                                            accept="image/*"
                                            required
                                            ref={inputFileRef}
                                            onChangeCapture={onFileChangeCapture}
                                             />
                                        </div>
                                    </div>
                                    <div className="Product-thumbnail" onClick={triggerFile}>
                                    <img src="../assets/img/default_image.png" className="w-100" ref={imgRef} />
                                </div>
                                </div>
                                    <p style={{textAlign: 'right',marginTop: '15px'}}><strong>Note:</strong> Recommended Size: 260 X 144</p>
                                </div>

                                <div className="d-flex justify-content-start btn-min-width">
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

export default AddBrandDetail;