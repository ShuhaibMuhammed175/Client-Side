import React, { useContext, useEffect, useState } from "react";
import "../css/reservation.css";
import Layout from "./Layout";
import DateTime from "./DateTime";
import axios from "axios";
import AuthContext from "./AuthContext";
import { useParams } from "react-router-dom";

const Reservation = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [selectedTable, setSelectedTable] = useState([]);
  const [tables, setTable] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [reservedTable, setReservedTable] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  
  const [quantity, setQuantity] = useState({});
  const [bookNow, setBookNow] = useState(false)
  const [reservationId, setReservationId] = useState(null)
  const [reservationData, setReservationData] = useState({
      user_id: user.user_id,
      table_id: null,
      datetime: null,
      menu_items: [],
      status: "pending",
      total: 0.0,
    }
  );



  const handleMenuItems = (menuId) => {
    const menuItem = menuItems.find((item) => item.id === menuId);

    if (!selectedMenu.includes(menuId)) {
      if (!orderItems.some((item) => item.id === menuId)) {
        const newOrderItems = [...orderItems, menuItem];
        setOrderItems(newOrderItems);

        const newMenuItems = [
          ...reservationData.menu_items,
          { id: menuId, quantity: quantity[menuId] || 1 },
        ];

        const newReservationData = {
          ...reservationData,
          menu_items: newMenuItems,
        };
        setReservationData(newReservationData);
      }

      const newSelectedMenu = [...selectedMenu, menuId];
      setSelectedMenu(newSelectedMenu);
    } else {
      const newOrderItem = orderItems.filter((item) => item.id !== menuId);
      setOrderItems(newOrderItem);

      const newSelectedMenu = selectedMenu.filter((id) => id !== menuId);
      setSelectedMenu(newSelectedMenu);

      const newMenuItems = reservationData.menu_items.filter(
        (item) => item.id !== menuId
      );
      const newReservationData = {
        ...reservationData,
        menu_items: newMenuItems,
      };
      setReservationData(newReservationData);
    }
  };



  useEffect(() => {
    if (selectedTable) {
      const reservation = tables.find((item) => item.id === selectedTable);
      console.log(`reservation `, reservation);
      setReservedTable(reservation ? reservation.reservation_fee : 0);
    }

    if (!selectedTable) {
      setReservedTable(0);
    }
  }, [selectedTable, tables]);

 

  const handleTableClick = (tablenumber) => {
    if (selectedTable !== tablenumber) {
      setSelectedTable(tablenumber);
      setReservationData((prevData) => ({
        ...prevData,
        table_id: tablenumber,
      }));
    } else {
      setSelectedTable(null);
      setReservationData((prevData) => ({
        ...prevData,
        table_id: null,
      }));
    }
  };

  const handleIncrement = (itemId) => {
    const currentQty = quantity[itemId] || 1;

    setQuantity((prevQty) => {
      if (currentQty < 10) {
        return {
          ...prevQty,
          [itemId]: currentQty + 1,
        };
      }
      return prevQty;
    });

    addQty(itemId, currentQty + 1);

    if (reservationData.menu_items.some((item) => item.id === itemId)) {
      const newMenu = reservationData.menu_items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: currentQty + 1,
          };
        }
        return item;
      });

      setReservationData((prevData) => ({
        ...prevData,
        menu_items: newMenu,
      }));
    }
  };

  const handleDecrement = (itemId) => {
    const currentQty = quantity[itemId] || 1;

    setQuantity((preQty) => {
      if (currentQty > 1) {
        return {
          ...preQty,
          [itemId]: currentQty - 1,
        };
      }
      return preQty;
    });

    addQty(itemId, currentQty - 1);

    if (reservationData.menu_items.some((item) => item.id === itemId)) {
      const newMenu = reservationData.menu_items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: currentQty - 1,
          };
        }
        return item;
      });

      setReservationData((prevData) => ({
        ...prevData,
        menu_items: newMenu,
      }));
    }
  };

  const addQty = (itemId, newQty) => {
    const updatedMenuItems = reservationData.menu_items.map((item) => {
      if (item.id === itemId) {
        return { ...item, id: itemId, quantity: newQty };
      }
      return item;
    });

    setReservationData((prevData) => ({
      ...prevData,
      menu_items: updatedMenuItems,
    }));
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/restaurant/menu_items/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${authToken.access}`,
            },
          }
        );
        const data = response.data;
        setMenuItems(data);
      } catch (error) {
        console.log(`error : ${error}`);
      }
    };

    const fetchTable = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/restaurant/tables/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${authToken.access}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          setTable(data);
        }
      } catch (error) {
        console.log(`error : ${error}`);
      }
    };

    fetchMenu();
    fetchTable();
  }, [id, authToken.access]);

  const subtotal = orderItems.reduce(
    (acc, item) => acc + (quantity[item.id] || 1) * item.price,
    0
  );

  useEffect(() => {
    if (formattedDate) {
      setReservationData((prevData) => ({
        ...prevData,
        datetime: formattedDate,
      }));
    }
    if (subtotal) {
      setReservationData((prevData) => ({
        ...prevData,
        total: +subtotal + +reservedTable,
      }));
    }
  }, [formattedDate, subtotal, reservedTable]);

  useEffect(() => {
    console.log("reservationData", reservationData);
  }, [reservationData]);


  const handleReservation = async() => {

    try {
      const response = await axios.post(`http://127.0.0.1:8000/restaurant/reservation/`,reservationData, {
      headers:  {
        'Authorization' : `Bearer ${authToken.access}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 201) {
      setReservationId(response.data.id)
      setBookNow(true)
    }
    }
    catch (error) {
     setBookNow(false)
     alert(`You cannot reserve change time or table`)
    }
  }

  const handleStripe = async () => {
    try {
      console.log('subtotal ', subtotal)
      console.log('reservationfee ', reservedTable)
      console.log('reservationId ', reservationId)
      const response = await axios.post(
        `http://127.0.0.1:8000/payment/create-checkout-session/${reservationId}/`,
        {
          subtotal: +subtotal, 
          reservationFee: +reservedTable, 
      },
        {
          headers: {
            'Authorization': `Bearer ${authToken.access}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      
      if (response.status === 200) {
        const {  url } = response.data;
  
        // Redirect the user to the Stripe checkout page
        window.location.href = url;
      } else {
        // Handle unsuccessful response
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      // Handle general errors
      console.error('Error:', error);
    }
  };
  
  
  
  return (
    <Layout>
      <div className="reservation-container">
        <div className="menu-container">
        <h2>Choose your menu</h2>
          {menuItems && menuItems.length > 0 && (
            <ul className="menu-list">
              {menuItems.map((menuItem) => (
                <li
                  key={menuItem.id}
                  className={`menu-item ${
                    selectedMenu.includes(menuItem.id) ? "selected" : ""
                  }`}
                  onClick={() => handleMenuItems(menuItem.id)}
                >
                  <img
                    src={`http://127.0.0.1:8000/${menuItem.image}`}
                    alt="Item 1"
                  />
                  <h2>{menuItem.name}</h2>
                  <p>{menuItem.description}</p>
                  <span className="price">${menuItem.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="tables-container">
          <div className="datetime">
            <DateTime
              formattedDate={formattedDate}
              setFormattedDate={setFormattedDate}
              handleReservation={handleReservation}
              reservation={reservationData}
            />
          </div>
          {tables.length > 0 && (
            <>
            <h2 className="my-h2">Select Date and Time</h2>
            <ul className="table-list">
              {tables.map((table) => (
                <li
                  key={table.id}
                  className={`table-item ${
                    selectedTable === table.id ? "selected" : ""
                  }`}
                  onClick={() => handleTableClick(table.id)}
                >
                  <div className="table-header">
                    <span>{`Table No ${table.table_no}`}</span>
                  </div>
                  <div className="table-info">
                    <span>{`Capacity ${table.capacity}`}</span>
                  </div>
                </li>
              ))}
            </ul>
            </>
          )}

          {orderItems && orderItems.length > 0 && (
            <>
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Menu Item</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        <div className="quantity-container">
                          <span className="quantity">
                            {quantity[item.id] || 1}
                          </span>
                          <div className="quantity-controls">
                            <button
                              className="control-button"
                              id="increase"
                              onClick={() => handleIncrement(item.id)}
                            >
                              ▲
                            </button>
                            <button
                              className="control-button"
                              id="decrease"
                              onClick={() => handleDecrement(item.id)}
                            >
                              ▼
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong>$</strong>
                        {quantity[item.id] * item.price || item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="subtotal-section">
              {bookNow && (
                <button className="book-now-button" onClick={() => handleStripe()}>Book Now</button>
              )}
                

                {selectedTable && (
                  <div className="reservation-charge">
                    <p>Reservation Charge: ${reservedTable}</p>
                  </div>
                )}

                <div className="subtotal">
                  <p>
                    Subtotal:{" "}
                    <strong>
                      ${selectedTable ? +subtotal + +reservedTable : subtotal}
                    </strong>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Reservation;
