import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "./AdminProjectActivity.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export default function AdminProjectActivity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projectTitle, setProjectTitle] = useState("");
  const [activityLogs, setActivityLogs] = useState([]);

  // fetch project title
  const fetchProject = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setProjectTitle(data.title || "Project");
    } catch {
      setProjectTitle("Project");
    }
  };

  // fetch activity logs
  const fetchActivityLogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}/activity`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();

      setActivityLogs(
        Array.isArray(data)
          ? data.map((item) => ({
              action: item[0],
              description: item[1],
              created_at: item[2],
              task_id: item[3],
              user: item[4],
            }))
          : []
      );
    } catch {
      setActivityLogs([]);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchActivityLogs();
  }, [id]);

  return (
    <AdminLayout>
      <div className="activity-page">

        {/* HEADER */}
        <div className="activity-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
             Back
          </button>

          <h2>  Activity Log</h2>
        </div>

        {/* CONTENT */}
        {activityLogs.length === 0 ? (
          <p className="muted">No activity yet</p>
        ) : (
          <div className="activity-list">
            {activityLogs.map((log, i) => (
              <div key={i} className="activity-item">
                {/* <span className="activity-action-badge">{log.action}</span> */}
<span
  className="activity-action-badge"
  data-type={log.action.toUpperCase()}
>
  {log.action}
</span>

                <p>{log.description}</p>

                <small>
                  {log.user ? `By ${log.user} — ` : ""}
                  {new Date(log.created_at).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
