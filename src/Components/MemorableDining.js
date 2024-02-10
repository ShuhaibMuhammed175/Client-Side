import React, { useEffect, useState } from 'react';
import '../css/home.css';
import image1 from '../assets/image1.jpg'; // Import your image files
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import {Link} from 'react-router-dom'

const MemorableDining = () => {
  

 
    return (
      <div className='memorable-dining-container'>
        <div className='text-content'>
          <div className='paragraph-container'>
            <h2 className='welcome-header'>Lock in Memorable <br />Dining</h2>
            <p className='welcome-para'>
              Welcome to FineDine, where we redefine the art of dining. Immerse yourself in a world of culinary excellence, where every reservation guarantees an unforgettable journey for your taste buds. Discover a seamless and intuitive platform that puts the power of reservation at your fingertips. Whether you seek an intimate dinner for two or a grand celebration, FineDine ensures you secure the perfect table in just a few clicks.
            </p>
            <div >
            <Link to='/restaurants' className='booking-button'><strong>BOOK A TABLE</strong></Link>
            </div>
            
           
          </div>
        </div>
        <div className='image-container'>
          <div className='image-grid'>
            <img src={image1} alt='Image 1' className='memorable-image' />
            <img src={image2} alt='Image 2' className='memorable-image' />
            <img src={image3} alt='Image 3' className='memorable-image' />
            <img src={image4} alt='Image 4' className='memorable-image' />
          </div>
        </div>
      </div>
    );
  }
  
  export default MemorableDining;