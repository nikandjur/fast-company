import { useNavigate, useParams } from "react-router-dom";
import UserPage from "../page/userPage";
import UsersListPage from "../page/usersListPages";
import EditUserPage from "../page/editUserPage";
import UsersProvider from "../../hooks/useUsers";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

export const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (edit && userId !== currentUser._id) {
      navigate(`/users/${currentUser._id}/edit`);
    }
  }, [edit, userId, currentUser, navigate]);

  return (
    <div>
      <UsersProvider>
        {edit ? (
          userId === currentUser._id ? (
            <EditUserPage />
          ) : null
        ) : userId ? (
          <UserPage userId={userId} />
        ) : (
          <UsersListPage />
        )}
      </UsersProvider>
    </div>
  );
};
