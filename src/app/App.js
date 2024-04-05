
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/layouts/login";
import { Main } from "./components/layouts/main";
import { Users } from "./components/layouts/users";
import { NavBar } from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { QualitiesProvider } from "./hooks/useQualities";
import { ProfessionProvider } from "./hooks/useProfession";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />} >
          <Route index element={<Main />} />
          <Route path="login/:type?" element={
            <QualitiesProvider>
              <ProfessionProvider><Login /></ProfessionProvider>
            </QualitiesProvider>
          } />
          <Route path="users/:userId?/:edit?" element={
            <QualitiesProvider>
              <ProfessionProvider><Users /></ProfessionProvider>
            </QualitiesProvider>} />
        </Route>
      </Routes>
      <ToastContainer />
    </>

  );
}
export default App