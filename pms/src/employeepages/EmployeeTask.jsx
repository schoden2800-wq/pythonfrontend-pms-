
// // // import { useEffect, useState } from "react";
// // // import React from "react";
// // // import EmployeeLayout from "../components/employeecomponents/EmployeeLayout";
// // // import "./EmployeeTasks.css";

// // // const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // // // read token
// // // const getToken = () => localStorage.getItem("token");

// // // const getAuthHeaders = () => ({
// // //   Authorization: `Bearer ${getToken()}`
// // // });

// // // // decode JWT to get user id
// // // const getUserIdFromToken = () => {
// // //   try {
// // //     const token = getToken();
// // //     if (!token) return null;

// // //     const payloadBase64 = token.split(".")[1];
// // //     const json = atob(payloadBase64);
// // //     const payload = JSON.parse(json);

// // //     return (
// // //       payload.user_id ||
// // //       payload.id ||
// // //       payload.userId ||
// // //       payload.sub ||
// // //       null
// // //     );
// // //   } catch {
// // //     return null;
// // //   }
// // // };

// // // // normalize
// // // const normalizeStatus = (s = "") => s?.toLowerCase()?.trim() ?? "";

// // // // QA failed helper
// // // const isQAFailed = (t) =>
// // //   normalizeStatus(t.status) === "qa_failed" || !!t.qa_issue;

// // // // ================= COMPONENT ==================

// // // export default function EmployeeTasks() {
// // //   const [tasks, setTasks] = useState([]);

// // //   // -------- FETCH TASKS ----------
// // //   useEffect(() => {
// // //     const userId = getUserIdFromToken();
// // //     if (!userId) return;

// // //     fetch(`${API_BASE}/api/tasks/user/${userId}`, {
// // //       headers: getAuthHeaders()
// // //     })
// // //       .then((res) => res.json())
// // //       .then((data) => {
// // //         if (Array.isArray(data)) {
// // //           const mapped = data.map((row) => ({
// // //             id: row.task_id || row[0],
// // //             task_name: row.task_name || row[1],
// // //             status: row.status || row[2],
// // //             due_date: row.due_date || row[3],
// // //             project_title: row.project_title || row[4] || "—",
// // //             qa_issue: row.qa_issue || row[5] || null
// // //           }));
// // //           setTasks(mapped);
// // //         } else {
// // //           setTasks([]);
// // //         }
// // //       })
// // //       .catch(() => setTasks([]));
// // //   }, []);

// // //   // ********* UI -> API (MUST MATCH YOUR BACKEND) *********
// // //   const uiToApi = {
// // //     todo: "TODO",
// // //     in_progress: "IN_PROGRESS",
// // //     completed_by_employee: "COMPLETED",
// // //     qa_failed: "QA_FAILED",
// // //     qa_passed: "QA_PASSED",
// // //     in_qa_review: "IN_PROGRESS"
// // //   };

// // //   // ---------- UPDATE TASK STATUS ----------
// // //   const handleStatusChange = async (taskId, newStatus) => {
// // //     const userId = getUserIdFromToken();
// // //     if (!userId) {
// // //       alert("User not found in token");
// // //       return;
// // //     }

// // //     const apiStatus = uiToApi[newStatus];
// // //     if (!apiStatus) {
// // //       alert("Unsupported status");
// // //       return;
// // //     }

// // //     // save previous state
// // //     const previous = [...tasks];

// // //     // optimistic UI update
// // //     setTasks((t) =>
// // //       t.map((task) =>
// // //         task.id === taskId ? { ...task, status: newStatus } : task
// // //       )
// // //     );

// // //     try {
// // //       const url =
// // //         `${API_BASE}/api/tasks/${taskId}/status` +
// // //         `?status=${encodeURIComponent(apiStatus)}` +
// // //         `&user_id=${encodeURIComponent(userId)}`;

// // //       const res = await fetch(url, {
// // //         method: "PUT",
// // //         headers: getAuthHeaders()
// // //       });

// // //       if (!res.ok) {
// // //         const text = await res.text();
// // //         alert(`Server error ${res.status}: ${text}`);
// // //         console.error("STATUS:", res.status);
// // //         console.error("RESPONSE:", text);

// // //         // rollback
// // //         setTasks(previous);
// // //       }
// // //     } catch (err) {
// // //       setTasks(previous);
// // //     }
// // //   };

// // //   // ------------ BUCKETS ------------
// // //   const todo = tasks.filter((t) =>
// // //     ["todo", "qa_failed"].includes(normalizeStatus(t.status))
// // //   );

// // //   const inProgress = tasks.filter((t) =>
// // //     ["in_progress", "in_qa_review"].includes(normalizeStatus(t.status))
// // //   );

// // //   const completed = tasks.filter(
// // //     (t) => normalizeStatus(t.status) === "completed_by_employee"
// // //   );

// // //   // -------------- UI --------------
// // //   return (
// // //     <EmployeeLayout>
// // //       <div className="employee-tasks-page">
// // //         <div className="et-container">
// // //           <h2 className="et-heading">My Tasks</h2>

// // //           <div className="et-table-wrapper">
// // //             <table className="et-table">
// // //               <thead>
// // //                 <tr>
// // //                   <th>Task</th>
// // //                   <th>Project</th>
// // //                   <th>Due Date</th>
// // //                   <th>Status</th>
// // //                 </tr>
// // //               </thead>

// // //               <tbody>
// // //                 {/* TODO */}
// // //                 <tr>
// // //                   <td colSpan="4" className="section-title todo">
// // //                     To-Do
// // //                   </td>
// // //                 </tr>

// // //                 {todo.length === 0 && (
// // //                   <tr>
// // //                     <td colSpan="4" className="empty">No tasks</td>
// // //                   </tr>
// // //                 )}

// // //                 {todo.map((t) => (
// // //                   <React.Fragment key={t.id}>
// // //                     <tr className={isQAFailed(t) ? "qa-failed-row" : ""}>
// // //                       <td>{t.task_name}</td>
// // //                       <td>{t.project_title}</td>
// // //                       <td>{t.due_date}</td>
// // //                       <td>
// // //                         <select
// // //                           value={normalizeStatus(t.status)}
// // //                           onChange={(e) =>
// // //                             handleStatusChange(t.id, e.target.value)
// // //                           }
// // //                           className="status-select"
// // //                         >
// // //                           <option value="todo">To-Do</option>
// // //                           <option value="in_progress">In-Progress</option>
// // //                           <option value="completed_by_employee">
// // //                             Mark Completed
// // //                           </option>
// // //                         </select>
// // //                       </td>
// // //                     </tr>

// // //                     {isQAFailed(t) && (
// // //                       <tr className="qa-issue-row">
// // //                         <td colSpan="4">
// // //                           <strong>QA Issue:</strong> {t.qa_issue}
// // //                         </td>
// // //                       </tr>
// // //                     )}
// // //                   </React.Fragment>
// // //                 ))}

// // //                 {/* IN PROGRESS */}
// // //                 <tr>
// // //                   <td colSpan="4" className="section-title progress">
// // //                     In Progress
// // //                   </td>
// // //                 </tr>

// // //                 {inProgress.length === 0 && (
// // //                   <tr>
// // //                     <td colSpan="4" className="empty">No tasks</td>
// // //                   </tr>
// // //                 )}

// // //                 {inProgress.map((t) => (
// // //                   <tr key={t.id}>
// // //                     <td>{t.task_name}</td>
// // //                     <td>{t.project_title}</td>
// // //                     <td>{t.due_date}</td>
// // //                     <td>
// // //                       <select
// // //                         value={normalizeStatus(t.status)}
// // //                         onChange={(e) =>
// // //                           handleStatusChange(t.id, e.target.value)
// // //                         }
// // //                         className="status-select"
// // //                       >
// // //                         <option value="todo">To-Do</option>
// // //                         <option value="in_progress">In-Progress</option>
// // //                         <option value="completed_by_employee">
// // //                           Mark Completed
// // //                         </option>
// // //                       </select>
// // //                     </td>
// // //                   </tr>
// // //                 ))}

// // //                 {/* COMPLETED */}
// // //                 <tr>
// // //                   <td colSpan="4" className="section-title completed">
// // //                     Completed (awaiting QA)
// // //                   </td>
// // //                 </tr>

// // //                 {completed.length === 0 && (
// // //                   <tr>
// // //                     <td colSpan="4" className="empty">No tasks</td>
// // //                   </tr>
// // //                 )}

// // //                 {completed.map((t) => (
// // //                   <tr key={t.id} className="completed-row">
// // //                     <td>{t.task_name}</td>
// // //                     <td>{t.project_title}</td>
// // //                     <td>{t.due_date}</td>
// // //                     <td>Waiting for QA</td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </EmployeeLayout>
// // //   );
// // // }
// // import { useEffect, useState } from "react";
// // import React from "react";
// // import EmployeeLayout from "../components/employeecomponents/EmployeeLayout";
// // import "./EmployeeTasks.css";

// // const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // // read token
// // const getToken = () => localStorage.getItem("token");

// // const getAuthHeaders = () => ({
// //   Authorization: `Bearer ${getToken()}`
// // });

// // // decode JWT to get user id
// // const getUserIdFromToken = () => {
// //   try {
// //     const token = getToken();
// //     if (!token) return null;

// //     const payloadBase64 = token.split(".")[1];
// //     const json = atob(payloadBase64);
// //     const payload = JSON.parse(json);

// //     return (
// //       payload.user_id ||
// //       payload.id ||
// //       payload.userId ||
// //       payload.sub ||
// //       null
// //     );
// //   } catch {
// //     return null;
// //   }
// // };

// // // normalize
// // const normalizeStatus = (s = "") => s?.toLowerCase()?.trim() ?? "";

// // // QA failed helper
// // const isQAFailed = (t) =>
// //   normalizeStatus(t.status) === "qa_failed" || !!t.qa_issue;


// // // ================= COMPONENT ==================
// // export default function EmployeeTasks() {
// //   const [tasks, setTasks] = useState([]);

// //   // -------- FETCH TASKS ----------
// //   useEffect(() => {
// //     const userId = getUserIdFromToken();
// //     if (!userId) return;

// //     fetch(`${API_BASE}/api/tasks/user/${userId}`, {
// //       headers: getAuthHeaders()
// //     })
// //       .then((res) => res.json())
// //       .then((data) => {
// //         if (Array.isArray(data)) {
// //           const mapped = data.map((row) => ({
// //             id: row.task_id || row[0],
// //             task_name: row.task_name || row[1],
// //             status: row.status || row[2],
// //             due_date: row.due_date || row[3],
// //             project_title: row.project_title || row[4] || "—",
// //             qa_issue: row.qa_issue || row[5] || null
// //           }));
// //           setTasks(mapped);
// //         } else {
// //           setTasks([]);
// //         }
// //       })
// //       .catch(() => setTasks([]));
// //   }, []);

// //   // ********* UI -> API *********
// //   const uiToApi = {
// //     todo: "TODO",
// //     in_progress: "IN_PROGRESS",
// //     completed_by_employee: "COMPLETED",
// //     qa_failed: "QA_FAILED",
// //     qa_passed: "QA_PASSED",
// //     in_qa_review: "IN_PROGRESS"
// //   };

// //   // ---------- UPDATE TASK STATUS ----------
// //   const handleStatusChange = async (taskId, newStatus) => {
// //     const userId = getUserIdFromToken();
// //     if (!userId) {
// //       alert("User not found in token");
// //       return;
// //     }

// //     const apiStatus = uiToApi[newStatus];
// //     if (!apiStatus) {
// //       alert("Unsupported status");
// //       return;
// //     }

// //     // save previous state
// //     const previous = [...tasks];

// //     // optimistic UI update
// //     setTasks((t) =>
// //       t.map((task) =>
// //         task.id === taskId ? { ...task, status: newStatus } : task
// //       )
// //     );

// //     try {
// //       // IMPORTANT — backend expects FORM DATA
// //       const formData = new FormData();
// //       formData.append("status", apiStatus);
// //       formData.append("user_id", userId);

// //       const res = await fetch(`${API_BASE}/api/tasks/${taskId}/status`, {
// //         method: "PUT",
// //         headers: {
// //           Authorization: `Bearer ${getToken()}`
// //           // do NOT set Content-Type manually
// //         },
// //         body: formData
// //       });

// //       if (!res.ok) {
// //         const text = await res.text();
// //         alert(`Server error ${res.status}: ${text}`);
// //         console.error(text);
// //         setTasks(previous); // rollback UI
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setTasks(previous);
// //     }
// //   };

// //   // ------------ BUCKETS ------------
// //   const todo = tasks.filter((t) =>
// //     ["todo", "qa_failed"].includes(normalizeStatus(t.status))
// //   );

// //   const inProgress = tasks.filter((t) =>
// //     ["in_progress", "in_qa_review"].includes(normalizeStatus(t.status))
// //   );

// //   const completed = tasks.filter(
// //     (t) => normalizeStatus(t.status) === "completed_by_employee"
// //   );

// //   // -------------- UI --------------
// //   return (
// //     <EmployeeLayout>
// //       <div className="employee-tasks-page">
// //         <div className="et-container">
// //           <h2 className="et-heading">My Tasks</h2>

// //           <div className="et-table-wrapper">
// //             <table className="et-table">
// //               <thead>
// //                 <tr>
// //                   <th>Task</th>
// //                   <th>Project</th>
// //                   <th>Due Date</th>
// //                   <th>Status</th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {/* TODO */}
// //                 <tr>
// //                   <td colSpan="4" className="section-title todo">
// //                     To-Do
// //                   </td>
// //                 </tr>

// //                 {todo.length === 0 && (
// //                   <tr>
// //                     <td colSpan="4" className="empty">No tasks</td>
// //                   </tr>
// //                 )}

// //                 {todo.map((t) => (
// //                   <React.Fragment key={t.id}>
// //                     <tr className={isQAFailed(t) ? "qa-failed-row" : ""}>
// //                       <td>{t.task_name}</td>
// //                       <td>{t.project_title}</td>
// //                       <td>{t.due_date}</td>
// //                       <td>
// //                         <select
// //                           value={normalizeStatus(t.status)}
// //                           onChange={(e) =>
// //                             handleStatusChange(t.id, e.target.value)
// //                           }
// //                           className="status-select"
// //                         >
// //                           <option value="todo">To-Do</option>
// //                           <option value="in_progress">In-Progress</option>
// //                           <option value="completed_by_employee">
// //                             Mark Completed
// //                           </option>
// //                         </select>
// //                       </td>
// //                     </tr>

// //                     {isQAFailed(t) && (
// //                       <tr className="qa-issue-row">
// //                         <td colSpan="4">
// //                           <strong>QA Issue:</strong> {t.qa_issue}
// //                         </td>
// //                       </tr>
// //                     )}
// //                   </React.Fragment>
// //                 ))}

// //                 {/* IN PROGRESS */}
// //                 <tr>
// //                   <td colSpan="4" className="section-title progress">
// //                     In Progress
// //                   </td>
// //                 </tr>

// //                 {inProgress.length === 0 && (
// //                   <tr>
// //                     <td colSpan="4" className="empty">No tasks</td>
// //                   </tr>
// //                 )}

// //                 {inProgress.map((t) => (
// //                   <tr key={t.id}>
// //                     <td>{t.task_name}</td>
// //                     <td>{t.project_title}</td>
// //                     <td>{t.due_date}</td>
// //                     <td>
// //                       <select
// //                         value={normalizeStatus(t.status)}
// //                         onChange={(e) =>
// //                           handleStatusChange(t.id, e.target.value)
// //                         }
// //                         className="status-select"
// //                       >
// //                         <option value="todo">To-Do</option>
// //                         <option value="in_progress">In-Progress</option>
// //                         <option value="completed_by_employee">
// //                           Mark Completed
// //                         </option>
// //                       </select>
// //                     </td>
// //                   </tr>
// //                 ))}

// //                 {/* COMPLETED */}
// //                 <tr>
// //                   <td colSpan="4" className="section-title completed">
// //                     Completed (awaiting QA)
// //                   </td>
// //                 </tr>

// //                 {completed.length === 0 && (
// //                   <tr>
// //                     <td colSpan="4" className="empty">No tasks</td>
// //                   </tr>
// //                 )}

// //                 {completed.map((t) => (
// //                   <tr key={t.id} className="completed-row">
// //                     <td>{t.task_name}</td>
// //                     <td>{t.project_title}</td>
// //                     <td>{t.due_date}</td>
// //                     <td>Waiting for QA</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>
// //     </EmployeeLayout>
// //   );
// // }
// import { useEffect, useState } from "react";
// import React from "react";
// import EmployeeLayout from "../components/employeecomponents/EmployeeLayout";
// import "./EmployeeTasks.css";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // read token
// const getToken = () => localStorage.getItem("token");

// const getAuthHeaders = () => ({
//   Authorization: `Bearer ${getToken()}`
// });

// // decode JWT to get user id
// const getUserIdFromToken = () => {
//   try {
//     const token = getToken();
//     if (!token) return null;

//     const payloadBase64 = token.split(".")[1];
//     const json = atob(payloadBase64);
//     const payload = JSON.parse(json);

//     return (
//       payload.user_id ||
//       payload.id ||
//       payload.userId ||
//       payload.sub ||
//       null
//     );
//   } catch {
//     return null;
//   }
// };

// // normalize status
// const normalizeStatus = (s = "") => s?.toLowerCase()?.trim() ?? "";

// // QA failed flag
// const isQAFailed = (t) =>
//   normalizeStatus(t.status) === "qa_failed" || !!t.qa_issue;

// // ================= COMPONENT ==================
// export default function EmployeeTasks() {
//   const [tasks, setTasks] = useState([]);

//   // modal state
//   const [issueModal, setIssueModal] = useState({
//     open: false,
//     issue: "",
//     images: []
//   });

//   // -------- FETCH TASKS ----------
//   useEffect(() => {
//     const userId = getUserIdFromToken();
//     if (!userId) return;

//     fetch(`${API_BASE}/api/tasks/user/${userId}`, {
//       headers: getAuthHeaders()
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           const mapped = data.map((row) => ({
//             id: row.task_id || row[0],
//             task_name: row.task_name || row[1],
//             status: row.status || row[2],
//             due_date: row.due_date || row[3],
//             project_title: row.project_title || row[4] || "—",
//             qa_issue: row.qa_issue || row[5] || null,
//             qa_images: row.qa_images || row[6] || []   // <-- images support
//           }));
//           setTasks(mapped);
//         } else {
//           setTasks([]);
//         }
//       })
//       .catch(() => setTasks([]));
//   }, []);

//   // ********* UI -> API *********
//   const uiToApi = {
//     todo: "TODO",
//     in_progress: "IN_PROGRESS",
//     completed_by_employee: "COMPLETED",
//     qa_failed: "QA_FAILED",
//     qa_passed: "QA_PASSED",
//     in_qa_review: "IN_PROGRESS"
//   };

//   // ---------- UPDATE TASK STATUS ----------
//   const handleStatusChange = async (taskId, newStatus) => {
//     const userId = getUserIdFromToken();
//     if (!userId) {
//       alert("User not found in token");
//       return;
//     }

//     const apiStatus = uiToApi[newStatus];
//     if (!apiStatus) {
//       alert("Unsupported status");
//       return;
//     }

//     const previous = [...tasks];

//     // optimistic UI
//     setTasks((t) =>
//       t.map((task) =>
//         task.id === taskId ? { ...task, status: newStatus } : task
//       )
//     );

//     try {
//       const formData = new FormData();
//       formData.append("status", apiStatus);
//       formData.append("user_id", userId);

//       const res = await fetch(`${API_BASE}/api/tasks/${taskId}/status`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${getToken()}`
//         },
//         body: formData
//       });

//       if (!res.ok) {
//         const text = await res.text();
//         alert(`Server error ${res.status}: ${text}`);
//         console.error(text);
//         setTasks(previous);
//       }
//     } catch (err) {
//       console.error(err);
//       setTasks(previous);
//     }
//   };

//   // ------------ BUCKETS ------------
//   const todo = tasks.filter((t) =>
//     ["todo", "qa_failed"].includes(normalizeStatus(t.status))
//   );

//   const inProgress = tasks.filter((t) =>
//     ["in_progress", "in_qa_review"].includes(normalizeStatus(t.status))
//   );

//   const completed = tasks.filter(
//     (t) => normalizeStatus(t.status) === "completed_by_employee"
//   );

//   // -------------- UI --------------
//   return (
//     <EmployeeLayout>
//       <div className="employee-tasks-page">
//         <div className="et-container">
//           <h2 className="et-heading">My Tasks</h2>

//           <div className="et-table-wrapper">
//             <table className="et-table">
//               <thead>
//                 <tr>
//                   <th>Task</th>
//                   <th>Project</th>
//                   <th>Due Date</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {/* TODO */}
//                 <tr>
//                   <td colSpan="4" className="section-title todo">
//                     To-Do
//                   </td>
//                 </tr>

//                 {todo.length === 0 && (
//                   <tr>
//                     <td colSpan="4" className="empty">No tasks</td>
//                   </tr>
//                 )}

              
// {todo.map((t) => (
//   <tr key={t.id} className={isQAFailed(t) ? "qa-failed-row" : ""}>
//     <td>{t.task_name}</td>
//     <td>{t.project_title}</td>
//     <td>{t.due_date}</td>

//     <td className="status-cell">

//       {/* status dropdown */}
//       <select
//         value={normalizeStatus(t.status)}
//         onChange={(e) => handleStatusChange(t.id, e.target.value)}
//         className="status-select"
//       >
//         <option value="todo">To-Do</option>
//         <option value="in_progress">In-Progress</option>
//         <option value="completed_by_employee">Mark Completed</option>
//       </select>

//       {/* SAME ROW BUTTON */}
//       {isQAFailed(t) && (
//         <button
//           className="view-issue-btn"
//           onClick={() =>
//             setIssueModal({
//               open: true,
//               issue: t.qa_issue,
//               images: t.qa_images || []
//             })
//           }
//         >
//           View QA Issue
//         </button>
//       )}
//     </td>
//   </tr>
// ))}

//                 {/* IN PROGRESS */}
//                 <tr>
//                   <td colSpan="4" className="section-title progress">
//                     In Progress
//                   </td>
//                 </tr>

//                 {inProgress.length === 0 && (
//                   <tr>
//                     <td colSpan="4" className="empty">No tasks</td>
//                   </tr>
//                 )}

//                 {inProgress.map((t) => (
//                   <tr key={t.id}>
//                     <td>{t.task_name}</td>
//                     <td>{t.project_title}</td>
//                     <td>{t.due_date}</td>
//                     <td>
//                       <select
//                         value={normalizeStatus(t.status)}
//                         onChange={(e) =>
//                           handleStatusChange(t.id, e.target.value)
//                         }
//                         className="status-select"
//                       >
//                         <option value="todo">To-Do</option>
//                         <option value="in_progress">In-Progress</option>
//                         <option value="completed_by_employee">
//                           Mark Completed
//                         </option>
//                       </select>
//                     </td>
//                   </tr>
//                 ))}

//                 {/* COMPLETED */}
//                 <tr>
//                   <td colSpan="4" className="section-title completed">
//                     Completed (awaiting QA)
//                   </td>
//                 </tr>

//                 {completed.length === 0 && (
//                   <tr>
//                     <td colSpan="4" className="empty">No tasks</td>
//                   </tr>
//                 )}

//                 {completed.map((t) => (
//                   <tr key={t.id} className="completed-row">
//                     <td>{t.task_name}</td>
//                     <td>{t.project_title}</td>
//                     <td>{t.due_date}</td>
//                     <td>Waiting for QA</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* ---------- QA ISSUE MODAL ---------- */}
//         {/* {issueModal.open && (
//           <div className="qa-modal-overlay">
//             <div className="qa-modal">
//               <h3>QA Issue</h3>

//               <p>{issueModal.issue || "No description provided"}</p>

//               {issueModal.images?.length > 0 ? (
//                 <div className="qa-images">
//                   {issueModal.images.map((img, i) => (
//                     <img
//                       key={i}
//                       src={
//                         img.startsWith("http")
//                           ? img
//                           : `${API_BASE}/uploads/${img}`
//                       }
//                       alt="QA evidence"
//                       className="qa-image"
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <p>No images attached</p>
//               )}

//               <button
//                 className="close-btn"
//                 onClick={() =>
//                   setIssueModal({ open: false, issue: "", images: [] })
//                 }
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )} */}
//         {issueModal.open && (
//   <div className="popup-overlay" onClick={() =>
//     setIssueModal({ open: false, issue: "", images: [] })
//   }>
//     <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
//       <h3>QA Issue</h3>

//       <p className="popup-box">{issueModal.issue || "No description provided"}</p>

//       {issueModal.images?.length > 0 ? (
//         <div className="popup-images">
//           {issueModal.images.map((img, i) => (
//             <img
//               key={i}
//               src={img.startsWith("http") ? img : `${API_BASE}/qa_issues/${img}`}

//               // src={img.startsWith("http") ? img : `${API_BASE}/uploads/${img}`}
//               alt="QA evidence"
//             />
//           ))}
//         </div>
//       ) : (
//         <p className="popup-box">No images attached</p>
//       )}

//       <button
//         className="popup-close-btn"
//         onClick={() =>
//           setIssueModal({ open: false, issue: "", images: [] })
//         }
//       >
//         Close
//       </button>
//     </div>
//   </div>
// )}

//       </div>
//     </EmployeeLayout>
//   );
// }
import { useEffect, useState } from "react";
import React from "react";
import EmployeeLayout from "../components/employeecomponents/EmployeeLayout";
import "./EmployeeTasks.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ===== TOKEN HELPERS =====
const getToken = () => localStorage.getItem("token");

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
});

const getUserIdFromToken = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const payloadBase64 = token.split(".")[1];
    const json = atob(payloadBase64);
    const payload = JSON.parse(json);

    return (
      payload.user_id ||
      payload.id ||
      payload.userId ||
      payload.sub ||
      null
    );
  } catch {
    return null;
  }
};

// normalize status text
const normalizeStatus = (s = "") =>
  typeof s === "string" ? s.toLowerCase().trim() : "";

// check QA failed
const isQAFailed = (t) =>
  normalizeStatus(t.status) === "qa_failed" || !!t.qa_issue;

export default function EmployeeTasks() {
  const [tasks, setTasks] = useState([]);

  const [issueModal, setIssueModal] = useState({
    open: false,
    issue: "",
    images: []
  });
  const [currentImage, setCurrentImage] = useState(0);

const nextImage = () => {
  setCurrentImage((prev) =>
    (prev + 1) % (issueModal.images?.length || 1)
  );
};

const prevImage = () => {
  setCurrentImage((prev) =>
    (prev - 1 + (issueModal.images?.length || 1)) %
    (issueModal.images?.length || 1)
  );
};


  // ===== FETCH TASKS =====
  useEffect(() => {
    const userId = getUserIdFromToken();
    if (!userId) return;

    fetch(`${API_BASE}/api/tasks/user/${userId}`, {
      headers: getAuthHeaders()
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setTasks([]);
          return;
        }

        const mapped = data.map((row) => ({
          id: row.task_id || row.id || row[0],
          task_name: row.task_name || row[1],
          status: row.status || row[2],
          due_date: row.due_date || row[3],
          project_title: row.project_title || row[4] || "—",
          qa_issue: row.qa_issue || row[5] || null,
          qa_images: row.qa_images || row[6] || []
        }));

        setTasks(mapped);
      })
      .catch(() => setTasks([]));
  }, []);

  // UI→API map
  const uiToApi = {
    todo: "TODO",
    in_progress: "IN_PROGRESS",
    completed_by_employee: "COMPLETED",
    qa_failed: "QA_FAILED",
    qa_passed: "QA_PASSED",
    in_qa_review: "IN_PROGRESS"
  };

  // ===== UPDATE STATUS =====
  const handleStatusChange = async (taskId, newStatus) => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert("User not found in token");
      return;
    }

    const apiStatus = uiToApi[newStatus];
    if (!apiStatus) {
      alert("Unsupported status");
      return;
    }

    const previous = [...tasks];

    // optimistic UI update
    setTasks((t) =>
      t.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      const formData = new FormData();
      formData.append("status", apiStatus);
      formData.append("user_id", userId);

      const res = await fetch(`${API_BASE}/api/tasks/${taskId}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: formData
      });

      if (!res.ok) {
        const text = await res.text();
        alert(`Server error ${res.status}: ${text}`);
        setTasks(previous);
      }
    } catch (err) {
      console.error(err);
      setTasks(previous);
    }
  };

  // ===== FILTER BUCKETS =====
  const todo = tasks.filter((t) =>
    ["todo", "qa_failed"].includes(normalizeStatus(t.status))
  );

  const inProgress = tasks.filter((t) =>
    ["in_progress", "in_qa_review"].includes(normalizeStatus(t.status))
  );

  const completed = tasks.filter(
    (t) => normalizeStatus(t.status) === "completed_by_employee"
  );

  return (
    <EmployeeLayout>
      <div className="employee-tasks-page">
        {/* <div className="et-container"> */}
          {/* <h2 className="et-heading">My Tasks</h2> */}
<h2
  className="et-heading"
  style={{ fontSize: "22px", fontWeight: 700 }}
>
  My Tasks
</h2>

          <div className="et-table-wrapper">
            <table className="et-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {/* ===== TODO ===== */}
                <tr>
                  <td colSpan="4" className="section-title todo">
                    To-Do
                  </td>
                </tr>

                {todo.length === 0 && (
                  <tr>
                    <td colSpan="4" className="empty">
                      No tasks
                    </td>
                  </tr>
                )}

                {todo.map((t) => (
                  <tr
                    key={t.id}
                    className={isQAFailed(t) ? "qa-failed-row" : ""}
                  >
                    <td>{t.task_name}</td>
                    <td>{t.project_title}</td>
                    <td>{t.due_date}</td>

                    <td className="status-cell">
                      <select
                        value={normalizeStatus(t.status)}
                        onChange={(e) =>
                          handleStatusChange(t.id, e.target.value)
                        }
                        className="status-select"
                      >
                        <option value="todo">To-Do</option>
                        <option value="in_progress">In-Progress</option>
                        <option value="completed_by_employee">
                          Mark Completed
                        </option>
                      </select>

                      {isQAFailed(t) && (
                        <button
                          className="view-issue-btn"
                       
                          onClick={() => {
  setIssueModal({
    open: true,
    issue: t.qa_issue,
    images: t.qa_images || []
  });
  setCurrentImage(0);
}}

                        >
                          View QA Issue
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {/* ===== IN PROGRESS ===== */}
                <tr>
                  <td colSpan="4" className="section-title progress">
                    In Progress
                  </td>
                </tr>

                {inProgress.length === 0 && (
                  <tr>
                    <td colSpan="4" className="empty">
                      No tasks
                    </td>
                  </tr>
                )}

                {inProgress.map((t) => (
                  <tr key={t.id}>
                    <td>{t.task_name}</td>
                    <td>{t.project_title}</td>
                    <td>{t.due_date}</td>
                    <td>
                      <select
                        value={normalizeStatus(t.status)}
                        onChange={(e) =>
                          handleStatusChange(t.id, e.target.value)
                        }
                        className="status-select"
                      >
                        <option value="todo">To-Do</option>
                        <option value="in_progress">In-Progress</option>
                        <option value="completed_by_employee">
                          Mark Completed
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}

                {/* ===== COMPLETED ===== */}
                <tr>
                  <td colSpan="4" className="section-title completed">
                    Completed (awaiting QA)
                  </td>
                </tr>

                {completed.length === 0 && (
                  <tr>
                    <td colSpan="4" className="empty">
                      No tasks
                    </td>
                  </tr>
                )}

                {completed.map((t) => (
                  <tr key={t.id} className="completed-row">
                    <td>{t.task_name}</td>
                    <td>{t.project_title}</td>
                    <td>{t.due_date}</td>
                    <td>Waiting for QA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== QA ISSUE POPUP ===== */}
        {issueModal.open && (
        <div
  className="popup-overlay"
  onClick={() => {
    setIssueModal({ open: false, issue: "", images: [] });
    setCurrentImage(0);
  }}
>

            <div
              className="popup-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* <h3>QA Issue</h3> */}
              <div className="popup-header">
  <h3>QA Issue</h3>

  <button
    className="popup-x-btn"
    onClick={() => {
      setIssueModal({ open: false, issue: "", images: [] });
      setCurrentImage(0);
    }}
  >
    ✕
  </button>
</div>


              <p className="popup-box">
                {issueModal.issue || "No description provided"}
              </p>

        
{issueModal.images?.length > 0 ? (
  <div className="slider-container">

    <button className="nav-btn" onClick={prevImage}>⟨</button>

    <img
      className="slider-image"
      src={
        issueModal.images[currentImage].startsWith("http")
          ? issueModal.images[currentImage]
          : `${API_BASE}/${issueModal.images[currentImage].replace(/\\/g, "/")}`
      }
      alt="QA evidence"
    />

    <button className="nav-btn" onClick={nextImage}>⟩</button>
  </div>
) : (
  <p className="popup-box">No images attached</p>
)}

            
            </div>
          </div>
        )}
      {/* </div> */}
    </EmployeeLayout>
  );
}
