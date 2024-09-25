import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser.store.js";
import { useEffect } from "react";

const App = () => {
  const { user, authCheck, isCheckingAuth } = useAuthStore();
  // console.log("auth user is here:", user);

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
      <Footer />
    </>
  );
};

export default App;
