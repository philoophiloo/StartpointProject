import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/opportunity-types"; // adjust to your route

const OpportunityTypes = () => {
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({ type: "", description: "", is_active: true });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const res = await axios.get(API_URL);
      setTypes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ type: "", description: "", is_active: true });
      setEditId(null);
      fetchTypes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (type) => {
    setForm({
      type: type.type,
      description: type.description || "",
      is_active: type.is_active,
    });
    setEditId(type.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTypes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editId ? "Edit" : "Add"} Opportunity Type</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 bg-white p-4 shadow rounded">
        <input
          type="text"
          placeholder="Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          />
          <span>Active</span>
        </label>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {editId ? "Update" : "Create"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-4">Opportunity Types</h3>
      <div className="space-y-4">
        {types.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded shadow"
          >
            <div>
              <p className="font-medium">{item.type}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm text-green-600">
                {item.is_active ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunityTypes;
