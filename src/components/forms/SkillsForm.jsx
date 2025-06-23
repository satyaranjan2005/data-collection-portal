import React, { useState } from 'react';
import { useFormData } from '../../hooks/useFormData.jsx';
import { Brain, Save, Edit, Trash2, Plus } from 'lucide-react';

const SkillsForm = () => {
  const { data, loading, addData, updateData, deleteData } = useFormData('skills');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    skill: ''
  });

  const resetForm = () => {
    setFormData({
      skill: ''
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
        alert(isEditing ? 'Skill updated successfully!' : 'Skill added successfully!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch {
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      skill: item.skill
    });
    setIsEditing(true);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      const result = await deleteData(id);
      if (result.success) {
        alert('Skill deleted successfully!');
      } else {
        alert('Error deleting skill: ' + result.message);
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
        <Brain size={32} style={{ marginRight: '1rem', color: '#667eea' }} />
        <h1 style={{ margin: 0, color: '#333' }}>Skills</h1>
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
          {isEditing ? 'Edit Skill' : 'Add Skill'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr auto', 
            gap: '1rem',
            marginBottom: '1.5rem',
            alignItems: 'end'
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                Skill
              </label>
              <input
                type="text"
                name="skill"
                value={formData.skill}
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
                placeholder="e.g., JavaScript, Python, React, Project Management"
              />
            </div>

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
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              <Save size={16} />
              {isEditing ? 'Update' : 'Add'} Skill
            </button>
          </div>

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
        </form>
      </div>

      {/* Data List */}
      <div>
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Your Skills</h2>
        
        {data.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: '#f8f9fa',
            borderRadius: '10px',
            color: '#666'
          }}>
            <Brain size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No skills found. Add your first skill above.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  padding: '1rem 1.5rem',
                  borderRadius: '25px',
                  border: '2px solid #667eea',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#667eea'
                }}
              >
                <span>{item.skill}</span>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Edit skill"
                  >
                    <Edit size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Delete skill"
                  >
                    <Trash2 size={12} />
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

export default SkillsForm;
