import { useState, useEffect, useCallback } from 'react';
import dataService from '../services/dataService.js';
import { useAuth } from './useAuth.jsx';

// Custom hook for managing form data
export const useFormData = (type) => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const username = user?.role === 'admin' ? null : user?.username;
      let result = [];
      
      switch (type) {
        case 'academic_details':
          result = dataService.getAcademicDetails(username);
          break;
        case 'internships':
          result = dataService.getInternships(username);
          break;
        case 'work_experience':
          result = dataService.getWorkExperience(username);
          break;
        case 'certificates':
          result = dataService.getCertificates(username);
          break;
        case 'skills':
          result = dataService.getSkills(username);
          break;
        default:
          result = [];
      }
      
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, type]);
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, type, fetchData]);

  const addData = async (formData) => {
    try {
      let result;
      const dataWithUser = { ...formData, username: user.username, name: user.name };
      
      switch (type) {
        case 'academic_details':
          result = dataService.addAcademicDetails(dataWithUser);
          break;
        case 'internships':
          result = dataService.addInternship(dataWithUser);
          break;
        case 'work_experience':
          result = dataService.addWorkExperience(dataWithUser);
          break;
        case 'certificates':
          result = dataService.addCertificate(dataWithUser);
          break;
        case 'skills':
          result = dataService.addSkill(dataWithUser);
          break;
        default:
          throw new Error('Invalid data type');
      }
      
      if (result.success) {
        await fetchData(); // Refresh data
        return result;
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const updateData = async (id, formData) => {
    try {
      let result;
      
      switch (type) {
        case 'academic_details':
          result = dataService.updateAcademicDetails(id, formData);
          break;
        case 'internships':
          result = dataService.updateInternship(id, formData);
          break;
        case 'work_experience':
          result = dataService.updateWorkExperience(id, formData);
          break;
        case 'certificates':
          result = dataService.updateCertificate(id, formData);
          break;
        case 'skills':
          result = dataService.updateSkill(id, formData);
          break;
        default:
          throw new Error('Invalid data type');
      }
      
      if (result.success) {
        await fetchData(); // Refresh data
        return result;
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const deleteData = async (id) => {
    try {
      let result;
      
      switch (type) {
        case 'academic_details':
          result = dataService.deleteAcademicDetails(id);
          break;
        case 'internships':
          result = dataService.deleteInternship(id);
          break;
        case 'work_experience':
          result = dataService.deleteWorkExperience(id);
          break;
        case 'certificates':
          result = dataService.deleteCertificate(id);
          break;
        case 'skills':
          result = dataService.deleteSkill(id);
          break;
        default:
          throw new Error('Invalid data type');
      }
      
      if (result.success) {
        await fetchData(); // Refresh data
        return result;
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  return {
    data,
    loading,
    error,
    addData,
    updateData,
    deleteData,
    refreshData: fetchData
  };
};
