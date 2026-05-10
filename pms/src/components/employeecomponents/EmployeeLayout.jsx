import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./EmployeeLayout.css";  
export default function EmployeeLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}
