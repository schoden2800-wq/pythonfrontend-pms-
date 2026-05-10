
import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "./AdminEmployees.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
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

  const [bulkEmployees, setBulkEmployees] = useState([
    { name: "", email: "", designation: "" },
  ]);

  /* ================= FETCH ================= */
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
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        designation: formData.designation,
      }),
    });

    setShowConfirm(false);
    setSuccessText("Employee added successfully");
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
    await fetch(`${API_BASE}/api/admin/employees/${formData.id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        designation: formData.designation,
      }),
    });

    setShowConfirm(false);
    setSuccessText("Employee updated successfully");
    setShowSuccess(true);
    resetForm();
    fetchEmployees();
  };

  /* ================= DELETE ================= */
  const confirmDelete = (id) => {
    setConfirmText("Are you sure you want to delete this employee?");
    setConfirmAction(() => () => handleDelete(id));
    setShowConfirm(true);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/api/admin/employees/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    setShowConfirm(false);
    setSuccessText("Employee deleted successfully");
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
      {/* ✅ IMPORTANT: correct class name */}
      <div className="employees-page">
        <div className="employees-header">
          <h2>Employees</h2>

          <button
            className="add-employee-btn"
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
          >
            + Add Employee
          </button>
        </div>

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
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(emp)}
                    >
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

        {/* ================= ADD MODAL ================= */}
        {showAddModal && (
          <EmployeeModal
            title="Add Employee"
            submitText="Add"
            onClose={() => setShowAddModal(false)}
            onSubmit={confirmAdd}
            formData={formData}
            handleChange={handleChange}
            onAddMultiple={() => {
              setShowAddModal(false);
              setShowBulkModal(true);
            }}
          />
        )}

        {/* ================= BULK MODAL ================= */}
        {showBulkModal && (
          <BulkEmployeeModal
            rows={bulkEmployees}
            setRows={setBulkEmployees}
            onClose={() => setShowBulkModal(false)}
            onSubmit={async () => {
              await fetch(`${API_BASE}/api/admin/employees/bulk`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({ employees: bulkEmployees }),
              });

              setShowBulkModal(false);
              setBulkEmployees([{ name: "", email: "", designation: "" }]);
              setSuccessText("Employees added successfully");
              setShowSuccess(true);
              fetchEmployees();
            }}
          />
        )}

        {/* ================= EDIT MODAL ================= */}
        {showEditModal && (
          <EmployeeModal
            title="Edit Employee"
            submitText="Update"
            onClose={() => setShowEditModal(false)}
            onSubmit={confirmEdit}
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {showConfirm && (
          <ConfirmPopup
            text={confirmText}
            onYes={confirmAction}
            onNo={() => setShowConfirm(false)}
          />
        )}

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

function EmployeeModal({
  title,
  submitText,
  onClose,
  onSubmit,
  formData,
  handleChange,
  onAddMultiple,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          {onAddMultiple && (
            <span className="add-multiple-link" onClick={onAddMultiple}>
              + Add Multiple
            </span>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="primary">{submitText}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function BulkEmployeeModal({ rows, setRows, onClose, onSubmit }) {
  const addRow = () =>
    setRows([...rows, { name: "", email: "", designation: "" }]);

  const removeRow = (i) =>
    setRows(rows.filter((_, idx) => idx !== i));

  const handleChange = (i, field, value) => {
    const updated = [...rows];
    updated[i][field] = value;
    setRows(updated);
  };

  return (
    <div className="modal-overlay">
      <div className="modal bulk-modal">
        <div className="modal-header">
          <h3>Add Multiple Employees</h3>
          <button onClick={onClose}>×</button>
        </div>

        <table className="bulk-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>
                  <input
                    value={row.name}
                    onChange={(e) =>
                      handleChange(i, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={row.email}
                    onChange={(e) =>
                      handleChange(i, "email", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    value={row.designation}
                    onChange={(e) =>
                      handleChange(i, "designation", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button onClick={() => removeRow(i)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bulk-actions">
          <button onClick={addRow}>+ Add Row</button>
          <button className="primary" onClick={onSubmit}>
            Add
          </button>
        </div>
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
          <button className="primary" onClick={onYes}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
