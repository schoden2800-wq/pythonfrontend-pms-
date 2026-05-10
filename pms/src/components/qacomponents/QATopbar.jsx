
// // import { useEffect, useRef, useState } from "react";
// // import { FaRegCalendarAlt } from "react-icons/fa";
// // import { IoNotificationsOutline } from "react-icons/io5";
// // import "../employeecomponents/EmployeeLayout.css";

// // export default function QATopbar() {
// //   const [showModal, setShowModal] = useState(false);
// //   const [showNotifications, setShowNotifications] = useState(false);
// //   const [notifications, setNotifications] = useState([]);

// //   const dropdownRef = useRef(null);

// //   const today = new Date().toLocaleDateString("en-GB", {
// //     day: "2-digit",
// //     month: "short",
// //     year: "numeric",
// //   });

// //   const name = localStorage.getItem("user_name");
// //   const email = localStorage.getItem("user_email");
// //   const qaId = localStorage.getItem("user_id");

// //   // ---------------- FETCH ----------------
// //   async function fetchNotifications() {
// //     if (!qaId) return;

// //     try {
// //       const res = await fetch(
// //         `http://localhost:8000/api/notifications/${qaId}`
// //       );
// //       const data = await res.json();
// //       setNotifications(data || []);
// //     } catch (err) {
// //       console.error("Error fetching notifications", err);
// //     }
// //   }

// //   // --------- MARK ONE NOTIFICATION READ ----------
// //   async function markRead(notifId) {
// //     try {
// //       await fetch(
// //         `http://localhost:8000/api/notifications/${qaId}/${notifId}/read`,
// //         { method: "POST" }
// //       );

// //       // remove from UI instantly
// //       setNotifications((prev) =>
// //         prev.filter((n) => n.id !== notifId)
// //       );
// //     } catch (err) {
// //       console.error("Error marking read", err);
// //     }
// //   }

// //   // first load + periodic refresh
// //   useEffect(() => {
// //     fetchNotifications();
// //     const interval = setInterval(fetchNotifications, 5000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   // close when clicking outside
// //   useEffect(() => {
// //     function handleClickOutside(e) {
// //       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
// //         setShowNotifications(false);
// //       }
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   return (
// //     <>
// //       <header className="topbar">
// //         <h3>Quality Assurance Panel</h3>

// //         <div className="top-actions">
// //           <div className="date-pill">
// //             <FaRegCalendarAlt />
// //             {today}
// //           </div>

// //           {/* Notification Bell */}
// //           <div
// //             onClick={() => setShowNotifications(!showNotifications)}
// //             style={{ position: "relative", cursor: "pointer" }}
// //           >
// //             <IoNotificationsOutline size={22} />

// //             {notifications.length > 0 && (
// //               <span
// //                 style={{
// //                   position: "absolute",
// //                   top: "-6px",
// //                   right: "-6px",
// //                   background: "red",
// //                   color: "white",
// //                   borderRadius: "50%",
// //                   fontSize: "10px",
// //                   padding: "2px 5px",
// //                 }}
// //               >
// //                 {notifications.length}
// //               </span>
// //             )}
// //           </div>

// //           <div className="user-initial" onClick={() => setShowModal(true)}>
// //             {(name || "Q").charAt(0).toUpperCase()}
// //           </div>
// //         </div>
// //       </header>

// //       {/* NOTIFICATION DROPDOWN */}
// //       {showNotifications && (
// //         <div
// //           ref={dropdownRef}
// //           style={{
// //             position: "absolute",
// //             right: "20px",
// //             top: "70px",
// //             width: "360px",
// //             background: "white",
// //             borderRadius: "14px",
// //             padding: "12px",
// //             boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
// //             zIndex: 999,
// //           }}
// //         >
// //           <strong>Notifications</strong>

// //           <div style={{ maxHeight: "260px", overflowY: "auto" }}>
// //             {notifications.length === 0 && (
// //               <p style={{ textAlign: "center", padding: "8px" }}>
// //                 No new notifications
// //               </p>
// //             )}

// //             {notifications.map((n) => (
// //               <div
// //                 key={n.id}
// //                 style={{
// //                   background: "#eef2ff",
// //                   padding: "8px",
// //                   borderRadius: "10px",
// //                   marginTop: "8px",
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   alignItems: "center",
// //                 }}
// //               >
// //                 <div>
// //                   <b>{n.title}</b>
// //                   <p style={{ margin: 0 }}>{n.message}</p>
// //                   <small>
// //                     {new Date(n.timestamp).toLocaleString()}
// //                   </small>
// //                 </div>

// //                 {/* remove one by one */}
// //                 <button
// //                   onClick={() => markRead(n.id)}
// //                   style={{
// //                     border: "none",
// //                     background: "#ffdada",
// //                     padding: "4px 6px",
// //                     borderRadius: "8px",
// //                     cursor: "pointer",
// //                   }}
// //                 >
// //                   ✓
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// import { useEffect, useRef, useState } from "react";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { IoNotificationsOutline } from "react-icons/io5";
// import "../employeecomponents/EmployeeLayout.css";

// export default function QATopbar() {

//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   const dropdownRef = useRef(null);

//   const today = new Date().toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   const name = localStorage.getItem("user_name");
//   const qaId = localStorage.getItem("user_id");

//   // ---------- FETCH NOTIFICATIONS ----------
//   async function fetchNotifications() {
//     if (!qaId) return;

//     try {
//       const res = await fetch(`http://localhost:8000/api/notifications/${qaId}`);
//       const data = await res.json();
//       setNotifications(data || []);
//     } catch (err) {
//       console.error("Error fetching notifications", err);
//     }
//   }

//   // ---------- MARK AS READ ----------
//   async function markRead(notifId) {
//     try {
//       await fetch(
//         `http://localhost:8000/api/notifications/${qaId}/${notifId}/read`,
//         { method: "POST" }
//       );

//       // remove visually
//       setNotifications(prev => prev.filter(n => n.id !== notifId));
//     } catch (err) {
//       console.error("Error marking read", err);
//     }
//   }

//   // load + refresh
//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // close when clicking outside
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowNotifications(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       <header className="topbar">
//         <h3>Quality Assurance Panel</h3>

//         <div className="top-actions">

//           <div className="date-pill">
//             <FaRegCalendarAlt />
//             {today}
//           </div>

//           {/* Bell Icon */}
//           <div
//             onClick={() => setShowNotifications(!showNotifications)}
//             style={{ position: "relative", cursor: "pointer" }}
//           >
//             <IoNotificationsOutline size={22} />

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
//                   padding: "2px 6px",
//                 }}
//               >
//                 {notifications.length}
//               </span>
//             )}
//           </div>

//           <div className="user-initial">
//             {(name || "Q").charAt(0).toUpperCase()}
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
//             width: "380px",
//             background: "white",
//             borderRadius: "16px",
//             padding: "12px",
//             boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
//             zIndex: 999,
//           }}
//         >
//           <strong style={{ fontSize: "16px" }}>Notifications</strong>

//           <div style={{ maxHeight: "300px", overflowY: "auto" }}>
//             {notifications.length === 0 && (
//               <p style={{ textAlign: "center", padding: "10px" }}>
//                 No new notifications
//               </p>
//             )}

//             {notifications.map((n) => (
//               <div
//                 key={n.id}
//                 style={{
//                   background: "linear-gradient(135deg,#f8fbff,#eef2ff)",
//                   padding: "12px",
//                   borderRadius: "14px",
//                   marginTop: "10px",
//                   boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
//                   position: "relative",
//                 }}
//               >
//                 {/* dismiss X */}
//                 <button
//                   onClick={() => markRead(n.id)}
//                   style={{
//                     position: "absolute",
//                     top: "8px",
//                     right: "10px",
//                     border: "none",
//                     background: "transparent",
//                     fontSize: "16px",
//                     cursor: "pointer",
//                     color: "#666"
//                   }}
//                 >
//                   ✕
//                 </button>

//                 <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//                   <span style={{ fontSize: "18px" }}>
//                     {n.type === "passed" && "✅"}
//                     {n.type === "assigned" && "📝"}
//                     {n.type === "submitted" && "🚀"}
//                     {n.type === "failed" && "❌"}
//                   </span>

//                   <b style={{ fontSize: "15px" }}>{n.title}</b>
//                 </div>

//                 <p style={{ margin: "4px 0 2px 0", fontSize: "14px" }}>
//                   {n.task_name
//                     ? `Task "${n.task_name}" `
//                     : n.task_id
//                     ? `Task #${n.task_id} `
//                     : ""}
//                   {n.message}
//                 </p>

//                 <small style={{ color: "#555" }}>
//                   {new Date(n.timestamp).toLocaleString()}
//                 </small>
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
import "../employeecomponents/EmployeeLayout.css";

export default function QATopbar() {

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // 🔹 change password popup
  const [showChangePwd, setShowChangePwd] = useState(false);

  // 🔹 password fields
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  // 🔹 message
  const [msg, setMsg] = useState("");

  // 🔹 eye toggles
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const dropdownRef = useRef(null);

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const name = localStorage.getItem("user_name");
  const qaEmail = localStorage.getItem("user_email");
  const qaId = localStorage.getItem("user_id");

  // ---------- FETCH NOTIFICATIONS ----------
  async function fetchNotifications() {
    if (!qaId) return;

    try {
      const res = await fetch(`http://localhost:8000/api/notifications/${qaId}`);
      const data = await res.json();
      setNotifications(data || []);
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  }

  // ---------- MARK AS READ ----------
  async function markRead(notifId) {
    try {
      await fetch(
        `http://localhost:8000/api/notifications/${qaId}/${notifId}/read`,
        { method: "POST" }
      );

      setNotifications(prev => prev.filter(n => n.id !== notifId));
    } catch (err) {
      console.error("Error marking read", err);
    }
  }

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------- CHANGE PASSWORD ----------
  async function handleChangePassword(e) {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:8000/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: qaEmail,
          oldPassword: oldPwd,
          newPassword: newPwd,
          confirmPassword: confirmPwd,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Error changing password");
        return;
      }

      setMsg("Password changed successfully ✓");
      setOldPwd("");
      setNewPwd("");
      setConfirmPwd("");

    } catch (err) {
      setMsg("Server error");
    }
  }

  return (
    <>
      <header className="topbar">
        <h3>Quality Assurance Panel</h3>

        <div className="top-actions">

          <div className="date-pill">
            <FaRegCalendarAlt />
            {today}
          </div>

          {/* Bell Icon */}
          <div
            onClick={() => setShowNotifications(!showNotifications)}
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
                  padding: "2px 6px",
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
            {(name || "Q").charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* NOTIFICATION PANEL */}
      {showNotifications && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            right: "20px",
            top: "70px",
            width: "380px",
            background: "white",
            borderRadius: "16px",
            padding: "12px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
            zIndex: 999,
          }}
        >
          <strong style={{ fontSize: "16px" }}>Notifications</strong>

          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {notifications.length === 0 && (
              <p style={{ textAlign: "center", padding: "10px" }}>
                No new notifications
              </p>
            )}

            {notifications.map((n) => (
              <div
                key={n.id}
                style={{
                  background: "linear-gradient(135deg,#f8fbff,#eef2ff)",
                  padding: "12px",
                  borderRadius: "14px",
                  marginTop: "10px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => markRead(n.id)}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "10px",
                    border: "none",
                    background: "transparent",
                    fontSize: "16px",
                    cursor: "pointer",
                    color: "#666"
                  }}
                >
                  ✕
                </button>

                <b>{n.title}</b>

                <p style={{ margin: "4px 0" }}>{n.message}</p>

                <small style={{ color: "#555" }}>
                  {new Date(n.timestamp).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD POPUP */}
      {showChangePwd && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <form
            onSubmit={handleChangePassword}
            style={{
              background: "white",
              padding: "22px",
              borderRadius: "16px",
              width: "420px",
              boxShadow: "0 12px 40px rgba(0,0,0,.2)",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 6 }}>Change Password</h3>

            {/* EMAIL */}
            <input
              type="email"
              value={qaEmail}
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
