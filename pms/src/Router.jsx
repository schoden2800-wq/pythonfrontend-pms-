// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";

// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/employees" element={<AdminEmployees />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
