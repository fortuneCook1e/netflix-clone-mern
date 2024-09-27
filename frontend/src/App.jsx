import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser.store.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";

const App = () => {
  const { user, authCheck, isCheckingAuth } = useAuthStore();
  // console.log("auth user is here:", user);

  useEffect(() => {
    authCheck();
  }, []);

  // show a loading screen while checking auth. Without this, the signup page will be shown while loading
  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />{" "}
        {/** after signed up, bring them to home page */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />{" "}
        {/** after logged in, bring them to home page */}
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/history"
          element={user ? <HistoryPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
      <Footer />
    </>
  );
};

export default App;
