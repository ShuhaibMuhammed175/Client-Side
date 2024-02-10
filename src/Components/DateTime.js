import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/time.css';

const DateTime = ({ setFormattedDate, handleReservation, reservation }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [minTime, setMinTime] = useState(null);
  const [maxTime, setMaxTime] = useState(null);
  const hasAllValues =
  reservation.user_id !== null && reservation.user_id !== undefined &&
  reservation.table_id !== null && reservation.table_id !== undefined &&
  reservation.datetime !== null && reservation.datetime !== undefined &&
  Array.isArray(reservation.menu_items) && reservation.menu_items.length > 0 &&
  reservation.status !== null && reservation.status !== undefined &&
  reservation.total !== null && reservation.total !== undefined;

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    // Calculate the next available time slot without including the past hours
    const nextHour = currentHour + 1;

    // Check if the current time is before 21:00 and before 22:00 (10:00 PM)
    if (currentHour < 21 && currentHour < 22) {
      setMinTime(new Date().setHours(nextHour, 0, 0, 0));
      setMaxTime(new Date().setHours(21, 0, 0, 0));
    } else {
      // If it's past 21:00 or 22:00 (10:00 PM), set the next day's time
      setMinTime(new Date().setHours(10, 0, 0, 0));
      setMaxTime(new Date().setHours(21, 0, 0, 0));
    }
  }, []);

  const formatSelectedDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleDateString('en-US', options);
  };

  const handleDateChange = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Check if the selected date is in the past
    if (date < currentDate) {
      // If the selected date is before today, set it to today
      setSelectedDate(currentDate);
    } else {
      setSelectedDate(date);

      // Check if the selected date is the current day
      if (date.getTime() === currentDate.getTime()) {
        // Always set the min time to the next hour
        setMinTime(new Date().setHours(currentDate.getHours() + 1, 0, 0, 0));

        // Always set the max time to 21:00 or 22:00 (10:00 PM), whichever is earlier
        setMaxTime(Math.min(new Date().setHours(21, 0, 0, 0), new Date().setHours(22, 0, 0, 0)));
      } else {
        // If the selected date is not the current day, set the next day's time
        setMinTime(new Date(date).setHours(10, 0, 0, 0));
        setMaxTime(new Date(date).setHours(21, 0, 0, 0));
      }
    }
  };
  useEffect(() => {
    if(selectedDate) {
      setFormattedDate(formatSelectedDate(selectedDate))
    }
  }, [selectedDate])

  return (
    <div>
      <h2>Select Date and Time</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="h:mm aa"
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={new Date()}
        minTime={minTime}
        maxTime={maxTime}
        placeholderText="Select date and time"
        filterTime={(time) => time >= minTime && time <= maxTime}
        excludeTimes={[]}
      />
      {hasAllValues && <button className="book-now-button" onClick={() => handleReservation()}>Reserve Now</button>}
      
    </div>
  );
};

export default DateTime;
