
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "../qacomponents/QALayout.css";

export default function QASidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove auth data
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

        <NavLink to="/qa/dashboard" className="nav-item">
          <MdDashboard />
          <span>QA Dashboard</span>
        </NavLink>

        <NavLink to="/qa/review" className="nav-item">
          <FaClipboardCheck />
          <span>Review Tasks</span>
        </NavLink>

      </nav>

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
