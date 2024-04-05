import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import userService from "../services/user.service";

const UserContext = createContext();

export const useUsers = () => {
  return useContext(UserContext);
};

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const { content } = await userService.fetchAll();
      setUsers(content);
      setLoading(false);
    } catch (error) {
      const { message } = error.response.data;
      setError(message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <UserContext.Provider value={{ users }}>
      {isLoading ? <p>Loading...</p> : children}
    </UserContext.Provider>
  );
};

export default UsersProvider;
