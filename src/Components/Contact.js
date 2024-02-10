import React from 'react';
import '../css/contact.css'; 
import Layout from './Layout';

const ContactUs = () => {
  return (
    <Layout>
      <div className="contact-us-container">
        <div className="contact-us-content">
          <div className="contact-us-header">
            <h1 className="contact-us-heading">Get in Touch</h1>
          </div>
          <div className="contact-section">
            <div className="contact-details-form">
              <div className="contact-details">
                <div className="contact-item">
                  <span
                    className="contact-icon"
                    role="img"
                    aria-label="Email Icon"
                  >
                    📧
                  </span>
                  <p>FineDine@example.com</p>
                </div>
                <div className="contact-item">
                  <span
                    className="contact-icon"
                    role="img"
                    aria-label="Phone Icon"
                  >
                    📞
                  </span>
                  <p>+1 (123) 456-7890</p>
                </div>
              </div>
              <form className="contact-form">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message" rows="4" />
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
