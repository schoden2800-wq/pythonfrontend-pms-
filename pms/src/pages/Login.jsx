
// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";
// import logo from "../assets/logo.png";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const navigate = useNavigate();

//   const eyeIconStyle = {
//     position: "absolute",
//     right: "16px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     cursor: "pointer",
//     color: "#9ca3af",
//     fontSize: "18px",
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_BASE}/api/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.detail || data.message || "Login failed");
//         return;
//       }

//       // Save important data
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user_email", data.user.email);
//       localStorage.setItem("user_name", data.user.name);
//       localStorage.setItem("user_role", data.user.role);

//       console.log("Token saved:", localStorage.getItem("token"));
//       console.log("Role saved:", localStorage.getItem("user_role"));

//       setShowSuccess(true);

//       // REDIRECT BASED ON ROLE
//       setTimeout(() => {
//         setShowSuccess(false);

//         const role = (data.user.role || "").toLowerCase();
//         console.log("Detected role:", role);

//         if (role === "admin") {
//           navigate("/admin/dashboard");
//         } else if (role === "employee") {
//           navigate("/employee/dashboard");
//         } else {
//           // fallback if unknown role
//           navigate("/");
//         }
//       }, 1500);

//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* SUCCESS POPUP */}
//       {showSuccess && (
//         <div className="success-overlay">
//           <div className="success-popup">
//             <h3>Login Successful</h3>
//           </div>
//         </div>
//       )}

//       <div className="login-page">
//         <form className="login-form" onSubmit={handleSubmit}>
//           <img src={logo} alt="Logo" className="login-logo" />

//           <h2>Login</h2>

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <div className="password-wrapper">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <span
//               style={eyeIconStyle}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <div className="forgot-password">
//             <Link to="/forgot-password">Forgot password?</Link>
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo1.png";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || data.message || "Login failed");
        return;
      }

      // Save user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_email", data.user.email);
      localStorage.setItem("user_name", data.user.name);
      localStorage.setItem("user_role", data.user.role || "");
      localStorage.setItem("user_designation", data.user.designation || "");
      localStorage.setItem("user_id", data.user.id);

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);

        const role = (data.user.role || "").toLowerCase();
        const designation = (data.user.designation || "").toLowerCase();

        console.log("ROLE LOGGED =", role);
        console.log("DESIGNATION LOGGED =", designation);

        //  QA gets QA dashboard (even if role = employee)
        if (designation === "qa") {
          navigate("/qa/dashboard");
          return;
        }

        // Admin
        if (role === "admin") {
          navigate("/admin/dashboard");
          return;
        }

        //  Normal employee
        if (role === "employee") {
          navigate("/employee/dashboard");
          return;
        }

        // fallback
        navigate("/");

      }, 1500);

    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-popup">
            <h3>Login Successful</h3>
          </div>
        </div>
      )}

      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <img src={logo} alt="Logo" className="login-logo" />

          {/* <h2>Login</h2> */}
          <h2
  style={{
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "20px",
  }}
>
  Login
</h2>


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
