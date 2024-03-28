import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddCommentForm } from "../common/comments/addCommentForm";
import { CommentsList } from "../common/comments/commentsList";
import API from "../../api";
import { orderBy } from "lodash";

export const Comment = () => {
  const [user, setUser] = useState();
  const [comments, setComments] = useState([]);
  const { userId } = useParams();

  const deleteComment = (commentId) => {
    API.comments
      .remove(commentId)
      .then(() => {
        return API.comments.fetchCommentsForUser(userId); // Получить обновленный список комментариев после удаления
      })
      .then((updatedComments) => {
        setComments(updatedComments); // Установить новый список комментариев
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };
  const handleAddComment = (comment) => {
    API.comments
      .add({ ...comment, pageId: userId })
      .then(() => {
        return API.comments.fetchCommentsForUser(userId); // Получить обновленный список комментариев после удаления
      })
      .then((updatedComments) => {
        setComments(updatedComments); // Установить новый список комментариев
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
    API.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return user ? (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <h2>Add Comments</h2>
          <AddCommentForm onClick={handleAddComment} />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <CommentsList
            comments={sortedComments}
            deleteComment={deleteComment}
          />
        </div>
      </div>
    </>
  ) : (
    <h2>Loading</h2>
  );
};
