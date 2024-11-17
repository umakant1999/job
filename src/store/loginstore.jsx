// loginstore.js
import create from 'zustand';
import axios from 'axios';

const loginstore = create((set) => ({
  loading: false,
  error: null,
  
  login: async (data) => {
    set({ loading: true, error: null });
    
    try {
      const response = await axios.post('http://localhost:4000/login', data);
      
      // Handle success: You may want to store tokens or user data from the response
      set({ loading: false });
      console.log('Login successful:', response.data);
      // Optionally, set user data in the store or redirect as needed
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || 'Login failed',
      });
    }
  }
}));

export default loginstore;
