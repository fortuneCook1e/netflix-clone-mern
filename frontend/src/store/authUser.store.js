import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false, // loading state
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
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
  login: async (credentials) => {
    try {
      set({ isLoggingIn: true });
      // make an api call to the login endpoint
      const res = await axios.post("/api/v1/auth/login", credentials);
      set({ user: res.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Login Failed");
      set({ user: null, isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      set({ isLoggingOut: true });
      // make an api call to the logout endpoint
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Error logging out");
    }
  },
  authCheck: async () => {
    // the purpose of this is to determine which screen should be rendered (e.g. homeScreen or authScreen)
    // it will be called as a useEffect when the app is started
    try {
      set({ isCheckingAuth: true });
      const res = await axios.get("/api/v1/auth/authcheck");
      set({ user: res.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
