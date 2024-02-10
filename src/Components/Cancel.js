import React from 'react';
import { Link } from 'react-router-dom';
import '../css/cancel.css'; // Import your CSS file
import Layout from './Layout';

const PaymentCancel = () => {
  return (
    <Layout>
    <div className="cancel-body">
      <div className="payment-status-container-cancel">
        <p className="failure-message-cancel">
          <span role="img" aria-label="Cross Mark">
            ❌
          </span>{' '}
          Transaction Failed
        </p>
        <Link to="/" className="go-back-link-cancel">
          Go back to Home
        </Link>
      </div>
    </div>
    </Layout>
  );
};

export default PaymentCancel;
