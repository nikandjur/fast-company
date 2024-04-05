import React from "react";
import { useNavigate } from "react-router-dom";

const BackHistoryButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button className="btn btn-primary" onClick={handleGoBack}>
      <i className="bi bi-caret-left"></i>
      Назад
    </button>
  );
};

export default BackHistoryButton;
