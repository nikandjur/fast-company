export const paginate = (users, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  return [...users].splice(startIndex, pageSize);
  // return users.slice(startIndex, startIndex + pageSize);
};
