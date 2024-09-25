import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false, // loading state
  isCheckingAuth: true,
  signup: async (credentials) => {
    try {
      set({ isSigningUp: true });
      // make an api call to the signup endpoint
      const res = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: res.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Error creating account");
      /** we cannot access the res.data in the error because  when an error occurs,
       * Axios throws an error object, which contains a response property.
       * This response contains details about the failed request,
       * including any data sent by the server in response to the error */
      set({ user: null, isSigningUp: false });
    }
  },
  login: async () => {},
  logout: async () => {},
  authCheck: async () => {
    // the purpose of this is to determine which screen should be rendered (e.g. homeScreen or authScreen)
    try {
      set({ isCheckingAuth: true });
      const res = await axios.get("/api/v1/auth/authcheck");
      set({ user: res.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
