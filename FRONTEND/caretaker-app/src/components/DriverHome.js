import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import "./Table.css";
import "./UserHome.css";

function DriverHome() {
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");

  const [bookings, setBookings] = useState([]);
  const [showOtpDiv, setShowOtpDiv] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/driver/get/bookings",
        { params: { username, password } }
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch bookings!");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  const handleCompleteClick = (bookingId) => {
    setCurrentBookingId(bookingId);
    setOtp("");
    setMessage("");
    setShowOtpDiv(true);
    sendOtp(bookingId);
  };


  const sendOtp = async (bookingId) => {
    try {
      await axios.post(
        `http://localhost:8080/driver/complete/${bookingId}`,
        null,
        { params: { username, password } }
      );
      setMessage("OTP sent to user's email.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/driver/verify-otp",
        null,
        { params: { bookingId: currentBookingId, otp } }
      );

      if (res.data.status === "success") {
        setMessage("OTP verified! Booking completed.");
        setShowOtpDiv(false);
        fetchBookings();
      } else {
        setMessage("Invalid OTP, try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error verifying OTP.");
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Driver Dashboard</h2>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Pickup</th>
            <th>Drop</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Caretaker</th>
            <th>Driver Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b.bookingId}>
                <td>{b.bookingId}</td>
                <td>{b.pickupLocation}</td>
                <td>{b.dropLocation}</td>
                <td>{b.vehicleType}</td>
                <td>{b.status}</td>
                <td>{b.caretaker?.username || "Not Assigned"}</td>
                <td>
                  {!b.driverCompleted ? (
                    <button
                      className="complete-btn"
                      onClick={() => handleCompleteClick(b.bookingId)}
                    >
                      Complete
                    </button>
                  ) : (
                    "✔ Completed"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showOtpDiv && (
        <div className="otp-div">
          <h3>Enter OTP for Booking ID: {currentBookingId}</h3>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="otp-buttons">
            <button onClick={handleVerifyOtp}>Verify OTP</button>
            <button onClick={() => sendOtp(currentBookingId)}>Resend OTP</button>
          </div>
          <p className="otp-message">{message}</p>
        </div>
      )}
    </div>
  );
}

export default DriverHome;
