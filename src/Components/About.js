import React from 'react';
import '../css/AboutUs.css'; 
import logo from '../assets/logo.jpeg'; 
import Layout from './Layout';

const AboutUs = () => {
  return (
    <Layout>
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="about-us-header">
          <h1 className="about-us-heading">Welcome to Our Company</h1>
          <img className="team-image" src={logo} alt="Team" />
        </div>
        <p className="about-us-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod
          nibh vel mauris vulputate, vel efficitur justo hendrerit. Praesent ut
          turpis sit amet turpis aliquet aliquam nec non tortor.
        </p>
        <p className="about-us-description">
          Proin bibendum tincidunt libero, ut sodales dui pharetra ac. Fusce
          varius eros vel purus tincidunt, vel malesuada justo fermentum. Donec
          in mi varius, dignissim metus nec, fermentum felis.
        </p>
        <p className="about-us-description">
          Suspendisse potenti. Sed nec erat non ante malesuada varius. Integer
          vel enim nec augue feugiat commodo. Quisque bibendum, justo vel
          vulputate suscipit, velit libero posuere nisl, a congue risus felis
          vel ex.
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default AboutUs;
