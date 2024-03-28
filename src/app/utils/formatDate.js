export const formatDate = (timestamp) => {
  const date = new Date(parseInt(timestamp));
  const now = new Date();
  const diff = Math.abs(now - date);
  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) {
    return "1 минуту назад";
  } else if (minutes < 5) {
    return `${minutes} минут назад`;
  } else if (minutes < 10) {
    return "5 минут назад";
  } else if (minutes < 30) {
    return "10 минут назад";
  } else if (minutes < 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}.${remainingMinutes} часа назад`;
  } else if (date.toDateString() === now.toDateString()) {
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  } else {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
};
