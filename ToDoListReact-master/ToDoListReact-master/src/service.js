import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = apiUrl;

// Interceptor לטיפול בשגיאות
axios.interceptors.response.use(
  (response) => response, // אם אין שגיאה – מחזירים את התגובה כמות שהיא
  (error) => {
    console.error('Axios Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/items`)    
    return result.data;
  },

  addTask: async(name)=>{
    console.log('addTask', name)
    try {
      const result = await axios.post('/items', { name });
      return result.data;
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
      const result = await axios.put(`/items/${id}`, { isComplete });
      return result.data;
    } catch (error) {
      console.error('Failed to set task completion:', error);
    }
  },
  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      const result = await axios.delete(`/items/${id}`);
      return result.data;
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }

};
