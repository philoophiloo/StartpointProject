// src/CohortManager.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const CohortManager = () => {
  const [cohorts, setCohorts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    code_name: '',
    president: '',
    start_date: '',
    end_date: '',
    is_active: false,
    created_by: '',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchCohorts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/cohorts');
      setCohorts(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/cohorts/${editingId}`, form);
      } else {
        await axios.post('http://localhost:8000/api/cohorts', form);
      }
      setForm({
        name: '',
        code_name: '',
        president: '',
        start_date: '',
        end_date: '',
        is_active: false,
        created_by: '',
      });
      setEditingId(null);
      fetchCohorts();
    } catch (err) {
      console.error('Submit error:', err.response?.data);
    }
  };

  const handleEdit = (cohort) => {
    setForm(cohort);
    setEditingId(cohort.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this cohort?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/cohorts/${id}`);
      fetchCohorts();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  useEffect(() => {
    fetchCohorts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h1
        className="text-3xl font-bold text-blue-600 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Cohort Manager
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow p-6 rounded-xl mb-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {['name', 'code_name', 'president', 'start_date', 'end_date', 'created_by'].map((field) => (
          <input
            key={field}
            type={field.includes('date') ? 'date' : 'text'}
            placeholder={field.replace('_', ' ').toUpperCase()}
            value={form[field] || ''}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="border p-2 rounded-md"
          />
        ))}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.is_active || false}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          />
          <span>Is Active</span>
        </label>
        <motion.button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md col-span-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {editingId ? 'Update Cohort' : 'Create Cohort'}
        </motion.button>
      </motion.form>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full table-auto bg-white border border-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">President</th>
              <th className="px-4 py-2">Start</th>
              <th className="px-4 py-2">End</th>
              <th className="px-4 py-2">Active</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {cohorts.map((c, i) => (
              <tr key={c.id} className="border-t text-sm text-gray-700">
                <motion.td
                  className="px-4 py-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {i + 1}
                </motion.td>
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.code_name}</td>
                <td className="px-4 py-2">{c.president}</td>
                <td className="px-4 py-2">{c.start_date}</td>
                <td className="px-4 py-2">{c.end_date || '-'}</td>
                <td className="px-4 py-2">{c.is_active ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 space-x-2">
                  <motion.button
                    onClick={() => handleEdit(c)}
                    className="text-blue-600 hover:underline"
                    whileTap={{ scale: 0.9 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600 hover:underline"
                    whileTap={{ scale: 0.9 }}
                  >
                    Delete
                  </motion.button>
                </td>
              </tr>
            ))}
          </motion.tbody>
        </table>
        {cohorts.length === 0 && <div className="p-4 text-gray-500">No cohorts available.</div>}
      </div>
    </div>
  );
};

export default CohortManager;
