//zustand 
import create from 'zustand';

const useUploadStore = create((set) => ({
    text: "",
    setText: (text) => set({ text }),
}));

export default useUploadStore;