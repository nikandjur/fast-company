import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setLoading(false);
      } catch (error) {
        const { message } = error.response.data;
        setError(message);
      }
    };
    getQualities();
  }, []);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <QualitiesContext.Provider
      value={{
        isLoading,
        qualities,
        getQuality,
        // updateQuality,
        // addQuality,
        // deleteQuality,
      }}
    >
      {children}
      {/* {isLoading ? <p>Loading...</p> : children} */}
    </QualitiesContext.Provider>
  );
};
