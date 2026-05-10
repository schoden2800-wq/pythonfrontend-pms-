
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import EmployeeLayout from "../components/employeecomponents/EmployeeLayout";
// import "./EmployeeProject.css";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // headers with token
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   return {
//     Authorization: `Bearer ${token}`,
//   };
// };

// // decode token to get employee id
// const getUserIdFromToken = () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return null;

//     const payload = JSON.parse(atob(token.split(".")[1]));

//     return (
//       payload.id ||
//       payload.user_id ||
//       payload.employee_id ||
//       payload.sub ||
//       null
//     );
//   } catch {
//     return null;
//   }
// };

// export default function EmployeeProjects() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const employeeId = getUserIdFromToken();
//   const navigate = useNavigate();

//   // fetch assigned projects
//   const fetchAssignedProjects = async () => {
//     try {
//       const res = await fetch(
//         `${API_BASE}/api/projects/assigned/${employeeId}`,
//         { headers: getAuthHeaders() }
//       );

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
//             file_path: p[8],
//           }))
//         : [];

//       setProjects(formatted);
//     } catch {
//       setProjects([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (employeeId) fetchAssignedProjects();
//   }, [employeeId]);

//   // invalid token case
//   if (!employeeId) {
//     return (
//       <EmployeeLayout>
//         <div className="projects-page-card">
//           <h3>Invalid session — please log in again.</h3>
//         </div>
//       </EmployeeLayout>
//     );
//   }

//   return (
//     <EmployeeLayout>
//       <div className="projects-page-card">
//         <div className="projects-header">
//           <h2>My Assigned Projects</h2>
//         </div>

//         {loading ? (
//           <p style={{ padding: "1rem" }}>Loading...</p>
//         ) : (
//           <div className="projects-table-wrapper">
//             <table className="projects-table">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Client</th>
//                   <th>Status</th>
//                   <th>Priority</th>
//                   <th>Start</th>
//                   <th>End</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {projects.length === 0 && (
//                   <tr>
//                     <td colSpan="7">No assigned projects found</td>
//                   </tr>
//                 )}

//                 {projects
//                   .sort((a, b) => b.id - a.id)
//                   .map((p) => (
//                     <tr key={p.id}>
//                       <td>{p.title}</td>
//                       <td>{p.client || "-"}</td>
//                       <td>{p.status}</td>
//                       <td>{p.priority}</td>
//                       <td>{p.start_date}</td>
//                       <td>{p.end_date}</td>
//                       <td>
//                         <button
//                           className="edit-btn"
//                           onClick={() => navigate(`/employee/projects/${p.id}`)}
//                         >
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </EmployeeLayout>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeLayout from "../components/employeecomponents/EmployeeLayout";
import "./EmployeeProject.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// decode token to get employee id
const getUserIdFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));

    return (
      payload.id ||
      payload.user_id ||
      payload.employee_id ||
      payload.sub ||
      null
    );
  } catch {
    return null;
  }
};

export default function EmployeeProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const employeeId = getUserIdFromToken();
  const navigate = useNavigate();

  // fetch assigned projects
  const fetchAssignedProjects = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/projects/assigned/${employeeId}`,
        { headers: getAuthHeaders() }
      );

      const data = await res.json();

      const formatted = Array.isArray(data)
        ? data.map((p) => ({
            id: p[0],
            title: p[1],
            description: p[2],
            start_date: p[3],
            end_date: p[4],
            status: p[5], // still used internally
            priority: p[6],
            client: p[7],
            file_path: p[8],
          }))
        : [];

      setProjects(formatted);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (employeeId) fetchAssignedProjects();
  }, [employeeId]);

  // invalid token case
  if (!employeeId) {
    return (
      <EmployeeLayout>
        <div className="projects-page-card">
          <h3>Invalid session — please log in again.</h3>
        </div>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <div className="projects-page-card">
        <div className="projects-header">
          <h2>My Assigned Projects</h2>
        </div>

        {loading ? (
          <p style={{ padding: "1rem" }}>Loading...</p>
        ) : (
          <div className="projects-table-wrapper">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Client</th>
                  {/* Status column removed */}
                  <th>Priority</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {projects.length === 0 && (
                  <tr>
                    <td colSpan="6">No assigned projects found</td>
                  </tr>
                )}

                {projects
                  .sort((a, b) => b.id - a.id)
                  .map((p) => (
                    <tr key={p.id}>
                      <td>
                        {p.title}

                        {/* 👇 automatic completed label */}
                        {p.status === "Completed" && (
                          <span
                            style={{
                              marginLeft: "8px",
                              color: "green",
                              fontWeight: 600,
                              fontSize: "0.9rem",
                            }}
                          >
                            ✔ Completed
                          </span>
                        )}
                      </td>

                      <td>{p.client || "-"}</td>
                      <td>{p.priority}</td>
                      <td>{p.start_date}</td>
                      <td>{p.end_date}</td>

                      <td>
                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(`/employee/projects/${p.id}`)
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </EmployeeLayout>
  );
}
