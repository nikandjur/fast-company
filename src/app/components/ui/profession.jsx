import { useProfessions } from "../../hooks/useProfession";

export const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions();
  if (isLoading) return "Loading...";
  const profession = getProfession(id);

  return <>{profession.name}</>;
};
