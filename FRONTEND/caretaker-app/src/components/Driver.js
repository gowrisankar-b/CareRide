// import React, { useState } from "react";
// import axios from "axios";

// function Driver() {
//   const [formData, setFormData] = useState({
//     name: "",
//     username: "",
//     password: "",
//     age: "",
//     gender: "Male",
//     email: "",
//     phoneNumber: "",
//     address: "",
//     vehicleType: "",
//     vehicleNumber: "",
//     licenseNumber: "",
//     availability: "",
//     status: "Active"
//   });

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:8080/driver/post/driver", formData);
//       alert("Driver signed up successfully!");
//       window.location.href = "/login";
//     } catch (error) {
//       console.error(error);
//       alert("Signup failed!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2 className="login-title">Driver Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="login-input" required/>
//         <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="login-input" required autoComplete="username"/>
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="login-input" required autoComplete="new-password"/>
//         <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="login-input" required/>
//         <select name="gender" value={formData.gender} onChange={handleChange} className="login-input">
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="login-input" required/>
//         <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="login-input" required/>
//         <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="login-input" required/>
//         <input type="text" name="vehicleType" placeholder="Vehicle Type (Car/Bike/Auto)" value={formData.vehicleType} onChange={handleChange} className="login-input" required/>
//         <input type="text" name="vehicleNumber" placeholder="Vehicle Number" value={formData.vehicleNumber} onChange={handleChange} className="login-input" required/>
//         <input type="text" name="licenseNumber" placeholder="License Number" value={formData.licenseNumber} onChange={handleChange} className="login-input" required/>
//         <input type="text" name="availability" placeholder="Availability (yes / no)" value={formData.availability} onChange={handleChange} className="login-input"/>
//         <select name="status" value={formData.status} onChange={handleChange} className="login-input">
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//         </select>
//         <button type="submit" className="login-btn">Signup</button>
//       </form>
//     </div>
//   );
// }

// export default Driver;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ React Router navigation

function Driver() {
  const navigate = useNavigate(); // ✅ for navigation
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    age: "",
    gender: "Male",
    email: "",
    phoneNumber: "",
    address: "",
    vehicleType: "",
    vehicleNumber: "",
    licenseNumber: "",
    availability: "",
    status: "Active"
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with deployed backend URL if needed
      await axios.post("http://localhost:8080/driver/post/driver", formData);
      alert("Driver signed up successfully!");

      // ✅ Navigate to login page using React Router
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Signup failed!");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Driver Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="login-input" required/>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="login-input" required autoComplete="username"/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="login-input" required autoComplete="new-password"/>
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="login-input" required/>
        <select name="gender" value={formData.gender} onChange={handleChange} className="login-input">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="login-input" required/>
        <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="login-input" required/>
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="login-input" required/>
        <input type="text" name="vehicleType" placeholder="Vehicle Type (Car/Bike/Auto)" value={formData.vehicleType} onChange={handleChange} className="login-input" required/>
        <input type="text" name="vehicleNumber" placeholder="Vehicle Number" value={formData.vehicleNumber} onChange={handleChange} className="login-input" required/>
        <input type="text" name="licenseNumber" placeholder="License Number" value={formData.licenseNumber} onChange={handleChange} className="login-input" required/>
        <input type="text" name="availability" placeholder="Availability (yes / no)" value={formData.availability} onChange={handleChange} className="login-input"/>
        <select name="status" value={formData.status} onChange={handleChange} className="login-input">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit" className="login-btn">Signup</button>
      </form>
    </div>
  );
}

export default Driver;
