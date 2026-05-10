// import { NavLink } from "react-router-dom";
// import { MdDashboard } from "react-icons/md";
// import { FaProjectDiagram } from "react-icons/fa";
// import { FaClipboardList } from "react-icons/fa";
// import logo from "../../assets/logo.png";
// import "./EmployeeLayout.css";  

// export default function EmployeeSidebar() {
//   return (
//     <aside className="sidebar">
//       {/* Logo */}
//       <div className="logo-section">
//         <img src={logo} alt="Logo" className="sidebar-logo" />
//       </div>

//       {/* Navigation */}
//       <nav className="sidebar-nav">
//         <NavLink to="/employee/dashboard" className="nav-item">
//           <MdDashboard />
//           <span>Dashboard</span>
//         </NavLink>

//         <NavLink to="/employee/projects" className="nav-item">
//           <FaProjectDiagram />
//           <span>My Projects</span>
//         </NavLink>

//         <NavLink to="/employee/tasks" className="nav-item">
//           <FaClipboardList />
//           <span>My Tasks</span>
//         </NavLink>
//       </nav>

//       {/* Logout */}
//       <button className="logout">Logout</button>
//     </aside>
//   );
// }
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./EmployeeLayout.css";

export default function EmployeeSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <aside className="sidebar">
       <div className="logo-section">
             <img
               src={logo}
               alt="Logo"
               style={{
                 width: "120px",     // reduce size
                 height: "auto",
                 objectFit: "contain",
                 marginTop: "20px",  
               }}
             />
           </div>

      <nav className="sidebar-nav">
        <NavLink to="/employee/dashboard" className="nav-item">
          <MdDashboard />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/employee/projects" className="nav-item">
          <FaProjectDiagram />
          <span>My Projects</span>
        </NavLink>

        <NavLink to="/employee/tasks" className="nav-item">
          <FaClipboardList />
          <span>My Tasks</span>
        </NavLink>
      </nav>

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
