export const SearchStatus = ({ userLength }) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1)); // lastOne содержит последнюю цифру числа number. для определения склонения .
    if (number > 4 && number < 15) return "человек тусанет";
    if ([2, 3, 4].includes(lastOne)) return "человека тусанут";
    if (lastOne === 1) return "человек тусанет";
    return "человек тусанет";
  };

  return (
    <h2>
      <span
        className={"badge " + (userLength > 0 ? "bg-primary" : "bg-danger")}
      >
        {userLength > 0
          ? `${userLength + " " + renderPhrase(userLength)} с тобой сегодня`
          : "Никто с тобой не тусанет"}
      </span>
    </h2>
  );
};

// Преобразуем число в строку, берем последний символ строки и преобразуем его обратно в число
// const lastTwoDigits = number % 100;
// const lastDigit = number % 10;
