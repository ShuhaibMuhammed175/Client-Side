import axios from "axios";
import React, { useContext, useEffect, useState } from 'react';
import '../css/ReservationDetails.css';
import AuthContext from './AuthContext';
import Layout from "./Layout";

const FakeTable = () => {
  const [reservations, setReservations] = useState([]);
  const [FilterReservations, SetFilterReservations] = useState([]);
  
  const {user, authToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/reservations/${user.user_id}`, null, {
          headers: {
            'Authorization': `Bearer ${authToken.access}`
          }
        })
        if (response.status === 200) {
          const data = response.data;
          setReservations(data);
          SetFilterReservations(data);
        }
      } catch (error) {
        console.log(`error ${error}`);
      }
    };
    fetchReservation();
  }, [authToken, user.user_id]);

  const handleFilter = (filter) => {
    if (filter !== 'confirmed' && filter !== 'pending') {
      SetFilterReservations(reservations);
    } else {
      SetFilterReservations(
        reservations.filter((item) => item.status === filter)
      );
    }
  };

  const cancelReservation = async (reservationId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/reservation/delete/${reservationId}/`, null, {
        headers: {
          'Authorization': `Bearer ${authToken.access}`
        }
      });
      if (response.status === 200) {
        SetFilterReservations(FilterReservations.filter((prevData) => prevData.id !== reservationId));
      }
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  return (
    <Layout>
      <>
        <div className="button-container">
          <button className="button" onClick={() => handleFilter('all')}>All Reservations</button>
          <button className="button" onClick={() => handleFilter('confirmed')}>Paid</button>
          <button className="button" onClick={() => handleFilter('pending')}>Pending</button>
        </div>
        {FilterReservations.length === 0 ? (
          <p className="center-message">Currently, there are no reservations.</p>
        ) : (
          <table className="fake-table">
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Table No</th>
                <th>Date</th>
                <th>Time</th>
                <th>Menu Items</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {FilterReservations.map((item) => (
                <tr key={item.id}>
                  <td>{item.restaurant_name}</td>
                  <td>{item.table_no}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>
                    {item.menu_items.map((menuItem) => (
                      <div key={menuItem.id}>
                        {menuItem.name}
                      </div>
                    ))}
                  </td>
                  <td>{item.total}</td>
                  <td>{item.status}</td>
                  <td>{item.status === 'confirmed' && (
                    <button>
                      <span className="cancel" onClick={() => cancelReservation(item.id)}>Cancel</span>
                    </button>
                  )}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    </Layout>
  );
};

export default FakeTable;
