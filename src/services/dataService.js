import { STORAGE_KEYS } from '../utils/constants.js';
import { generateId } from '../utils/helpers.js';

// Generic data service for managing user data
class DataService {
  // Get data by type and optional username filter
  getData(type, username = null) {
    const data = localStorage.getItem(STORAGE_KEYS[type.toUpperCase()]);
    const parsedData = data ? JSON.parse(data) : [];
    
    if (username) {
      return parsedData.filter(item => item.username === username);
    }
    
    return parsedData;
  }

  // Add new data entry
  addData(type, data) {
    const existingData = this.getData(type);
    const newEntry = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    existingData.push(newEntry);
    localStorage.setItem(STORAGE_KEYS[type.toUpperCase()], JSON.stringify(existingData));
    
    return { success: true, data: newEntry };
  }

  // Update data entry
  updateData(type, id, data) {
    const existingData = this.getData(type);
    const index = existingData.findIndex(item => item.id === id);
    
    if (index === -1) {
      return { success: false, message: 'Entry not found' };
    }
    
    existingData[index] = {
      ...existingData[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEYS[type.toUpperCase()], JSON.stringify(existingData));
    
    return { success: true, data: existingData[index] };
  }

  // Delete data entry
  deleteData(type, id) {
    const existingData = this.getData(type);
    const filteredData = existingData.filter(item => item.id !== id);
    
    if (filteredData.length === existingData.length) {
      return { success: false, message: 'Entry not found' };
    }
    
    localStorage.setItem(STORAGE_KEYS[type.toUpperCase()], JSON.stringify(filteredData));
    
    return { success: true };
  }

  // Get single data entry by ID
  getDataById(type, id) {
    const data = this.getData(type);
    return data.find(item => item.id === id) || null;
  }

  // Academic Details specific methods
  getAcademicDetails(username = null) {
    return this.getData('academic_details', username);
  }

  addAcademicDetails(data) {
    return this.addData('academic_details', data);
  }

  updateAcademicDetails(id, data) {
    return this.updateData('academic_details', id, data);
  }

  deleteAcademicDetails(id) {
    return this.deleteData('academic_details', id);
  }

  // Internships specific methods
  getInternships(username = null) {
    return this.getData('internships', username);
  }

  addInternship(data) {
    return this.addData('internships', data);
  }

  updateInternship(id, data) {
    return this.updateData('internships', id, data);
  }

  deleteInternship(id) {
    return this.deleteData('internships', id);
  }

  // Work Experience specific methods
  getWorkExperience(username = null) {
    return this.getData('work_experience', username);
  }

  addWorkExperience(data) {
    return this.addData('work_experience', data);
  }

  updateWorkExperience(id, data) {
    return this.updateData('work_experience', id, data);
  }

  deleteWorkExperience(id) {
    return this.deleteData('work_experience', id);
  }

  // Certificates specific methods
  getCertificates(username = null) {
    return this.getData('certificates', username);
  }

  addCertificate(data) {
    return this.addData('certificates', data);
  }

  updateCertificate(id, data) {
    return this.updateData('certificates', id, data);
  }

  deleteCertificate(id) {
    return this.deleteData('certificates', id);
  }

  // Skills specific methods
  getSkills(username = null) {
    return this.getData('skills', username);
  }

  addSkill(data) {
    return this.addData('skills', data);
  }

  updateSkill(id, data) {
    return this.updateData('skills', id, data);
  }

  deleteSkill(id) {
    return this.deleteData('skills', id);
  }

  // Get all data for admin dashboard
  getAllData() {
    return {
      academicDetails: this.getAcademicDetails(),
      internships: this.getInternships(),
      workExperience: this.getWorkExperience(),
      certificates: this.getCertificates(),
      skills: this.getSkills()
    };
  }

  // Get user statistics
  getUserStats(username) {
    return {
      academicDetails: this.getAcademicDetails(username).length,
      internships: this.getInternships(username).length,
      workExperience: this.getWorkExperience(username).length,
      certificates: this.getCertificates(username).length,
      skills: this.getSkills(username).length
    };
  }
}

export default new DataService();
