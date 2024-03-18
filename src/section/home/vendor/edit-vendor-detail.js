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

const EditVendorDetail = () => {
    const form = useRef();
    const [data, setData] = useState([]);
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [link, setLink] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [referral, setReferral] = useState("");
    const [loading, setLoading] = useState(false);
    const [phoneCode, setPhoneCode] = useState("");

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
            setData(data?.data?.data);
            setFirstName(data.data.data.first_name)
            setLastName(data.data.data.last_name)
            setMiddleName(data.data.data.middle_name)
            setLink(data.data.data.website_link)
            setAddress(data.data.data.address)
            setEmail(data.data.data.email)
            setPhoneCode(data.data.data.phone);
            setCity(data.data.data.city)
            setState(data.data.data.state)
            setReferral(data.data.data.referral_name)
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
    const onChangeUserName = (e) => {
        const data = e.target.value;
        setUserName(data);
    };
    const onChangeFirstName = (e) => {
        const data = e.target.value;
        setFirstName(data);
    };
    const onChangeLastName = (e) => {
        const data = e.target.value;
        setLastName(data);
    };
    const onChangeMiddleName = (e) => {
        const data = e.target.value;
        setMiddleName(data);
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
    const onChangeLink = (e) => {
        const data = e.target.value;
        setLink(data);
    }
    const onChangeAddress = (e) => {
        const data = e.target.value;
        setAddress(data);
    }
    const onChangeCity = (e) => {
        const data = e.target.value;
        setCity(data);
    }
    const onChangeState = (e) => {
        const data = e.target.value;
        setState(data);
    }

    const onChangereferral = (e) => {
        const data = e.target.value;
        setReferral(data);
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
    data.append('user_name',email);
    data.append('first_name',firstName);
    data.append('last_name',lastName);
    data.append('middle_name',middleName);
    data.append('website_link',link);
    data.append('address',address);
    data.append('state',state);
    data.append('city',city);
    data.append('referral_name',referral);
    data.append('email',email)
    data.append('phone',phoneCode);
    if(password){
        data.append('password',password)
    }
    data.append('role','vendor')
    DataService.updateCustomerDetail(params.id, data).then(
        () => {
            toast.error('Customer added successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });
            navigate("/vendor");
            
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
                    <h4 className="mb-0 f-700">Edit Vendor</h4>

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
                                    <label className="form-label">Vendor First Name *</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    required
                                    defaultValue={data?.first_name}
                                    onChange={onChangeFirstName}
                                    placeholder="Vendor First Name" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Vendor Middle Name</label>
                                    <input 
                                    type="text"
                                    defaultValue={data?.middle_name} 
                                    className="form-control" 
                                    onChange={onChangeMiddleName}
                                    placeholder="Vendor Middle Name" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Vendor Last Name *</label>
                                    <input 
                                    type="text" 
                                    required
                                    defaultValue={data?.last_name} 
                                    onChange={onChangeLastName}
                                    className="form-control" 
                                    placeholder="Vendor Last Name *" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Website Link</label>
                                    <input 
                                    type="text" 
                                    defaultValue={data?.website_link} 
                                    className="form-control" 
                                    onChange={onChangeLink}
                                    placeholder="Website Link" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Vendor Email *</label>
                                    <input 
                                    type="email"
                                    defaultValue={data?.email} 
                                    required
                                    onChange={onChangeEmail}
                                    className="form-control" 
                                    placeholder="Vendor Email" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Vendor Phone Number *</label>

                                    <div className="country_adminmain">
                                        <div className="phone_int">
                                            <PhoneInput
                                                country={"ke"}
                                                value={phoneCode}
                                                defaultCountry="US"
                                                onChange={setPhoneCode}
                                            />
                                    
                                        {/* <input 
                                    type="text"
                                    defaultValue={data?.phone} 
                                    className="form-control" 
                                    onChange={onChangePhone}
                                    placeholder="Vendor Phone Number" /> */}
                                        </div>
                                    </div>
                           
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Vendor Address</label>
                                    <input 
                                    type="text"
                                    defaultValue={data?.address} 
                                    onChange={onChangeAddress} 
                                    className="form-control" 
                                    placeholder="Vendor Address" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Vendor State</label>
                                    <input 
                                    type="text" 
                                    defaultValue={data?.state} 
                                    className="form-control"
                                    onChange={onChangeState} 
                                    placeholder="Vendor State" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Vendor City</label>
                                    <input 
                                    type="text"
                                    defaultValue={data?.city}  
                                    onChange={onChangeCity}
                                    className="form-control" 
                                    placeholder="Vendor City" />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Name of referral</label>
                                    <input 
                                    type="text"
                                    defaultValue={data?.referral_name} 
                                    onChange={onChangereferral}
                                    className="form-control" 
                                    placeholder="Name of referral" />
                                </div>
                                {/* <div className="mb-4">
                                    <label className="form-label">User Password *</label>
                                    <input 
                                    type="password" 
                                    onChange={onChangePassword}
                                    className="form-control" 
                                    placeholder="User password" />
                                </div> */}
                                <div className="mb-4 d-none">
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
                                                ref={inputFileRef}
                                                style={styles.input}
                                                onChangeCapture={onFileChangeCapture}
                                            />
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

export default EditVendorDetail;