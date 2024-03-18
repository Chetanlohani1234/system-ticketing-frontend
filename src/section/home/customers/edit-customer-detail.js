import React, {useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const styles = {
    input: {
        opacity: '0%', // dont want to see it
        position: 'absolute' // does not mess with other elements 
    }
}
const EditCustomerDetail = () => {
    const form = useRef();
    const [data, setData] = useState([]);
    const [phoneCode, setPhoneCode] = useState("254");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const inputFileRef = React.useRef(); 
    const imgRef = React.useRef(); 
    const navigate = useNavigate();
    const params = useParams();
    //console.log(props)

    useEffect(() => {
        getData()
    }, []);
    const getData = async() => {
        await DataService.getCustomerDetail(params.id).then((data) => {
            setData(data.data.data);
            setFirstName(data.data.data.first_name);
            setLastName(data.data.data.last_name);
            setEmail(data.data.data.email);
            setPhoneCode(data.data.data.phone);
        //setLoading(false);
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
      const onChangeFirstName = (e) => {
        const data = e.target.value;
        setFirstName(data);
    };
    const onChangeLastName = (e) => {
        const data = e.target.value;
        setLastName(data);
    };
    const onChangeEmail = (e) => {
        const data = e.target.value;
        setEmail(data);
    }
    const onChangePhone = (e) => {
        const data = e.target.value;
        setPhone(data);
    };
    const onChangePassword = (e) => {
        const data = e.target.value;
        setPassword(data);
    }
    
    const triggerFile = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    };
    const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    if(file && file.length>0){
        data.append('image', file[0])
    }
    data.append('first_name', firstName);
    data.append('last_name', lastName);
    data.append('email',email)
    data.append('phone',phoneCode);
    if(password){
        data.append('password',password)
    }
    
    DataService.updateCustomerDetail(params.id,data).then(
        () => {
            toast.error('Customer added successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });
            navigate("/customers");
            
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
                    <h4 className="mb-0 f-700">Edit Customer</h4>

                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 login" ref={form}>
                <div className="row">
                    <div className="col-xxl-3 col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text=center">
                                <h4 className="f-700">Profile</h4>
                                <div className="Delete-image"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.410582 0.410749C0.736019 0.0853125 1.26366 0.0853125 1.58909 0.410749L5.99984 4.82149L10.4106 0.410749C10.736 0.0853125 11.2637 0.0853125 11.5891 0.410749C11.9145 0.736186 11.9145 1.26382 11.5891 1.58926L7.17835 6.00001L11.5891 10.4108C11.9145 10.7362 11.9145 11.2638 11.5891 11.5893C11.2637 11.9147 10.736 11.9147 10.4106 11.5893L5.99984 7.17852L1.58909 11.5893C1.26366 11.9147 0.736019 11.9147 0.410582 11.5893C0.0851447 11.2638 0.0851447 10.7362 0.410582 10.4108L4.82133 6.00001L0.410582 1.58926C0.0851447 1.26382 0.0851447 0.736186 0.410582 0.410749Z" fill="black" />
                                </svg>
                                </div>
                                <div className="Product-thumbnail" onClick={triggerFile}>
                                {(data.file_path ? 
                                <img src={"opm-stream.onrender.com/"+data.file_path} className="w-100" ref={imgRef} alt={data.first_name} />
                            : <img src="../assets/img/profile-img.png" className="w-100" ref={imgRef}/>
                            )}
                                    
                                </div>
                                <p className="text-center">Set the image. Only *.png, *.jpg
                                    and *.jpeg image files
                                    are accepted</p>
                            </div>
                            <input
                                    type="file"
                                    ref={inputFileRef}
                                    accept="image/*"
                                    style={styles.input}
                                    onChangeCapture={onFileChangeCapture}
                                />
                        </div>


                    </div>
                    <div className="col-xxl-9 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
                        <div className="card mb-5">
                            <div className="card-body p-4">
                                <div className="mb-4">
                                    <label className="form-label">User Name *</label>
                                    <input 
                                    type="text" 
                                    required
                                    className="form-control"
                                    defaultValue={data.first_name} 
                                    onChange={onChangeFirstName}
                                    placeholder="User name" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Last Name *</label>
                                    <input 
                                    type="text" 
                                    required
                                    className="form-control" 
                                    defaultValue={data.last_name} 
                                    onChange={onChangeLastName}
                                    placeholder="Last name" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">User Email *</label>
                                    <input 
                                    type="email" 
                                    required
                                    defaultValue={data.email} 
                                    onChange={onChangeEmail}
                                    className="form-control" 
                                    placeholder="User email" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">User Phone Number *</label>
                                    

                                    <div className="country_adminmain">
                                        <div className="phone_int">
                                            <PhoneInput
                                                country={"ke"}
                                                value={phoneCode}
                                                defaultCountry="US"
                                                onChange={setPhoneCode}
                                            />
                                        {/* <input 
                                    type="tel" 
                                    maxLength={10}
                                    required
                                    defaultValue={data.phone} 
                                    onChange={onChangePhone}
                                    className="form-control" 
                                    placeholder="User phone number" /> */}
                                        </div>
                                    </div>

                                   
                                </div>

                                {/* <div className="mb-4">
                                    <label className="form-label">User Password *</label>
                                    <input 
                                    type="password" 
                                    onChange={onChangePassword}
                                    className="form-control" 
                                    placeholder="User password" />
                                </div> */}
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

export default EditCustomerDetail;