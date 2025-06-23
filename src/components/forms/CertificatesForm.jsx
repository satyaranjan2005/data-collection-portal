import React, { useState } from 'react';
import { useFormData } from '../../hooks/useFormData.jsx';
import { Award, Save, Edit, Trash2, Plus } from 'lucide-react';

const CertificatesForm = () => {
  const { data, loading, addData, updateData, deleteData } = useFormData('certificates');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    certificate: '',
    domain: ''
  });

  const resetForm = () => {
    setFormData({
      certificate: '',
      domain: ''
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = isEditing 
        ? await updateData(editingId, formData)
        : await addData(formData);
      
      if (result.success) {
        resetForm();
        alert(isEditing ? 'Certificate updated successfully!' : 'Certificate added successfully!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch {
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      certificate: item.certificate,
      domain: item.domain
    });
    setIsEditing(true);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      const result = await deleteData(id);
      if (result.success) {
        alert('Certificate deleted successfully!');
      } else {
        alert('Error deleting certificate: ' + result.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #e9ecef'
      }}>
        <Award size={32} style={{ marginRight: '1rem', color: '#667eea' }} />
        <h1 style={{ margin: 0, color: '#333' }}>Certificates</h1>
      </div>

      {/* Form */}
      <div style={{
        background: '#f8f9fa',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '1.5rem',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {isEditing ? <Edit size={20} /> : <Plus size={20} />}
          {isEditing ? 'Edit Certificate' : 'Add Certificate'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                Certificate Name
              </label>
              <input
                type="text"
                name="certificate"
                value={formData.certificate}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e1e5e9',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter certificate name"
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                Domain
              </label>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e1e5e9',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                placeholder="e.g., Web Development, Data Science"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              style={{
                background: '#667eea',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Save size={16} />
              {isEditing ? 'Update' : 'Add'} Certificate
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Data List */}
      <div>
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Your Certificates</h2>
        
        {data.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: '#f8f9fa',
            borderRadius: '10px',
            color: '#666'
          }}>
            <Award size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No certificates found. Add your first certificate above.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
            {data.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{item.certificate}</h3>
                  <div style={{ 
                    color: '#667eea',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    background: '#f0f4ff',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '3px',
                    display: 'inline-block'
                  }}>
                    {item.domain}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesForm;
