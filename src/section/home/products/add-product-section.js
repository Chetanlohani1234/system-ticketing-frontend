import React, { useEffect, useState, useRef } from "react";
import DataService from "../../../services/data.service";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import TagsInput from "../../../common/TagsInput";
import "react-toastify/dist/ReactToastify.css";
const styles = {
  input: {
    opacity: "0%", // dont want to see it
    position: "absolute", // does not mess with other elements
  },
};
const MAX_COUNT = 5;
const AddProductSection = () => {
  const editorRef = useRef(null);
  const form = React.useRef();
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [productId, setProductId] = useState("");
  const [userId, setUserId] = useState("");
  const [brand, setBrand] = useState(null);
  const [group, setGroup] = useState("");
  const [deliveryTime, setdeliveryTime] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setquantity] = useState("");
  const [costPrice, setcostPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [masterCategoryId, setMasterCatId] = useState(null);
  const [categoryId, setCatId] = useState(null);
  const [subCategoryId, setbSuCatId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [masterCategory, setmastercategory] = useState([]);
  const [category, setcategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);
  const [allVendor, setAllVendor] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [variantCount, setVariantCount] = useState(0);
  const [ColorCount, setColorCount] = useState(0);
  const inputFileRef = React.useRef();
  const imgRef = React.useRef();
  const [dataLoaded, setdataLoaded] = useState(false);
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState([]);
  const [inputFieldsTwo, setInputFieldsTwo] = useState([]);
  const [inputVariations, setInputVariations] = useState([]);
  const [allActive, setAllActive] = useState(false);
  const [allMrp, setAllMrp] = useState(false);
  const [allOffer, setAllOffer] = useState(false);

  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState("");

  const [colors, setColor] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const handleAddColor = () => {
    if (newColor.trim() !== "") {
      setColor([...colors, newColor]);
      setNewColor("");
    }
  };

  const handleDeleteColor = (index) => {
    const updatedColor = [...colors];
    updatedColor.splice(index, 1);
    setSizes(updatedColor);
  };

  const handleAddSize = () => {
    if (newSize.trim() !== "") {
      setSizes([...sizes, newSize]);
      setNewSize("");
    }
  };

  const handleDeleteSize = (index) => {
    const updatedSizes = [...sizes];
    updatedSizes.splice(index, 1);
    setSizes(updatedSizes);
  };

  useEffect(() => {
    getData();
  }, [images]);

  const getData = () => {
    DataService.getAllCategory().then((data) => {
      // console.log(data.data.categories)
      const catData = data.data.categories;
      setAllCategory(catData);
      console.log(allCategory);
      const masterCatData = catData.filter((value) => value.type === 0);
      setmastercategory(masterCatData);
      //setLoading(false);
    });
  };
  const onFileChangeCapture = (e) => {
    /*Selected files data can be collected here.*/
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
  const handleUploadedFiles = (files) => {
    const uploaded = uploadedFiles ? uploadedFiles : [];
    let limitExceeded = false;
    let imageSrc = [];
    if (images.length) {
      images.map((img, i) => {
        imageSrc.push(img);
      });
    }
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = function (theFile) {
          var image = new Image();
          image.src = theFile.target.result;
          imageSrc.push(image.src);
        };
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          toast.error(`You can only uploaded a maximun of ${MAX_COUNT} files`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setFileLimit(true);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) {
      setUploadedFiles(uploaded);
      setImages(imageSrc);
    }
  };
  const onFileChangeCaptureMultiple = (e) => {
    const choosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadedFiles(choosenFiles);
  };
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangeProductId = (e) => {
    const productId = e.target.value;
    setProductId(productId);
  };
  const onChangeVendor = (e) => {
    const userId = e.target.value;
    setUserId(userId);
  };
  const onChangeTag = (e) => {
    const value = e.target.value;
    setTag(value);
  };
  const onChangeDeliveryTime = (e) => {
    const deliverTime = e.target.value;
    setdeliveryTime(deliverTime);
  };
  const onChangeBrand = (e) => {
    const brnadId = e.target.value ? e.target.value : "";
    setBrand(brnadId);
  };
  const onChangeGroup = (e) => {
    const group = e.target.value;
    setGroup(group);
  };
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };
  const onChangeDetail = (e) => {
    const data = e.target.value;
    setDetail(data);
  };
  const onChangeSku = (e) => {
    const sku = e.target.value;
    setSku(sku);
  };
  const onChangeQuantity = (e) => {
    const quantity = e.target.value;
    setquantity(quantity);
  };
  const onChangeCostPrice = (e) => {
    const price = e.target.value;
    setcostPrice(price);
  };
  const onChangeMrp = (e) => {
    const mrp = e.target.value;
    setMrp(mrp);
  };
  const onChangeOfferPrice = (e) => {
    const offerPrice = e.target.value;
    if (offerPrice > mrp) {
      toast.error("offer price can not be more than MRP", {
        position: toast.POSITION.TOP_RIGHT,
      });
      e.target.value = "";
    } else {
      setOfferPrice(offerPrice);
    }
  };
  const onChangeValue = (e) => {
    const selectValue = e.target.value;
    setSelectValue(selectValue);
  };

  const handleChange = (e) => {
    const parentId = e.target.value ? e.target.value : "";
    setMasterCatId(parentId);
    const catData = allCategory.filter(
      (value) => value.parentId == parentId && value.type === 1
    );
    setcategory(catData);
  };
  const handleChangeCat = (e) => {
    const parentId = e.target.value ? e.target.value : "";
    setCatId(parentId);
    const catData = allCategory.filter(
      (value) => value.parentId === parentId && value.type === 2
    );
    setsubCategory(catData);
  };
  const handleChangeSubCat = (e) => {
    const parentId = e.target.value ? e.target.value : "";
    setbSuCatId(parentId);
  };
  const triggerFile = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };
  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        variant: "",
        values: [],
      },
    ]);
    setVariantCount(variantCount + 1);
  };
  const addInputFieldTwo = () => {
    setInputFieldsTwo([
      ...inputFieldsTwo,
      {
        color: "",
        values: [],
      },
    ]);
    setColorCount(ColorCount + 1);
  };

  const removeInputFields = (index, evnt) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
    setVariantCount(variantCount - 1);
    setCombinations(rows);
  };

  const removeInputFieldsTwo = (index, evnt) => {
    const rows = [...inputFieldsTwo];
    rows.splice(index, 1);
    setInputFieldsTwo(rows);
    setColorCount(ColorCount - 1);
    setCombinations(rows);
  };

  const handleVariantChangeTwo = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFieldsTwo];
    list[index][name] = value;
    setInputFieldsTwo(list);
  };
  const handleVariantChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };

  const setCombinations = async (list) => {
    const cs = [];
    const combinations = await makeCombinations(
      list.filter((it) => {
        return it.values && it.values.length > 0;
      })
    );
    if (combinations && combinations.length > 0) {
      await Promise.all(
        combinations.map((ele) => {
          cs.push({
            name: ele,
            mrp: "",
            offer_price: "",
            status: "active",
          });
        })
      );
    }
    setInputVariations(cs);
  };

  const makeCombinations = (arrays, i = 0) => {
    if (arrays[i]) {
    } else {
      return [];
    }
    if (i == arrays.length - 1) {
      return arrays[i].values;
    }

    //get combinations from subsequent arrays
    var tmparray = makeCombinations(arrays, i + 1);

    var result = [];

    // concat each array from tmp with each element from $arrays[$i]
    arrays[i].values.forEach((e1) => {
      tmparray.forEach((e2) => {
        result.push(e1 + " + " + e2);
      });
    });

    return result;
  };

  const changeAllChecked = (e) => {
    if (e.target.checked) {
      setAllActive(true);
    } else {
      setAllActive(false);
    }
    var all = document.getElementsByClassName("variationStatus");
    if (all && all.length > 0) {
      all.forEach((ele, index) => {
        handleVariantionChange(
          index,
          "status",
          e.target.checked ? "active" : "inactive"
        );
      });
    }
  };

  const changeAllMrp = (e) => {
    if (e.target.checked) {
      setAllMrp(true);
      setAllValues("variantMrp");
    } else {
      setAllMrp(false);
    }
  };

  const changeAllOffer = (e) => {
    if (e.target.checked) {
      setAllOffer(true);
      setAllValues("variantOffer");
    } else {
      setAllOffer(false);
    }
  };

  const setAllValues = (classname) => {
    var all = document.getElementsByClassName(classname);
    if (all && all.length > 0) {
      var main = all[0];
      all.forEach((ele, index) => {
        handleVariantionChange(index, ele.name, main.value);
      });
    }
  };

  const setVariantOffer = (index, e) => {
    handleVariantionChange(index, "offer_price", e.target.value);
    if (allOffer) {
      setAllValues("variantOffer");
    }
  };

  const setVariantMrp = (index, e) => {
    handleVariantionChange(index, "mrp", e.target.value);
    if (allMrp) {
      setAllValues("variantMrp");
    }
  };

  const setVariationStatus = (index, e) => {
    handleVariantionChange(
      index,
      "status",
      e.target.checked ? "active" : "inactive"
    );
  };

  const handleVariantionChange = (index, key, value) => {
    const list = [...inputVariations];
    list[index][key] = value;
    setInputVariations(list);
    setHiddenPrices(key);
  };

  const setHiddenPrices = (classname) => {
    if (classname == "mrp" || classname == "offer_price") {
      var all = document.getElementsByClassName(
        classname == "mrp" ? "variantMrp" : "variantOffer"
      );
      if (all && all.length > 0) {
        var main = all[0];
        if (classname == "mrp") {
          setcostPrice(main.value);
          setMrp(main.value);
        } else if (classname == "offer_price") {
          setOfferPrice(main.value);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    const data = new FormData();
    if (file && file.length > 0) {
      setLoading(true);
      data.append("singleImage", file[0]);
      if (uploadedFiles && uploadedFiles.length > 0) {
        uploadedFiles.some((file) => {
          data.append("images", file);
        });
      }
      sizes.forEach((size, index) => {
        data.append(`size[${index}]`, size);
      });

      colors.forEach((color, index) => {
        data.append(`colour[${index}]`, color);
      });
      data.append("productName", name);
      data.append("productId", productId);
      data.append("user_id", userId);
      data.append("description", description);
      data.append("serviceAbilityGroup", group);
      data.append("expectedDeliveryTime", deliveryTime);
      data.append("SKU_Number", sku);
      data.append("tag", tag);
      data.append("stockQuantity", quantity);
      data.append("costPrice", costPrice);
      data.append("MRP", mrp);
      data.append("howToGet", selectValue);
      data.append("status", "Published");
      data.append("offerPrice", offerPrice > 0 ? offerPrice : mrp);
      data.append("masterCategories", masterCategoryId);
      data.append("categories", categoryId);
      data.append("subCategories", subCategoryId);
      data.append("details", editorRef.current.getContent());
      DataService.addProduct(data).then(
        () => {
          // navigate("/products");
          // window.location.reload();
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
      toast.error("Please select product thumbnail", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const deleteImage = (e, index, api = true) => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      var uploaded = uploadedFiles.filter((file, i) => {
        return index != i;
      });
      var imageSrc = [];
      var ss = uploaded.some((file) => {
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = function (theFile) {
          var image = new Image();
          image.src = theFile.target.result;
          imageSrc.push(image.src);
        };
      });
      setUploadedFiles(uploaded);
      setImages(imageSrc);
    }
  };
  return (
    <div className="container-fluid">
      <ToastContainer></ToastContainer>
      <div className="row">
        <div className="d-flex w-100 justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Add Product</h4>
          <button
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#ImportProuct"
          >
            Import Product
          </button>
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
                <div className="Delete-image">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.410582 0.410749C0.736019 0.0853125 1.26366 0.0853125 1.58909 0.410749L5.99984 4.82149L10.4106 0.410749C10.736 0.0853125 11.2637 0.0853125 11.5891 0.410749C11.9145 0.736186 11.9145 1.26382 11.5891 1.58926L7.17835 6.00001L11.5891 10.4108C11.9145 10.7362 11.9145 11.2638 11.5891 11.5893C11.2637 11.9147 10.736 11.9147 10.4106 11.5893L5.99984 7.17852L1.58909 11.5893C1.26366 11.9147 0.736019 11.9147 0.410582 11.5893C0.0851447 11.2638 0.0851447 10.7362 0.410582 10.4108L4.82133 6.00001L0.410582 1.58926C0.0851447 1.26382 0.0851447 0.736186 0.410582 0.410749Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="Product-thumbnail" onClick={triggerFile}>
                  <img
                    style={{ width: "100%" }}
                    src="../assets/img/img-placeholder.svg"
                    ref={imgRef}
                  />
                </div>
                <p className="text-center">
                  Set the product thumbnail image. Only *.png, *.jpg and *.jpeg
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
                <h4 className="f-700">Product Details</h4>
                <div className="mb-3">
                  <label className="form-label">Master Categories</label>
                  <select
                    required
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    {masterCategory && masterCategory.length > 0
                      ? masterCategory.map((item, i) => (
                          <>
                            <option value={item._id}>{item.name}</option>
                          </>
                        ))
                      : ""}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Categories</label>
                  <select
                    required
                    className="form-select"
                    onChange={handleChangeCat}
                  >
                    <option value="">Select an option</option>
                    {category && category.length > 0
                      ? category.map((item, i) => (
                          <>
                            <option value={item._id}>{item.name}</option>
                          </>
                        ))
                      : ""}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Sub Categories</label>
                  <select
                    required
                    className="form-select"
                    onChange={handleChangeSubCat}
                  >
                    <option value="">Select an option</option>
                    {subCategory && subCategory.length > 0
                      ? subCategory.map((item, i) => (
                          <>
                            <option value={item._id}>{item.name}</option>
                          </>
                        ))
                      : ""}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tags</label>
                  <input
                    type="text"
                    onChange={onChangeTag}
                    className="form-control"
                  />
                  <div className="form-text">Add tag to a product</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-9 col-lg-8 ps-xxl-5 ps-md-3 ps-0">
            <div className="card mb-5">
              <div className="card-body p-4">
                <div className="mb-3">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={onChangeName}
                    placeholder="Product Name"
                  />
                  <div className="form-text">
                    A product name is required and recommended to be unique.
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Product id *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={onChangeProductId}
                    placeholder="Product id"
                  />
                </div>
                {/* <div className="mb-3">
                                    <label className="form-label">Vendor</label>

                                    <select className="form-select" onChange={onChangeVendor}>
                                        <option value="">Select product vendor</option>
                                        {allVendor && allVendor.length > 0
                                            ? allVendor.map((item, i) => (
                                                <><option value={item.id}>{item.first_name} {item.last_name}</option></>
                                            ))
                                            : ""}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Brand</label>

                                    <select className="form-select" onChange={onChangeBrand}>
                                        <option value="">Select product brand</option>
                                        {allBrand && allBrand.length > 0
                                            ? allBrand.map((item, i) => (
                                                <><option value={item.id}>{item.name}</option></>
                                            ))
                                            : ""}
                                    </select>
                                </div> */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    placeholder="Description"
                    className="form-control"
                    onChange={onChangeDescription}
                    rows="5"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Details & Spec</label>
                  <Editor
                    apiKey="1nolfd56snnawdzchbfmu06ihvzd2nkhvgvdj5i85do1bws6"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue=""
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
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                  {/* <textarea
                                        placeholder="Description"
                                        className="form-control"
                                        onChange={onChangeDetail}
                                        rows="5"></textarea> */}
                </div>
              </div>
            </div>
            <div className="card mb-5">
              <div className="card-body p-4">
                <label className="form-label">Media</label>

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
                      JPG, PNG or PDF, file size max upto 4MB, less than 1MB
                      each
                    </p>
                  </div>
                  <div class="upload-btn-wrapper ms-auto ms-3">
                    <button class="btn-file">Select file</button>
                    <input
                      type="file"
                      accept="image/*"
                      name="myfile"
                      multiple
                      onChangeCapture={onFileChangeCaptureMultiple}
                    />
                  </div>
                </div>
                <ul className="thumbs-img mt-3">
                  {images && images.length > 0 ? (
                    images.map((item, i) => (
                      <li
                        id={`local-image-${i}`}
                        style={{ position: "relative" }}
                      >
                        <i>
                          <img width="27" src={item} alt="product" />
                        </i>
                        <div
                          class="Delete-image"
                          onClick={(e) => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this image?"
                              )
                            )
                              deleteImage(e, i, false);
                          }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.410582 0.410749C0.736019 0.0853125 1.26366 0.0853125 1.58909 0.410749L5.99984 4.82149L10.4106 0.410749C10.736 0.0853125 11.2637 0.0853125 11.5891 0.410749C11.9145 0.736186 11.9145 1.26382 11.5891 1.58926L7.17835 6.00001L11.5891 10.4108C11.9145 10.7362 11.9145 11.2638 11.5891 11.5893C11.2637 11.9147 10.736 11.9147 10.4106 11.5893L5.99984 7.17852L1.58909 11.5893C1.26366 11.9147 0.736019 11.9147 0.410582 11.5893C0.0851447 11.2638 0.0851447 10.7362 0.410582 10.4108L4.82133 6.00001L0.410582 1.58926C0.0851447 1.26382 0.0851447 0.736186 0.410582 0.410749Z"
                              fill="black"
                            ></path>
                          </svg>
                        </div>
                      </li>
                    ))
                  ) : (
                    <>
                      <li>
                        <i>
                          <svg
                            width="27"
                            viewBox="0 0 23 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.4759 4.75448C4.98561 4.75448 3.65994 5.72109 3.17856 7.16013L3.14604 7.26855C3.03249 7.64961 2.98492 7.97009 2.98492 8.29075V14.7203L0.72654 7.08378C0.436099 5.96056 1.098 4.79606 2.20852 4.48577L16.6034 0.580665C16.7831 0.533541 16.9628 0.510909 17.1397 0.510909C18.0668 0.510909 18.914 1.13423 19.1514 2.05284L19.9901 4.75448H6.4759Z"
                              fill="#DCE5F1"
                            />
                            <path
                              d="M9.03623 14.6561C10.0631 14.6561 10.898 15.5019 10.898 16.5421C10.898 17.5823 10.0631 18.4282 9.03623 18.4282C8.00939 18.4282 7.17432 17.5823 7.17432 16.5421C7.17432 15.5019 8.00939 14.6561 9.03623 14.6561Z"
                              fill="#DCE5F1"
                            />
                            <path
                              d="M20.6725 21.2572H6.70859C5.42589 21.2572 4.38135 20.1991 4.38135 18.8996V8.52655C4.38135 7.22701 5.42589 6.1689 6.70859 6.1689H20.6725C21.9553 6.1689 22.9999 7.22701 22.9999 8.52655V18.8996C22.9999 20.1991 21.9553 21.2572 20.6725 21.2572ZM6.70859 19.3711H20.6725C20.9295 19.3711 21.138 19.16 21.138 18.8996V12.2051L18.1973 15.6812C17.8853 16.0517 17.4337 16.2498 16.9488 16.261C16.4666 16.2582 16.0142 16.0414 15.7051 15.666L12.2476 11.4621L11.1212 12.6004C10.4845 13.2453 9.44835 13.2453 8.81255 12.6004L6.24322 9.99854V18.8996C6.24322 19.16 6.45173 19.3711 6.70859 19.3711Z"
                              fill="#DCE5F1"
                            />
                          </svg>
                        </i>
                      </li>
                      <li>
                        <i>
                          <svg
                            width="27"
                            viewBox="0 0 23 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.4759 4.75448C4.98561 4.75448 3.65994 5.72109 3.17856 7.16013L3.14604 7.26855C3.03249 7.64961 2.98492 7.97009 2.98492 8.29075V14.7203L0.72654 7.08378C0.436099 5.96056 1.098 4.79606 2.20852 4.48577L16.6034 0.580665C16.7831 0.533541 16.9628 0.510909 17.1397 0.510909C18.0668 0.510909 18.914 1.13423 19.1514 2.05284L19.9901 4.75448H6.4759Z"
                              fill="#DCE5F1"
                            />
                            <path
                              d="M9.03623 14.6561C10.0631 14.6561 10.898 15.5019 10.898 16.5421C10.898 17.5823 10.0631 18.4282 9.03623 18.4282C8.00939 18.4282 7.17432 17.5823 7.17432 16.5421C7.17432 15.5019 8.00939 14.6561 9.03623 14.6561Z"
                              fill="#DCE5F1"
                            />
                            <path
                              d="M20.6725 21.2572H6.70859C5.42589 21.2572 4.38135 20.1991 4.38135 18.8996V8.52655C4.38135 7.22701 5.42589 6.1689 6.70859 6.1689H20.6725C21.9553 6.1689 22.9999 7.22701 22.9999 8.52655V18.8996C22.9999 20.1991 21.9553 21.2572 20.6725 21.2572ZM6.70859 19.3711H20.6725C20.9295 19.3711 21.138 19.16 21.138 18.8996V12.2051L18.1973 15.6812C17.8853 16.0517 17.4337 16.2498 16.9488 16.261C16.4666 16.2582 16.0142 16.0414 15.7051 15.666L12.2476 11.4621L11.1212 12.6004C10.4845 13.2453 9.44835 13.2453 8.81255 12.6004L6.24322 9.99854V18.8996C6.24322 19.16 6.45173 19.3711 6.70859 19.3711Z"
                              fill="#DCE5F1"
                            />
                          </svg>
                        </i>
                      </li>
                      <li>
                        <i>
                          <svg
                            width="27"
                            viewBox="0 0 23 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.4759 4.75448C4.98561 4.75448 3.65994 5.72109 3.17856 7.16013L3.14604 7.26855C3.03249 7.64961 2.98492 7.97009 2.98492 8.29075V14.7203L0.72654 7.08378C0.436099 5.96056 1.098 4.79606 2.20852 4.48577L16.6034 0.580665C16.7831 0.533541 16.9628 0.510909 17.1397 0.510909C18.0668 0.510909 18.914 1.13423 19.1514 2.05284L19.9901 4.75448H6.4759Z"
                              fill="#DCE5F1"
                            />
                            <path
                              d="M9.03623 14.6561C10.0631 14.6561 10.898 15.5019 10.898 16.5421C10.898 17.5823 10.0631 18.4282 9.03623 18.4282C8.00939 18.4282 7.17432 17.5823 7.17432 16.5421C7.17432 15.5019 8.00939 14.6561 9.03623 14.6561Z"
                              fill="#DCE5F1"
                            />
                            <path
                              d="M20.6725 21.2572H6.70859C5.42589 21.2572 4.38135 20.1991 4.38135 18.8996V8.52655C4.38135 7.22701 5.42589 6.1689 6.70859 6.1689H20.6725C21.9553 6.1689 22.9999 7.22701 22.9999 8.52655V18.8996C22.9999 20.1991 21.9553 21.2572 20.6725 21.2572ZM6.70859 19.3711H20.6725C20.9295 19.3711 21.138 19.16 21.138 18.8996V12.2051L18.1973 15.6812C17.8853 16.0517 17.4337 16.2498 16.9488 16.261C16.4666 16.2582 16.0142 16.0414 15.7051 15.666L12.2476 11.4621L11.1212 12.6004C10.4845 13.2453 9.44835 13.2453 8.81255 12.6004L6.24322 9.99854V18.8996C6.24322 19.16 6.45173 19.3711 6.70859 19.3711Z"
                              fill="#DCE5F1"
                            />
                          </svg>
                        </i>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="color_main">
              <div className="color_input">
                <input
                  type="text"
                  placeholder="Enter size"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                />
                <div class="col-12 mt-2 mb-4">
                  <button
                    type="button"
                    onClick={() => handleAddSize()}
                    className="btn-add"
                  >
                    <i>
                      <svg
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clip-rule="evenodd"
                          d="m12 3c.5523 0 1 .44772 1 1v7h7c.5523 0 1 .4477 1 1s-.4477 1-1 1h-7v7c0 .5523-.4477 1-1 1s-1-.4477-1-1v-7h-7c-.55228 0-1-.4477-1-1s.44772-1 1-1h7v-7c0-.55228.4477-1 1-1z"
                          fill="#ffffff"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </i>
                  </button>{" "}
                  Add Sizes
                </div>
              </div>

              <ul>
                {sizes.map((size, index) => (
                  <li key={index}>
                    {size}{" "}
                    <button
                      type="button"
                      onClick={() => handleDeleteSize(index)}
                      className="btn-delete"
                    >
                      <i>
                        <svg
                          viewBox="0 0 32 32"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Layer_2" data-name="Layer 2">
                            <path d="m3 7h2v20.48a3.53 3.53 0 0 0 3.52 3.52h15a3.53 3.53 0 0 0 3.48-3.52v-20.48h2a1 1 0 0 0 0-2h-7v-2a2 2 0 0 0 -1.95-2h-8.05a2 2 0 0 0 -2 2v2h-7a1 1 0 0 0 0 2zm9-4h8v2h-8zm-2 4h15v20.48a1.52 1.52 0 0 1 -1.52 1.52h-15a1.52 1.52 0 0 1 -1.48-1.52v-20.48z" />
                            <path d="m12.68 25a1 1 0 0 0 1-1v-12a1 1 0 0 0 -2 0v12a1 1 0 0 0 1 1z" />
                            <path d="m19.32 25a1 1 0 0 0 1-1v-12a1 1 0 0 0 -2 0v12a1 1 0 0 0 1 1z" />
                          </g>
                        </svg>
                      </i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="color_main">
              <div className="color_input">
                <input
                  type="text"
                  placeholder="Enter Color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                />
                <div class="col-12 mt-2 mb-4">
                  <button
                    type="button"
                    onClick={() => handleAddColor()}
                    className="btn-add"
                  >
                    <i>
                      <svg
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clip-rule="evenodd"
                          d="m12 3c.5523 0 1 .44772 1 1v7h7c.5523 0 1 .4477 1 1s-.4477 1-1 1h-7v7c0 .5523-.4477 1-1 1s-1-.4477-1-1v-7h-7c-.55228 0-1-.4477-1-1s.44772-1 1-1h7v-7c0-.55228.4477-1 1-1z"
                          fill="#ffffff"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </i>
                  </button>{" "}
                  Add Colors
                </div>
              </div>

              <ul>
                {colors.map((color, index) => (
                  <li key={index}>
                    {color}{" "}
                    <button
                      type="button"
                      onClick={() => handleDeleteColor(index)}
                      className="btn-delete"
                    >
                      <i>
                        <svg
                          viewBox="0 0 32 32"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Layer_2" data-name="Layer 2">
                            <path d="m3 7h2v20.48a3.53 3.53 0 0 0 3.52 3.52h15a3.53 3.53 0 0 0 3.48-3.52v-20.48h2a1 1 0 0 0 0-2h-7v-2a2 2 0 0 0 -1.95-2h-8.05a2 2 0 0 0 -2 2v2h-7a1 1 0 0 0 0 2zm9-4h8v2h-8zm-2 4h15v20.48a1.52 1.52 0 0 1 -1.52 1.52h-15a1.52 1.52 0 0 1 -1.48-1.52v-20.48z" />
                            <path d="m12.68 25a1 1 0 0 0 1-1v-12a1 1 0 0 0 -2 0v12a1 1 0 0 0 1 1z" />
                            <path d="m19.32 25a1 1 0 0 0 1-1v-12a1 1 0 0 0 -2 0v12a1 1 0 0 0 1 1z" />
                          </g>
                        </svg>
                      </i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* {variantCount == 0 && <div class="col-12 mt-2 mb-4"><button type="button" onClick={addInputField} className="btn-add"><i><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m12 3c.5523 0 1 .44772 1 1v7h7c.5523 0 1 .4477 1 1s-.4477 1-1 1h-7v7c0 .5523-.4477 1-1 1s-1-.4477-1-1v-7h-7c-.55228 0-1-.4477-1-1s.44772-1 1-1h7v-7c0-.55228.4477-1 1-1z" fill="#ffffff" fill-rule="evenodd" /></svg></i></button> Add Sizes</div>}



                        {variantCount > 0 && <div className="card mb-5">
                            <div className="card-body p-4">
                                <h4 className="f-700">Sizes</h4>
                                {
                                    inputFields.map((data, index) => {
                                        return (<div className="row">
                                            <div className="col-md-10">
                                                <div className="row">
                                                    <div className="mb-3 col-md-6">
                                                        <label className="form-label"></label>
                                                        <input
                                                            type="text"
                                                            required
                                                            name="variant"
                                                            value={data?.variant}
                                                            onChange={(evnt) => handleVariantChange(index, evnt)}
                                                            className="form-control"
                                                            placeholder="Title" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <button type="button" onClick={(evnt) => removeInputFields(index, evnt)} className="btn-delete"><i><svg viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><path d="m3 7h2v20.48a3.53 3.53 0 0 0 3.52 3.52h15a3.53 3.53 0 0 0 3.48-3.52v-20.48h2a1 1 0 0 0 0-2h-7v-2a2 2 0 0 0 -1.95-2h-8.05a2 2 0 0 0 -2 2v2h-7a1 1 0 0 0 0 2zm9-4h8v2h-8zm-2 4h15v20.48a1.52 1.52 0 0 1 -1.52 1.52h-15a1.52 1.52 0 0 1 -1.48-1.52v-20.48z" /><path d="m12.68 25a1 1 0 0 0 1-1v-12a1 1 0 0 0 -2 0v12a1 1 0 0 0 1 1z" /><path d="m19.32 25a1 1 0 0 0 1-1v-12a1 1 0 0 0 -2 0v12a1 1 0 0 0 1 1z" /></g></svg></i></button>
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                                {variantCount < 10 && <div class="col-12 mt-2 mb-2"><button type="button" onClick={addInputField} className="btn-add"><i><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m12 3c.5523 0 1 .44772 1 1v7h7c.5523 0 1 .4477 1 1s-.4477 1-1 1h-7v7c0 .5523-.4477 1-1 1s-1-.4477-1-1v-7h-7c-.55228 0-1-.4477-1-1s.44772-1 1-1h7v-7c0-.55228.4477-1 1-1z" fill="#ffffff" fill-rule="evenodd" /></svg></i></button> Add Sizes</div>}
                            </div>
                        </div>
                        } */}

            {inputVariations && inputVariations.length > 0 && (
              <div className="card mb-5">
                <div className="card-body p-4">
                  <div className="col-md-12">
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <h4 class="mb-0 text-success">Select Variants</h4>
                      </div>
                      <div className="col-md-4">
                        <h4 class="mb-0 text-success"> MRP</h4>
                      </div>
                      <div className="col-md-4">
                        <h4 class="mb-0 text-success">Offer Price</h4>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-3">
                            <input
                              class="form-check-input"
                              style={{ margin: 0 }}
                              type="checkbox"
                              onChange={changeAllChecked}
                              value="1"
                              id="status_check"
                            />
                          </div>
                          <div className="col-md-9">
                            &nbsp;&nbsp;{" "}
                            <label for="status_check">Select all</label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <input
                          class="form-check-input"
                          style={{ margin: 0 }}
                          type="checkbox"
                          value="1"
                          onChange={changeAllMrp}
                          id="mrp_check"
                        />
                        &nbsp;&nbsp; <label for="mrp_check">Same for all</label>
                      </div>
                      <div className="col-md-4">
                        <input
                          class="form-check-input"
                          style={{ margin: 0 }}
                          type="checkbox"
                          value="1"
                          onChange={changeAllOffer}
                          id="offer_check"
                        />
                        &nbsp;&nbsp;{" "}
                        <label for="offer_check">Same for all</label>
                      </div>
                    </div>
                    {inputVariations.map((data, index) => {
                      return (
                        <div className="row mb-3">
                          <div className="col-md-4">
                            <div className="row">
                              <div className="col-md-3">
                                <input
                                  class="form-check-input variationStatus"
                                  type="checkbox"
                                  value="1"
                                  checked={
                                    data?.status == "active" ? true : false
                                  }
                                  onChange={(evnt) =>
                                    setVariationStatus(index, evnt)
                                  }
                                  id="flexCheckDefault"
                                />
                              </div>
                              <div className="col-md-9">
                                <input
                                  type="text"
                                  name="name"
                                  readOnly={true}
                                  value={data?.name}
                                  className="form-control"
                                  placeholder="Red + M"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <input
                              type="number"
                              name="mrp"
                              required
                              onChange={(evnt) => setVariantMrp(index, evnt)}
                              defaultValue={data?.mrp}
                              value={data?.mrp}
                              readOnly={index > 0 && allMrp ? true : false}
                              className="form-control variantMrp"
                              placeholder="KES 200"
                            />
                          </div>
                          <div className="col-md-4">
                            <input
                              type="number"
                              name="offer_price"
                              onChange={(evnt) => setVariantOffer(index, evnt)}
                              defaultValue={data?.offer_price}
                              value={data?.offer_price}
                              readOnly={index > 0 && allOffer ? true : false}
                              className="form-control variantOffer"
                              placeholder="KES 200"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            <div className="card mb-5">
              <div className="card-body p-4">
                <div className="mb-3">
                  <label className="form-label">Serviceability Group</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChangeGroup}
                    placeholder="Serviceability Group"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Expected Delivery time (in days)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChangeDeliveryTime}
                    placeholder="Expected Delivery time (in days)"
                  />
                </div>
              </div>
            </div>

            <div className="card mb-5">
              <div className="card-body p-4">
                <h4 className="f-700">Inventory</h4>
                <div className="mb-3">
                  <label className="form-label">SKU *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={onChangeSku}
                    placeholder="SKU Number"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Stock Quantity *</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    onChange={onChangeQuantity}
                    placeholder="Stock Quantity"
                  />
                </div>
              </div>
            </div>
            <div
              className={variantCount == 0 ? "card mb-5" : "card mb-5 d-none"}
            >
              <div className="card-body p-4">
                <h4 className="f-700">Price</h4>
                <div className="mb-3">
                  <label className="form-label">Cost Price *</label>
                  <input
                    type="number"
                    onChange={onChangeCostPrice}
                    required={variantCount == 0 ? true : false}
                    className="form-control"
                    placeholder="Cost Price"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">MRP*</label>
                  <input
                    type="number"
                    className="form-control"
                    required={variantCount == 0 ? true : false}
                    onChange={onChangeMrp}
                    placeholder="MRP"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Offer Price</label>
                  <input
                    type="number"
                    onChange={onChangeOfferPrice}
                    className="form-control"
                    placeholder="Offer Price"
                  />
                </div>
                <div className="mb-3">
                  <h4 class="f-700">Available for Sales</h4>
                  <div className="readio-button-add">
                    <label>Available</label>

                    <input
                      type="checkbox"
                    //   value="pickUp"
                    //   checked={selectValue === "pickUp"}
                    //   onChange={onChangeValue}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <h4 class="f-700">How To Get</h4>
                  <div className="readio-button-add">
                    <label>Pick Up</label>

                    <input
                      type="radio"
                      value="pickUp"
                      checked={selectValue === "pickUp"}
                      onChange={onChangeValue}
                    />
                  </div>
                  <div className="readio-button-add">
                    <label>Shipping</label>
                    <input
                      type="radio"
                      value="shipping"
                      checked={selectValue === "shipping"}
                      onChange={onChangeValue}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end btn-min-width">
              <button className="btn btn-primary" disabled={loading} >
              {/* <button className="btn btn-primary" disabled={loading}> */}
                {/* {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )} */}
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductSection;
