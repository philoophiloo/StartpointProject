import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const TitleManager = () => {
  const [titles, setTitles] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    is_active: false,
    created_by: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTitles = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/titles');
      setTitles(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/titles/${editingId}`, form);
      } else {
        await axios.post('http://localhost:8000/api/titles', form);
      }
      setForm({ name: '', description: '', is_active: false, created_by: '' });
      setEditingId(null);
      fetchTitles();
    } catch (err) {
      console.error('Submit error:', err.response?.data);
    }
  };

  const handleEdit = (title) => {
    setForm(title);
    setEditingId(title.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this title?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/titles/${id}`);
      fetchTitles();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  useEffect(() => {
    fetchTitles();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto p-6"
    >
      <motion.h1
        className="text-3xl font-bold text-blue-700 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Title Manager
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow p-6 rounded-xl mb-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <input
          type="text"
          placeholder="Title Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
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
          className="bg-blue-600 text-white py-2 px-4 rounded-md col-span-full hover:bg-blue-700"
        >
          {editingId ? 'Update Title' : 'Create Title'}
        </button>
      </motion.form>

      <motion.div
        className="overflow-x-auto shadow rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <table className="min-w-full table-auto bg-white border border-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Created By</th>
              <th className="px-4 py-2">Active</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {titles.map((title, i) => (
              <motion.tr
                key={title.id}
                className="border-t text-sm text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{title.name}</td>
                <td className="px-4 py-2">{title.description || '-'}</td>
                <td className="px-4 py-2">{title.created_by || '-'}</td>
                <td className="px-4 py-2">{title.is_active ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(title)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(title.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
            {titles.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No titles available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default TitleManager;
