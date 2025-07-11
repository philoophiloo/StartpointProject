import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    cohort: "",
    email_address: "",
    password: "",
    is_active: true,
    created_by: "",
  });

  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:8000/api/users/${editId}`, form);
      } else {
        await axios.post("http://localhost:8000/api/users", form);
      }
      setForm({
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        phone_number: "",
        cohort: "",
        email_address: "",
        password: "",
        is_active: true,
        created_by: "",
      });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setForm({ ...user, password: "" });
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-4"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-4 text-blue-700"
      >
        User Manager
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {["title", "first_name", "middle_name", "last_name", "phone_number", "cohort", "email_address", "password", "created_by"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={form[field]}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md"
          />
        ))}

        <label className="flex items-center space-x-2 col-span-1 md:col-span-2">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          <span>Active</span>
        </label>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {editId ? "Update User" : "Add User"}
        </button>
      </motion.form>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-2">All Users</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Cohort</th>
                <th className="p-2">Active</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <motion.tr
                  key={u.id}
                  className="border-t"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <td className="p-2">
                    {u.title} {u.first_name} {u.last_name}
                  </td>
                  <td className="p-2">{u.email_address}</td>
                  <td className="p-2">{u.phone_number}</td>
                  <td className="p-2">{u.cohort}</td>
                  <td className="p-2">{u.is_active ? "Yes" : "No"}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserManager;
