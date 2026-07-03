// import React, { useState } from "react";
// import axios from "axios";
// import "./Login.css";
// import welcomeImg from "./banner.png";

// function Login() {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     role: "user"
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const getBackendUrl = () => {
//     switch (formData.role) {
//       case "user":
//         return "http://localhost:8080/users/login";
//       case "caretaker":
//         return "http://localhost:8080/caretaker/login";
//       case "driver":
//         return "http://localhost:8080/driver/login";
//       default:
//         return "http://localhost:8080/users/login";
//     }
//   };

//   const redirectAfterLogin = () => {
//     switch (formData.role) {
//       case "user":
//         window.location.href = "/user/home";
//         break;
//       case "caretaker":
//         window.location.href = "/caretaker/home";
//         break;
//       case "driver":
//         window.location.href = "/driver/home";
//         break;
//       default:
//         window.location.href = "/";
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const backendUrl = getBackendUrl();

//       const response = await axios.get(backendUrl, {
//         params: {
//           username: formData.username,
//           password: formData.password
//         }
//       });

//       if (response.data) {
//         alert("Login successful!");
//         sessionStorage.setItem("username", formData.username);
//         sessionStorage.setItem("password", formData.password);
//         redirectAfterLogin();
//       } else {
//         alert("Invalid username or password!");
//       }

//     } catch (error) {
//       console.error(error);
//       alert("Login failed!");
//     }
//   };

//   const getSignupUrl = () => {
//     switch (formData.role) {
//       case "user":
//         return "/signup/user";
//       case "caretaker":
//         return "/signup/caretaker";
//       case "driver":
//         return "/signup/driver";
//       default:
//         return "/signup/user";
//     }
//   };

//   return (
//     <div className="page-wrapper">
//       <img src={welcomeImg} alt="Welcome to SeniorGo" className="top-banner" />

//       <div className="login-container">
//         <h2 className="login-title">LOGIN</h2>

//         <form onSubmit={handleSubmit}>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="login-input"
//           >
//             <option value="user">User</option>
//             <option value="caretaker">Caretaker</option>
//             <option value="driver">Driver</option>
//           </select>

//           <input
//             type="text"
//             name="username"
//             placeholder="Enter Username"
//             value={formData.username}
//             onChange={handleChange}
//             className="login-input"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="login-input"
//             required
//           />

//           <button className="login-btn" type="submit">
//             Login
//           </button>
//         </form>

//         <p className="signup-text">
//           Don't have an account?{" "}
//           <a href={getSignupUrl()} className="signup-link">
//             Sign up as{" "}
//             {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // ✅ useNavigate + Link
import "./Login.css";
import welcomeImg from "./banner.png";

function Login() {
  const navigate = useNavigate(); // ✅ React Router navigation
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getBackendUrl = () => {
    switch (formData.role) {
      case "user":
        return "http://localhost:8080/users/login";
      case "caretaker":
        return "http://localhost:8080/caretaker/login";
      case "driver":
        return "http://localhost:8080/driver/login";
      default:
        return "http://localhost:8080/users/login";
    }
  };

  const redirectAfterLogin = () => {
    switch (formData.role) {
      case "user":
        navigate("/user/home"); // ✅ React Router navigation
        break;
      case "caretaker":
        navigate("/caretaker/home"); // ✅ React Router navigation
        break;
      case "driver":
        navigate("/driver/home"); // ✅ React Router navigation
        break;
      default:
        navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendUrl = getBackendUrl();

      const response = await axios.get(backendUrl, {
        params: {
          username: formData.username,
          password: formData.password
        }
      });

      if (response.data) {
        alert("Login successful!");
        sessionStorage.setItem("username", formData.username);
        sessionStorage.setItem("password", formData.password);
        redirectAfterLogin(); // ✅ redirect using React Router
      } else {
        alert("Invalid username or password!");
      }

    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  };

  const getSignupUrl = () => {
    switch (formData.role) {
      case "user":
        return "/signup/user";
      case "caretaker":
        return "/signup/caretaker";
      case "driver":
        return "/signup/driver";
      default:
        return "/signup/user";
    }
  };

  return (
    <div className="page-wrapper">
      <img src={welcomeImg} alt="Welcome to SeniorGo" className="top-banner" />

      <div className="login-container">
        <h2 className="login-title">LOGIN</h2>

        <form onSubmit={handleSubmit}>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="login-input"
          >
            <option value="user">User</option>
            <option value="caretaker">Caretaker</option>
            <option value="driver">Driver</option>
          </select>

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            className="login-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <Link to={getSignupUrl()} className="signup-link">
            Sign up as{" "}
            {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

