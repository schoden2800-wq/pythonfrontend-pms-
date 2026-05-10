
// // // // import { useEffect, useState } from "react";
// // // // import QALayout from "../components/qacomponents/QALayout";
// // // // import "./QATaskReview.css";

// // // // export default function QATaskReview() {

// // // //   const [tasks, setTasks] = useState([]);
// // // //   const [view, setView] = useState("pending");

// // // //   // modal state
// // // //   const [showIssueModal, setShowIssueModal] = useState(false);
// // // //   const [selectedTaskId, setSelectedTaskId] = useState(null);
// // // //   const [issueText, setIssueText] = useState("");

// // // //   const token = localStorage.getItem("token");

// // // //   const getUserIdFromToken = () => {
// // // //     if (!token) return null;
// // // //     try {
// // // //       const payload = JSON.parse(atob(token.split(".")[1]));
// // // //       return payload.user_id;
// // // //     } catch {
// // // //       return null;
// // // //     }
// // // //   };

// // // //   const userId = getUserIdFromToken();

// // // //   // ========= FETCH LIST ==========
// // // //   useEffect(() => {
// // // //     if (!userId) return;

// // // //     const url =
// // // //       view === "pending"
// // // //         ? `http://127.0.0.1:8000/api/tasks/qa/tasks?user_id=${userId}`
// // // //         : `http://127.0.0.1:8000/api/tasks/qa/approved-tasks?user_id=${userId}`;

// // // //     fetch(url)
// // // //       .then(res => res.json())
// // // //       .then(data => setTasks(Array.isArray(data) ? data : []))
// // // //       .catch(() => setTasks([]));
// // // //   }, [userId, view]);

// // // //   // ========= APPROVE ==========
// // // //   const handleApprove = async (taskId) => {
// // // //     await fetch(
// // // //       `http://127.0.0.1:8000/api/tasks/${taskId}/status?status=QA_PASSED&user_id=${userId}`,
// // // //       { method: "PUT" }
// // // //     );

// // // //     // keep item but update status
// // // //     setTasks(prev =>
// // // //       prev.map(task =>
// // // //         task.task_id === taskId
// // // //           ? { ...task, status: "QA_PASSED" }
// // // //           : task
// // // //       )
// // // //     );
// // // //   };

// // // //   // ========= OPEN MODAL ==========
// // // //   const openRejectModal = (taskId) => {
// // // //     setSelectedTaskId(taskId);
// // // //     setIssueText("");
// // // //     setShowIssueModal(true);
// // // //   };

// // // //   // ========= REJECT WITH ISSUE (QUERY PARAM) ==========
// // // //   const submitReject = async () => {
// // // //     if (!issueText.trim()) return;

// // // //     await fetch(
// // // //       `http://127.0.0.1:8000/api/tasks/${selectedTaskId}/status` +
// // // //       `?status=QA_FAILED` +
// // // //       `&user_id=${userId}` +
// // // //       `&issue=${encodeURIComponent(issueText)}`,
// // // //       { method: "PUT" }
// // // //     );

// // // //     // remove from list after fail
// // // //     setTasks(tasks.filter(t => t.task_id !== selectedTaskId));

// // // //     setShowIssueModal(false);
// // // //     setSelectedTaskId(null);
// // // //     setIssueText("");
// // // //   };

// // // //   return (
// // // //     <QALayout>
// // // //       <div className="qa-review-page">

// // // //         {/* ---------- TOGGLE ---------- */}
// // // //         <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
// // // //           <button
// // // //             onClick={() => setView("pending")}
// // // //             className={view === "pending" ? "tab-active" : "tab"}
// // // //           >
// // // //             Pending Review
// // // //           </button>

// // // //           <button
// // // //             onClick={() => setView("approved")}
// // // //             className={view === "approved" ? "tab-active" : "tab"}
// // // //           >
// // // //             Approved Tasks
// // // //           </button>
// // // //         </div>

// // // //         <h2>
// // // //           {view === "pending" ? "Tasks Pending QA Review" : "QA Approved Tasks"}
// // // //         </h2>

// // // //         {tasks.length === 0 ? (
// // // //           <p>No tasks found.</p>
// // // //         ) : (
// // // //           <table className="qa-table">
// // // //             <thead>
// // // //               <tr>
// // // //                 <th>Task</th>
// // // //                 <th>Project</th>
// // // //                 <th>Completed By</th>
// // // //                 <th>Due Date</th>
// // // //                 <th>Status</th>
// // // //                 {view === "pending" && <th>Action</th>}
// // // //               </tr>
// // // //             </thead>

// // // //             <tbody>
// // // //               {tasks.map(task => (
// // // //                 <tr key={task.task_id}>
// // // //                   <td>{task.task_name}</td>
// // // //                   <td>{task.project_title}</td>
// // // //                   <td>{task.completed_by}</td>
// // // //                   <td>{task.due_date}</td>

// // // //                   <td>
// // // //                     <span className="status-badge">
// // // //                       {task.status.replace(/_/g, " ")}
// // // //                     </span>
// // // //                   </td>

// // // //                   {view === "pending" && (
// // // //                     <td>
// // // //                       <select
// // // //                         className="qa-select"
// // // //                         defaultValue=""
// // // //                         onChange={(e) => {
// // // //                           if (e.target.value === "approve") handleApprove(task.task_id);
// // // //                           if (e.target.value === "reject") openRejectModal(task.task_id);
// // // //                         }}
// // // //                       >
// // // //                         <option value="" disabled>Select Action</option>
// // // //                         <option value="approve">Approve</option>
// // // //                         <option value="reject">Reject</option>
// // // //                       </select>
// // // //                     </td>
// // // //                   )}
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         )}

// // // //         {/* ---------- ISSUE MODAL ---------- */}
// // // //         {showIssueModal && (
// // // //           <div className="modal-overlay">
// // // //             <div className="modal-box">
// // // //               <h3>Provide QA Issue</h3>

// // // //               <textarea
// // // //                 value={issueText}
// // // //                 onChange={(e) => setIssueText(e.target.value)}
// // // //                 placeholder="Describe the issue..."
// // // //                 rows={4}
// // // //               />

// // // //               <div className="modal-actions">
// // // //                 <button onClick={() => setShowIssueModal(false)}>Cancel</button>
// // // //                 <button onClick={submitReject}>Submit</button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //       </div>
// // // //     </QALayout>
// // // //   );
// // // // }
// // // import { useEffect, useState } from "react";
// // // import QALayout from "../components/qacomponents/QALayout";
// // // import "./QATaskReview.css";

// // // export default function QATaskReview() {

// // //   const [tasks, setTasks] = useState([]);
// // //   const [view, setView] = useState("pending");

// // //   // modal state
// // //   const [showIssueModal, setShowIssueModal] = useState(false);
// // //   const [selectedTaskId, setSelectedTaskId] = useState(null);
// // //   const [issueText, setIssueText] = useState("");
// // //   const [issueImage, setIssueImage] = useState(null);

// // //   const token = localStorage.getItem("token");

// // //   const getUserIdFromToken = () => {
// // //     if (!token) return null;
// // //     try {
// // //       const payload = JSON.parse(atob(token.split(".")[1]));
// // //       return payload.user_id;
// // //     } catch {
// // //       return null;
// // //     }
// // //   };

// // //   const userId = getUserIdFromToken();

// // //   // ========= FETCH LIST ==========
// // //   useEffect(() => {
// // //     if (!userId) return;

// // //     const url =
// // //       view === "pending"
// // //         ? `http://127.0.0.1:8000/api/tasks/qa/tasks?user_id=${userId}`
// // //         : `http://127.0.0.1:8000/api/tasks/qa/approved-tasks?user_id=${userId}`;

// // //     fetch(url)
// // //       .then(res => res.json())
// // //       .then(data => setTasks(Array.isArray(data) ? data : []))
// // //       .catch(() => setTasks([]));
// // //   }, [userId, view]);

// // //   // ========= APPROVE ==========
// // //   const handleApprove = async (taskId) => {
// // //     await fetch(
// // //       `http://127.0.0.1:8000/api/tasks/${taskId}/status?status=QA_PASSED&user_id=${userId}`,
// // //       { method: "PUT" }
// // //     );

// // //     setTasks(prev =>
// // //       prev.map(task =>
// // //         task.task_id === taskId
// // //           ? { ...task, status: "QA_PASSED" }
// // //           : task
// // //       )
// // //     );
// // //   };

// // //   // ========= OPEN MODAL ==========
// // //   const openRejectModal = (taskId) => {
// // //     setSelectedTaskId(taskId);
// // //     setIssueText("");
// // //     setIssueImage(null);
// // //     setShowIssueModal(true);
// // //   };

// // //   // ========= REJECT WITH TEXT + IMAGE ==========
// // //   const submitReject = async () => {
// // //     if (!issueText.trim()) return;

// // //     const formData = new FormData();
// // //     formData.append("status", "QA_FAILED");
// // //     formData.append("user_id", userId);
// // //     formData.append("issue", issueText);

// // //     if (issueImage) {
// // //       formData.append("image", issueImage);
// // //     }

// // //     await fetch(
// // //       `http://127.0.0.1:8000/api/tasks/${selectedTaskId}/status`,
// // //       {
// // //         method: "PUT",
// // //         body: formData
// // //       }
// // //     );

// // //     setTasks(tasks.filter(t => t.task_id !== selectedTaskId));
// // //     setShowIssueModal(false);
// // //     setSelectedTaskId(null);
// // //     setIssueText("");
// // //     setIssueImage(null);
// // //   };

// // //   return (
// // //     <QALayout>
// // //       <div className="qa-review-page">

// // //         {/* ---------- TOGGLE ---------- */}
// // //         <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
// // //           <button
// // //             onClick={() => setView("pending")}
// // //             className={view === "pending" ? "tab-active" : "tab"}
// // //           >
// // //             Pending Review
// // //           </button>

// // //           <button
// // //             onClick={() => setView("approved")}
// // //             className={view === "approved" ? "tab-active" : "tab"}
// // //           >
// // //             Approved Tasks
// // //           </button>
// // //         </div>

// // //         <h2>
// // //           {view === "pending" ? "Tasks Pending QA Review" : "QA Approved Tasks"}
// // //         </h2>

// // //         {tasks.length === 0 ? (
// // //           <p>No tasks found.</p>
// // //         ) : (
// // //           <table className="qa-table">
// // //             <thead>
// // //               <tr>
// // //                 <th>Task</th>
// // //                 <th>Project</th>
// // //                 <th>Completed By</th>
// // //                 <th>Due Date</th>
// // //                 <th>Status</th>
// // //                 {view === "pending" && <th>Action</th>}
// // //               </tr>
// // //             </thead>

// // //             <tbody>
// // //               {tasks.map(task => (
// // //                 <tr key={task.task_id}>
// // //                   <td>{task.task_name}</td>
// // //                   <td>{task.project_title}</td>
// // //                   <td>{task.completed_by}</td>
// // //                   <td>{task.due_date}</td>

// // //                   <td>
// // //                     <span className="status-badge">
// // //                       {task.status.replace(/_/g, " ")}
// // //                     </span>
// // //                   </td>

// // //                   {view === "pending" && (
// // //                     <td>
// // //                       <select
// // //                         className="qa-select"
// // //                         defaultValue=""
// // //                         onChange={(e) => {
// // //                           if (e.target.value === "approve") handleApprove(task.task_id);
// // //                           if (e.target.value === "reject") openRejectModal(task.task_id);
// // //                         }}
// // //                       >
// // //                         <option value="" disabled>Select Action</option>
// // //                         <option value="approve">Approve</option>
// // //                         <option value="reject">Reject</option>
// // //                       </select>
// // //                     </td>
// // //                   )}
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         )}

// // //         {/* ---------- ISSUE MODAL ---------- */}
// // //         {showIssueModal && (
// // //           <div className="modal-overlay">
// // //             <div className="modal-box">
// // //               <h3>Provide QA Issue</h3>

// // //               <textarea
// // //                 value={issueText}
// // //                 onChange={(e) => setIssueText(e.target.value)}
// // //                 placeholder="Describe the issue..."
// // //                 rows={4}
// // //               />

// // //               {/* image upload */}
// // //               <input
// // //                 type="file"
// // //                 accept="image/*"
// // //                 onChange={(e) => setIssueImage(e.target.files[0])}
// // //                 style={{ marginTop: "10px" }}
// // //               />

// // //               <div className="modal-actions">
// // //                 <button onClick={() => setShowIssueModal(false)}>Cancel</button>
// // //                 <button onClick={submitReject}>Submit</button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //       </div>
// // //     </QALayout>
// // //   );
// // // }
// // import { useEffect, useState } from "react";
// // import QALayout from "../components/qacomponents/QALayout";
// // import "./QATaskReview.css";

// // const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // export default function QATaskReview() {
// //   const [tasks, setTasks] = useState([]);
// //   const [view, setView] = useState("pending");

// //   // modal
// //   const [showIssueModal, setShowIssueModal] = useState(false);
// //   const [selectedTaskId, setSelectedTaskId] = useState(null);
// //   const [issueText, setIssueText] = useState("");
// //   const [issueImage, setIssueImage] = useState(null);

// //   const token = localStorage.getItem("token");

// //   const getUserIdFromToken = () => {
// //     if (!token) return null;
// //     try {
// //       const payload = JSON.parse(atob(token.split(".")[1]));
// //       return (
// //         payload.user_id ??
// //         payload.id ??
// //         payload.sub ??
// //         payload.userId ??
// //         null
// //       );
// //     } catch {
// //       return null;
// //     }
// //   };

// //   const userId = getUserIdFromToken();

// //   /* ========= FETCH LIST ========= */
// //   useEffect(() => {
// //     if (!userId) return;

// //     const url =
// //       view === "pending"
// //         ? `${API_BASE}/api/tasks/qa/tasks?user_id=${userId}`
// //         : `${API_BASE}/api/tasks/qa/approved-tasks?user_id=${userId}`;

// //     fetch(url, {
// //       headers: {
// //         Authorization: `Bearer ${token}`
// //       }
// //     })
// //       .then((res) => res.json())
// //       .then((data) => setTasks(Array.isArray(data) ? data : []))
// //       .catch(() => setTasks([]));
// //   }, [userId, view, token]);

// //   /* ========= APPROVE ========= */
// //   const handleApprove = async (taskId) => {
// //     const formData = new FormData();
// //     formData.append("status", "QA_PASSED");
// //     formData.append("user_id", userId);

// //     const res = await fetch(
// //       `${API_BASE}/api/tasks/${taskId}/status`,
// //       {
// //         method: "PUT",
// //         headers: {
// //           Authorization: `Bearer ${token}`
// //           // DO NOT set Content-Type -> FormData sets boundary automatically
// //         },
// //         body: formData
// //       }
// //     );

// //     if (!res.ok) {
// //       alert("Failed to approve task");
// //       return;
// //     }

// //     setTasks((prev) =>
// //       prev.map((task) =>
// //         task.task_id === taskId
// //           ? { ...task, status: "QA_PASSED" }
// //           : task
// //       )
// //     );
// //   };

// //   /* ========= OPEN REJECT MODAL ========= */
// //   const openRejectModal = (taskId) => {
// //     setSelectedTaskId(taskId);
// //     setIssueText("");
// //     setIssueImage(null);
// //     setShowIssueModal(true);
// //   };

// //   /* ========= REJECT WITH ISSUE ========= */
// //   const submitReject = async () => {
// //     if (!issueText.trim()) {
// //       alert("Please enter issue description");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("status", "QA_FAILED");
// //     formData.append("user_id", userId);
// //     formData.append("issue", issueText);

// //     if (issueImage) {
// //       formData.append("image", issueImage);
// //     }

// //     const res = await fetch(
// //       `${API_BASE}/api/tasks/${selectedTaskId}/status`,
// //       {
// //         method: "PUT",
// //         headers: {
// //           Authorization: `Bearer ${token}`
// //         },
// //         body: formData
// //       }
// //     );

// //     if (!res.ok) {
// //       alert("Reject failed");
// //       return;
// //     }

// //     // remove from pending list
// //     setTasks((prev) =>
// //       prev.filter((t) => t.task_id !== selectedTaskId)
// //     );

// //     setShowIssueModal(false);
// //     setSelectedTaskId(null);
// //     setIssueText("");
// //     setIssueImage(null);
// //   };

// //   return (
// //     <QALayout>
// //       <div className="qa-review-page">
// //         {/* ---------- TOGGLE ---------- */}
// //         <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
// //           <button
// //             onClick={() => setView("pending")}
// //             className={view === "pending" ? "tab-active" : "tab"}
// //           >
// //             Pending Review
// //           </button>

// //           <button
// //             onClick={() => setView("approved")}
// //             className={view === "approved" ? "tab-active" : "tab"}
// //           >
// //             Approved Tasks
// //           </button>
// //         </div>

// //         <h2>
// //           {view === "pending"
// //             ? "Tasks Pending QA Review"
// //             : "QA Approved Tasks"}
// //         </h2>

// //         {tasks.length === 0 ? (
// //           <p>No tasks found.</p>
// //         ) : (
// //           <table className="qa-table">
// //             <thead>
// //               <tr>
// //                 <th>Task</th>
// //                 <th>Project</th>
// //                 <th>Completed By</th>
// //                 <th>Due Date</th>
// //                 <th>Status</th>
// //                 {view === "pending" && <th>Action</th>}
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {tasks.map((task) => (
// //                 <tr key={task.task_id}>
// //                   <td>{task.task_name}</td>
// //                   <td>{task.project_title}</td>
// //                   <td>{task.completed_by}</td>
// //                   <td>{task.due_date}</td>

// //                   <td>
// //                     <span className="status-badge">
// //                       {task.status?.replace(/_/g, " ")}
// //                     </span>
// //                   </td>

// //                   {view === "pending" && (
// //                     <td>
// //                       <select
// //                         className="qa-select"
// //                         defaultValue=""
// //                         onChange={(e) => {
// //                           if (e.target.value === "approve")
// //                             handleApprove(task.task_id);
// //                           if (e.target.value === "reject")
// //                             openRejectModal(task.task_id);
// //                         }}
// //                       >
// //                         <option value="" disabled>
// //                           Select Action
// //                         </option>
// //                         <option value="approve">Approve</option>
// //                         <option value="reject">Reject</option>
// //                       </select>
// //                     </td>
// //                   )}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}

// //         {/* ---------- ISSUE MODAL ---------- */}
// //         {showIssueModal && (
// //           <div className="modal-overlay">
// //             <div className="modal-box">
// //               <h3>Provide QA Issue</h3>

// //               <textarea
// //                 value={issueText}
// //                 onChange={(e) => setIssueText(e.target.value)}
// //                 placeholder="Describe the issue..."
// //                 rows={4}
// //               />

// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={(e) => setIssueImage(e.target.files[0])}
// //                 style={{ marginTop: "10px" }}
// //               />

// //               <div className="modal-actions">
// //                 <button onClick={() => setShowIssueModal(false)}>
// //                   Cancel
// //                 </button>
// //                 <button onClick={submitReject}>Submit</button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </QALayout>
// //   );
// // }
// import { useEffect, useState } from "react";
// import QALayout from "../components/qacomponents/QALayout";
// import "./QATaskReview.css";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// export default function QATaskReview() {
//   const [tasks, setTasks] = useState([]);
//   const [view, setView] = useState("pending");

//   // modal
//   const [showIssueModal, setShowIssueModal] = useState(false);
//   const [selectedTaskId, setSelectedTaskId] = useState(null);
//   const [issueText, setIssueText] = useState("");
//   const [issueImages, setIssueImages] = useState([]);   // <-- MULTIPLE FILES

//   const token = localStorage.getItem("token");

//   const getUserIdFromToken = () => {
//     if (!token) return null;
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       return (
//         payload.user_id ?? payload.id ?? payload.sub ?? payload.userId ?? null
//       );
//     } catch {
//       return null;
//     }
//   };

//   const userId = getUserIdFromToken();

//   /* ========= FETCH LIST ========= */
//   useEffect(() => {
//     if (!userId) return;

//     const url =
//       view === "pending"
//         ? `${API_BASE}/api/tasks/qa/tasks?user_id=${userId}`
//         : `${API_BASE}/api/tasks/qa/approved-tasks?user_id=${userId}`;

//     fetch(url, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then((res) => res.json())
//       .then((data) => setTasks(Array.isArray(data) ? data : []))
//       .catch(() => setTasks([]));
//   }, [userId, view, token]);

//   /* ========= APPROVE ========= */
//   const handleApprove = async (taskId) => {
//     const formData = new FormData();
//     formData.append("status", "QA_PASSED");
//     formData.append("user_id", userId);

//     const res = await fetch(`${API_BASE}/api/tasks/${taskId}/status`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//       body: formData
//     });

//     if (!res.ok) {
//       alert("Failed to approve task");
//       return;
//     }

//     setTasks((prev) =>
//       prev.map((task) =>
//         task.task_id === taskId ? { ...task, status: "QA_PASSED" } : task
//       )
//     );
//   };

//   /* ========= OPEN REJECT MODAL ========= */
//   const openRejectModal = (taskId) => {
//     setSelectedTaskId(taskId);
//     setIssueText("");
//     setIssueImages([]);
//     setShowIssueModal(true);
//   };

//   /* ========= REJECT WITH ISSUE + MULTIPLE IMAGES ========= */
//   const submitReject = async () => {
//     if (!issueText.trim()) {
//       alert("Please enter issue description");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("status", "QA_FAILED");
//     formData.append("user_id", userId);
//     formData.append("issue", issueText);

//     // append ALL files using correct field name "images"
//     if (issueImages && issueImages.length > 0) {
//       for (let i = 0; i < issueImages.length; i++) {
//         formData.append("images", issueImages[i]);
//       }
//     }

//     const res = await fetch(
//       `${API_BASE}/api/tasks/${selectedTaskId}/status`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formData
//       }
//     );

//     if (!res.ok) {
//       alert("Reject failed");
//       return;
//     }

//     // remove from pending list
//     setTasks((prev) => prev.filter((t) => t.task_id !== selectedTaskId));

//     setShowIssueModal(false);
//     setSelectedTaskId(null);
//     setIssueText("");
//     setIssueImages([]);
//   };

//   return (
//     <QALayout>
//       <div className="qa-review-page">
//         {/* ---------- TOGGLE ---------- */}
//         <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
//           <button
//             onClick={() => setView("pending")}
//             className={view === "pending" ? "tab-active" : "tab"}
//           >
//             Pending Review
//           </button>

//           <button
//             onClick={() => setView("approved")}
//             className={view === "approved" ? "tab-active" : "tab"}
//           >
//             Approved Tasks
//           </button>
//         </div>

//         <h2>
//           {view === "pending"
//             ? "Tasks Pending QA Review"
//             : "QA Approved Tasks"}
//         </h2>

//         {tasks.length === 0 ? (
//           <p>No tasks found.</p>
//         ) : (
//           <table className="qa-table">
//             <thead>
//               <tr>
//                 <th>Task</th>
//                 <th>Project</th>
//                 <th>Completed By</th>
//                 <th>Due Date</th>
//                 <th>Status</th>
//                 {view === "pending" && <th>Action</th>}
//               </tr>
//             </thead>

//             <tbody>
//               {tasks.map((task) => (
//                 <tr key={task.task_id}>
//                   <td>{task.task_name}</td>
//                   <td>{task.project_title}</td>
//                   <td>{task.completed_by}</td>
//                   <td>{task.due_date}</td>

//                   <td>
//                     <span className="status-badge">
//                       {task.status?.replace(/_/g, " ")}
//                     </span>
//                   </td>

//                   {view === "pending" && (
//                     <td>
//                       <select
//                         className="qa-select"
//                         defaultValue=""
//                         onChange={(e) => {
//                           if (e.target.value === "approve")
//                             handleApprove(task.task_id);
//                           if (e.target.value === "reject")
//                             openRejectModal(task.task_id);
//                         }}
//                       >
//                         <option value="" disabled>
//                           Select Action
//                         </option>
//                         <option value="approve">Approve</option>
//                         <option value="reject">Reject</option>
//                       </select>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {/* ---------- ISSUE MODAL ---------- */}
//         {showIssueModal && (
//           <div className="modal-overlay">
//             <div className="modal-box">
//               <h3>Provide QA Issue</h3>

//               <textarea
//                 value={issueText}
//                 onChange={(e) => setIssueText(e.target.value)}
//                 placeholder="Describe the issue..."
//                 rows={4}
//               />

//               {/* MULTIPLE IMAGE UPLOAD */}
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={(e) => setIssueImages(e.target.files)}
//                 style={{ marginTop: "10px" }}
//               />

//               <div className="modal-actions">
//                 <button onClick={() => setShowIssueModal(false)}>
//                   Cancel
//                 </button>
//                 <button onClick={submitReject}>Submit</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </QALayout>
//   );
// }
import { useEffect, useState } from "react";
import QALayout from "../components/qacomponents/QALayout";
import "./QATaskReview.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function QATaskReview() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("pending");

  // modal
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [issueText, setIssueText] = useState("");
  const [issueImages, setIssueImages] = useState([]);

  const token = localStorage.getItem("token");

  /* -------- decode user id from JWT -------- */
  const getUserIdFromToken = () => {
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return (
        payload.user_id ??
        payload.id ??
        payload.sub ??
        payload.userId ??
        null
      );
    } catch {
      return null;
    }
  };

  const userId = getUserIdFromToken();

  /* ========= FETCH LIST ========= */
  useEffect(() => {
    if (!userId || !token) return;

    const url =
      view === "pending"
        ? `${API_BASE}/api/tasks/qa/tasks?user_id=${userId}`
        : `${API_BASE}/api/tasks/qa/approved-tasks?user_id=${userId}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setTasks(Array.isArray(data) ? data : []))
      .catch(() => setTasks([]));
  }, [userId, view, token]);

  /* ========= APPROVE ========= */
  const handleApprove = async (taskId) => {
    if (!token) return alert("Not authenticated");

    const formData = new FormData();
    formData.append("status", "QA_PASSED");
    formData.append("user_id", userId);

    const res = await fetch(`${API_BASE}/api/tasks/${taskId}/status`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (!res.ok) {
      alert("Failed to approve task");
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.task_id === taskId ? { ...task, status: "QA_PASSED" } : task
      )
    );
  };

  /* ========= OPEN REJECT MODAL ========= */
  const openRejectModal = (taskId) => {
    setSelectedTaskId(taskId);
    setIssueText("");
    setIssueImages([]);
    setShowIssueModal(true);
  };

  /* ========= REJECT WITH ISSUE + MULTIPLE IMAGES ========= */
  const submitReject = async () => {
    if (!issueText.trim()) {
      alert("Please enter issue description");
      return;
    }

    const formData = new FormData();
    formData.append("status", "QA_FAILED");
    formData.append("user_id", userId);
    formData.append("issue", issueText);

    // append ALL images exactly as backend expects
    if (issueImages && issueImages.length > 0) {
      for (let i = 0; i < issueImages.length; i++) {
        formData.append("images", issueImages[i]);
      }
    }

    const res = await fetch(
      `${API_BASE}/api/tasks/${selectedTaskId}/status`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    );

    if (!res.ok) {
      alert("Reject failed");
      return;
    }

    // remove task from pending
    setTasks((prev) =>
      prev.filter((t) => t.task_id !== selectedTaskId)
    );

    // reset modal state
    setShowIssueModal(false);
    setSelectedTaskId(null);
    setIssueText("");
    setIssueImages([]);
  };

  return (
    <QALayout>
      <div className="qa-review-page">

        {/* ---------- TOGGLE ---------- */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          <button
            onClick={() => setView("pending")}
            className={view === "pending" ? "tab-active" : "tab"}
          >
            Pending Review
          </button>

          <button
            onClick={() => setView("approved")}
            className={view === "approved" ? "tab-active" : "tab"}
          >
            Approved Tasks
          </button>
        </div>

        <h2>
          {view === "pending" ? "Tasks Pending QA Review" : "QA Approved Tasks"}
        </h2>

        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <table className="qa-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Project</th>
                <th>Completed By</th>
                <th>Due Date</th>
                <th>Status</th>
                {view === "pending" && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.task_id}>
                  <td>{task.task_name}</td>
                  <td>{task.project_title}</td>
                  <td>{task.completed_by}</td>
                  <td>{task.due_date}</td>

                  <td>
                    <span className="status-badge">
                      {task.status?.replace(/_/g, " ")}
                    </span>
                  </td>

                  {view === "pending" && (
                    <td>
                      <select
                        className="qa-select"
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value === "approve")
                            handleApprove(task.task_id);
                          if (e.target.value === "reject")
                            openRejectModal(task.task_id);
                        }}
                      >
                        <option value="" disabled>
                          Select Action
                        </option>
                        <option value="approve">Approve</option>
                        <option value="reject">Reject</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ---------- ISSUE MODAL ---------- */}
        {showIssueModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Provide QA Issue</h3>

              <textarea
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
                placeholder="Describe the issue..."
                rows={4}
              />

              {/* MULTIPLE IMAGE UPLOAD */}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setIssueImages(e.target.files)}
                style={{ marginTop: "10px" }}
              />

              <div className="modal-actions">
                <button onClick={() => setShowIssueModal(false)}>
                  Cancel
                </button>
                <button onClick={submitReject}>Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </QALayout>
  );
}
