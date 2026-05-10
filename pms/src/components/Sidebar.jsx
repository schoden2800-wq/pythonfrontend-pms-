
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./AdminLayout.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");


    navigate("/");
  };

  return (
    <aside className="sidebar">
      {/* <div className="logo-section">
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div> */}
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
        <NavLink to="/admin/dashboard" className="nav-item">
          <MdDashboard />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/employees" className="nav-item">
          <FaUsers />
          <span>Employee</span>
        </NavLink>

        <NavLink to="/admin/projects" className="nav-item">
          <FaProjectDiagram />
          <span>Projects</span>
        </NavLink>
      </nav>

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
