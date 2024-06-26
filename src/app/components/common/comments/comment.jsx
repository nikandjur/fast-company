import { useAuth } from "../../../hooks/useAuth";
import { useUsers } from "../../../hooks/useUsers";
import { FormatDate } from "../../../utils/formatDate";

export const Comment = ({
  content,
  created_at: created,
  _id: id,
  userId,
  onRemove,
}) => {
  const { getUserById } = useUsers();
  const { currentUser } = useAuth();
  const user = getUserById(userId);

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user && user.name}{" "}
                    <span className="small">- {FormatDate(created)}</span>
                  </p>
                  {currentUser._id === userId && (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onRemove(id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
