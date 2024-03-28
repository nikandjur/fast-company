import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api";
import { Comment } from "../../ui/comment";
import { MeetingCard } from "../../ui/meetingCard";
import { QualitiesCard } from "../../ui/qualitiesCard";
import { UserCard } from "../../ui/userCard";

export const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const getEditUser = () => navigate(`/users/${userId}/edit/`);

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);

  return (
    <div className="container">
      {user ? (
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} onClick={getEditUser} />
            <QualitiesCard qualities={user.qualities} />
            <MeetingCard meetings={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <Comment />
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};
