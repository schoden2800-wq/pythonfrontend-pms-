
// // // import { useEffect, useState } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import EmployeeLayout from "../components/employeecomponents/EmployeeLayout";
// // // import "./EmployeeProjectKanban.css";

// // // const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // // const getToken = () => localStorage.getItem("token");

// // // const getAuthHeaders = () => ({
// // //   Authorization: `Bearer ${getToken()}`,
// // //   "Content-Type": "application/json",
// // // });

// // // // SAFE – decode JWT and DO NOT return 0
// // // const getUserIdFromToken = () => {
// // //   try {
// // //     const token = getToken();
// // //     if (!token) return null;

// // //     const payload = JSON.parse(atob(token.split(".")[1]));

// // //     const userId =
// // //       payload.id ??
// // //       payload.userId ??
// // //       payload.user_id ??
// // //       payload.sub ??
// // //       null;

// // //     if (userId === null || userId === undefined) return null;

// // //     return Number(userId);
// // //   } catch {
// // //     return null;
// // //   }
// // // };

// // // // Normalize UI status
// // // const normalizeStatus = (status = "") => {
// // //   const s = status.toLowerCase().trim();
// // //   if (s === "in progress" || s === "in_progress") return "in_progress";
// // //   if (s === "completed" || s === "done") return "completed";
// // //   return "todo";
// // // };

// // // const apiStatusMap = {
// // //   todo: "TODO",
// // //   in_progress: "IN_PROGRESS",
// // //   completed: "COMPLETED",
// // // };

// // // const COLUMNS = [
// // //   { key: "todo", label: "To Do" },
// // //   { key: "in_progress", label: "In Progress" },
// // //   { key: "completed", label: "Completed" },
// // // ];

// // // export default function EmployeeKanbanBoard() {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const [tasks, setTasks] = useState([]);

// // //   useEffect(() => {
// // //     fetch(`${API_BASE}/api/tasks/project/${id}`, {
// // //       headers: getAuthHeaders(),
// // //     })
// // //       .then((r) => r.json())
// // //       .then((d) => (Array.isArray(d) ? setTasks(d) : setTasks([])))
// // //       .catch(() => setTasks([]));
// // //   }, [id]);

// // //   const getTaskId = (t) => Number(t.id ?? t[0]);
// // //   const getTaskStatus = (t) => normalizeStatus(t.status ?? t[2]);
// // //   const getTaskName = (t) => t.name ?? t[1];
// // //   const getTaskDeadline = (t) => t.deadline ?? t[3];
// // //   const getTaskAssigned = (t) => t.assignedTo ?? t[4];

// // //   const byStatus = (k) => tasks.filter((t) => getTaskStatus(t) === k);

// // //   const onDragStart = (e, taskId) => {
// // //     e.dataTransfer.effectAllowed = "move";
// // //     e.dataTransfer.setData("task_id", String(taskId));
// // //   };

// // //   // FINAL WORKING DROP HANDLER
// // //   const onDrop = async (e, newStatus) => {
// // //     e.preventDefault();

// // //     const taskId = Number(e.dataTransfer.getData("task_id"));
// // //     if (!taskId) return;

// // //     const userId = getUserIdFromToken();

// // //     // stop invalid user
// // //     if (!userId) {
// // //       alert("Login expired. Please login again.");
// // //       return;
// // //     }

// // //     const apiStatus = apiStatusMap[newStatus];

// // //     try {
// // //       const res = await fetch(
// // //         `${API_BASE}/api/tasks/${taskId}/status?status=${apiStatus}&user_id=${userId}`,
// // //         {
// // //           method: "PUT",
// // //           headers: getAuthHeaders(),
// // //         }
// // //       );

// // //       const body = await res.json().catch(() => ({}));
// // //       console.log("STATUS UPDATE:", res.status, body);

// // //       if (!res.ok) {
// // //         alert("Status update failed: " + JSON.stringify(body));
// // //         return;
// // //       }

// // //       // optimistic UI update
// // //       setTasks((prev) =>
// // //         prev.map((t) =>
// // //           getTaskId(t) === taskId
// // //             ? { ...t, status: newStatus, 2: newStatus }
// // //             : t
// // //         )
// // //       );
// // //     } catch (err) {
// // //       console.error("UPDATE ERROR:", err);
// // //     }
// // //   };

// // //   return (
// // //     <EmployeeLayout>
// // //       <div className="project-detail-page">
// // //         <div className="project-detail-card">
// // //           <div className="project-detail-header">
// // //             <button className="back-btn" onClick={() => navigate(-1)}>
// // //               Back
// // //             </button>
// // //             <h2>Task Board</h2>
// // //           </div>

// // //           <div className="kanban-board">
// // //             {COLUMNS.map((col) => (
// // //               <div
// // //                 key={col.key}
// // //                 className="kanban-column"
// // //                 onDragOver={(e) => e.preventDefault()}
// // //                 onDrop={(e) => onDrop(e, col.key)}
// // //               >
// // //                 <h4 className="kanban-title">{col.label}</h4>

// // //                 <div className="kanban-list">
// // //                   {byStatus(col.key).length === 0 && (
// // //                     <p className="empty-text">No tasks</p>
// // //                   )}

// // //                   {byStatus(col.key).map((task) => (
// // //                     <div
// // //                       key={getTaskId(task)}
// // //                       className="kanban-card"
// // //                       draggable
// // //                       onDragStart={(e) =>
// // //                         onDragStart(e, getTaskId(task))
// // //                       }
// // //                     >
// // //                       <div className="task-title">
// // //                         {getTaskName(task)}
// // //                       </div>

// // //                       <div className="task-small">
// // //                         Deadline: {getTaskDeadline(task)}
// // //                       </div>

// // //                       <div className="task-small">
// // //                         Assigned: {getTaskAssigned(task)}
// // //                       </div>

// // //                       <div
// // //                         className={`status-chip ${getTaskStatus(task)}`}
// // //                       >
// // //                         {getTaskStatus(task)}
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </EmployeeLayout>
// // //   );
// // // }
// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import EmployeeLayout from "../components/employeecomponents/EmployeeLayout";
// // import "./EmployeeProjectKanban.css";

// // const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // const getToken = () => localStorage.getItem("token");

// // const getAuthHeaders = () => ({
// //   Authorization: `Bearer ${getToken()}`,
// //   "Content-Type": "application/json",
// // });

// // // decode JWT safely
// // const getUserIdFromToken = () => {
// //   try {
// //     const token = getToken();
// //     if (!token) return null;

// //     const payload = JSON.parse(atob(token.split(".")[1]));

// //     const uid =
// //       payload.id ??
// //       payload.userId ??
// //       payload.user_id ??
// //       payload.sub ??
// //       null;

// //     return uid ? Number(uid) : null;
// //   } catch {
// //     return null;
// //   }
// // };

// // /* -----------------------------
// //   FIXED NORMALIZATION (IMPORTANT)
// // ------------------------------*/
// // const normalizeStatus = (status = "") => {
// //   const s = status.toLowerCase().trim();

// //   if (s === "todo") return "todo";
// //   if (s === "in_progress" || s === "in progress") return "in_progress";

// //   // backend returns this
// //   if (s === "completed_by_employee") return "completed";

// //   // fallback
// //   if (s === "completed") return "completed";

// //   return "todo";
// // };

// // /* -----------------------------
// //   FRONTEND -> API conversion
// // ------------------------------*/
// // const apiStatusMap = {
// //   todo: "TODO",
// //   in_progress: "IN_PROGRESS",
// //   completed: "COMPLETED", // maps to completed_by_employee in backend
// // };

// // const COLUMNS = [
// //   { key: "todo", label: "To-Do" },
// //   { key: "in_progress", label: "In Progress" },
// //   { key: "completed", label: "Completed" },
// // ];

// // export default function EmployeeKanbanBoard() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [tasks, setTasks] = useState([]);

// //   useEffect(() => {
// //     fetch(`${API_BASE}/api/tasks/project/${id}`, { headers: getAuthHeaders() })
// //       .then((r) => r.json())
// //       .then((d) => (Array.isArray(d) ? setTasks(d) : setTasks([])))
// //       .catch(() => setTasks([]));
// //   }, [id]);

// //   const getTaskId = (t) => Number(t.id ?? t[0]);
// //   const getTaskStatus = (t) => normalizeStatus(t.status ?? t[2]);
// //   const getTaskName = (t) => t.name ?? t[1];
// //   const getTaskDeadline = (t) => t.deadline ?? t[3];
// //   const getTaskAssigned = (t) => t.assignedTo ?? t[4];

// //   const byStatus = (k) => tasks.filter((t) => getTaskStatus(t) === k);

// //   const onDragStart = (e, taskId) => {
// //     e.dataTransfer.effectAllowed = "move";
// //     e.dataTransfer.setData("task_id", String(taskId));
// //   };

// //   const onDrop = async (e, newStatus) => {
// //     e.preventDefault();

// //     const taskId = Number(e.dataTransfer.getData("task_id"));
// //     if (!taskId) return;

// //     const userId = getUserIdFromToken();
// //     if (!userId) {
// //       alert("Login expired. Please login again.");
// //       return;
// //     }

// //     const apiStatus = apiStatusMap[newStatus];

// //     try {
// //       const res = await fetch(
// //         `${API_BASE}/api/tasks/${taskId}/status?status=${apiStatus}&user_id=${userId}`,
// //         {
// //           method: "PUT",
// //           headers: getAuthHeaders(),
// //         }
// //       );

// //       const body = await res.json().catch(() => ({}));
// //       console.log("STATUS UPDATE:", res.status, body);

// //       if (!res.ok) {
// //         alert("Failed to update status. Rolling back.");
// //         return;
// //       }

// //       // optimistic UI update – KEEP STATUS
// //       setTasks((prev) =>
// //         prev.map((t) =>
// //           getTaskId(t) === taskId
// //             ? { ...t, status: newStatus, 2: newStatus }
// //             : t
// //         )
// //       );
// //     } catch (err) {
// //       console.error("UPDATE ERROR:", err);
// //       alert("Network error updating status.");
// //     }
// //   };

// //   return (
// //     <EmployeeLayout>
// //       <div className="project-detail-page">
// //         <div className="project-detail-card">
// //           <div className="project-detail-header">
// //             <button className="back-btn" onClick={() => navigate(-1)}>
// //               Back
// //             </button>
// //             <h2>Task Board</h2>
// //           </div>

// //           <div className="kanban-board">
// //             {COLUMNS.map((col) => (
// //               <div
// //                 key={col.key}
// //                 className="kanban-column"
// //                 onDragOver={(e) => e.preventDefault()}
// //                 onDrop={(e) => onDrop(e, col.key)}
// //               >
// //                 <h4 className="kanban-title">{col.label}</h4>

// //                 <div className="kanban-list">
// //                   {byStatus(col.key).length === 0 && (
// //                     <p className="empty-text">No tasks</p>
// //                   )}

// //                   {byStatus(col.key).map((task) => (
// //                     <div
// //                       key={getTaskId(task)}
// //                       className="kanban-card"
// //                       draggable
// //                       onDragStart={(e) => onDragStart(e, getTaskId(task))}
// //                     >
// //                       <div className="task-title">{getTaskName(task)}</div>

// //                       <div className="task-small">
// //                         Deadline: {getTaskDeadline(task)}
// //                       </div>

// //                       <div className="task-small">
// //                         Assigned: {getTaskAssigned(task)}
// //                       </div>

// //                       <div
// //                         className={`status-chip ${getTaskStatus(task)}`}
// //                       >
// //                         {getTaskStatus(task)}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </EmployeeLayout>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import EmployeeLayout from "../components/employeecomponents/EmployeeLayout";
// import "./EmployeeProjectKanban.css";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// const getToken = () => localStorage.getItem("token");

// const getAuthHeaders = () => ({
//   Authorization: `Bearer ${getToken()}`,
//   "Content-Type": "application/json",
// });

// // decode JWT safely
// const getUserIdFromToken = () => {
//   try {
//     const token = getToken();
//     if (!token) return null;

//     const payload = JSON.parse(atob(token.split(".")[1]));

//     return (
//       Number(
//         payload.id ??
//           payload.userId ??
//           payload.user_id ??
//           payload.sub ??
//           null
//       ) || null
//     );
//   } catch {
//     return null;
//   }
// };

// /* -----------------------------
//   NORMALIZATION INCLUDING QA PASSED
// ------------------------------*/
// const normalizeStatus = (status = "") => {
//   const s = status.toLowerCase().trim();

//   if (s === "todo") return "todo";
//   if (s === "in_progress" || s === "in progress") return "in_progress";

//   if (s === "completed_by_employee" || s === "completed")
//     return "completed";

//   if (s === "qa_passed" || s === "qa approved" || s === "qa_passed")
//     return "qa_passed";

//   return "todo";
// };

// /* -----------------------------
//   FRONTEND -> API conversion
// ------------------------------*/
// const apiStatusMap = {
//   todo: "TODO",
//   in_progress: "IN_PROGRESS",
//   completed: "COMPLETED",
//   qa_passed: "QA_PASSED",
// };

// /* -----------------------------
//   ADD NEW COLUMN HERE
// ------------------------------*/
// const COLUMNS = [
//   { key: "todo", label: "To-Do" },
//   { key: "in_progress", label: "In Progress" },
//   { key: "completed", label: "Completed" },
//   { key: "qa_passed", label: "QA Passed" },   // NEW COLUMN
// ];

// export default function EmployeeKanbanBoard() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetch(`${API_BASE}/api/tasks/project/${id}`, { headers: getAuthHeaders() })
//       .then((r) => r.json())
//       .then((d) => (Array.isArray(d) ? setTasks(d) : setTasks([])))
//       .catch(() => setTasks([]));
//   }, [id]);

//   const getTaskId = (t) => Number(t.id ?? t[0]);
//   const getTaskStatus = (t) => normalizeStatus(t.status ?? t[2]);
//   const getTaskName = (t) => t.name ?? t[1];
//   const getTaskDeadline = (t) => t.deadline ?? t[3];
//   const getTaskAssigned = (t) => t.assignedTo ?? t[4];

//   const byStatus = (k) => tasks.filter((t) => getTaskStatus(t) === k);

//   const onDragStart = (e, taskId) => {
//     e.dataTransfer.effectAllowed = "move";
//     e.dataTransfer.setData("task_id", String(taskId));
//   };

//   const onDrop = async (e, newStatus) => {
//     e.preventDefault();

//     const taskId = Number(e.dataTransfer.getData("task_id"));
//     if (!taskId) return;

//     const userId = getUserIdFromToken();
//     if (!userId) {
//       alert("Login expired. Please login again.");
//       return;
//     }

//     const apiStatus = apiStatusMap[newStatus];

//     try {
//       const res = await fetch(
//         `${API_BASE}/api/tasks/${taskId}/status?status=${apiStatus}&user_id=${userId}`,
//         {
//           method: "PUT",
//           headers: getAuthHeaders(),
//         }
//       );

//       if (!res.ok) {
//         alert("Failed to update status. Rolling back.");
//         return;
//       }

//       // optimistic UI update
//       setTasks((prev) =>
//         prev.map((t) =>
//           getTaskId(t) === taskId
//             ? { ...t, status: newStatus, 2: newStatus }
//             : t
//         )
//       );
//     } catch (err) {
//       console.error("UPDATE ERROR:", err);
//       alert("Network error updating status.");
//     }
//   };

//   return (
//     <EmployeeLayout>
//       <div className="project-detail-page">
//         <div className="project-detail-card">
//           <div className="project-detail-header">
//             <button className="back-btn" onClick={() => navigate(-1)}>
//               Back
//             </button>
//             <h2>Task Board</h2>
//           </div>

//           <div className="kanban-board">
//             {COLUMNS.map((col) => (
//               <div
//                 key={col.key}
//                 className="kanban-column"
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={(e) => onDrop(e, col.key)}
//               >
//                 <h4 className="kanban-title">{col.label}</h4>

//                 <div className="kanban-list">
//                   {byStatus(col.key).length === 0 && (
//                     <p className="empty-text">No tasks</p>
//                   )}

//                   {byStatus(col.key).map((task) => (
//                     <div
//                       key={getTaskId(task)}
//                       className="kanban-card"
//                       draggable
//                       onDragStart={(e) => onDragStart(e, getTaskId(task))}
//                     >
//                       <div className="task-title">{getTaskName(task)}</div>

//                       <div className="task-small">
//                         Deadline: {getTaskDeadline(task)}
//                       </div>

//                       <div className="task-small">
//                         Assigned: {getTaskAssigned(task)}
//                       </div>

//                       <div
//                         className={`status-chip ${getTaskStatus(task)}`}
//                       >
//                         {getTaskStatus(task)}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </EmployeeLayout>
//   );
// }
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeLayout from "../components/employeecomponents/EmployeeLayout";
import "./EmployeeProjectKanban.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getToken = () => localStorage.getItem("token");

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
});

// -------- decode JWT safely ----------
const getUserIdFromToken = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));

    return (
      Number(
        payload.user_id ??
          payload.id ??
          payload.userId ??
          payload.sub ??
          null
      ) || null
    );
  } catch {
    return null;
  }
};

/* -----------------------------
  STATUS NORMALIZATION
------------------------------*/
const normalizeStatus = (status = "") => {
  const s = status.toLowerCase().trim();

  if (s === "todo") return "todo";
  if (s === "in_progress" || s === "in progress") return "in_progress";
  if (s === "completed_by_employee" || s === "completed")
    return "completed";
  if (s === "qa_passed" || s === "qa approved")
    return "qa_passed";

  return "todo";
};

/* -----------------------------
  UI -> API status translation
------------------------------*/
const apiStatusMap = {
  todo: "TODO",
  in_progress: "IN_PROGRESS",
  completed: "COMPLETED",
  qa_passed: "QA_PASSED"
};

/* -----------------------------
  KANBAN COLUMNS
------------------------------*/
const COLUMNS = [
  { key: "todo", label: "To-Do" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "qa_passed", label: "QA Passed" }
];

export default function EmployeeKanbanBoard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  // ---------- FETCH TASKS ----------
  useEffect(() => {
    fetch(`${API_BASE}/api/tasks/project/${id}`, {
      headers: getAuthHeaders()
    })
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return setTasks([]);

        // normalize mixed tuple/object API formats
        setTasks(
          data.map((t) => ({
            id: t.id || t.task_id || t[0],
            name: t.name || t.task_name || t[1],
            status: normalizeStatus(t.status || t[2]),
            deadline: t.deadline || t.due_date || t[3],
            assignedTo: t.assignedTo || t.assigned_to || t[4] || "—"
          }))
        );
      })
      .catch(() => setTasks([]));
  }, [id]);

  const byStatus = (k) => tasks.filter((t) => t.status === k);

  const onDragStart = (e, taskId) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("task_id", String(taskId));
  };

  // ---------- DROP / UPDATE ----------
  const onDrop = async (e, newStatus) => {
    e.preventDefault();

    const taskId = Number(e.dataTransfer.getData("task_id"));
    if (!taskId) return;

    const userId = getUserIdFromToken();
    if (!userId) {
      alert("Login expired, please sign in again.");
      return;
    }

    const apiStatus = apiStatusMap[newStatus];
    if (!apiStatus) return;

    // optimistic UI snapshot
    const previous = [...tasks];

    // optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    );

    try {
      // IMPORTANT — backend expects FormData
      const formData = new FormData();
      formData.append("status", apiStatus);
      formData.append("user_id", userId);

      const res = await fetch(
        `${API_BASE}/api/tasks/${taskId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getToken()}`
            // DO NOT set Content-Type here
          },
          body: formData
        }
      );

      if (!res.ok) {
        console.error(await res.text());
        alert("Status update failed — restoring previous value");
        setTasks(previous); // rollback
      }
    } catch (err) {
      console.error(err);
      alert("Network error — restoring previous value");
      setTasks(previous); // rollback
    }
  };

  return (
    <EmployeeLayout>
      <div className="project-detail-page">
        <div className="project-detail-card">
          <div className="project-detail-header">
            <button className="back-btn" onClick={() => navigate(-1)}>
              Back
            </button>
            <h2>Task Board</h2>
          </div>

          <div className="kanban-board">
            {COLUMNS.map((col) => (
              <div
                key={col.key}
                className="kanban-column"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, col.key)}
              >
                <h4 className="kanban-title">{col.label}</h4>

                <div className="kanban-list">
                  {byStatus(col.key).length === 0 && (
                    <p className="empty-text">No tasks</p>
                  )}

                  {byStatus(col.key).map((task) => (
                    <div
                      key={task.id}
                      className="kanban-card"
                      draggable
                      onDragStart={(e) => onDragStart(e, task.id)}
                    >
                      <div className="task-title">{task.name}</div>

                      <div className="task-small">
                        Deadline: {task.deadline}
                      </div>

                      <div className="task-small">
                        Assigned: {task.assignedTo}
                      </div>

                      <div className={`status-chip ${task.status}`}>
                        {task.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}
