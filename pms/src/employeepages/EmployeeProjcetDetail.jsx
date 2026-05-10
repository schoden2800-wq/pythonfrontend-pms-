
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeLayout from "../components/employeecomponents/EmployeeLayout";
import "./EmployeeProjectDetail.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export default function EmployeeProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setProject(data);
    } catch {
      setProject(null);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks/project/${id}`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  // *************** IMPORTANT PART ***************
  // derive project status ONLY from tasks
  const derivedProjectStatus = useMemo(() => {
    if (!tasks || tasks.length === 0) return null;

    // expect status column at index 2 (your current code)
    const allDone = tasks.every(
      (t) =>
        String(t[2]).toLowerCase() === "completed" ||
        String(t[2]).toLowerCase() === "qa_passed"
    );

    return allDone ? "completed" : null;
  }, [tasks]);

  if (!project) return null;

  return (
    <EmployeeLayout>
      <div className="project-detail-page">
        <div className="project-detail-card">

          {/* HEADER */}
          <div className="project-detail-header">
            <div className="header-left">
              <button className="back-btn top" onClick={() => navigate(-1)}>
                Back
              </button>

              <div className="title-with-actions">
                <h2>{project.title}</h2>

                <div className="header-action-buttons">

  {/* LOG BUTTON — NO PILL */}
  <button
    className="log-btn-no-pill"
    onClick={() => navigate(`/employee/projects/${id}/activity`)}
    style={{ display: "flex", alignItems: "center", gap: "6px" }}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
       style={{
                    marginLeft: "6px",
                    position: "relative",
                    top: "5px"     // ⬅ lowers the icon slightly
                  }}
      fill="none"
      stroke="#777"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 13" />
    </svg>

    {/* <span></span> */}
  </button>

  {/* TASK BOARD BUTTON — KEEP PILL STYLE */}
  <button
    className="action-btn"
    onClick={() => navigate(`/employee/projects/${id}/kanban`)}
    style={{ display: "flex", alignItems: "center", gap: "6px",marginTop: "10px"      }}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#777"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
    <span>Task Board</span>
  </button>

</div>

              </div>

              <div className="meta-row">
                {/* *********** ONLY SHOW WHEN COMPLETED *********** */}
                {derivedProjectStatus === "completed" && (
                  <span className="badge status completed">
                    completed
                  </span>
                )}

                {/* always keep priority */}
                <span className={`badge priority ${project.priority}`}>
                  {project.priority}
                </span>
              </div>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="project-grid">
            <Detail label="Client" value={project.client_name || "-"} />

            <Detail
              label="Assigned Employees"
              value={
                project.assigned_employees && project.assigned_employees.length
                  ? project.assigned_employees.map((e) => e.name).join(", ")
                  : "-"
              }
            />

            <Detail label="Start Date" value={project.start_date} />
            <Detail label="End Date" value={project.end_date} />
          </div>

          {/* DESCRIPTION */}
          <div className="project-section highlight">
            <h4>Description</h4>
            <p>{project.description}</p>
          </div>

          {/* FILE */}
          {project.document && (
            <div className="project-section file-section">
              <h4>Project File</h4>
              <a
                href={`${API_BASE}/${project.document}`}
                target="_blank"
                rel="noreferrer"
                className="file-open-btn"
              >
                Open File
              </a>
            </div>
          )}

          {/* TASK LIST */}
          <div className="project-section">
            <h4>Tasks</h4>

            <div className="task-list">
              {tasks.length === 0 ? (
                <p className="muted">No tasks yet</p>
              ) : (
                tasks.map((task) => (
                  <div key={task[0]} className="task-card">
                    <div className="task-left">
                      <strong className="task-title">{task[1]}</strong>

                      <div className="task-meta">
                        <span>Due: {task[3]}</span>
                        <span>Assigned To: {task[4]}</span>
                      </div>
                    </div>

                    <div className="task-actions">
                      <span
                        className={`badge status ${String(task[2])
                          .toLowerCase()
                          .replace(" ", "_")}`}
                      >
                        {task[2]}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* *********** SHOW BIG SUCCESS MESSAGE WHEN COMPLETE *********** */}
          {derivedProjectStatus === "completed" && (
            <div className="project-section success-box">
              🎉 All tasks are completed — project is finished!
            </div>
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
}

function Detail({ label, value }) {
  return (
    <div className="detail-box">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
