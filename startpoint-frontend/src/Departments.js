import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    name: '',
    department_head: '',
    description: '',
    created_by: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchDepartments = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/departments');
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://127.0.0.1:8000/api/departments/${editingId}`, form);
    } else {
      await axios.post('http://127.0.0.1:8000/api/departments', form);
    }
    setForm({ name: '', department_head: '', description: '', created_by: '' });
    setEditingId(null);
    fetchDepartments();
  };

  const handleEdit = dept => {
    setForm(dept);
    setEditingId(dept.id);
  };

  const handleDelete = async id => {
    const confirmed = window.confirm("Are you sure you want to delete this department?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/departments/${id}`);
      fetchDepartments();
      alert("Department deleted successfully!");
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("Failed to delete department.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Manage Departments</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <input
            type="text"
            name="name"
            placeholder="Department Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="department_head"
            placeholder="Department Head"
            value={form.department_head}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="created_by"
            placeholder="Created By"
            value={form.created_by}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {editingId ? 'Update Department' : 'Create Department'}
          </button>
        </form>

        <div className="space-y-4">
          {departments.map(dept => (
            <div key={dept.id} className="bg-gray-50 p-4 border rounded-lg shadow-sm flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-blue-700">{dept.name}</h2>
                <p className="text-sm text-gray-700">Head: {dept.department_head}</p>
                <p className="text-sm text-gray-700">Description: {dept.description}</p>
                <p className="text-sm text-gray-500">Created by: {dept.created_by}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(dept)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Departments;
