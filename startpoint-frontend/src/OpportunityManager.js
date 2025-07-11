import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const OpportunityManager = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [form, setForm] = useState({
    title: "",
    department: "",
    opportunity_type: "",
    opportunity_description: "",
    core_competencies: "",
    compensation_type: "",
    compensation_currency: "",
    compensation_amount: "",
    expiry_date: "",
    is_active: false,
    created_by: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchOpportunities = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/opportunities");
    setOpportunities(res.data);
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://127.0.0.1:8000/api/opportunities/${editingId}`, form);
    } else {
      await axios.post("http://127.0.0.1:8000/api/opportunities", form);
    }
    setForm({
      title: "",
      department: "",
      opportunity_type: "",
      opportunity_description: "",
      core_competencies: "",
      compensation_type: "",
      compensation_currency: "",
      compensation_amount: "",
      expiry_date: "",
      is_active: false,
      created_by: "",
    });
    setEditingId(null);
    fetchOpportunities();
  };

  const handleEdit = (opportunity) => {
    setForm(opportunity);
    setEditingId(opportunity.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/opportunities/${id}`);
    fetchOpportunities();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Opportunity Manager</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
        <input className="input" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input className="input" name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
        <input className="input" name="opportunity_type" placeholder="Opportunity Type" value={form.opportunity_type} onChange={handleChange} />
        <input className="input" name="core_competencies" placeholder="Core Competencies" value={form.core_competencies} onChange={handleChange} />
        <input className="input" name="compensation_type" placeholder="Compensation Type" value={form.compensation_type} onChange={handleChange} />
        <input className="input" name="compensation_currency" placeholder="Currency" value={form.compensation_currency} onChange={handleChange} />
        <input type="number" className="input" name="compensation_amount" placeholder="Amount" value={form.compensation_amount} onChange={handleChange} required />
        <input type="date" className="input" name="expiry_date" placeholder="Expiry Date" value={form.expiry_date} onChange={handleChange} required />
        <input className="input" name="created_by" placeholder="Created By" value={form.created_by} onChange={handleChange} />
        <label className="flex items-center space-x-2 col-span-full">
          <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
          <span>Active</span>
        </label>
        <button type="submit" className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {editingId ? "Update" : "Create"} Opportunity
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {opportunities.map((opp) => (
          <motion.div
            key={opp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-start"
          >
            <div>
              <h2 className="text-xl font-semibold text-blue-800">{opp.title}</h2>
              <p className="text-sm text-gray-700">Department: {opp.department}</p>
              <p className="text-sm text-gray-500">Expires: {opp.expiry_date}</p>
              <p className="text-sm">{opp.opportunity_description}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(opp)} className="text-white bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
              <button onClick={() => handleDelete(opp.id)} className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700">Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OpportunityManager;
