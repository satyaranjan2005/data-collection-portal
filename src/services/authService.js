import { STORAGE_KEYS, DEFAULT_ADMIN } from '../utils/constants.js';
import { generateId } from '../utils/helpers.js';

// Local storage service for managing user authentication
class AuthService {
  constructor() {
    this.initializeDefaultAdmin();
  }

  // Initialize default admin user if not exists
  initializeDefaultAdmin() {
    const users = this.getAllUsers();
    const adminExists = users.find(user => user.role === 'admin');
    
    if (!adminExists) {
      const users = this.getAllUsers();
      users.push(DEFAULT_ADMIN);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  }

  // Get all users from localStorage
  getAllUsers() {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  }

  // Login user
  login(username, password) {
    const users = this.getAllUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      const userSession = { ...user };
      delete userSession.password; // Don't store password in session
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userSession));
      return { success: true, user: userSession };
    }
    
    return { success: false, message: 'Invalid username or password' };
  }

  // Logout user
  logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  // Get current logged-in user
  getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  }

  // Register new user (admin only)
  registerUser(userData) {
    const users = this.getAllUsers();
    
    // Check if username already exists
    if (users.find(user => user.username === userData.username)) {
      return { success: false, message: 'Username already exists' };
    }

    const newUser = {
      id: generateId(),
      ...userData,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    return { success: true, user: newUser };
  }

  // Update user (admin only)
  updateUser(userId, userData) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    users[userIndex] = { ...users[userIndex], ...userData };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    return { success: true, user: users[userIndex] };
  }

  // Delete user (admin only)
  deleteUser(userId) {
    const users = this.getAllUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    
    if (filteredUsers.length === users.length) {
      return { success: false, message: 'User not found' };
    }

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filteredUsers));
    return { success: true };
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  // Check if current user is admin
  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  }
}

export default new AuthService();
