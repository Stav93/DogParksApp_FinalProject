import logo from './logo.svg';
import './App.css';
import Login from "./components/Login/Login"
import UserProfile from "./components/UserProfile/UserProfile"
import MainHeader from "./components/UI/MainHeader/MainHeader"
import { useUsersContext } from "../src/Context/user-context"

function App() {
  const usersCtx = useUsersContext();
  return (
    <div className="App main">
      <MainHeader/>
      {!usersCtx.isLoggedIn && <Login/>}
      {usersCtx.isLoggedIn && <UserProfile/>}
    </div>
  );
}

export default App;
