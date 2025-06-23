import React, { useState, useEffect } from 'react';
import authService from '../../services/authService.js';
import { Users, Plus, Edit, Trash2, UserPlus } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers = authService.getAllUsers();
    setUsers(allUsers.filter(user => user.role !== 'admin')); // Don't show admin users
  };

  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      password: ''
    });
    setIsAdding(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (isEditing) {
        result = authService.updateUser(editingId, formData);
      } else {
        result = authService.registerUser(formData);
      }
      
      if (result.success) {
        resetForm();
        loadUsers();
        alert(isEditing ? 'User updated successfully!' : 'User added successfully!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch {
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      username: user.username,
      password: '' // Don't pre-fill password for security
    });
    setIsEditing(true);
    setEditingId(user.id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const result = authService.deleteUser(id);
      if (result.success) {
        loadUsers();
        alert('User deleted successfully!');
      } else {
        alert('Error deleting user: ' + result.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #e9ecef'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Users size={32} style={{ marginRight: '1rem', color: '#667eea' }} />
          <h1 style={{ margin: 0, color: '#333' }}>User Management</h1>
        </div>
        
        <button
          onClick={() => setIsAdding(!isAdding)}
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
          <UserPlus size={16} />
          {isAdding ? 'Cancel' : 'Add New User'}
        </button>
      </div>

      {/* Add/Edit User Form */}
      {isAdding && (
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
            {isEditing ? 'Edit User' : 'Add New User'}
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
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
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
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
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
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder={isEditing ? "Leave empty to keep current password" : "Enter password"}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                style={{
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                {isEditing ? 'Update User' : 'Add User'}
              </button>

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
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div>
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
          All Users ({users.length})
        </h2>
        
        {users.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: '#f8f9fa',
            borderRadius: '10px',
            color: '#666'
          }}>
            <Users size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No users found. Add your first user above.</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1rem'
          }}>
            {users.map((user) => (
              <div
                key={user.id}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '1.2rem' }}>
                    {user.name}
                  </h3>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    <strong>Username:</strong> {user.username}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    <strong>Role:</strong> {user.role}
                  </div>
                  {user.createdAt && (
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                      <strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => handleEdit(user)}
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
                    onClick={() => handleDelete(user.id)}
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

export default UserManagement;
