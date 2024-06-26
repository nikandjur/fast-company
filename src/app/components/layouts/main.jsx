import React from "react";
import useMockData from "../../utils/mockData";

export const Main = () => {
  const { error, initialize, progress, status } = useMockData();

  const handleClick = () => {
    console.log("clicked");
    initialize();
  };

  return (
    <div className="container mt-5">
      <h1>Main</h1>
      <h3>Initialize in Firebase </h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>
        Click to initialize Now
      </button>
    </div>
  );
};
