import React, {useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';

const AddFaqDetail = () => {
    const form = useRef();
    const editorRef = useRef(null);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    }, []);
 
    const onChangeQuestion = (e) => {
        const question = e.target.value;
        setQuestion(question);
    };
  
    const onChangeAnswer = (e) => {
        const answer = e.target.value;
        setAnswer(answer);
    }
    

      const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        const data = new FormData();
       
        data.append('question',question);
        data.append('answer',editorRef.current.getContent())
        DataService.addFaq(data).then(
            () => {
            navigate("/faqs");
              window.location.reload();
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.respponse.data.message) ||
                error.messonse.data &&
                  error.resage ||
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
                    <h4 className="mb-0 f-700">Add New Faq</h4>

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
                                    <label className="form-label">Question</label>
                                    <input 
                                    type="text" 
                                    required
                                    className="form-control"
                                    onChange={onChangeQuestion} 
                                    autoComplete="off"
                                    placeholder="Enter Question" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Answer</label>
                                    {/* <textarea 
                                    required
                                    className="form-control" 
                                    rows={"5"} 
                                    onChange={onChangeAnswer}
                                    placeholder="Enter Answer"/> */}
                                    <Editor
                                            apiKey='1nolfd56snnawdzchbfmu06ihvzd2nkhvgvdj5i85do1bws6'
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            initialValue=""
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

export default AddFaqDetail;