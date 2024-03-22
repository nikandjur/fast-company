import { useEffect, useState } from "react";
import API from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { Qualitie } from "../../ui/qualitie";

export const UserPage = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);

  const navigate = useNavigate();

  const getAllUsers = () => navigate("/users");
  const getEditUser = () => navigate(`/users/${userId}/edit/`);
  console.log(user);
  return (
    <div className="col-md-6 offset-md-3 shadow p-4">
      {user ? (
        <div>
          UserPage
          <h1>{user.name}</h1>
          <h2>
            Профессия:
            {user.profession.name}
          </h2>
          {user.qualities.map((item) => (
            <Qualitie key={item._id} {...item} />
          ))}
          <p>Рейтинг: {user.rate}</p>
          <p>{user.completedMeetings}</p>
          <div>
            <p>
              <button onClick={getAllUsers}>все пользователи</button>
              <Link to="/users">All Users</Link>
            </p>
            <p>
              <button onClick={getEditUser}>редактировать</button>
              <Link to={`/users/${userId}/edit/`}>Edit</Link>
            </p>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};
