import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import "./Table.css";
import "./UserHome.css";

function UserHome() {
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");

  const [bookingData, setBookingData] = useState({
    pickupLocation: "",
    dropLocation: "",
    vehicleType: "Car",
    caretakerRequired: "",
    wheelChairRequired: ""
  });

  const [userBookings, setUserBookings] = useState([]);

  const [ratings, setRatings] = useState({});

  const handleRating = (bookingId, stars) => {
    setRatings((prev) => ({ ...prev, [bookingId]: stars }));
  };

  const fetchUserBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/users/get/bookings",
        { params: { username, password } }
      );
      setUserBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch your bookings!");
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { username, password, ...bookingData };

      const response = await axios.post(
        "http://localhost:8080/users/post/booking",
        payload
      );

      if (response.data.status === "success") {
        alert(`Booking successful! Booking ID: ${response.data.bookingId}`);

        setBookingData({
          pickupLocation: "",
          dropLocation: "",
          vehicleType: "Car",
          caretakerRequired: "",
          wheelChairRequired: ""
        });

        fetchUserBookings();
      } else {
        alert("Booking failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Booking failed!");
    }
  };

  return (
    <div className="userhome-container">
      <div className="booking-section">
        <h2 className="login-title">Welcome, {username}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="pickupLocation"
            placeholder="Pickup Location"
            value={bookingData.pickupLocation}
            onChange={handleChange}
            className="login-input"
            required
          />

          <input
            type="text"
            name="dropLocation"
            placeholder="Drop Location"
            value={bookingData.dropLocation}
            onChange={handleChange}
            className="login-input"
            required
          />

          <select
            name="vehicleType"
            value={bookingData.vehicleType}
            onChange={handleChange}
            className="login-input"
            required
          >
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Auto">Auto</option>
          </select>

          <select
            name="caretakerRequired"
            value={bookingData.caretakerRequired}
            onChange={handleChange}
            className="login-input"
            required
          >
            <option value="" disabled> Caretaker Required </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>

          <select
            name="wheelChairRequired"
            value={bookingData.wheelChairRequired}
            onChange={handleChange}
            className="login-input"
            required
          >
            <option value="" disabled> Wheelchair Required </option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>

          <button type="submit" className="login-btn">
            Book Ride
          </button>
        </form>
      </div>

      <div className="table-section">
        <h2 className="table-title">Your Bookings</h2>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Caretaker</th>
              <th>Driver</th>
              <th>Review</th>
            </tr>
          </thead>

          <tbody>
            {userBookings.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No bookings found
                </td>
              </tr>
            ) : (
              userBookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.pickupLocation}</td>
                  <td>{b.dropLocation}</td>
                  <td>{b.vehicleType}</td>
                  <td>{b.status}</td>
                  <td>{b.caretaker?.username || "Not Assigned"}</td>
                  <td>{b.driver?.username || "Not Assigned"}</td>
                  <td>
                    <div className="star-container">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${
                            ratings[b.bookingId] >= star ? "filled" : ""
                          }`}
                          onClick={() => handleRating(b.bookingId, star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default UserHome;
