import React, { useState } from 'react';
import { useFormData } from '../../hooks/useFormData.jsx';
import { Building, Save, Edit, Trash2, Plus } from 'lucide-react';

const WorkExperienceForm = () => {
  const { data, loading, addData, updateData, deleteData } = useFormData('work_experience');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    project: '',
    role: '',
    fromDate: '',
    toDate: '',
    location: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      company: '',
      project: '',
      role: '',
      fromDate: '',
      toDate: '',
      location: '',
      description: ''
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
        alert(isEditing ? 'Work experience updated successfully!' : 'Work experience added successfully!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch {
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      company: item.company,
      project: item.project,
      role: item.role,
      fromDate: item.fromDate,
      toDate: item.toDate,
      location: item.location,
      description: item.description
    });
    setIsEditing(true);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this work experience record?')) {
      const result = await deleteData(id);
      if (result.success) {
        alert('Work experience record deleted successfully!');
      } else {
        alert('Error deleting record: ' + result.message);
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
        <Building size={32} style={{ marginRight: '1rem', color: '#667eea' }} />
        <h1 style={{ margin: 0, color: '#333' }}>Work Experience</h1>
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
          {isEditing ? 'Edit Work Experience' : 'Add Work Experience'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            {['company', 'project', 'role', 'location'].map((field) => (
              <div key={field}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'capitalize'
                }}>
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
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
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                From Date
              </label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
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
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                To Date
              </label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
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
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: '#333'
            }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e1e5e9',
                borderRadius: '5px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
              placeholder="Describe your work experience, responsibilities, and achievements"
            />
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
              {isEditing ? 'Update' : 'Add'} Work Experience
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
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Your Work Experience Records</h2>
        
        {data.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: '#f8f9fa',
            borderRadius: '10px',
            color: '#666'
          }}>
            <Building size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No work experience records found. Add your first work experience above.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
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
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <strong style={{ color: '#667eea' }}>Company:</strong>
                    <div style={{ marginTop: '0.25rem' }}>{item.company}</div>
                  </div>
                  <div>
                    <strong style={{ color: '#667eea' }}>Project:</strong>
                    <div style={{ marginTop: '0.25rem' }}>{item.project}</div>
                  </div>
                  <div>
                    <strong style={{ color: '#667eea' }}>Role:</strong>
                    <div style={{ marginTop: '0.25rem' }}>{item.role}</div>
                  </div>
                  <div>
                    <strong style={{ color: '#667eea' }}>Duration:</strong>
                    <div style={{ marginTop: '0.25rem' }}>
                      {new Date(item.fromDate).toLocaleDateString()} - {new Date(item.toDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <strong style={{ color: '#667eea' }}>Location:</strong>
                    <div style={{ marginTop: '0.25rem' }}>{item.location}</div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#667eea' }}>Description:</strong>
                  <div style={{ marginTop: '0.25rem', lineHeight: '1.5' }}>{item.description}</div>
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

export default WorkExperienceForm;
