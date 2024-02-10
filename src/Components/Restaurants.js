import React, { useContext, useEffect, useState } from "react";
import "../css/restaurants.css"; // Import your CSS file
import Layout from "./Layout";
import AuthContext from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import chef from '../assets/chef.png';

const Restaurants = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [filteredRestaurantData, setFilteredRestaurantData] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('first**********')
        const response = await axios.get("http://127.0.0.1:8000/restaurants/", {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        });
        if (response.status === 200) {
          console.log('second**********')
          setRestaurantData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      
      }
      
    };

    fetchData();
  }, [authToken.access]);

  useEffect(() => {
    console.log('third**********')
    setFilteredRestaurantData(
      restaurantData.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [restaurantData, searchInput]);

  const handleClick = (restaurant) => {
    navigate("/detailview", {
      state: { restaurantData: restaurant },
    });
  };

  return (
    <Layout>
      <div className="main-container">
        <div className="left-section">
          <h2 className="res-heading">Book your table now and enjoy a delightful dining experience!</h2>
          <div className="my-image-container">
            <img
              src={chef}
              alt="Choose a good place to eat"
              className="my-header-image"
            />
          </div>
        </div>

        <div className="right-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="restaurants-container">
            {filteredRestaurantData.map((restaurant) => (
              <div
                className="restaurant"
                onClick={() => handleClick(restaurant)}
                key={restaurant.id}
              >
                <div className="image">
                  <img
                    src={`http://127.0.0.1:8000${restaurant.profile_image}`}
                    alt="Loading...."
                    className="memorable-image"
                  />
                </div>
                <div className="details">
                  <div className="left-details">
                    <div className="name">{restaurant.name}</div>
                    <div className="location">{restaurant.location}</div>
                  </div>
                  <div className="right-details">
                    <div className="rating">4.5</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Restaurants;
