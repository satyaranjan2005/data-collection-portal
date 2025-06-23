// Helper functions for the application

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Format input field names for display
export const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Check if user is admin
export const isAdmin = (user) => {
  return user && user.role === 'admin';
};

// Filter data by username
export const filterByUsername = (data, username) => {
  return data.filter(item => item.username === username);
};

// Sort array by date (newest first)
export const sortByDate = (array, dateField = 'createdAt') => {
  return array.sort((a, b) => new Date(b[dateField]) - new Date(a[dateField]));
};
