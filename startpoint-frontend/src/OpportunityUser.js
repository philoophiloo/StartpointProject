import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const OpportunityUser = () => {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    user_id: '',
    opportunity_id: '',
    is_active: true,
  });
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/opportunity-users');
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/opportunity-users', form);
      setForm({ user_id: '', opportunity_id: '', is_active: true });
      fetchAssignments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/opportunity-users/${id}`);
      fetchAssignments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Opportunity Assignments</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder="User ID"
          value={form.user_id}
          onChange={(e) => setForm({ ...form, user_id: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Opportunity ID"
          value={form.opportunity_id}
          onChange={(e) => setForm({ ...form, opportunity_id: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Assign
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <motion.table
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full text-sm text-left border border-gray-200 rounded shadow"
        >
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">User ID</th>
              <th className="p-2 border">Opportunity ID</th>
              <th className="p-2 border">Active</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assign) => (
              <motion.tr
                key={assign.id}
                whileHover={{ scale: 1.01 }}
                className="border-t"
              >
                <td className="p-2 border">{assign.id}</td>
                <td className="p-2 border">{assign.user_id}</td>
                <td className="p-2 border">{assign.opportunity_id}</td>
                <td className="p-2 border">{assign.is_active ? 'Yes' : 'No'}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(assign.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </motion.div>
  );
};

export default OpportunityUser;
