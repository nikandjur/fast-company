import React from "react";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ id }) => {
  const { getQuality } = useQualities();

  const { name, color, _id } = getQuality(id);

  return (
    <span className={"badge m-1 bg-" + color} key={_id}>
      {name}
    </span>
  );
};

export default Quality;

// import { useProfessions } from "../../hooks/useProfession";

// export const Profession = ({ id }) => {
//   const { isLoading, getProfession } = useProfessions();
//   if (isLoading) return "Loading...";
//   const profession = getProfession(id);

//   return <>{profession.name}</>;
// };
