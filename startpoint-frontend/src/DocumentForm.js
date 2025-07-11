// src/UploadDocument.js
import React, { useState } from 'react';
import axios from 'axios';

const DocumentForm = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    user_id: '',
    created_by: '',
    file: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setForm({ ...form, file: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('user_id', form.user_id);
    formData.append('created_by', form.created_by);
    formData.append('file', form.file);

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Document uploaded successfully!');
      console.log(res.data);
    } catch (error) {
      setMessage('Upload failed');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input name="name" placeholder="Document Name" onChange={handleChange} className="w-full p-2 border" />
        <input name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border" />
        <input name="user_id" placeholder="User ID" onChange={handleChange} className="w-full p-2 border" />
        <input name="created_by" placeholder="Created By" onChange={handleChange} className="w-full p-2 border" />
        <input type="file" name="file" onChange={handleChange} className="w-full p-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Upload</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default DocumentForm;
