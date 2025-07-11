import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompensationTypeManager = () => {
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({
    type: '',
    description: '',
    is_active: false,
    created_by: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTypes = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/compensation-types');
      setTypes(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/compensation-types/${editingId}`, form);
      } else {
        await axios.post('http://localhost:8000/api/compensation-types', form);
      }
      setForm({ type: '', description: '', is_active: false, created_by: '' });
      setEditingId(null);
      fetchTypes();
    } catch (err) {
      console.error('Error submitting form:', err.response?.data);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/compensation-types/${id}`);
      fetchTypes();
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Compensation Type Manager</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Created By"
          value={form.created_by}
          onChange={(e) => setForm({ ...form, created_by: e.target.value })}
          className="border p-2 rounded-md"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          />
          <span>Is Active</span>
        </label>
        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editingId ? 'Update Compensation Type' : 'Create Compensation Type'}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Type</th>
              <th className="p-2">Description</th>
              <th className="p-2">Created By</th>
              <th className="p-2">Active</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.map((item, i) => (
              <tr key={item.id} className="border-t">
                <td className="p-2 text-center">{i + 1}</td>
                <td className="p-2">{item.type}</td>
                <td className="p-2">{item.description || '-'}</td>
                <td className="p-2">{item.created_by || '-'}</td>
                <td className="p-2 text-center">{item.is_active ? '✅' : '❌'}</td>
                <td className="p-2 space-x-2 text-center">
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
                </td>
              </tr>
            ))}
            {types.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No compensation types found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompensationTypeManager;
