
// // import { useEffect, useState, useRef } from "react";
// // import AdminLayout from "../components/AdminLayout";
// // import "./AdminProjects.css";
// // import { useNavigate } from "react-router-dom";

// // const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // //  DO NOT set Content-Type for FormData
// // const getAuthHeaders = () => {
// //   const token = localStorage.getItem("token");
// //   return {
// //     Authorization: `Bearer ${token}`,
// //   };
// // };

// // export default function AdminProjects() {
// //   const [projects, setProjects] = useState([]);
// //   const [employees, setEmployees] = useState([]);
// //   const [showAddModal, setShowAddModal] = useState(false);

// //   const [form, setForm] = useState({
// //     title: "",
// //     description: "",
// //     assigned_employees: [],
// //     start_date: "",
// //     end_date: "",
// //     status: "active",
// //     priority: "medium",
// //     client_name: "",
// //   });

// //   const [file, setFile] = useState(null);
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const dropdownRef = useRef();
// //   const navigate = useNavigate();

// //   /* ================= FETCH PROJECTS ================= */
// //   const fetchProjects = async () => {
// //     try {
// //       const res = await fetch(`${API_BASE}/api/projects`, {
// //         headers: getAuthHeaders(),
// //       });
// //       const data = await res.json();

// //       const formatted = Array.isArray(data)
// //         ? data.map((p) => ({
// //             id: p[0],
// //             title: p[1],
// //             description: p[2],
// //             start_date: p[3],
// //             end_date: p[4],
// //             status: p[5],
// //             priority: p[6],
// //             client: p[7],
// //             file_path: p[8],
// //             created_by: p[10],
// //             assigned_to: p[11],
// //           }))
// //         : [];

// //       setProjects(formatted);
// //     } catch {
// //       setProjects([]);
// //     }
// //   };

// //   /* ================= FETCH EMPLOYEES ================= */
// //   const fetchEmployees = async () => {
// //     try {
// //       const res = await fetch(`${API_BASE}/api/admin/employees`, {
// //         headers: getAuthHeaders(),
// //       });
// //       const data = await res.json();
// //       setEmployees(Array.isArray(data) ? data : []);
// //     } catch {
// //       setEmployees([]);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProjects();
// //     fetchEmployees();
// //   }, []);

// //   /* ================= MULTI-SELECT HANDLERS ================= */
// //   const toggleEmployee = (id) => {
// //     if (form.assigned_employees.includes(id)) {
// //       setForm({
// //         ...form,
// //         assigned_employees: form.assigned_employees.filter((e) => e !== id),
// //       });
// //     } else {
// //       setForm({
// //         ...form,
// //         assigned_employees: [...form.assigned_employees, id],
// //       });
// //     }
// //   };

// //   const removeEmployee = (id) => {
// //     setForm({
// //       ...form,
// //       assigned_employees: form.assigned_employees.filter((e) => e !== id),
// //     });
// //   };

// //   const handleClickOutside = (e) => {
// //     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
// //       setDropdownOpen(false);
// //     }
// //   };

// //   useEffect(() => {
// //     document.addEventListener("click", handleClickOutside);
// //     return () => document.removeEventListener("click", handleClickOutside);
// //   }, []);

// //   /* ================= CREATE PROJECT ================= */
// //   const createProject = async () => {
// //     const payload = {
// //       title: form.title,
// //       description: form.description,
// //       assigned_employees: form.assigned_employees,
// //       created_by: 1, // replace with JWT user ID
// //       start_date: form.start_date,
// //       end_date: form.end_date,
// //       status: form.status,
// //       priority: form.priority,
// //       client_name: form.client_name || null,
// //     };

// //     const formData = new FormData();
// //     formData.append("project", JSON.stringify(payload));
// //     if (file) formData.append("document", file);

// //     const res = await fetch(`${API_BASE}/api/projects`, {
// //       method: "POST",
// //       headers: getAuthHeaders(),
// //       body: formData,
// //     });

// //     if (!res.ok) {
// //       alert("Failed to create project");
// //       return;
// //     }

// //     setShowAddModal(false);
// //     fetchProjects();
// //     setForm({
// //       title: "",
// //       description: "",
// //       assigned_employees: [],
// //       start_date: "",
// //       end_date: "",
// //       status: "active",
// //       priority: "medium",
// //       client_name: "",
// //     });
// //     setFile(null);
// //   };

// //   return (
// //     <AdminLayout>
// //       <div className="projects-page-card">
// //         <div className="projects-header">
// //           <h2>Projects</h2>
// //           <button
// //             className="add-project-btn"
// //             onClick={() => setShowAddModal(true)}
// //           >
// //             + Add Project
// //           </button>
// //         </div>

// //         <div className="projects-table-wrapper">
// //           <table className="projects-table">
// //             <thead>
// //               <tr>
// //                 <th>Title</th>
// //                 <th>Client</th>
// //                 <th>Status</th>
// //                 <th>Priority</th>
// //                 <th>Start</th>
// //                 <th>End</th>
// //                 <th>Action</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {projects.length === 0 && (
// //                 <tr>
// //                   <td colSpan="7">No projects found</td>
// //                 </tr>
// //               )}

// //               {projects
// //   .sort((a, b) => b.id - a.id)
// //   .map((p) => (

// //                 <tr key={p.id}>
// //                   <td>{p.title}</td>
// //                   <td>{p.client || "-"}</td>
// //                   <td>{p.status}</td>
// //                   <td>{p.priority}</td>
// //                   <td>{p.start_date}</td>
// //                   <td>{p.end_date}</td>
// //                   <td>
// //                     <button
// //                       className="edit-btn"
// //                       onClick={() => navigate(`/admin/projects/${p.id}`)}
// //                     >
// //                       View
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* ================= ADD PROJECT MODAL ================= */}
// //       {showAddModal && (
// //         <div className="modal-overlay">
// //           <div className="modal-card">
// //             <h3>Add Project</h3>

// //             <input
// //               placeholder="Project title"
// //               value={form.title}
// //               onChange={(e) => setForm({ ...form, title: e.target.value })}
// //             />

// //             <textarea
// //               placeholder="Description"
// //               value={form.description}
// //               onChange={(e) =>
// //                 setForm({ ...form, description: e.target.value })
// //               }
// //             />

// //             <input
// //               placeholder="Client name"
// //               value={form.client_name}
// //               onChange={(e) =>
// //                 setForm({ ...form, client_name: e.target.value })
// //               }
// //             />

// //             {/* ========== CUSTOM MULTI-SELECT ========== */}
// // {/* <div className="employee-dropdown" ref={dropdownRef}>
// //   <div
// //     className="dropdown-selected"
// //     onClick={() => setDropdownOpen(!dropdownOpen)}
// //   >
// //     {form.assigned_employees.length
// //       ? form.assigned_employees
// //           .map((id) => employees.find((e) => e.id === id)?.name)
// //           .join(", ")
// //       : "Select Employee"}
// //   </div>

// //   {dropdownOpen && (
// //     <div className="dropdown-menu">

// //       {employees.map((emp) => (
// //         <div
// //           key={emp.id}
// //           className="dropdown-item"
// //           onClick={() => toggleEmployee(emp.id)}
// //         >
// //           <input
// //             type="checkbox"
// //             checked={form.assigned_employees.includes(emp.id)}
// //             readOnly
// //           />

// //           <span className="emp-name-only">
// //             {emp.name}
// //           </span>
// //         </div>
// //       ))}

// //     </div>
// //   )}
// // </div> */}
// // {/* ========== CUSTOM MULTI-SELECT ========== */}
// // <div className="employee-dropdown" ref={dropdownRef}>
// //   <div
// //     className="dropdown-selected"
// //     onClick={() => setDropdownOpen(!dropdownOpen)}
// //   >
// //     {form.assigned_employees.length
// //       ? form.assigned_employees
// //           .map((id) => employees.find((e) => e.id === id)?.name)
// //           .join(", ")
// //       : "Select Employee"}
// //   </div>

// //   {dropdownOpen && (
// //     <div className="dropdown-menu">
// //       {employees.map((emp) => (
// //         <label
// //           key={emp.id}
// //           className="dropdown-item"
// //         >
// //           <input
// //             type="checkbox"
// //             checked={form.assigned_employees.includes(emp.id)}
// //             onChange={() => toggleEmployee(emp.id)}
// //           />

// //           <span className="emp-name-only">
// //             {emp.name}
// //           </span>
// //         </label>
// //       ))}
// //     </div>
// //   )}
// // </div>


// //             {/* ================= SELECTED EMPLOYEES CHIPS ================= */}
// //             <div className="selected-employees">
// //               {form.assigned_employees.map((id) => {
// //                 const emp = employees.find((e) => e.id === id);
// //                 return (
// //                   <span key={id} className="employee-chip">
// //                     {emp?.name}
// //                     <button onClick={() => removeEmployee(id)}>×</button>
// //                   </span>
// //                 );
// //               })}
// //             </div>

// //             <div className="row">
// //               <input
// //                 type="date"
// //                 value={form.start_date}
// //                 onChange={(e) =>
// //                   setForm({ ...form, start_date: e.target.value })
// //                 }
// //               />
// //               <input
// //                 type="date"
// //                 value={form.end_date}
// //                 onChange={(e) =>
// //                   setForm({ ...form, end_date: e.target.value })
// //                 }
// //               />
// //             </div>

// //             <div className="row">
// //               {/* <select
// //                 value={form.status}
// //                 onChange={(e) => setForm({ ...form, status: e.target.value })}
// //               >
// //                 <option value="active">Active</option>
// //                 <option value="completed">Completed</option>
// //                 <option value="on-hold">On Hold</option>
// //               </select> */}
// //               <select
// //               value={form.status}
// //               onChange={(e) => setForm({ ...form, status: e.target.value })}
// //             >
// //               <option value="not_started">Not Started</option>
// //               <option value="in_progress">In Progress</option>
// //               <option value="completed">Completed</option>
// //             </select>


// //               <select
// //                 value={form.priority}
// //                 onChange={(e) =>
// //                   setForm({ ...form, priority: e.target.value })
// //                 }
// //               >
// //                 <option value="low">Low</option>
// //                 <option value="medium">Medium</option>
// //                 <option value="high">High</option>
// //               </select>
// //             </div>

// //             <input
// //               type="file"
// //               onChange={(e) => setFile(e.target.files[0])}
// //             />

// //             <div className="modal-actions">
// //               <button className="edit-btn" onClick={createProject}>
// //                 Create
// //               </button>
// //               <button
// //                 className="delete-btn"
// //                 onClick={() => setShowAddModal(false)}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </AdminLayout>
// //   );
// // }
// import { useEffect, useState, useRef } from "react";
// import AdminLayout from "../components/AdminLayout";
// import "./AdminProjects.css";
// import { useNavigate } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   return { Authorization: `Bearer ${token}` };
// };

// export default function AdminProjects() {
//   const [projects, setProjects] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     assigned_employees: [],
//     start_date: "",
//     end_date: "",
//     priority: "medium",
//     client_name: "",
//   });

//   const [file, setFile] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef();

//   const navigate = useNavigate();

//   /* ---------- fetch projects ---------- */
//   const fetchProjects = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/api/projects`, {
//         headers: getAuthHeaders(),
//       });
//       const data = await res.json();

//       const formatted = Array.isArray(data)
//         ? data.map((p) => ({
//             id: p[0],
//             title: p[1],
//             description: p[2],
//             start_date: p[3],
//             end_date: p[4],
//             status: p[5],
//             priority: p[6],
//             client: p[7],
//           }))
//         : [];

//       setProjects(formatted);
//     } catch {
//       setProjects([]);
//     }
//   };

//   /* ---------- fetch employees ---------- */
//   const fetchEmployees = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/api/admin/employees`, {
//         headers: getAuthHeaders(),
//       });
//       const data = await res.json();
//       setEmployees(Array.isArray(data) ? data : []);
//     } catch {
//       setEmployees([]);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//     fetchEmployees();
//   }, []);

//   /* ---------- dropdown click outside ---------- */
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   /* ---------- employee toggle ---------- */
//   const toggleEmployee = (id) => {
//     setForm((prev) => ({
//       ...prev,
//       assigned_employees: prev.assigned_employees.includes(id)
//         ? prev.assigned_employees.filter((e) => e !== id)
//         : [...prev.assigned_employees, id],
//     }));
//   };

//   const removeEmployee = (id) => {
//     setForm((prev) => ({
//       ...prev,
//       assigned_employees: prev.assigned_employees.filter((e) => e !== id),
//     }));
//   };

//   /* ---------- validation ---------- */
//   const validate = () => {
//     const e = {};

//     if (!form.title.trim()) e.title = "Project title is required";
//     if (!form.description.trim()) e.description = "Description is required";
//     if (!form.start_date) e.start_date = "Start date is required";
//     if (!form.end_date) e.end_date = "End date is required";

//     if (
//       form.start_date &&
//       form.end_date &&
//       new Date(form.end_date) < new Date(form.start_date)
//     )
//       e.date = "End date cannot be earlier than start date";

//     if (!form.assigned_employees.length)
//       e.assigned_employees = "Select at least one employee";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   /* ---------- create project ---------- */
//   const createProject = async () => {
//     if (!validate()) return;

//     const payload = {
//       title: form.title,
//       description: form.description,
//       assigned_employees: form.assigned_employees,
//       created_by: 1,
//       start_date: form.start_date,
//       end_date: form.end_date,
//       priority: form.priority,
//       client_name: form.client_name || null,
//     };

//     const fd = new FormData();
//     fd.append("project", JSON.stringify(payload));
//     if (file) fd.append("document", file);

//     const res = await fetch(`${API_BASE}/api/projects`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: fd,
//     });

//     if (!res.ok) {
//       alert("Failed to create project");
//       return;
//     }

//     fetchProjects();
//     setShowAddModal(false);
//     setForm({
//       title: "",
//       description: "",
//       assigned_employees: [],
//       start_date: "",
//       end_date: "",
//       priority: "medium",
//       client_name: "",
//     });
//     setFile(null);
//   };

//   return (
//     <AdminLayout>
//       <div className="projects-page-card">
//         <div className="projects-header">
//           <h2>Projects</h2>
//           <button className="add-project-btn" onClick={() => setShowAddModal(true)}>
//             + Add Project
//           </button>
//         </div>

//         <div className="projects-table-wrapper">
//           <table className="projects-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Client</th>
//                 <th>Status</th>
//                 <th>Priority</th>
//                 <th>Start</th>
//                 <th>End</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {projects.length === 0 && (
//                 <tr>
//                   <td colSpan={7}>No projects found</td>
//                 </tr>
//               )}

//               {projects
//                 .sort((a, b) => b.id - a.id)
//                 .map((p) => (
//                   <tr key={p.id}>
//                     <td>{p.title}</td>
//                     <td>{p.client || "-"}</td>
//                     <td>{p.status}</td>
//                     <td>{p.priority}</td>
//                     <td>{p.start_date}</td>
//                     <td>{p.end_date}</td>
//                     <td>
//                       <button
//                         className="edit-btn"
//                         onClick={() => navigate(`/admin/projects/${p.id}`)}
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showAddModal && (
//         <div className="modal-overlay">
//           <div className="modal-card">
//             <h3>Add Project</h3>

//             <label>Project Title</label>
//             <input
//               placeholder="Enter project name"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />
//             {errors.title && <p className="error">{errors.title}</p>}

//             <label>Description</label>
//             <textarea
//               placeholder="Project goals, scope, deliverables…"
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//             />
//             {errors.description && <p className="error">{errors.description}</p>}

//             <label>Client Name (optional)</label>
//             <input
//               placeholder="Client company or person"
//               value={form.client_name}
//               onChange={(e) =>
//                 setForm({ ...form, client_name: e.target.value })
//               }
//             />

//             <label>Assign Employees</label>
//             <div className="employee-dropdown" ref={dropdownRef}>
//               {/* <div
//                 className="dropdown-selected"
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//               >
//                 {form.assigned_employees.length
//                   ? form.assigned_employees
//                       .map((id) => employees.find((e) => e.id === id)?.name)
//                       .join(", ")
//                   : "Select employee(s)"}
//               </div> */}
// <div
//   className="dropdown-selected"
//   onClick={() => setDropdownOpen(!dropdownOpen)}
// >
//   {form.assigned_employees.length
//     ? form.assigned_employees
//         .map((id) => employees.find((e) => e.id === id)?.name)
//         .join(", ")
//     : "Select employee(s)"}
// </div>

//               {dropdownOpen && (
//                 <div className="dropdown-menu">
//                   {employees.map((emp) => (
//                     <label key={emp.id} className="dropdown-item">
//                       <input
//                         type="checkbox"
//                         checked={form.assigned_employees.includes(emp.id)}
//                         onChange={() => toggleEmployee(emp.id)}
//                       />
//                       <span>{emp.name}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {errors.assigned_employees && (
//               <p className="error">{errors.assigned_employees}</p>
//             )}

//             {/* <div className="selected-employees">
//               {form.assigned_employees.map((id) => {
//                 const emp = employees.find((e) => e.id === id);
//                 return (
//                   <span key={id} className="employee-chip">
//                     {emp?.name}
//                     <button onClick={() => removeEmployee(id)}>×</button>
//                   </span>
//                 );
//               })}
//             </div> */}

//             <div className="row">
//               <div className="field">
//                 <label>Start Date</label>
//                 <input
//                   type="date"
//                   value={form.start_date}
//                   onChange={(e) =>
//                     setForm({ ...form, start_date: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="field">
//                 <label>End Date</label>
//                 <input
//                   type="date"
//                   value={form.end_date}
//                   onChange={(e) =>
//                     setForm({ ...form, end_date: e.target.value })
//                   }
//                 />
//               </div>
//             </div>
//             {errors.date && <p className="error">{errors.date}</p>}

//             <label>Priority</label>
//             <select
//               value={form.priority}
//               onChange={(e) =>
//                 setForm({ ...form, priority: e.target.value })
//               }
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>

//             <label>Attach Document (optional)</label>
//             <input
//               type="file"
//               onChange={(e) => setFile(e.target.files[0])}
//             />

//             <div className="modal-actions">
//               <button className="edit-btn" onClick={createProject}>
//                 Create Project
//               </button>
//               <button
//                 className="delete-btn"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </AdminLayout>
//   );
// }
import { useEffect, useState, useRef } from "react";
import AdminLayout from "../components/AdminLayout";
import "./AdminProjects.css";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // ⭐ NEW
  const [activeTab, setActiveTab] = useState("ongoing");

  const [form, setForm] = useState({
    title: "",
    description: "",
    assigned_employees: [],
    start_date: "",
    end_date: "",
    priority: "medium",
    client_name: "",
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();

      const formatted = Array.isArray(data)
        ? data.map((p) => ({
            id: p[0],
            title: p[1],
            description: p[2],
            start_date: p[3],
            end_date: p[4],
            status: p[5],
            priority: p[6],
            client: p[7],
          }))
        : [];

      setProjects(formatted);
    } catch {
      setProjects([]);
    }
  };

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

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleEmployee = (id) => {
    setForm((prev) => ({
      ...prev,
      assigned_employees: prev.assigned_employees.includes(id)
        ? prev.assigned_employees.filter((e) => e !== id)
        : [...prev.assigned_employees, id],
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Project title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.start_date) e.start_date = "Start date is required";
    if (!form.end_date) e.end_date = "End date is required";
    if (
      form.start_date &&
      form.end_date &&
      new Date(form.end_date) < new Date(form.start_date)
    )
      e.date = "End date cannot be earlier than start date";
    if (!form.assigned_employees.length)
      e.assigned_employees = "Select at least one employee";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const createProject = async () => {
    if (!validate()) return;

    const payload = {
      title: form.title,
      description: form.description,
      assigned_employees: form.assigned_employees,
      created_by: 1,
      start_date: form.start_date,
      end_date: form.end_date,
      priority: form.priority,
      client_name: form.client_name || null,
    };

    const fd = new FormData();
    fd.append("project", JSON.stringify(payload));
    if (file) fd.append("document", file);

    const res = await fetch(`${API_BASE}/api/projects`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: fd,
    });

    if (!res.ok) {
      alert("Failed to create project");
      return;
    }

    fetchProjects();
    setShowAddModal(false);

    setForm({
      title: "",
      description: "",
      assigned_employees: [],
      start_date: "",
      end_date: "",
      priority: "medium",
      client_name: "",
    });

    setFile(null);
  };

  // ⭐ TAB FILTERING
  const ongoing = projects.filter((p) => p.status !== "completed");
  const completed = projects.filter((p) => p.status === "completed");

  return (
    <AdminLayout>
      <div className="projects-page-card">
        <div className="projects-header">
          <h2>Projects</h2>

          <button className="add-project-btn" onClick={() => setShowAddModal(true)}>
            + Add Project
          </button>
        </div>

        {/* ⭐ TABS */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <button
            onClick={() => setActiveTab("ongoing")}
            style={{
              padding: "6px 14px",
              borderRadius: "10px",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              background: activeTab === "ongoing" ? "#e68d20" : "#ececec",
              color: activeTab === "ongoing" ? "white" : "black",
            }}
          >
            Ongoing
          </button>

          <button
            onClick={() => setActiveTab("completed")}
            style={{
              padding: "6px 14px",
              borderRadius: "10px",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              background: activeTab === "completed" ? "#e68d20" : "#ececec",
              color: activeTab === "completed" ? "white" : "black",
            }}
          >
            Completed
          </button>
        </div>

        <div className="projects-table-wrapper">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Client</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Start</th>
                <th>End</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {(activeTab === "ongoing" ? ongoing : completed).length === 0 && (
                <tr>
                  <td colSpan={7}>No projects found</td>
                </tr>
              )}

              {(activeTab === "ongoing" ? ongoing : completed)
                .sort((a, b) => b.id - a.id)
                .map((p) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{p.client || "-"}</td>
                    <td>{p.status}</td>
                    <td>{p.priority}</td>
                    <td>{p.start_date}</td>
                    <td>{p.end_date}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => navigate(`/admin/projects/${p.id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD PROJECT MODAL — unchanged */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Add Project</h3>

            <label>Project Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <label>Client Name</label>
            <input
              value={form.client_name}
              onChange={(e) =>
                setForm({ ...form, client_name: e.target.value })
              }
            />

            <label>Assign Employees</label>

            <div className="employee-dropdown" ref={dropdownRef}>
              <div
                className="dropdown-selected"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {form.assigned_employees.length
                  ? form.assigned_employees
                      .map((id) => employees.find((e) => e.id === id)?.name)
                      .join(", ")
                  : "Select employee(s)"}
              </div>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  {employees.map((emp) => (
                    <label key={emp.id} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={form.assigned_employees.includes(emp.id)}
                        onChange={() => toggleEmployee(emp.id)}
                      />
                      {emp.name}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <label>Start Date</label>
            <input
              type="date"
              value={form.start_date}
              onChange={(e) =>
                setForm({ ...form, start_date: e.target.value })
              }
            />

            <label>End Date</label>
            <input
              type="date"
              value={form.end_date}
              onChange={(e) =>
                setForm({ ...form, end_date: e.target.value })
              }
            />

            <label>Priority</label>
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <div className="modal-actions">
              <button className="edit-btn" onClick={createProject}>
                Create Project
              </button>
              <button
                className="delete-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
