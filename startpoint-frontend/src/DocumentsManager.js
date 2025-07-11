import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentsManager = () => {
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    file: null,
    user_id: '',
    created_by: '',
    is_active: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);

  // Fetch documents and users
  useEffect(() => {
    fetchDocuments();
    fetchUsers();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/documents');
      console.log('Fetched documents:', res.data); 
      setDocuments(res.data);
      
    } catch (err) {
      console.error('Failed to fetch documents', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('is_active', formData.is_active);
    submitData.append('user_id', formData.user_id);
    submitData.append('created_by', formData.created_by);
    if (formData.file) submitData.append('file', formData.file);

    try {
      if (isEditing) {
        await axios.post(`http://127.0.0.1:8000/api/documents/${formData.id}?_method=PUT`, submitData);
        alert('Document updated!');
      } else {
        await axios.post('http://127.0.0.1:8000/api/documents', submitData);
        alert('Document uploaded!');
      }
      resetForm();
      fetchDocuments();
    } catch (err) {
      console.error('Error saving document:', err);
    }
  };

  const handleEdit = (doc) => {
    setFormData({
      id: doc.id,
      name: doc.name,
      description: doc.description,
      file: null, // Optional to re-upload
      user_id: doc.user_id,
      created_by: doc.created_by,
      is_active: doc.is_active,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/documents/${id}`);
      fetchDocuments();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      description: '',
      file: null,
      user_id: '',
      created_by: '',
      is_active: true,
    });
    setIsEditing(false);
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit Document' : 'Upload New Document'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Document Name" required />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        
        <select name="user_id" value={formData.user_id} onChange={handleChange} required>
          <option value="">-- Select User --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name || user.email}</option>
          ))}
        </select>

        <input name="created_by" value={formData.created_by} onChange={handleChange} placeholder="Created By (User ID)" required />

        {!isEditing && (
          <input type="file" name="file" onChange={handleChange} required />
        )}

        <label>
          <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
          Active
        </label>

        <button type="submit">{isEditing ? 'Update' : 'Upload'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <hr />

      <h2>Uploaded Documents</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Size (KB)</th>
            <th>User ID</th>
            <th>File</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>{doc.description}</td>
              <td>{doc.file_size_in_kilobytes}</td>
              <td>{doc.user_id}</td>
              <td><a href={`http://127.0.0.1:8000/storage/${doc.file_path}`} target="_blank" rel="noreferrer">View</a></td>
              <td>{doc.is_active ? '✅' : '❌'}</td>
              <td>
                <button onClick={() => handleEdit(doc)}>Edit</button>
                <button onClick={() => handleDelete(doc.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsManager;
