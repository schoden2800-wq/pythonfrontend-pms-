
import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "./AdminEmployees.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [confirmText, setConfirmText] = useState("");
  const [confirmAction, setConfirmAction] = useState(() => {});

  const [successText, setSuccessText] = useState("");

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    designation: "",
  });

  /* ================= FETCH ================= */
  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/employees`);
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch {
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () =>
    setFormData({ id: null, name: "", email: "", designation: "" });

  /* ================= ADD ================= */
  const confirmAdd = () => {
    setShowAddModal(false);
    setConfirmText("Are you sure you want to add this employee?");
    setConfirmAction(() => handleAdd);
    setShowConfirm(true);
  };

  const handleAdd = async () => {
    await fetch(`${API_BASE}/api/admin/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setShowConfirm(false);
    setSuccessText("Employee Added Successfully");
    setShowSuccess(true);
    resetForm();
    fetchEmployees();
  };

  /* ================= EDIT ================= */
  const openEditModal = (emp) => {
    setFormData(emp);
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    setShowEditModal(false);
    setConfirmText("Are you sure you want to update this employee?");
    setConfirmAction(() => handleEdit);
    setShowConfirm(true);
  };
const handleEdit = async () => {
  try {
    await fetch(`${API_BASE}/api/admin/employees/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        designation: formData.designation,
      }),
    });

    setShowConfirm(false);
    setSuccessText("Employee Updated Successfully");
    setShowSuccess(true);
    resetForm();
    fetchEmployees();
  } catch (err) {
    console.error("Update failed", err);
  }
};

//   const handleEdit = async () => {
//     // (Backend update can be added later)
//     setShowConfirm(false);
//     setSuccessText("Employee Updated Successfully");
//     setShowSuccess(true);
//     resetForm();
//     fetchEmployees();
//   };

//   /* ================= DELETE ================= */
  const confirmDelete = (id) => {
    setConfirmText("Are you sure you want to delete this employee?");
    setConfirmAction(() => () => handleDelete(id));
    setShowConfirm(true);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/api/admin/employees/${id}`, {
      method: "DELETE",
    });

    setShowConfirm(false);
    setSuccessText("Employee Deleted Successfully");
    setShowSuccess(true);
    fetchEmployees();
  };

  /* ================= AUTO CLOSE SUCCESS ================= */
  useEffect(() => {
    if (showSuccess) {
      const t = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(t);
    }
  }, [showSuccess]);

  return (
    <AdminLayout>
      <div className="employees-page-card">
        {/* HEADER */}
        <div className="employees-header">
          <h2>Employees</h2>
          <button className="add-employee-btn" onClick={() => setShowAddModal(true)}>
            + Add Employee
          </button>
        </div>

        {/* TABLE */}
        <div className="employees-table-wrapper">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Actions</th>
              </tr>
            </thead>
        
            <tbody>
  {employees.length === 0 && (
    <tr>
      <td colSpan="4">No employees found</td>
    </tr>
  )}

  {[...employees].reverse().map((emp) => (
    <tr key={emp.id}>
      <td>{emp.name}</td>
      <td>{emp.email}</td>
      <td>{emp.designation}</td>
      <td>
        <button className="edit-btn" onClick={() => openEditModal(emp)}>
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => confirmDelete(emp.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        {/* ADD MODAL */}
        {showAddModal && (
          <EmployeeModal
            title="Add Employee"
            submitText="Add Employee"
            onClose={() => setShowAddModal(false)}
            onSubmit={confirmAdd}
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {/* EDIT MODAL */}
        {showEditModal && (
          <EmployeeModal
            title="Edit Employee"
            submitText="Update Employee"
            onClose={() => setShowEditModal(false)}
            onSubmit={confirmEdit}
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {/* CONFIRM POPUP */}
        {showConfirm && (
          <ConfirmPopup
            text={confirmText}
            onYes={confirmAction}
            onNo={() => setShowConfirm(false)}
          />
        )}

        {/* SUCCESS POPUP */}
        {showSuccess && (
          <div className="success-overlay">
            <div className="success-popup">
              <div className="check-circle">✓</div>
              <h3>{successText}</h3>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

/* ================= MODALS ================= */
function EmployeeModal({ title, submitText, onClose, onSubmit, formData, handleChange }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} required />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button className="primary">{submitText}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmPopup({ text, onYes, onNo }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirm</h3>
        <p>{text}</p>
        <div className="modal-actions">
          <button onClick={onNo}>No</button>
          <button className="primary" onClick={onYes}>Yes</button>
        </div>
      </div>
    </div>
  );
}
