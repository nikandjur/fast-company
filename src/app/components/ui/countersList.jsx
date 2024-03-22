import React, { useState } from "react";
import Counter from "./counter";

const CountersList = () => {
  const initialState = [
    { id: 0, value: 0, name: "Ненужная вещь", price: "200" },
    { id: 1, value: 4, name: "Ложка" },
    { id: 2, value: 0, name: "Вилка" },
    { id: 3, value: 0, name: "Тарелка" },
    { id: 4, value: 0, name: "Набор минималиста" },
  ];

  const [values, setValues] = useState(initialState);
  const handleDelete = (id) => {
    const newCounters = values.filter((c) => c.id !== id);
    setValues(newCounters);
  };
  const handleReset = () => {
    setValues(initialState);
    console.log("handle reset");
  };
  const handleIncrement = (id) => {
    setValues(
      values.map((c) => (c.id === id ? { ...c, value: c.value + 1 } : c))
    );
  };

  const handleDecrement = (id) => {
    console.log("handle decrement");
    const index = values.findIndex((c) => c.id === id);

    if (index !== -1) {
      const updatedValues = [...values];
      updatedValues[index].value--;
      setValues(updatedValues);
    }
  };

  return (
    <>
      {values.map((count) => (
        <Counter
          key={count.id}
          onDelete={handleDelete}
          {...count}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      ))}
      <button className="btn btn-primary btn-sm m-2" onClick={handleReset}>
        Сброс
      </button>
    </>
  );
};
export default CountersList;
