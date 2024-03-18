import React, { useEffect,useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MultiRangeSlider from "multi-range-slider-react";
import { Editor } from '@tinymce/tinymce-react';
const styles = {
  input: {
    opacity: "0%", // dont want to see it
    position: "absolute", // does not mess with other elements
  },
};
const AddCampSection = () => {
  const editorRef = useRef(null);
  const today = new Date().toISOString().split('T')[0];
  const form = React.useRef();
  const [campName, setCampName] = useState("");
  const [CampId, setCampId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [ageGroup, setAgeGroup] = useState({ minValue: 15, maxValue: 50 });
  const [description, setDescription] = useState("");
  const [type, setType] = useState('')
  const [subCategory, setSubCategory] = useState('')

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [Price, setPrice] = useState("");
  const [reviews, setReviews] = useState("");
  const [attendies, setAttendies] = useState("");
  const [mastercategory, setAData] = useState([]);
  const [category, setData] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const [selectedMasterCategory, setSelectedMasterCategory] = useState("");
  

  const inputFileRef = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getCategory();
}, []);

const getCategory = () => {
    DataService.getCategory(0).then((data) => {
        const masterCatData = data.data.categories.filter(value => (value.status === 'active'))
        setAData(masterCatData);
    });
    // DataService.getCategory(1).then((data) => {
    //     setData([]);
    //     setAllCategory(data.data.categories);
    // });
}




  const onFileChangeCapture = (e) => {
    const file = e.target.files[0];
    setFile(e.target.files);
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);
    reader.onloadend = function (theFile) {
      var image = new Image();
      image.src = theFile.target.result;
      imgRef.current.src = image.src;
    };
  };
  const handleSliderChange = ({ minValue, maxValue }) => {
    setAgeGroup({  minValue, maxValue });
  };

  const storedUserId = JSON.parse(localStorage.getItem("userId"));

  const triggerFile = () => {
    inputFileRef.current.click();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    const data = new FormData();
    if (file && file.length > 0) {
      setLoading(true);
      data.append("images", file[0]);
      if (uploadedFiles && uploadedFiles.length > 0) {
        uploadedFiles.some((file) => {
          data.append("images", file);
        });
      }
      data.append("title",campName)
      data.append("price", Price);
      data.append("startDate", startDate);
      data.append("endDate", endDate);
      data.append("description", editorRef.current.getContent());
      data.append("location", location);
      data.append("reviews",reviews);
      data.append("attendies",attendies);
      data.append('masterCategory',selectedMasterCategory);
      data.append('subCategory',subCategory);
      data.append('ownerId',storedUserId)

      
      DataService.addEvent(data).then(
        () => {
          toast.success("Event Added Successfully!")
          navigate("/Events");
          window.location.reload();
          // setTimeout(() => {
          //  window.location.reload();
          // },2000)
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
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      );
    } else {
      toast.error("Please select Event thumbnail", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleMasterCategoryChange = (e) => {
    const selectedMasterCategoryId = e.target.value;
    setSelectedMasterCategory(selectedMasterCategoryId);
    //console.log(selectedMasterCategory);

    // Fetch subcategories based on the selected master category
    DataService.getCategory(1).then((data) => {
      const filteredSubCategories = data.data.categories.filter(
        (item) => item.parentId === selectedMasterCategoryId
      );

      setAllCategory(filteredSubCategories);
      //console.log(allCategory);
    });
  };

  return (
    <div className="container-fluid">
      <ToastContainer></ToastContainer>
      <div className="row">
        <div className="d-flex w-100 justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Add Event</h4>
          {/* <button
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#ImportProuct"
          >
            Import Event
          </button> */}
          <div
            class="modal fade"
            id="ImportProuct"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-body bg-yellow">
                  <button
                    type="button"
                    class="btn-close float-end"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                  <div class="card-body p-4 importSectionModal bg-white rounded-5 m-5">
                    <div class="mb-4">
                      <label class="form-label">Upload File</label>
                      <div class="upload-box">
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
                            ></path>
                            <path
                              d="M24 19.5V37.5"
                              stroke="#F4AC3D"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M40.7799 32.28C42.7306 31.2165 44.2716 29.5337 45.1597 27.4972C46.0477 25.4607 46.2323 23.1864 45.6843 21.0334C45.1363 18.8803 43.8869 16.971 42.1333 15.6069C40.3796 14.2427 38.2216 13.5014 35.9999 13.5H33.4799C32.8745 11.1585 31.7462 8.98464 30.1798 7.14195C28.6134 5.29927 26.6496 3.83567 24.4361 2.86118C22.2226 1.8867 19.817 1.42669 17.4002 1.51573C14.9833 1.60478 12.6181 2.24057 10.4823 3.3753C8.34649 4.51003 6.49574 6.11417 5.06916 8.06713C3.64259 10.0201 2.6773 12.271 2.24588 14.6508C1.81446 17.0305 1.92813 19.477 2.57835 21.8065C3.22856 24.136 4.3984 26.2877 5.99992 28.1"
                              stroke="#F4AC3D"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M32 27.5L24 19.5L16 27.5"
                              stroke="#F4AC3D"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </i>
                        <div class="ms-3">
                          <h5>Select a file or drag and drop here</h5>
                          <p class="mb-0 text-secondary">
                            JPG, PNG or PDF, file size no more than 10MB
                          </p>
                        </div>
                        <div class="upload-btn-wrapper ms-auto ms-3">
                          <button class="btn-file">Select file</button>
                          <input type="file" name="myfile" />
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-start btn-min-width">
                      <button class="btn btn-primary">
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                <div className="Camp-thumbnail" onClick={triggerFile}>
                  <img
                    style={{ width: "100%" }}
                    src="../assets/img/img-placeholder.svg"
                    ref={imgRef}
                    alt=""
                  />
                </div>
                <p className="text-center">
                  Set the Event thumbnail image. Only *.png, *.jpg and *.jpeg
                  image files are accepted
                </p>
              </div>
              <input
                type="file"
                ref={inputFileRef}
                style={styles.input}
                onChangeCapture={onFileChangeCapture}
              />
            </div>

            <div className="card">
              <div className="card-body text=center">
                <h4 className="f-700">Event Categories</h4>

                <div className="mb-3">
                  <label className="form-label">Master Categories</label>
                  <select
                    required
                    className="form-select"
                    //onChange={(e) => setType(e.target.value)}
                    onChange={handleMasterCategoryChange}
                  >
                    <option>Select an option</option>
                    {mastercategory && mastercategory.length > 0
                                            ? mastercategory.map((item, i) => (
                                                <><option value={item._id}>{item.name}</option></>
                                            ))
                    : ""}
                    
                  </select>
 
                </div>

                <div className="mb-3">
                  <label className="form-label">Sub Categories</label>
                  <select
                    required
                    className="form-select"
                    onChange={(e) => setSubCategory(e.target.value)}
                  
                  >
                    <option>Select an option</option>
                    {allCategory && allCategory.length > 0
                                            ? allCategory.map((item, i) => (
                                                <><option key={item._id} value={item._id}>{item.name}</option></>
                                            ))
                    : ""}
                  
                    
                  </select>
                </div>
              </div>
            </div>

          </div>
          <div className="col-xxl-9 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
            <div className="card mb-5">
              <div className="card-body p-4">
                <div className="mb-3">
                  <label className="form-label">Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setCampName(e.target.value)}
                    placeholder="Event Name"
                  />
                  {/* <div className="form-text">
                    A Camp name is required and recommended to be unique.
                  </div> */}
                </div>

                {/* <div className="mb-3">
                  <label className="form-label">Camp id *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e => setCampId(e.target.value))}
                    placeholder="Camp id"
                  />
                </div> */}
 
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Attendies</label>
                  <input
                      type="number"
                      className="form-control"
                      //onChange={onChangeRating}
                      onChange={(e) => setAttendies(e.target.value)}
                      placeholder="Attendies"
                  />
              </div>

                <div className="mb-3">
                  <label className="form-label">Price *</label>
                  <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className="form-control"
                    required
                    onChange={(e => setPrice(e.target.value))}
                    placeholder="0.00"
                  />
                 </div>  
                </div>

                <div className="mb-3 row">
                <div className="col-sm-6">
                <label className="form-label">Start Date Event</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}
                  />
                </div>
                <div className="col-sm-6">
                <label className="form-label">End Date Event</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    onChange={(e) => setEndDate(e.target.value)}
                    min={today}
                  />
                </div>
               </div> 

             
                {/* <div className="mb-3 row">
                <div className="col-sm-6">
                <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}
                  />
                </div>
                <div className="col-sm-6">
                <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    min={today}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                
                </div>

                <div className="mb-3 row">
                <div className="col-sm-6">
                <label className="form-label">Start Time</label>
                  <input
                    type="time"
                    className="form-control"
                    required
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                <label className="form-label">End Time</label>
                  <input
                    type="time"
                    className="form-control"
                    required
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
                 
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>

                  <MultiRangeSlider
                    min={5}
                    max={15}
                    minValue={5}
                    maxValue={15}
                    onChange={handleSliderChange}
                  />
                </div> */}

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  {/* <textarea
                    placeholder="Description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                  ></textarea> */}

                <Editor
                  apiKey="1nolfd56snnawdzchbfmu06ihvzd2nkhvgvdj5i85do1bws6"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=" "
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style: "body { font-size:14px }",
                  }}
                />

                </div>
{/* 
                <div className="mb-3">
                  <label className="form-label">Reviews</label>
                  <input
                      type="text"
                      className="form-control"
                      required
                      onChange={(e) => setReviews(e.target.value)}
                      placeholder="Enter Reviews"
                  />
              </div> */}



                <div className="d-flex justify-content-end btn-min-width">
                  <button className="btn btn-primary">
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

export default AddCampSection;
