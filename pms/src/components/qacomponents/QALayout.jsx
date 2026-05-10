import Sidebar from "./QASidebar"
import Topbar from "./QATopbar";
import "./qalayout.css";

export default function QALayout({ children }) {
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
