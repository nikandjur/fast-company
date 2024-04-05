import { Link } from "react-router-dom";
import { Bookmark } from "../bookmark";
import { Qualitie } from "../../ui/qualities";
import { Profession } from "../../ui/profession";

export const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onToggleBookMark,
  onDelete,
}) => {
  return (
    <tr key={_id}>
      <td>
        <Link to={`/users/${_id}`}>{name}</Link>
      </td>
      <td>
        {qualities.map((item) => (
          <Qualitie key={item._id} {...item} />
        ))}
      </td>
      <td>{profession && <Profession id={profession} />}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <Bookmark status={bookmark} onClick={() => onToggleBookMark(_id)} />
      </td>
      <td>
        <button onClick={() => onDelete(_id)} className="btn btn-danger">
          delete
        </button>
      </td>
    </tr>
  );
};
