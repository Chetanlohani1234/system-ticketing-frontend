import React, { useEffect, useState, Fragment, useRef } from "react";
import { Link } from 'react-router-dom';
import DataService from "../../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';



const BookedCamp = () => {
    const [mine, setmine] = useState(true)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState('');
    const [options, setOptions] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedBirthYear, setSelectedBirthYear] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [filterOption, setFilterOption] = useState("");
    const [filterOptionTwo, setFilterOptionTwo] = useState("");
    const [filterOptionThree, setFilterOptionThree] = useState("");     
    const [filterOptionFour, setFilterOptionFour] = useState("");
    const [filterOptionFive, setFilterOptionFive] = useState("");
    const [filterOptionSix, setFilterOptionSix] = useState("");
    const [loadingFilterData, setLoadingFilterData] = useState(false);
    // const [isDisabled, setIsDisabled] = useState(false);
    // const [isDisabledS, setIsDisabledS] = useState(false);   
    // const [isDisabledT, setIsDisabledT] = useState(false);
    // const [isDisabledF, setIsDisabledF] = useState(false);
    // const [isDisabledFi, setIsDisabledFi] = useState(false);
    // const [isDisabledSix, setIsDisabledSix] = useState(false);
  
  
    const birthYearSet = new Set(options.map((option) => option.birthYear));
    const uniquebirthYearSet = [...birthYearSet]; 

    const positionSet = new Set(options.map((option) => option.position));
    const uniquepositionSet = [...positionSet]; 

    const locationSet = new Set(options.map((option) => option.location));
    const uniquelocationSet = [...locationSet]; 

    const genderSet = new Set(options.map((option) => option.gender));
    const uniquegenderSet = [...genderSet]; 

    const levelSet = new Set(options.map((option) => option.skillLevel));
    const uniquelevelSet = [...levelSet]; 

    const handleRemoveFilter = () => {
        // Your logic to remove the filter option
        setFilterOption(""); 
        //setIsDisabled(true);
        console.log("fdsfdsf :",filterOption);
        //setFilterOption(false); 
      };

    const handleFilterOptionTwo = () => {
        setFilterOptionTwo("");
        //setIsDisabledS(true);
    }

    const handleFilterOptionThree = () => {
        setFilterOptionThree("");
        //setIsDisabledT(true);
        console.log("fdsfdsf :",filterOptionThree);
    }


    const handleFilterOptionFour = () => {
        setFilterOptionFour("");
        //setIsDisabledF(true);
    }

    const handleFilterOptionFive = () => {
        console.log("Before removing filter:", filterOptionFive);
        setFilterOptionFive("");
       
        //setIsDisabledFi(true);
    }

    const handleFilterOptionSix = () => {
        setFilterOptionSix("");
        //setIsDisabledSix(true);
    }

    const getData = () => {
        DataService.getAllBookedCamp()
            .then((data) => {
                console.log(data);
                setData(data?.data?.data);
                setOptions(data?.data?.data);
                setFilterData(data?.data?.data);
                //console.log("Data: ",data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setMessage(error?.response?.data?.msg);
            });
    };
    useEffect(() => {
        if (mine) {
            getData();
        }
    }, [mine, selectedOption]);


    const HandleFilter = (e) => {
        setFilterOption(e.target.value);
        setmine(false)
    };

    const HandleFilterTwo = (e) => {
        setFilterOptionTwo(e.target.value);
        setmine(false)
    };

    const HandleFilterThree = (e) => {
        setFilterOptionThree(e.target.value);
        setmine(false);
    };


    const HandleFilterFour = (e) => {
        setFilterOptionFour(e.target.value);
        setmine(false)
    };

    const HandleFilterFive = (e) => {
        setFilterOptionFive(e.target.value);
        setmine(false)
    };

    const HandleFilterSix = (e) => {
        setFilterOptionSix(e.target.value);
        setmine(false)
    };
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        setmine(false)

    };

    const prevFilterOptions = useRef({
        filterOption: "",
        filterOptionTwo: "",
        filterOptionThree: "",
        filterOptionFour: "",
        filterOptionFive: "",
        filterOptionSix: "",
    });

    const getFilterData = () => {
        // Use the previous filter options if the current options are empty
         
       // prevFilterOptions.current = {};


         const effectiveFilterOption = filterOption;
        const effectiveFilterOptionTwo = filterOptionTwo;
        const effectiveFilterOptionThree = filterOptionThree; 
        const effectiveFilterOptionFour = filterOptionFour;
        const effectiveFilterOptionFive = filterOptionFive;
        const effectiveFilterOptionSix = filterOptionSix;
        
        DataService.getAllFilter(
            effectiveFilterOption,
            effectiveFilterOptionTwo,
            effectiveFilterOptionThree,
            effectiveFilterOptionFour,
            effectiveFilterOptionFive,
            effectiveFilterOptionSix
        )
            .then((data) => {
                console.log(data?.data?.data)
                if (data?.data?.data) {
                    setFilterData(data?.data?.data);
                }
                console.log('API Response:', data);
                console.log('Filter Options:', filterOption, filterOptionTwo, filterOptionThree, filterOptionFour, filterOptionFive, filterOptionSix);

                setLoadingFilterData(false);

            })
            .catch((error) => {
                setLoading(false);
                setMessage(error?.response?.data?.msg);
            });

             // Update the previous filter options
             prevFilterOptions.current = {
                filterOption,
                filterOptionTwo,
                filterOptionThree,
                filterOptionFour,
                filterOptionFive,
                filterOptionSix,
            };
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows([...filterData]);
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectOne = (userId) => {
        const updatedSelectedRows = [...selectedRows];
        const index = updatedSelectedRows.findIndex((user) => user._id === userId);

        if (index !== -1) {
            updatedSelectedRows.splice(index, 1);
        } else {
            const selectedUser = filterData.find((user) => user._id === userId);
            updatedSelectedRows.push(selectedUser);
        }

        setSelectedRows(updatedSelectedRows);
        setSelectAll(updatedSelectedRows.length === filterData.length);
    };

    const isSelected = (userId) => {
        return selectedRows.some((user) => user._id === userId);
    };


    const sendEmail = () => {
        const selectedUserIds = selectedRows.map(user => user._id);
        if (selectedUserIds.length === 0) {
            toast.error('Please select at least one user to send the email.');
            return;
        }

        const emailText = document.querySelector('textarea').value;

        const emailData = {
            sendEmail: true,
            location: filterOptionFour, // Use the appropriate property for location
            position: filterOptionFive, // Use the appropriate property for position
            selectedUserIds,
            text: emailText,
        };

        DataService.sendEmailToCampRegistrations(emailData)
            .then(response => {
                toast.success('Email sent successfully!');
            })
            .catch(error => {
                toast.error('Failed to send email. Please try again.');
            });
    };


    return (
        <>

            <div className="scrol-container">


                <div className="row">
                    <ToastContainer></ToastContainer>
                    <div className="col-md-12" >
                    <div className="search-bar">

                        {/* <p>{filterOption}
                          <span className="remove-filter">x</span>
                        </p> */}

                    {filterOption   &&  (
                                <p style={{padding:'5px'}}>
                                {filterOption}
                                <span className="remove-filter" onClick={handleRemoveFilter} >
                                   &times;
                                </span>
                                </p>

                    )}

                    {filterOptionTwo   &&  (
                       <p style={{padding:'5px'}}>
                        {filterOptionTwo}
                               <span className="remove-filter" onClick={handleFilterOptionTwo}>
                                    &times;
                                </span>
                        </p>
                    )}

                    {filterOptionThree   && (    
                        <p style={{padding:'5px'}}>
                        {filterOptionThree}
                              <span className="remove-filter" onClick={handleFilterOptionThree}> 
                                    &times;
                                </span>
                        </p>
                    )}

                    {filterOptionFour    &&  (    
                        <p style={{padding:'5px'}}>
                        {filterOptionFour}
                               <span className="remove-filter" onClick={handleFilterOptionFour}>
                                    &times;
                                </span>
                        </p>
                    )}

                    {filterOptionFive   &&  (    
                        <p style={{padding:'5px'}}>
                        {filterOptionFive}
                               <span className="remove-filter" onClick={handleFilterOptionFive}>
                                    &times;
                                </span>
                        </p>
                    )}

                    {filterOptionSix   &&  (    
                        <p style={{padding:'5px'}}>
                        {filterOptionSix}
                               <span className="remove-filter" onClick={handleFilterOptionSix}>
                                    &times;
                                </span>
                        </p>
                    )}    
                     

                        {/* //value={searchTerm}
                        //onChange={(e) => setSearchTerm(e.target.value)} */}
                        
                    </div>    


                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                            <h4 className="f-700 mb-4" style={{ whiteSpace: 'nowrap' }}>All Booked Camp</h4>
                            <select className="form-select me-3" value={selectedOption} onChange={handleSelectChange}
                                style={{ width: '120px', marginLeft: '20%', padding: '8px', borderRadius: '5px', border: '1px solid #ced4da', }}>
                                <option value="Name">Name</option>
                                <option value="Gender">Gender</option>
                                <option value="Birth Year">Birth Year</option>
                                <option value="Location">Location</option>
                                <option value="Position">Position</option>
                                <option value="Level">Level</option>
                            </select>


                            {selectedOption === 'Name' && (
                                <select className="selectOption " onChange={HandleFilter}>
                                    {options.map((option) => (
                                        <option key={option._id}>{option.parentFirstName}{option.parentLastName} </option>
                                    ))}
                                </select>
                            )}
                        
                            {selectedOption === 'Gender' && (
                                <select className="selectOption " onChange={HandleFilterTwo}>
                                    {uniquegenderSet.map((gender) => (
                                        <option key={gender} value={gender}>{gender} </option>
                                    ))}
                                </select>
                            )}

                            
                               {selectedOption === 'Birth Year' && (
                                <select className="selectOption " onChange={HandleFilterThree}>
                                    {uniquebirthYearSet.map((year) => (
                                        <option key={year} value={year}>{year} </option>
                                    ))}
                                </select>
                            )}

                            {selectedOption === 'Location' && (
                                <select className="selectOption " onChange={HandleFilterFour}>
                                    {uniquelocationSet.map((location) => (
                                        <option key={location} value={location}>{location} </option>
                                    ))}
                                </select>
                            )}
                            {selectedOption === 'Position' && (
                                <select className="selectOption " onChange={HandleFilterFive}>
                                    {uniquepositionSet.map((position) => (
                                        <option key={position} value={position}>{position}</option>
                                    ))}
                                </select>
                            )}
                            {selectedOption === 'Level' && (
                                <select className="selectOption " onChange={HandleFilterSix}>
                                    {uniquelevelSet.map((level) => (
                                        <option key={level} value={level}>{level} </option>
                                    ))}
                                </select>
                            )}
                            <button className="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={getFilterData}>Search</button>
                            {/* <button className="btn btn-secondary" style={{ marginLeft: '10px' }}  onClick={sendEmail}>Send Email</button> */}

                        </div>


                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <div className="col-lg-6 m-auto">
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                        </div>
                        <table class="table table-striped">
                            <thead style={{ whiteSpace: 'nowrap' }}>
                                <tr>
                                    {/* <th scope="col">Check Box</th> */}
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Number</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Address</th>
                                    <th scope="col" className="text-end">Action</th>


                                </tr>
                            </thead>


                            <tbody style={{ whiteSpace: 'nowrap' }}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={() => handleSelectAll()}
                                    />
                                </td>
                                {loadingFilterData && <span className="spinner-border spinner-border-sm"></span>}
                                {filterData.map((camp) => (
                                    <tr key={camp._id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={isSelected(camp._id)}
                                                onChange={() => handleSelectOne(camp._id)}
                                            />
                                        </td>
                                        <td>{camp.name}</td>
                                        <td>{camp.email}</td>
                                        <td>{camp.phoneNo}</td>
                                        <td>{camp.number}</td>
                                        <td>{camp.company}</td>
                                       
                                        <td>{camp.address}</td>


                                        <td>
                                            <span className="d-flex justify-content-end">
                                                <Link to={"/view-camps/" + camp._id} className="mx-2"><svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.6951 6.47656C16.6951 6.47656 13.6951 0.976562 8.69507 0.976562C3.69507 0.976562 0.695068 6.47656 0.695068 6.47656C0.695068 6.47656 3.69507 11.9766 8.69507 11.9766C13.6951 11.9766 16.6951 6.47656 16.6951 6.47656ZM1.86777 6.47656C1.92469 6.38977 1.98961 6.29333 2.06234 6.18898C2.39723 5.70849 2.89138 5.06947 3.52718 4.43367C4.8161 3.14474 6.57569 1.97656 8.69507 1.97656C10.8145 1.97656 12.574 3.14474 13.863 4.43367C14.4988 5.06947 14.9929 5.70849 15.3278 6.18898C15.4005 6.29333 15.4654 6.38977 15.5224 6.47656C15.4654 6.56335 15.4005 6.65979 15.3278 6.76414C14.9929 7.24463 14.4988 7.88366 13.863 8.51946C12.574 9.80838 10.8145 10.9766 8.69507 10.9766C6.57569 10.9766 4.8161 9.80838 3.52718 8.51946C2.89138 7.88366 2.39723 7.24463 2.06234 6.76414C1.98961 6.65979 1.92469 6.56335 1.86777 6.47656Z" fill="#C7001F" />
                                                    <path d="M8.69507 3.97656C7.31436 3.97656 6.19507 5.09585 6.19507 6.47656C6.19507 7.85727 7.31436 8.97656 8.69507 8.97656C10.0758 8.97656 11.1951 7.85727 11.1951 6.47656C11.1951 5.09585 10.0758 3.97656 8.69507 3.97656ZM5.19507 6.47656C5.19507 4.54357 6.76207 2.97656 8.69507 2.97656C10.6281 2.97656 12.1951 4.54357 12.1951 6.47656C12.1951 8.40956 10.6281 9.97656 8.69507 9.97656C6.76207 9.97656 5.19507 8.40956 5.19507 6.47656Z" fill="#C7001F" />
                                                </svg>
                                                </Link>
                                                <span className="booked-cell">Booked</span>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>


                        </table>

                    </div>




                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <textarea
                    placeholder="Compose your email..."
                    rows="4"
                    style={{ width: '60%', marginRight: '10px' }}
                />
                <button
                    className="btn btn-primary"
                    onClick={sendEmail}
                >
                    Send Email
                </button>
            </div>
        </>
    );
};

export default BookedCamp;
