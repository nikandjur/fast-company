import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import professionService from "../services/profession.service";

const ProfessionContext = createContext();

export const useProfessions = () => {
  return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getProfessionList = async () => {
    try {
      const { content } = await professionService.fetchAll();
      setProfessions(content);
      setLoading(false);
    } catch (error) {
      const { message } = error.response.data;
      setError(message);
    }
  };

  const getProfession = (id) => {
    return professions.find((q) => q._id === id);
  };

  useEffect(() => {
    getProfessionList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <ProfessionContext.Provider
      value={{ professions, isLoading, getProfession }}
    >
      {children}
    </ProfessionContext.Provider>
  );
};
