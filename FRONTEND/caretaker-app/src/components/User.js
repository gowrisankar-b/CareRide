import React, { useState } from "react";
import axios from "axios";

function User() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    gender: "Male",
    email: "",
    phoneNumber: "",
    address: "",
    emergencyContact: "",
    medicalConditions: "",
    wheelchairNeeded: "" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/users/post/users", formData);
      alert("User signed up successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Signup failed!");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">User Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="login-input"
          required
          autoComplete="username"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
          required
          autoComplete="new-password"
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="login-input"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="login-input"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="login-input"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
          required
        />

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="login-input"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="login-input"
          required
        />

        <input
          type="tel"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={formData.emergencyContact}
          onChange={handleChange}
          className="login-input"
        />

        <input
          type="text"
          name="medicalConditions"
          placeholder="Medical Conditions"
          value={formData.medicalConditions}
          onChange={handleChange}
          className="login-input"
        />

        <select
          name="wheelchairNeeded"
          value={formData.wheelchairNeeded}
          onChange={handleChange}
          className="login-input"
        >
          <option value="" disabled>
            Caretaker Required
          </option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <button type="submit" className="login-btn">
          Signup
        </button>
      </form>
    </div>
  );
}

export default User;
