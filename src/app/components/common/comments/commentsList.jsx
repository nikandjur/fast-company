import { Comment } from "./comment";

export const CommentsList = ({ comments, onRemove }) => {
  return (
    <>
      <hr />
      {comments &&
        comments.map((comment) => (
          <Comment key={comment._id} {...comment} onRemove={onRemove} />
        ))}
    </>
  );
};
