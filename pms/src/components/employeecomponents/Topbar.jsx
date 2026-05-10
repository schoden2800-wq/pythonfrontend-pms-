
// import { useEffect, useRef, useState } from "react";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { IoNotificationsOutline } from "react-icons/io5";
// import "./EmployeeLayout.css";

// export default function EmployeeTopbar() {
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   const dropdownRef = useRef(null);

//   // ---------- DATE ----------
//   const today = new Date().toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   // ---------- USER ----------
//   const employeeName = localStorage.getItem("user_name") || "Employee";
//   const employeeEmail = localStorage.getItem("user_email") || "";
//   const employeeId = localStorage.getItem("user_id");

//   const employeeInitial = employeeName.trim().charAt(0).toUpperCase();

//   // ---------- FETCH NOTIFICATIONS ----------
//   const fetchNotifications = async () => {
//     if (!employeeId) return;

//     try {
//       const res = await fetch(
//         `http://localhost:8000/api/notifications/${employeeId}`
//       );

//       const data = await res.json();
//       setNotifications(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching notifications", err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   // Optional auto-refresh every 30s
//   useEffect(() => {
//     const timer = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(timer);
//   }, []);

//   // ---------- MARK AS READ ----------
//   const markAsRead = async (notifId) => {
//     if (!employeeId) return;

//     try {
//       await fetch(
//         `http://localhost:8000/api/notifications/${employeeId}/${notifId}/read`,
//         { method: "POST" }
//       );

//       // remove instantly
//       setNotifications((prev) => prev.filter((n) => n.id !== notifId));
//     } catch (err) {
//       console.error("Error marking notification as read", err);
//     }
//   };

//   // ---------- CLOSE WHEN CLICK OUTSIDE ----------
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       <header className="topbar">
//         <h3>Employee</h3>

//         <div className="top-actions">
//           {/* DATE */}
//           <div className="date-pill">
//             <FaRegCalendarAlt />
//             {today}
//           </div>

//           {/* NOTIFICATION BELL */}
//           <div
//             className="notif-bell"
//             onClick={() => setShowNotifications((p) => !p)}
//             style={{ position: "relative", cursor: "pointer" }}
//           >
//             <IoNotificationsOutline size={22} />

//             {/* RED BADGE */}
//             {notifications.length > 0 && (
//               <span
//                 style={{
//                   position: "absolute",
//                   top: "-6px",
//                   right: "-6px",
//                   background: "red",
//                   color: "white",
//                   borderRadius: "50%",
//                   fontSize: "10px",
//                   padding: "2px 5px",
//                 }}
//               >
//                 {notifications.length}
//               </span>
//             )}
//           </div>

//           {/* USER INITIAL */}
//           <div
//             className="user-initial"
//             onClick={() => setShowProfileModal(true)}
//             style={{ cursor: "pointer" }}
//           >
//             {employeeInitial}
//           </div>
//         </div>
//       </header>

//       {/* NOTIFICATION PANEL */}
//       {showNotifications && (
//         <div
//           ref={dropdownRef}
//           style={{
//             position: "absolute",
//             right: "20px",
//             top: "70px",
//             width: "360px",
//             background: "white",
//             borderRadius: "14px",
//             boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
//             zIndex: 1000,
//             padding: "12px 14px",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "10px",
//             }}
//           >
//             <strong>Notifications</strong>

//             <button
//               onClick={() => setShowNotifications(false)}
//               style={{
//                 fontSize: "11px",
//                 padding: "4px 8px",
//                 borderRadius: "6px",
//                 border: "1px solid #ffd6d6",
//                 background: "#ffecec",
//                 cursor: "pointer",
//               }}
//             >
//               ✕
//             </button>
//           </div>

//           <div style={{ maxHeight: "260px", overflowY: "auto" }}>
//             {notifications.length === 0 && (
//               <p style={{ textAlign: "center", padding: "10px" }}>
//                 No notifications
//               </p>
//             )}

//             {notifications.map((n) => (
//               <div
//                 key={n.id}
//                 style={{
//                   background: "#f6f8ff",
//                   marginBottom: "8px",
//                   padding: "10px",
//                   borderRadius: "10px",
//                   position: "relative",
//                 }}
//               >
//                 <strong>{n.title}</strong>
//                 <p>{n.message}</p>
//                 <small>{new Date(n.timestamp).toLocaleString()}</small>

//                 <span
//                   onClick={() => markAsRead(n.id)}
//                   style={{
//                     position: "absolute",
//                     right: "8px",
//                     top: "6px",
//                     cursor: "pointer",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   ✕
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./EmployeeLayout.css";

export default function EmployeeTopbar() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);


  const [showChangePwd, setShowChangePwd] = useState(false);

  // password fields
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [msg, setMsg] = useState("");

  // eye toggles
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const dropdownRef = useRef(null);

  // ---------- DATE ----------
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // ---------- USER ----------
  const employeeName = localStorage.getItem("user_name") || "Employee";
  const employeeEmail = localStorage.getItem("user_email") || "";
  const employeeId = localStorage.getItem("user_id");

  const employeeInitial = employeeName.trim().charAt(0).toUpperCase();

  // ---------- FETCH NOTIFICATIONS ----------
  const fetchNotifications = async () => {
    if (!employeeId) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/notifications/${employeeId}`
      );

      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const timer = setInterval(fetchNotifications, 30000);
    return () => clearInterval(timer);
  }, []);

  // ---------- MARK AS READ ----------
  const markAsRead = async (notifId) => {
    if (!employeeId) return;

    try {
      await fetch(
        `http://localhost:8000/api/notifications/${employeeId}/${notifId}/read`,
        { method: "POST" }
      );
      setNotifications((prev) => prev.filter((n) => n.id !== notifId));
    } catch (err) {
      console.error("Error marking notification as read", err);
    }
  };

  // ---------- CLOSE WHEN CLICK OUTSIDE ----------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------- CHANGE PASSWORD API ----------
  const changePassword = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:8000/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: employeeEmail,
          oldPassword: oldPwd,
          newPassword: newPwd,
          confirmPassword: confirmPwd,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Password change failed");
        return;
      }

      setMsg("Password changed successfully ✓");
      setOldPwd("");
      setNewPwd("");
      setConfirmPwd("");
    } catch (err) {
      setMsg("Server error");
    }
  };

  return (
    <>
      <header className="topbar">
        <h3>Employee</h3>

        <div className="top-actions">
          <div className="date-pill">
            <FaRegCalendarAlt />
            {today}
          </div>

          {/* NOTIFICATION BELL */}
          <div
            className="notif-bell"
            onClick={() => setShowNotifications((p) => !p)}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <IoNotificationsOutline size={22} />

            {notifications.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "10px",
                  padding: "2px 5px",
                }}
              >
                {notifications.length}
              </span>
            )}
          </div>

          {/* CLICK TO OPEN CHANGE PASSWORD */}
          <div
            className="user-initial"
            style={{ cursor: "pointer" }}
            onClick={() => setShowChangePwd(true)}
          >
            {employeeInitial}
          </div>
        </div>
      </header>

      {/* ================= NOTIFICATIONS PANEL ================= */}
      {showNotifications && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            right: "20px",
            top: "70px",
            width: "360px",
            background: "white",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            zIndex: 1000,
            padding: "12px 14px",
          }}
        >
          <strong>Notifications</strong>

          <div style={{ maxHeight: "260px", overflowY: "auto" }}>
            {notifications.length === 0 && (
              <p style={{ textAlign: "center", padding: "10px" }}>
                No notifications
              </p>
            )}

            {notifications.map((n) => (
              <div
                key={n.id}
                style={{
                  background: "#f6f8ff",
                  marginBottom: "8px",
                  padding: "10px",
                  borderRadius: "10px",
                  position: "relative",
                }}
              >
                <strong>{n.title}</strong>
                <p>{n.message}</p>
                <small>{new Date(n.timestamp).toLocaleString()}</small>

                <span
                  onClick={() => markAsRead(n.id)}
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ✕
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= CHANGE PASSWORD POPUP ================= */}
      {showChangePwd && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <form
            onSubmit={changePassword}
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "16px",
              width: "420px",
              boxShadow: "0 12px 40px rgba(0,0,0,.2)",
            }}
          >
            <h3>Change Password</h3>

            {/* EMAIL READ ONLY */}
            <input
              type="email"
              value={employeeEmail}
              readOnly
              style={{
                width: "100%",
                padding: "9px",
                marginBottom: "8px",
                background: "#f3f3f3",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />

            {/* OLD PASSWORD */}
            <div style={{ position: "relative" }}>
              <input
                type={showOld ? "text" : "password"}
                placeholder="Old Password"
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "9px 34px 9px 9px",
                  marginBottom: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <span
                onClick={() => setShowOld(!showOld)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "8px",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                {showOld ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            {/* NEW PASSWORD */}
            <div style={{ position: "relative" }}>
              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "9px 34px 9px 9px",
                  marginBottom: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <span
                onClick={() => setShowNew(!showNew)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "8px",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            {/* CONFIRM PASSWORD */}
            <div style={{ position: "relative" }}>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "9px 34px 9px 9px",
                  marginBottom: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "8px",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            {msg && (
              <p
                style={{
                  background: "#f6f6f6",
                  padding: "8px",
                  borderRadius: "8px",
                }}
              >
                {msg}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "9px",
                borderRadius: "10px",
                border: "none",
                background: "#df9954",
                color: "white",
                cursor: "pointer",
                marginTop: "6px",
              }}
            >
              Change Password
            </button>

            <button
              type="button"
              onClick={() => setShowChangePwd(false)}
              style={{
                width: "100%",
                padding: "9px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                background: "white",
                cursor: "pointer",
                marginTop: "6px",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}
