import axios from 'axios';
import { create } from 'zustand';

export const useStore = create((set) => ({
  userData: [],
  loading: false,
  error: null,
  savejob: [],
  productdetails: null,
  search:[],
  theme: true,
  userdata:[],

 searchhandler: (search) => {
  const lowerCaseSearch = search.toLowerCase();
  const filteredProducts = userData.filter((value) => value.title.toLowerCase().includes(lowerCaseSearch));
  set({ userData: filteredProducts });
 
},
   // Initialize as null for single product details

  savejobs: (job) => {
    const existingJob = savejob.find((item) => item._id === job);
    if (existingJob) {
      console.log('Job already exists in savejob');
    } else {
      set((state) => ({ savejob: [...state.savejob, job] }));
      localStorage.setItem('savejob', JSON.stringify({...state.savejob}));
    }
  
  },
  savedelete: (job) => {
    set((state) => ({ savejob: state.savejob.filter((item) => item._id !== job._id) }));
    localStorage.setItem('savejob', JSON.stringify({...state.savejob}));
  },

  productdetailshandler: (productDetails) => {
    set({ productdetails: productDetails }); // Set productdetails to the new product object
    console.log('Product details set:', productDetails);
  },
  filterProduct: (searchTerm) => {
    set((state) => {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filteredProducts = state.userData.filter((job) =>
        job.title.toLowerCase().includes(lowerCaseSearch)
      );
      return { search: filteredProducts };
    });
  },
  clearsearchfilter: () => {
      
    set({ search: [] });
  },
  handleLogout : () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ userdata: null });
  },

loginhandler: async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/login", data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ userdata: data });
      console.log(data);
     
    } catch (error) {
      console.error(error);
      alert(`Login failed: ${error.response.data.error}`);
    }
    
  },
  registerhandler : (data) => {
    // Handle registration logic here
   
    try {
      const response = axios.post('http://localhost:4000/signup', data);
      console.log('Registration successful:', response.data);
      
    } catch (error) {
      console.error('Registration failed:', error);
    }

    // Navigate to a new page or show a success message
   
  },
  

  fetchUserData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:4000/api/job');
      set({ userData: response.data, loading: false , search:response.data});
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}))

 

export default useStore;
