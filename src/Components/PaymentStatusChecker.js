import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../css/payment.css';
import Layout from "./Layout";

const PaymentStatusChecker = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search).get('payment_success') === 'true';

  useEffect(() => {
    if (urlParams) {
      clearLocalStorageItems();
      setPaymentSuccess(true);
    }
  }, [urlParams]);

  const clearLocalStorageItems = () => {
    localStorage.removeItem('selectedTable');
    localStorage.removeItem('reservationData');
    localStorage.removeItem('orderItems');
    localStorage.removeItem('selectedMenu');
    localStorage.removeItem('quantity');
  };

  return (
    <Layout>
    <div className="payment-container">
    <div className="payment-status-container">
      {paymentSuccess ? (
        <div>
          <p className="payment-success-message">
            <span role="img" aria-label="Checkmark">
              ✅
            </span>{' '}
            Payment Successful!
          </p>
          <Link to="/" className="payment-go-home-link">
            Go Home
          </Link>
        </div>
      ) : (
        <p className="payment-waiting-message">Waiting for payment confirmation</p>
      )}
    </div>
    </div>
    </Layout>
  );
};

export default PaymentStatusChecker;
