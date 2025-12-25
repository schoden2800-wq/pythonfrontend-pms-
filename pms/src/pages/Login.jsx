
// // import { useState } from "react";
// // import { FaEye, FaEyeSlash } from "react-icons/fa";
// // import { Link } from "react-router-dom";
// // import "./Login.css";
// // import logo from "../assets/logo.png";

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [showSuccess, setShowSuccess] = useState(false);

// //   const eyeIconStyle = {
// //     position: "absolute",
// //     right: "16px",
// //     top: "50%",
// //     transform: "translateY(-50%)",
// //     cursor: "pointer",
// //     color: "#9ca3af",
// //     fontSize: "18px",
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const response = await fetch(
// //         "https://pythonbackend-2.onrender.com/api/login",
// //         {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ email, password }),
// //         }
// //       );

// //       const data = await response.json();

// //       if (!response.ok) {
// //         alert(data.message || "Login failed");
// //         setLoading(false);
// //         return;
// //       }

// //       console.log("Login success:", data);

// //       // 🔐 Save token if needed
// //       // localStorage.setItem("token", data.access_token);

// //       // ✅ SHOW POPUP
// //       setShowSuccess(true);

// //       // ⏱ Auto-close popup (and redirect later)
// //       setTimeout(() => {
// //         setShowSuccess(false);
// //         // navigate("/dashboard");
// //       }, 2000);

// //     } catch (error) {
// //       console.error("Login error:", error);
// //       alert("Server error. Please try again later.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* SUCCESS POPUP */}
// //       {showSuccess && (
// //         <div className="success-overlay">
// //           <div className="success-popup">
// //             <h3>✅ Login Successful</h3>
// //             <p>Welcome back!</p>
// //           </div>
// //         </div>
// //       )}

// //       <div className="login-page">
// //         <form className="login-form" onSubmit={handleSubmit}>
// //           <img src={logo} alt="Logo" className="login-logo" />

// //           <h2>Login</h2>

// //           <input
// //             type="email"
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />

// //           <div className="password-wrapper">
// //             <input
// //               type={showPassword ? "text" : "password"}
// //               placeholder="Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />

// //             <span
// //               style={eyeIconStyle}
// //               onClick={() => setShowPassword(!showPassword)}
// //             >
// //               {showPassword ? <FaEyeSlash /> : <FaEye />}
// //             </span>
// //           </div>

// //           <div className="forgot-password">
// //             <Link to="/forgot-password">Forgot password?</Link>
// //           </div>

// //           <button type="submit" disabled={loading}>
// //             {loading ? "Logging in..." : "Login"}
// //           </button>
// //         </form>
// //       </div>
// //     </>
// //   );
// // }
// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";
// import logo from "../assets/logo.png";

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
//       const response = await fetch(
//         "https://pythonbackend-2.onrender.com/api/login",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.message || "Login failed");
//         return;
//       }

//       console.log("Login success:", data);

//       /* ================= SAVE LOGIN DATA ================= */
//       localStorage.setItem("user_email", email);

//       // If backend sends token / role (optional)
//       if (data.access_token) {
//         localStorage.setItem("token", data.access_token);
//       }
//       if (data.role) {
//         localStorage.setItem("user_role", data.role);
//       }

//       /* ================= SUCCESS POPUP ================= */
//       setShowSuccess(true);

//       /* ================= REDIRECT ================= */
//       setTimeout(() => {
//         setShowSuccess(false);
//         navigate("/admin/dashboard");
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
//             <h3> Login Successful</h3>

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
import logo from "../assets/logo.png";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const eyeIconStyle = {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#9ca3af",
    fontSize: "18px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      console.log("Login success:", data);

      /* ================= SAVE LOGIN DATA ================= */

      // Save email
      localStorage.setItem("user_email", email);

      // ✅ Save name (for initials)
      if (data.name) {
        localStorage.setItem("user_name", data.name);
      }

      // Save token (if backend sends it)
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      // Save role (if backend sends it)
      if (data.role) {
        localStorage.setItem("user_role", data.role);
      }

      /* ================= SUCCESS POPUP ================= */
      setShowSuccess(true);
/* ✅ CHECK SAVED VALUES */
console.log("Saved email:", localStorage.getItem("user_email"));
console.log("Saved name:", localStorage.getItem("user_name"));
      /* ================= REDIRECT ================= */
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/admin/dashboard");
      }, 1500);

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SUCCESS POPUP */}
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

          <h2>Login</h2>

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
              style={eyeIconStyle}
              onClick={() => setShowPassword(!showPassword)}
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
