export const GroupList = ({
  items,
  onItemSelect,
  selectedItem,
  valueProps,
  contentProps,
}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li
          key={items[item][valueProps]}
          onClick={() => onItemSelect(items[item])}
          className={
            selectedItem === items[item]
              ? "list-group-item active"
              : "list-group-item"
          }
          aria-current="true"
          role="button"
        >
          {items[item][contentProps]}
        </li>
      ))}
    </ul>
  );
};
GroupList.defaultProps = {
  valueProps: "_id",
  contentProps: "name",
};
// {
//   "doctor": {
//       "_id": "67rdca3eeb7f6fgeed471818",
//       "name": "Доктор"
//   },
