import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export const LogOut = (params) => {
  const { logOut } = useAuth();
  useEffect(() => {
    logOut();
  }, []);
  return <>Loading...</>;
};
