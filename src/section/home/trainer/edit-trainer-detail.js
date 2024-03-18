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


const EditTrainerDetail = () => {
    const form = useRef();
     
    const [artistName, setArtistName] = useState("");
    const [reviews, setReviews] = useState("");
    const [bio, setBio] = useState("");
    const [price, setPrice] = useState("");

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const inputFileRef = React.useRef();
    const imgRef = React.useRef();
    const params = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

    //console.log(props)

    useEffect(() => {
        getData()
    }, []);

    const getData = async() => {
        await DataService.getSingleArtist(params.id).then((data) => {
            setData(data?.data?.data);
            setArtistName(data?.data?.data?.name)
            setReviews(data?.data?.data?.reviews)
            setBio(data?.data?.data?.bio)
            setPrice(data?.data?.data?.price)
            
        
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
      data.append('name',artistName);
      data.append('bio',bio);
      data.append('price',price);
      data.append('reviews',reviews);
   
    DataService.updateArtist(params.id, data).then(
        () => {
            toast.success('Artist Updated successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });
             navigate("/artist");
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
            <h4 className="mb-0 f-700">Add Trainer </h4>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 login" ref={form}>
          <div className="row">
            <div className="col-xxl-3 col-lg-4">
              <div className="card mb-4">
                <div className="card-body text=center">
                  <h4 className="f-700">Profile</h4>
  
                  <div className="Product-thumbnail" onClick={triggerFile}>
                    <img
                      src="../assets/img/profile-img.png"
                      className="w-100"
                      ref={imgRef}
                      alt=""
                    />
                  </div>
                  <p className="text-center">
                    Set the image. Only *.png, *.jpg and *.jpeg image files are
                    accepted
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xxl-9 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
              <div className="card mb-5">
                <div className="card-body p-4">
                <div className="mb-4">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Artist Name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Reviews</label>
                  <input
                      type="text"
                      className="form-control"
                      value={reviews}
                      onChange={(e) => setReviews(e.target.value)}
                      //onChange={onChangeReviews}
                      placeholder="Artist Reviews"
                  />
              </div>

              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea
                    className="form-control"
                    rows="4"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    //onChange={onChangeBio}
                    placeholder="Artist Bio"
                ></textarea>
            </div>

            <div className="mb-3">
                <label className="form-label">Price per Hour</label>
                <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        //onChange={onChangePrice}
                        placeholder="Price per Hour"
                    />
                </div>
            </div>
                  
                  
  
                
                 
  
                
  
                
                  <div className="mb-4 d-none">
                    <div className="upload-box">
                      <i>
                        <svg
                          width="47"
                          height="39"
                          viewBox="0 0 47 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M32 27.5L24 19.5L16 27.5"
                            stroke="#F4AC3D"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M24 19.5V37.5"
                            stroke="#F4AC3D"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M40.7799 32.28C42.7306 31.2165 44.2716 29.5337 45.1597 27.4972C46.0477 25.4607 46.2323 23.1864 45.6843 21.0334C45.1363 18.8803 43.8869 16.971 42.1333 15.6069C40.3796 14.2427 38.2216 13.5014 35.9999 13.5H33.4799C32.8745 11.1585 31.7462 8.98464 30.1798 7.14195C28.6134 5.29927 26.6496 3.83567 24.4361 2.86118C22.2226 1.8867 19.817 1.42669 17.4002 1.51573C14.9833 1.60478 12.6181 2.24057 10.4823 3.3753C8.34649 4.51003 6.49574 6.11417 5.06916 8.06713C3.64259 10.0201 2.6773 12.271 2.24588 14.6508C1.81446 17.0305 1.92813 19.477 2.57835 21.8065C3.22856 24.136 4.3984 26.2877 5.99992 28.1"
                            stroke="#F4AC3D"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M32 27.5L24 19.5L16 27.5"
                            stroke="#F4AC3D"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </i>
  
                      <div className="ms-3">
                        <h5>Select a file or drag and drop here</h5>
                        <p className="mb-0 text-secondary">
                          JPG, PNG or PDF, file size no more than 10MB
                        </p>
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
                    <button className="btn btn-primary" type="submit">
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

export default EditTrainerDetail;