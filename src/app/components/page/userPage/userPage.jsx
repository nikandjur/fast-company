import { useNavigate } from "react-router-dom";
import { CommentsProvider } from "../../../hooks/useComments";
import { useUsers } from "../../../hooks/useUsers";
import { Comments } from "../../ui/comments";
import { MeetingCard } from "../../ui/meetingCard";
import { QualitiesCard } from "../../ui/qualitiesCard";
import { UserCard } from "../../ui/userCard";

export const UserPage = ({ userId }) => {
  const { getUserById } = useUsers();
  const user = getUserById(userId);

  const navigate = useNavigate();
  const getEditUser = () => navigate(`/users/${userId}/edit/`);

  return (
    <div className="container">
      {user ? (
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} onClick={getEditUser} />
            <QualitiesCard data={user.qualities} />
            <MeetingCard meetings={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <CommentsProvider>
              <Comments />
            </CommentsProvider>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};
