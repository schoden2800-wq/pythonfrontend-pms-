
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "./AdminProjectDetail.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export default function AdminProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showEmpDropdown, setShowEmpDropdown] = useState(false);
  const [project, setProject] = useState(null);
  const [employees, setEmployees] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
const [projectEmployees, setProjectEmployees] = useState([]);


  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({
    task_name: "",
    assigned_to: "",
    status: "todo",
    due_date: "",
  });

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    client_name: "",
    start_date: "",
    end_date: "",
    status: "",
    priority: "",
    assigned_employees: [],
  });

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/employees`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch {
      setEmployees([]);
    }
  };
  const fetchProjectEmployees = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}/employees`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    setProjectEmployees(
      data.map(emp => ({
        id: emp[0],
        name: emp[1],
        email: emp[2],
      }))
    );
  } catch (err) {
    console.error(err);
    setProjectEmployees([]);
  }
};
  const fetchProject = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();

      setProject(data);
      setEditForm({
        title: data.title,
        description: data.description,
        client_name: data.client_name || "",
        start_date: data.start_date,
        end_date: data.end_date,
        status: data.status,
        priority: data.priority,
        assigned_employees: data.assigned_employees
          ? data.assigned_employees.map((emp) => emp.id)
          : [],
      });
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

  // NEW — fetch project activity
  const fetchActivityLogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}/activity`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setActivityLogs(
  Array.isArray(data)
    ? data.map(item => ({
        action: item[0],
        description: item[1],
        created_at: item[2],
        task_id: item[3],
        user: item[4],
      }))
    : []
);

      // setActivityLogs(Array.isArray(data) ? data : []);
    } catch {
      setActivityLogs([]);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchEmployees();
      fetchProjectEmployees(); 
    fetchTasks();
  }, [id]);

  const updateProject = async () => {
    const payload = {
      title: editForm.title,
      description: editForm.description,
      client_name: editForm.client_name,
      start_date: editForm.start_date,
      end_date: editForm.end_date,
      status: editForm.status,
      priority: editForm.priority,
      assigned_employees: editForm.assigned_employees,
    };

    const formData = new FormData();
    formData.append("project", JSON.stringify(payload));

    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update project");

      setShowEditModal(false);
      fetchProject();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteProject = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete project");

      navigate(-1);
    } catch (err) {
      alert(err.message);
    }
  };

  const createTask = async () => {
    if (!project) return;

    const payload = {
      project_id: Number(id),
      task_name: taskForm.task_name,
      assigned_to: Number(taskForm.assigned_to),
      assigned_by: project.created_by,
      created_by: project.created_by,
      status: taskForm.status,
      due_date: taskForm.due_date,
    };

    try {
      const res = await fetch(`${API_BASE}/api/tasks/`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create task");

      setShowTaskModal(false);
      setTaskForm({
        task_name: "",
        assigned_to: "",
        status: "todo",
        due_date: "",
      });

      fetchTasks();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete task");

      fetchTasks();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!project) return null;

  return (
    <AdminLayout>
      <div className="project-detail-page">
        <div className="project-detail-card">

          {/* HEADER */}
          <div className="project-detail-header">
            <div className="header-left">

              <button className="back-btn top" onClick={() => navigate(-1)}>
                Back
              </button>

              {/* TITLE + ACTIVITY ICON */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2>{project.title}</h2>

    
                <button
                title="View Project Activity"
                onClick={() => navigate(`/admin/projects/${id}/activity`)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  style={{
                    marginLeft: "6px",
                    position: "relative",
                    top: "5px"     // ⬅ lowers the icon slightly
                  }}
                  fill="none"
                  stroke="#888"     // ⬅ lighter gray color
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <line x1="12" y1="12" x2="12" y2="7" />
                  <line x1="12" y1="12" x2="16" y2="12" />
                </svg>
              </button>

              </div>

              <div className="meta-row">
                {/* <span className={`badge status ${project.status}`}>
                  {project.status}
                </span> */}
                {project.status === "completed" && (
                <span className={`badge status ${project.status}`}>
                  {project.status}
                </span>
              )}

                <span className={`badge priority ${project.priority}`}>
                  {project.priority}
                </span>
              </div>
            </div>

            <div className="project-actions">
              <button className="edit-btn" onClick={() => setShowEditModal(true)}>
                Edit
              </button>
              <button className="delete-btn" onClick={deleteProject}>
                Delete
              </button>
            </div>
          </div>

          {/* DETAILS */}
          <div className="project-grid">
            <Detail label="Client" value={project.client_name || "-"} />
            <Detail
              label="Assigned To"
              value={
                project.assigned_employees && project.assigned_employees.length > 0
                  ? project.assigned_employees.map((emp) => emp.name).join(", ")
                  : "-"
              }
            />
            <Detail label="Created By" value={project.created_by_name || "-"} />
            <Detail label="Start Date" value={project.start_date} />
            <Detail label="End Date" value={project.end_date} />
          </div>

          <div className="project-section highlight">
            <h4>Description</h4>
            <p>{project.description}</p>
          </div>

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

          {/* TASKS */}
          <div className="project-section">
            <div className="task-header">
              <h4>Tasks</h4>
              <button className="edit-btn" onClick={() => setShowTaskModal(true)}>
                + Add Task
              </button>
            </div>

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
                        <span>Assigned: {task[4]}</span>
                      </div>
                    </div>

                    <div className="task-actions">
                      <span
                        className={`badge status ${task[2]
                          ?.toLowerCase()
                          .replace(" ", "_")}`}
                      >
                        {task[2]}
                      </span>

                      <button
                        style={{
                          padding: "4px 10px",
                          fontSize: "10px",
                          borderRadius: "14px",
                          border: "1.5px solid red",
                          color: "red",
                          background: "white",
                          cursor: "pointer",
                          marginLeft: "8px",
                        }}
                        onClick={() => deleteTask(task[0])}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* EDIT PROJECT MODAL */}
        {showEditModal && (
          <div className="modal-overlay">
            <div className="modal-card">
              <h3>Edit Project</h3>

              <input
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                placeholder="Project Title"
              />

              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                placeholder="Project Description"
              />

              <input
                value={editForm.client_name}
                onChange={(e) =>
                  setEditForm({ ...editForm, client_name: e.target.value })
                }
                placeholder="Client Name"
              />

              <div className="emp-select-wrapper">
                <div
                  className="emp-select-box"
                  onClick={() => setShowEmpDropdown(!showEmpDropdown)}
                >
                  {editForm.assigned_employees.length === 0
                    ? "Select Employee"
                    : employees
                        .filter((e) => editForm.assigned_employees.includes(e.id))
                        .map((e) => e.name)
                        .join(", ")}
                  <span className="emp-caret">▾</span>
                </div>

                {showEmpDropdown && (
                  <div className="emp-dropdown">
                    {employees.map((emp) => (
                      <label key={emp.id} className="emp-option">
                        <input
                          type="checkbox"
                          checked={editForm.assigned_employees.includes(emp.id)}
                          onChange={(e) => {
                            let selected = [...editForm.assigned_employees];

                            if (e.target.checked) selected.push(emp.id);
                            else selected = selected.filter(
                              (id) => id !== emp.id
                            );

                            setEditForm({
                              ...editForm,
                              assigned_employees: selected,
                            });
                          }}
                        />
                        {emp.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="row">
                <input
                  type="date"
                  value={editForm.start_date}
                  onChange={(e) =>
                    setEditForm({ ...editForm, start_date: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={editForm.end_date}
                  onChange={(e) =>
                    setEditForm({ ...editForm, end_date: e.target.value })
                  }
                />
              </div>

              <div className="row">
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  value={editForm.priority}
                  onChange={(e) =>
                    setEditForm({ ...editForm, priority: e.target.value })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="modal-actions">
                <button className="edit-btn" onClick={updateProject}>
                  Save
                </button>
                <button
                  className="delete-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADD TASK MODAL */}
        {/* {showTaskModal && (
          <div className="modal-overlay">
            <div className="modal-card">
              <h3>Add Task</h3>

              <input
                placeholder="Task name"
                value={taskForm.task_name}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, task_name: e.target.value })
                }
              />

              
              <select
  value={taskForm.assigned_to}
  onChange={(e) =>
    setTaskForm({ ...taskForm, assigned_to: e.target.value })
  }
>
  <option value="">Assign to</option>

  {projectEmployees.map((emp) => (
    <option key={emp.id} value={emp.id}>
      {emp.name}
    </option>
  ))}
</select>


              <input
                type="date"
                value={taskForm.due_date}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, due_date: e.target.value })
                }
              />

              <select
                value={taskForm.status}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, status: e.target.value })
                }
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <div className="modal-actions">
                <button className="edit-btn" onClick={createTask}>
                  Create
                </button>
                <button
                  className="delete-btn"
                  onClick={() => setShowTaskModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )} */}
{showTaskModal && (
  <div className="modal-overlay">
    <div className="modal-card">
      <h3>Add Task</h3>

      {/* Task Name */}
      <div className="form-group">
        <label>Task</label>
        <input
          type="text"
          placeholder="Enter task"
          value={taskForm.task_name}
          onChange={(e) =>
            setTaskForm({ ...taskForm, task_name: e.target.value })
          }
        />
      </div>

      {/* Assign To */}
      <div className="form-group">
        <label>Assign To</label>
        <select
          value={taskForm.assigned_to}
          onChange={(e) =>
            setTaskForm({ ...taskForm, assigned_to: e.target.value })
          }
        >
          <option value="">Select employee</option>
          {projectEmployees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Due Date */}
      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={taskForm.due_date}
          onChange={(e) =>
            setTaskForm({ ...taskForm, due_date: e.target.value })
          }
        />
      </div>

      {/* Task Status */}
      <div className="form-group">
        <label>Status</label>
        <select
          value={taskForm.status}
          onChange={(e) =>
            setTaskForm({ ...taskForm, status: e.target.value })
          }
        >
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Actions */}
      <div className="modal-actions">
        <button className="edit-btn" onClick={createTask}>
          Create
        </button>
        <button
          className="delete-btn"
          onClick={() => setShowTaskModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      
      </div>
    </AdminLayout>
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
