import React, {useEffect, useState, useRef } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Sidebar from "../common/sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DataService from "../services/data.service";


const SocialMediaLinks = () => {
  const form = useRef();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fburl, setFbUrl] = useState('');
  const [instaurl, setInstaUrl] = useState('');
  const [twitterurl, setTwitterUrl] = useState('');
  const [linkedinurl, setLinkedInUrl] = useState('');
  const [tiktokurl, setTikTokUrl] = useState('');
  React.useEffect(() => {
    document.title = "Social Media Links";
    getData();
  }, []);
  const changeFbUrl = (e) => {
    setFbUrl(e.target.value);
  }
  const changeInstaUrl = (e) => {
    setInstaUrl(e.target.value);
  }
  const changeTwitterUrl = (e) => {
    setTwitterUrl(e.target.value);
  }
  const changeLinkedInUrl = (e) => {
    setLinkedInUrl(e.target.value);
  }
  const changeTikTokInUrl = (e) => {
    setTikTokUrl(e.target.value);
  }

  const getData = async () => {
    await DataService.getSocialLinks().then(
      (data) => {
        setFbUrl(data?.data?.data?.facebook);
        setTwitterUrl(data?.data?.data?.twitter);
        setLinkedInUrl(data?.data?.data?.linkedin);
        setInstaUrl(data?.data?.data?.instagram);
        setTikTokUrl(data?.data?.data?.tiktok)
      })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const data = {
      facebook : fburl,
      twitter : twitterurl,
      linkedin : linkedinurl,
      instagram : instaurl,
      tiktok : tiktokurl
    }
    await DataService.addSocialLinks(data).then(
        () => {
          toast.success('Updated successfully!', {
              position: toast.POSITION.TOP_RIGHT
          });
        }).catch((error)=>{
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
      });
      
  }

  return (
    <div className="bg-grey h-100">
      <ToastContainer></ToastContainer>
      <Header />

      <section className="content-area mt-4">
        <Sidebar />
        <div className="Right-content">
          <div className="main-content">
            <div className="sml_mainSection">
            <h2 className="mb-0 f-700">Social Media Links</h2>
            <form onSubmit={handleSubmit} ref={form}>
              {message && (
                            <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                            </div>
                        )}
                <div className="int_field">
                  <label for="fb-url">Facebook</label><br />
                  <input type="text" placeholder="URL" id="fb-url" onChange={changeFbUrl} value={fburl} />
                </div>
                <div className="int_field">
                  <label for="instagram-url">Instagram</label><br />
                  <input type="text" placeholder="URL" id="instagram-url" onChange={changeInstaUrl} value={instaurl} />
                </div>
                <div className="int_field">
                  <label for="twitter-url">Twitter</label><br />
                  <input type="text" placeholder="URL" id="twitter-url" onChange={changeTwitterUrl} value={twitterurl} />
                </div>

                <div className="int_field">
                  <label for="linkedin-url">Linkedin</label><br />
                  <input type="text" placeholder="URL" id="linkedin-url" onChange={changeLinkedInUrl} value={linkedinurl}  />
                </div>
                <div className="int_field">
                  <label for="tiktok-url">TikTok</label><br />
                  <input type="text" placeholder="URL" id="tiktok-url" onChange={changeTikTokInUrl} value={tiktokurl}/>
                </div>
                <div className="submit_field">
                  <input type="submit" value="Save" id="save" />
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </section>


    </div>
  );
};

export default SocialMediaLinks;