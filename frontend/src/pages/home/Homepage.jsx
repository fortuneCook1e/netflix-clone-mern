import { useAuthStore } from "../../store/authUser.store";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const Homepage = () => {
  const { user } = useAuthStore();

  return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>;
};

export default Homepage;
