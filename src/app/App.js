
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/layouts/login";
import { Main } from "./components/layouts/main";
import { Users } from "./components/layouts/users";
import { NavBar } from "./components/ui/navBar";

function App() {

  return (
    <Routes>
      <Route path="/" element={<NavBar />} >
        <Route index element={<Main />} />
        <Route path="login/:type?" element={<Login />} />
        <Route path="users/:userId?/:edit?" element={<Users />} />
      </Route>
    </Routes>
  );
}
export default App