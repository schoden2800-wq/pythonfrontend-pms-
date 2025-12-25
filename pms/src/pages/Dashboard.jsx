import AdminLayout from "../components/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="dashboard-page">
        <h2>Dashboard</h2>

        {/* Dummy stats */}
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Employees</h3>
            <p>25</p>
          </div>

          <div className="card">
            <h3>Active Projects</h3>
            <p>8</p>
          </div>

          <div className="card">
            <h3>Completed Tasks</h3>
            <p>120</p>
          </div>
        </div>

        {/* Dummy content */}
        <div className="dashboard-section">
          <h3>Recent Activity</h3>
          <p>This is dummy content for the dashboard page.</p>
        </div>
      </div>
    </AdminLayout>
  );
}
