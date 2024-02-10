import { Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Login";
import './index.css'; 
import Home from "./Components/Home";
import Register from "./Components/Register";
import {AuthProvider}  from "./Components/AuthContext";
import Restaurants from "./Components/Restaurants";
import DetailView from "./Components/DetailView";
import DateTime from "./Components/DateTime";
import Reservation from "./Components/Reservation";
import PaymentStatusChecker from "./Components/PaymentStatusChecker";
import PaymentCancel from "./Components/Cancel";
import AboutUs from "./Components/About";
import ContactUs from "./Components/Contact";
import  ReservationDetails from "./Components/ReservationsDetails";
import Otp from "./Components/OtpVerify";



function App() {
  return (
    <div className="App">
      
      <AuthProvider>
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/verify-otp" element={<Otp/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/logout" element={<LoginForm/>}/>
          <Route path="/restaurants" element={<Restaurants/>}/>
          <Route path="/detailview" element={<DetailView/>}/>
          <Route path="/datetime" element={<DateTime/>}/>
          <Route path="/reservation/:id" element={<Reservation/>}/>
          <Route path="/success" element={<PaymentStatusChecker/>}/>
          <Route path="/cancel" element={<PaymentCancel/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/reservation-details" element={<ReservationDetails/>}/>
        </Routes>

      </AuthProvider>
      

    
     
      
    </div>
  );
}

export default App;
