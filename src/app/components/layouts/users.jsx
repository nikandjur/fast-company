import { useParams } from "react-router-dom";
import UserPage from "../page/userPage";
import UsersListPage from "../page/usersListPages";
import EditUserPage from "../page/editUserPage";

export const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  return (
    <div className="row">
      {edit ? (
        <EditUserPage userId={userId} />
      ) : userId ? (
        <UserPage userId={userId} />
      ) : (
        <UsersListPage />
      )}
    </div>
  );
};
