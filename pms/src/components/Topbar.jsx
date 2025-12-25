// import { FaRegCalendarAlt } from "react-icons/fa";
// import "./AdminLayout.css";

// export default function Topbar() {
//   const today = new Date().toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   return (
//     <header className="topbar">
//       <h3>Admin</h3>

//       <div className="top-actions">
//         <div className="date-pill">
//           <FaRegCalendarAlt />
//           {today}
//         </div>

//         <div className="user-initial">A</div>
//       </div>
//     </header>
//   );
// }
import { FaRegCalendarAlt } from "react-icons/fa";
import "./AdminLayout.css";

export default function Topbar() {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // 🔐 Get user name from localStorage
  const userName = localStorage.getItem("user_name");

  // 🔠 Get first letter of name
  const userInitial = userName
    ? userName.trim().charAt(0).toUpperCase()
    : "A";

  return (
    <header className="topbar">
      <h3>Admin</h3>

      <div className="top-actions">
        <div className="date-pill">
          <FaRegCalendarAlt />
          {today}
        </div>

        {/* 👤 User Initial */}
        <div className="user-initial">{userInitial}</div>
      </div>
    </header>
  );
}
