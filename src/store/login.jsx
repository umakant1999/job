import create from 'zustand';
import axios from 'axios';

const useLoginStore = create((set) => ({
  user: null,
  error: null,
  loading: false,
  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:4000/login', data);
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ error: error.response ? error.response.data : "Login failed", loading: false });
    }
  }
}));

export default useLoginStore;
