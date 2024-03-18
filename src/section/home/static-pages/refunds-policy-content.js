import React, {useEffect, useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
const RefundPolicyContent = () => {
    const form = useRef();
    const [name, setName] = useState("");
    const [pageId, setPageId] = useState("");
    const [data, setData] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const editorRef = useRef(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        DataService.getPage('refund-policy').then((data) => {
            if(data.data.data.length>0){
                setPageId(data?.data?.data[0]?.id);
                setName(data?.data?.data[0]?.name)
                setData(data?.data?.data[0])
            }   
        });
    }
    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        const data = new FormData();
        data.append('name',name);
        data.append('description',editorRef.current.getContent())
        data.append('page_type','refund-policy');
        if(pageId){
            DataService.updatePage(pageId, data).then(
                () => {
                    toast.success('Data Updated successfully !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setLoading(false);
                    
                    //window.location.reload();
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
        }else{
            DataService.addPage(data).then(
                () => {
                    toast.success('Data added successfully !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setLoading(false);
                    //window.location.reload();
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
        }
        
    };
    return (
        <div className="container-fluid">
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="d-flex w-100 justify-content-between align-items-center mb-4">
                    <h4 className="mb-0 f-700">Refund Policy</h4>

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
                        <div className="card card-highlight mb-5">
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <label className="form-label">Page Title</label>
                                        <input 
                                        type="text" 
                                        required
                                        onChange={onChangeName}
                                        defaultValue={data.name}
                                        className="form-control" 
                                        placeholder="Page Title" />
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <label className="form-label">Page Content</label>
                                        <Editor
                                            apiKey='1nolfd56snnawdzchbfmu06ihvzd2nkhvgvdj5i85do1bws6'
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            initialValue={data.description}
                                            init={{
                                            height: 300,
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
                                        {/* <textarea className="form-control" rows="12" placeholder="Page Content"></textarea> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Update</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RefundPolicyContent;