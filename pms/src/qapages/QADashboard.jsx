
// import { useEffect, useState } from "react";
// import AdminLayout from "../components/AdminLayout";
// import "./Dashboard.css";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     total_employees: 0,
//     total_projects: 0,
//     total_tasks: 0,
//   });

//   const [taskStatusData, setTaskStatusData] = useState([]);
//   const [tasksPerEmployee, setTasksPerEmployee] = useState([]);

//   useEffect(() => {
//     // dashboard cards
//     fetch("http://localhost:8000/api/dashboard/stats")
//       .then(res => res.json())
//       .then(data => setStats(data));

//     // pie chart data (task status)
//     fetch("http://localhost:8000/api/dashboard/task-status")
//       .then(res => res.json())
//       .then(data => setTaskStatusData(data));

//     // bar chart data (tasks per employee)
//     fetch("http://localhost:8000/api/dashboard/tasks-per-employee")
//       .then(res => res.json())
//       .then(data => setTasksPerEmployee(data));
//   }, []);

//   const COLORS = ["#ef4444", "#eab308", "#22c55e"];

//   // 👉 Custom label so text status appears instead of just numbers
//   const renderLabel = (entry) => `${entry.name} (${entry.value})`;

//   return (
//     <AdminLayout>
//       <div className="dashboard-page">
//         <h2>Dashboard</h2>

//         {/* STAT CARDS */}
//         <div className="dashboard-cards">
//           <div className="card">
//             <h3>Total Employees</h3>
//             <p>{stats.total_employees}</p>
//           </div>

//           <div className="card">
//             <h3>Total Projects</h3>
//             <p>{stats.total_projects}</p>
//           </div>

//           <div className="card">
//             <h3>Total Tasks</h3>
//             <p>{stats.total_tasks}</p>
//           </div>
//         </div>

//         <div className="charts-row">

//           {/* PIE CHART */}
//           <div className="chart-box">
//             <h3>Task Status Overview</h3>

//             <ResponsiveContainer width="100%" height={260}>
//               <PieChart>
//                 <Pie
//                   data={taskStatusData}
//                   dataKey="value"
//                   nameKey="name"
//                   outerRadius={90}
//                   label={renderLabel}
//                 >
//                   {taskStatusData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>

//                 {/* legend with names */}
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* BAR CHART */}
//           <div className="chart-box">
//             <h3>Tasks per Employee</h3>

//             <ResponsiveContainer width="100%" height={260}>
//               <BarChart data={tasksPerEmployee}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="tasks" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }
import { useEffect, useState } from "react";
import AdminLayout from "../components/qacomponents/QALayout";
import "./QAPage.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_employees: 0,
    total_projects: 0,
    total_tasks: 0,
  });

  const [projectProductivity, setProjectProductivity] = useState([]);
  const [projectGrowth, setProjectGrowth] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // --- dashboard stats ---
        const s = await fetch("http://localhost:8000/api/dashboard/stats").then(r => r.json());
        setStats(s || {});

        // --- project productivity ---
        const prod = await fetch("http://localhost:8000/api/dashboard/project-productivity").then(r => r.json());
        setProjectProductivity(Array.isArray(prod) ? prod : []);

        // --- monthly project growth ---
        const growth = await fetch("http://localhost:8000/api/dashboard/project-growth").then(r => r.json());
        setProjectGrowth(Array.isArray(growth) ? growth : []);

      } catch (err) {
        console.error("Admin dashboard load error:", err);
        setProjectProductivity([]);
        setProjectGrowth([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading dashboard…</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard-page">

        <h2>Admin Dashboard</h2>

        {/* ===== STAT CARDS ===== */}
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Employees</h3>
            <p>{stats.total_employees ?? 0}</p>
          </div>

          <div className="card">
            <h3>Total Projects</h3>
            <p>{stats.total_projects ?? 0}</p>
          </div>

          <div className="card">
            <h3>Total Tasks</h3>
            <p>{stats.total_tasks ?? 0}</p>
          </div>
        </div>

        <div className="charts-row">

          {/* ===== PROJECT PRODUCTIVITY ===== */}
          <div className="chart-box">
            <h3>Project Productivity (%)</h3>

            {projectProductivity.length === 0 ? (
              <p>No data available</p>
            ) : (
              projectProductivity.map((p, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    {p.project}
                  </div>

                  <div style={{ background: "#eee", borderRadius: 8, height: 12 }}>
                    <div
                      style={{
                        width: `${p.completion_percent ?? 0}%`,
                        height: "100%",
                        borderRadius: 8,
                        background:
                          p.completion_percent >= 80
                            ? "#22c55e"
                            : p.completion_percent >= 40
                            ? "#eab308"
                            : "#ef4444",
                        transition: "0.4s",
                      }}
                    />
                  </div>

                  <small>
                    {p.completed_tasks}/{p.total_tasks} tasks — {p.completion_percent}%
                  </small>
                </div>
              ))
            )}
          </div>

          {/* ===== PROJECT GROWTH BAR CHART ===== */}
          <div className="chart-box">
            <h3>Project Growth</h3>

            {projectGrowth.length === 0 ? (
              <p>No data available</p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={projectGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed_tasks" name="Completed Tasks" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
