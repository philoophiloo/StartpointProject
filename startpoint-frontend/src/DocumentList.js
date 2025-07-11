// src/DocumentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/documents')
      .then(response => {
        setDocuments(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch documents');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Uploaded Documents</h2>
      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">File Name</th>
              <th className="p-2 border">Size (KB)</th>
              <th className="p-2 border">Download</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{doc.name}</td>
                <td className="p-2 border">{doc.description}</td>
                <td className="p-2 border">{doc.file_name}</td>
                <td className="p-2 border">{doc.file_size_in_kilobytes}</td>
                <td className="p-2 border">
                  <a
                    href={`http://127.0.0.1:8000/storage/${doc.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DocumentList;
