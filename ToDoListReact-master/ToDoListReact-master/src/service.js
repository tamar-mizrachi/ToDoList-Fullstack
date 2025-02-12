import axios from 'axios';
import config from './config';

console.log(config.apiUrl);

// Interceptor לטיפול בשגיאות
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('API Error:', error); 
    console.log("good");
    
    return Promise.reject(error); 
  }
);

export default {
    getTasks: async () => {
      try {
        const result = await axios.get(`${config.apiUrl}/items`);
        console.log(result.data);
        
        return result.data;
      } catch (err) {
        console.error(err);
      }
    },
    addTask: async (name) => {
      console.log('addTask', name);
      try {
        const result = await axios.post(`${config.apiUrl}/items`, { name: name, isComplete: false });
        return result.data; 
      } catch (err) {
        console.error("Error", err);
      }
    },

    setCompleted: async (id, isComplete) => {
      console.log('setCompleted', { id, isComplete });
      try {
        const result = await axios.put(`${config.apiUrl}/items/${id}`, { isComplete: isComplete });
        return result.data;
      } catch (err) {
        console.error("Error", err);
      }
    },
    deleteTask: async (id) => {
      console.log('deleteTask');
      try {
        const result = await axios.delete(`${config.apiUrl}/items/${id}`);
        return result.data;
      } catch (err) {
        console.error("Error", err);
      }
    }

};
