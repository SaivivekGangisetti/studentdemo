import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", department: "", age: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch all students
  const fetchStudents = async () => {
    const res = await fetch("http://localhost:2030/springbootstudentapi-backend/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update student
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Update
      await fetch(`http://localhost:8080/students/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditingId(null);
    } else {
      // Create
      await fetch("http://localhost:8080/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: "", department: "", age: "" });
    fetchStudents();
  };

  // Delete student
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/students/${id}`, {
      method: "DELETE",
    });
    fetchStudents();
  };

  // Edit student
  const handleEdit = (student) => {
    setForm({
      name: student.name,
      department: student.department,
      age: student.age,
    });
    setEditingId(student.id);
  };

  return (
    <div className="app">
      <h1>Student Management</h1>

      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Student</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.department}</td>
              <td>{s.age}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
