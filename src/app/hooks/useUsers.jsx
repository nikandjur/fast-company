import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import { useAuth } from "./useAuth";

const UserContext = createContext();

export const useUsers = () => {
  return useContext(UserContext);
};

const UsersProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const { content } = await userService.get();
      setUsers(content);
      setLoading(false);
    } catch (error) {
      const { message } = error.response.data;
      setError(message);
    }
  };

  useEffect(() => {
    if (!isLoading && currentUser && currentUser._id) {
      // Создаем копию массива users
      const newUsers = [...users];
      // Находим индекс пользователя в массиве
      const indexUser = newUsers.findIndex((u) => u._id === currentUser._id);
      // Проверяем, что пользователь найден
      if (indexUser !== -1) {
        // Заменяем найденного пользователя новым currentUser
        newUsers[indexUser] = currentUser;
        // Обновляем состояние users
        setUsers(newUsers);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getUserById = (userId) => {
    return users.find((u) => u._id === userId);
  };

  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {isLoading ? <p>Loading...</p> : children}
    </UserContext.Provider>
  );
};

export default UsersProvider;
