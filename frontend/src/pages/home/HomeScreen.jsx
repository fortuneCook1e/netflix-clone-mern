import { useAuthStore } from "../../store/authUser.store";

const HomeScreen = () => {
  const { logout } = useAuthStore();

  return (
    <div className="text-black ">
      HomeScreen
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomeScreen;
