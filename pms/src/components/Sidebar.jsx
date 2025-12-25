import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./AdminLayout.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo-section">
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div>

      {/* Navigation */}
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

      {/* Logout */}
      <button className="logout">Logout</button>
    </aside>
  );
}
