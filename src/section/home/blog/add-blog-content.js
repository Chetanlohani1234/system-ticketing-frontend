import React, {useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';

const AddBlogPost = () => {
    const form = useRef();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const inputFileRef = React.useRef(); 
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const onFileChangeCapture = ( e)=> {
        /*Selected files data can be collected here.*/
        setFile(e.target.files)
        
      };
    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };
    const onChangeDescription = (e) => {
        const data = e.target.value;
        setDescription(data);
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
    data.append('description',editorRef.current.getContent())
    //data.append('description',description)
    DataService.addBlog(data).then(
        () => {
        navigate("/blogs");
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
                    <h4 className="mb-0 f-700">Add New Blog</h4>
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
                                    <label className="form-label">Post Title</label>
                                    <input 
                                    type="text" 
                                    className="form-control"
                                    required 
                                    onChange={onChangeName}
                                    placeholder="Post Title" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Post Description</label>
                                    <Editor
                                            apiKey='1nolfd56snnawdzchbfmu06ihvzd2nkhvgvdj5i85do1bws6'
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            initialValue={''}
                                            init={{
                                            height: 500,
                                            menubar: true,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | blocks | ' +
                                                'bold italic forecolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
                                        />
                                    {/* <textarea 
                                    className="form-control" 
                                    onChange={onChangeDescription}
                                    rows={"5"} 
                                    placeholder="Post Description" /> */}
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
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
                                                ref={inputFileRef}
                                                accept="image/*"
                                                onChangeCapture={onFileChangeCapture} type="file" name="myfile" />
                                            </div>
                                        </div>
                                    </div>
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

export default AddBlogPost;