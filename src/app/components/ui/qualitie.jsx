export const Qualitie = ({ name, color }) => {
  return <span className={"badge m-1 bg-" + color}>{name}</span>;
};
