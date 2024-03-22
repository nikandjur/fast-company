import { User } from "../common/table/user";

export const UsersTable = ({ users, onSort, onRenderSortArrow, ...rest }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("name")} scope="col">
            Имя {onRenderSortArrow("name")}
          </th>
          <th scope="col">Качества</th>
          <th onClick={() => onSort("profession.name")} scope="col">
            Профессия {onRenderSortArrow("profession.name")}
          </th>
          <th onClick={() => onSort("completedMeetings")} scope="col">
            Встретился, раз {onRenderSortArrow("completedMeetings")}
          </th>
          <th onClick={() => onSort("rate")} scope="col">
            Оценка
          </th>
          <th onClick={() => onSort("bookmark")} scope="col">
            Избранное
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User key={user._id} {...user} {...rest} />
          // {...user}Если вам нужно передать все свойства user в компонент.
          //user={user} Если вам нужен только объект user внутри компонента
        ))}
      </tbody>
    </table>
  );
};
