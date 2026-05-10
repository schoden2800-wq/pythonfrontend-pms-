
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import Dashboard from "./pages/Dashboard";
// import AdminEmployees from "./pages/AdminEmployees";
// import AdminProjects from "./pages/AdminProjects";
// import AdminProjectDetail from "./pages/AdminProjectDetail";
// import AdminProjectActivity from "./pages/AdminProjectActivity";
// import EmployeeDashboard from "./pages/EmployeeDashboard";
// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         <Route path="/admin/dashboard" element={<Dashboard />} />
//         <Route path="/admin/employees" element={<AdminEmployees />} />
//         <Route path="/admin/projects" element={<AdminProjects />} />
//           <Route path="/admin/projects/:id/activity" element={<AdminProjectActivity />} />

//         {/* ✅ PROJECT DETAIL PAGE */}
//         <Route
//           path="/admin/projects/:id"
//           element={<AdminProjectDetail />}
//         />
//       </Routes>
      
//     </BrowserRouter>
//   );
// };

// export default AppRouter;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AdminEmployees from "./pages/AdminEmployees";
import AdminProjects from "./pages/AdminProjects";
import AdminProjectDetail from "./pages/AdminProjectDetail";
import AdminProjectActivity from "./pages/AdminProjectActivity";
import EmployeeDashboard from "./employeepages/EmployeeDashboard";
import EmployeeProjects from "./employeepages/EmployeeProject";
import EmployeeProjectDetail from "./employeepages/EmployeeProjcetDetail";
import EmployeeActivityLog from "./employeepages/EmployeeActivityLog";
// import EmployeeProjectKanban from "./employeepages/EmployeeProjectKanban";
import EmployeeProjectKanban from "./employeepages/EmployeeProjectKanban";
import EmployeeTasks from "./employeepages/EmployeeTask";
import QADashboard from "./qapages/QADashboard";
import QATaskReview from "./qapages/QATaskReview";



const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/employees" element={<AdminEmployees />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route
          path="/admin/projects/:id/activity"
          element={<AdminProjectActivity />}
        />
        <Route
          path="/admin/projects/:id"
          element={<AdminProjectDetail />}
        />

        {/* EMPLOYEE */}
        <Route
          path="/employee/dashboard"
          element={<EmployeeDashboard />}
        />
          <Route
          path="/employee/projects"
          element={<EmployeeProjects />}
        />
        <Route
  path="/employee/projects/:id"
  element={<EmployeeProjectDetail />}
/><Route
  path="/employee/projects/:id/activity"
  element={<EmployeeActivityLog />}
/>
<Route
  path="/employee/projects/:id/kanban"
  element={<EmployeeProjectKanban />}
/>
<Route
  path="/employee/tasks"
  element={<EmployeeTasks />}
/>
<Route path="/qa/dashboard" element={<QADashboard />} />
{/* <Route path="/qa/tasks" element={<QATasks />} /> */}
<Route path="/qa/review" element={<QATaskReview />} />

      </Routes>
      
    </BrowserRouter>
  );
};

export default AppRouter;
