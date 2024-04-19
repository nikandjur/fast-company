import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/layouts/login";
import { Main } from "./components/layouts/main";
import { Users } from "./components/layouts/users";
import { NavBar } from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { QualitiesProvider } from "./hooks/useQualities";
import { ProfessionProvider } from "./hooks/useProfession";
import AuthProvider, { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/common/protectedRoute";
import { LogOut } from "./components/ui/logOut";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Main />} />
          <Route path="login/:type?" element={<LoginWithProviders />} />
          <Route path="users/:userId?/:edit?" element={<ProtectedUsersWithProviders />} />
          <Route path="/logout" element={<LogOut />} />

        </Route>
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
};

const LoginWithProviders = () => (
  <QualitiesProvider>
    <ProfessionProvider>
      <Login />
    </ProfessionProvider>
  </QualitiesProvider>
);

const ProtectedUsersWithProviders = () => (
  <QualitiesProvider>
    <ProfessionProvider>
      <ProtectedRoute

        component={Users}
      />
    </ProfessionProvider>
  </QualitiesProvider>
);



export default App;
