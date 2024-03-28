import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import API from "../../../api";

export const Comment = ({ _id, userId, content, onClick, created_at }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.users.getById(userId).then((data) => setUser(data));
    setLoading(false);
  }, []);

  return !loading ? (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${(
                Math.random() + 1
              )
                .toString(36)
                .substring(7)}.svg`}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user && user.name}
                    <span className="small"> - {formatDate(created_at)}</span>
                  </p>
                  <button
                    onClick={() => onClick(_id)}
                    className="btn btn-sm text-primary d-flex align-items-center"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};
