
// import { useState } from "react";
// import "./ForgotPassword.css";
// import logo from "../assets/logo.png";

// export default function ForgotPassword() {
//   const [step, setStep] = useState(1);

//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");

//   // OTP input handler
//   const handleOtpChange = (value, index) => {
//     if (!/^\d?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

//   const handleEmailSubmit = (e) => {
//     e.preventDefault();
//     console.log("Send OTP to:", email);
//     setStep(2); // move to OTP step
//   };

//   const handleOtpSubmit = (e) => {
//     e.preventDefault();
//     console.log("OTP entered:", otp.join(""));
//     setStep(3); // move to reset password
//   };

//   const handleResetSubmit = (e) => {
//     e.preventDefault();

//     if (password !== confirm) {
//       alert("Passwords do not match");
//       return;
//     }

//     console.log("Password reset successful");
//     alert("Password reset successful");
//   };

//   return (
//     <div className="forgot-page">
//       <form className="forgot-form">

//         <img src={logo} alt="Logo" className="forgot-logo" />

//         {/* STEP 1 — EMAIL */}
//         {step === 1 && (
//           <>
//             <h2>Forgot Password</h2>
//             <p className="forgot-text">
//               Enter your email to receive an OTP.
//             </p>

//             <input
//               type="email"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <button onClick={handleEmailSubmit}>Send OTP</button>
//           </>
//         )}

//         {/* STEP 2 — OTP */}
//         {step === 2 && (
//           <>
//             <h2>Verify OTP</h2>
//             <p className="forgot-text">
//               Enter the 6-digit code sent to your email.
//             </p>

//             <div className="otp-container">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   id={`otp-${index}`}
//                   maxLength="1"
//                   value={digit}
//                   onChange={(e) =>
//                     handleOtpChange(e.target.value, index)
//                   }
//                 />
//               ))}
//             </div>

//             <button onClick={handleOtpSubmit}>Verify OTP</button>
//           </>
//         )}

//         {/* STEP 3 — RESET PASSWORD */}
//         {step === 3 && (
//           <>
//             <h2>Reset Password</h2>

//             <input
//               type="password"
//               placeholder="New password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <input
//               type="password"
//               placeholder="Confirm new password"
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//               required
//             />

//             <button onClick={handleResetSubmit}>
//               Reset Password
//             </button>
//           </>
//         )}

//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import "./ForgotPassword.css";
import logo from "../assets/logo.png";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // =========================
  // STEP 1 — SEND OTP
  // =========================
const handleEmailSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${API_BASE}/api/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    // ❌ Email not found
    if (!res.ok) {
      throw new Error("Email not found");
    }

    // ✅ Email exists → go to OTP
    setStep(2);
    alert("OTP sent to your email");
  } catch (err) {
    alert(err.message); // 👈 shows "Email not found"
  }
};

  // =========================
  // OTP INPUT
  // =========================
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // =========================
  // STEP 2 — VERIFY OTP
  // =========================
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: otp.join(""),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);

      // ✅ Only now move to reset password
      setStep(3);
      alert("OTP verified");
    } catch (err) {
      alert(err.message || "Invalid or expired OTP");
    }
  };

  // =========================
  // STEP 3 — RESET PASSWORD
  // =========================
  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);

      alert("Password reset successful");

      // ✅ Reset everything
      setStep(1);
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert(err.message || "Reset failed");
    }
  };

  return (
    <div className="forgot-page">
      <form className="forgot-form">
        <img src={logo} alt="Logo" className="forgot-logo" />

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2>Forgot Password</h2>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button onClick={handleEmailSubmit}>
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2>Verify OTP</h2>
            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(e.target.value, index)
                  }
                />
              ))}
            </div>
            <button onClick={handleOtpSubmit}>
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2>Reset Password</h2>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
            <button onClick={handleResetSubmit}>
              Reset Password
            </button>
          </>
        )}
      </form>
    </div>
  );
}
