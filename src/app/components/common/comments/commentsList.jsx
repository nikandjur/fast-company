import { Comment } from "./comment";

export const CommentsList = ({ comments, deleteComment }) => {
  return (
    <>
      <hr />
      {comments &&
        comments.map((comment) => (
          <Comment key={comment._id} {...comment} onClick={deleteComment} />
        ))}
    </>
  );
};
