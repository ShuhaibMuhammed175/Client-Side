import React, { useContext, useEffect, useState } from "react";
import "../css/detail.css";
import Layout from "./Layout";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from "axios";
import { SocialIcon } from 'react-social-icons'



const DetailView = () => {
  const { authToken } = useContext(AuthContext);
  const location = useLocation();
  const Restaurant = location.state?.restaurantData;
  const [menuItems, setMenuItems] = useState([]);
  const [restoImages, setRestoImages] = useState([])
  const [profileImg, setProfileImg] = useState(null)
  const navigate = useNavigate()
 
 


  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/restaurant/menu_items/${Restaurant.id}/`,
          {
            headers: {
              Authorization: `Bearer ${authToken.access}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data
          setMenuItems(data);
          
        }
      } catch (error) {
        console.log(`Error fetching menu :`, error);
      }
    };
    fetchMenu();
  }, [Restaurant, authToken.access]);



  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/restaurant/images/${Restaurant.id}/`, {
        headers : {
          'Authorization': `Bearer ${authToken.access}`
        }
      })
      if (response.status === 200 ) {
        const data = response.data
        setRestoImages(data)
      }
      }
      catch (error) {
        console.log(`Error occured when fetching images ${error}`)
      }
    }
    fetchImages()
  },[Restaurant.id, authToken.access])

  

  useEffect(()=> {
    if (Restaurant) {
      setProfileImg(Restaurant.profile_image)
    }
  },[Restaurant])



  const handleImg = (imgURL, id) => {
   
    const updatedCoverImg = restoImages.map((entry, index) => (
      index === id ? {...entry, image: profileImg} : entry
    ))
    
    setRestoImages(updatedCoverImg);
    setProfileImg(imgURL);
  };

  const handleBooking = () => {
    navigate(`/reservation/${Restaurant.id}`)
  }

  return (
    <Layout>
      <div className="card-wrapper">
        <div className="card">
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img
                src={`http://127.0.0.1:8000${profileImg}`}
                  alt="Loading...."
                  className="memorable-image"/>
              </div>
            </div>
            <div className="img-select">
              {restoImages && (
                restoImages.map((image, index) => (
                  <div className="img-item" key={index}>
                  
                    <img src={`http://127.0.0.1:8000${image.image}`} alt="Loading...." className="memorable-images" onClick={() => handleImg(image.image, index)}/>
                 
                  </div>
                ))
              )}
             
              
            </div>
          </div>

          <div className="product-content">
            <h2 className="product-title">{Restaurant.name}</h2>
            <p className="product-link">{Restaurant.location}</p>
            <div className="product-rating">
              <span>4.7(21)</span>
            </div>

            <div className="product-price">
              <p className="new-price">
                Booking starts from : <span>$249.00 (5%)</span>
              </p>
            </div>

            <div className="product-detail">
              <h2>about this restaurant: </h2>
              <p>{Restaurant.description}</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur, perferendis eius. Dignissimos, labore suscipit.
                Unde.
              </p>

              {menuItems.length > 0  ?
                <>
                <h2>Dining Options</h2>
                {menuItems.map((menuItem) => (
                  <div key={menuItem.id}>
                     <p><strong>{menuItem.name}</strong>: {menuItem.description}</p>
                  </div>
                 
                ))}
                </>
                : (
                <h3>No menu items available</h3>
              )}
              
                
            </div>

            <div className="purchase-info">
              <button type="button" className="btn" onClick={() => handleBooking()}>
                Book a table
              </button>
              
            </div>

            <div className="social-links">
              <p>Share At: </p>
              <SocialIcon url="https://facebook.com" />
             <SocialIcon url="https://twitter.com" />
             <SocialIcon url="https://instagram.com" />
             <SocialIcon url="https://whatsapp.com" />
             <SocialIcon url="https://pintrest.com" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default DetailView;
