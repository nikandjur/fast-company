import React, { useEffect, useState } from "react";
import _ from "lodash";
import API from "../../../api";
import { paginate } from "../../../utils/paginate";
import { GroupList } from "../../common/groupList";
import { Pagination } from "../../common/pagination";
import { SearchStatus } from "../../ui/searchStatus";
import { UsersTable } from "../../ui/usersTable";
import { TextField } from "../../common/form/textField";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [users, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 8;

  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    setUsers(newArray);
    // setUsers(users.map(user => (user._id === id ? { ...user, bookmark: !user.bookmark } : user)));
  };

  const handlePageChange = (pageIndex) => {
    // if (pageIndex < 1 || pageIndex > pageSize - 1) return;
    setCurrentPage(pageIndex);
  };
  const handleSearch = ({ target }) => {
    setSelectedItem(undefined);
    setSearchQuery(target.value);
    setCurrentPage(1);
  };

  const handleProfessionSelect = (item) => {
    // if (searchQuery) setSearchQuery("");
    if (searchQuery !== "") setSearchQuery("");
    setSelectedItem(item);
    setCurrentPage(1);
  };
  const renderSortArrow = (path) => {
    if (sortBy.path === path) {
      return sortBy.order === "asc" ? (
        <i className="bi bi-caret-down-fill" />
      ) : (
        <i className="bi bi-caret-up-fill" />
      );
    }
    return null;
  };

  // const handleSort = (item) => {
  //   if (sortBy.path === item) {
  //     setSortBy((prev) => ({
  //       ...prev,
  //       order: prev.order === "asc" ? "desc" : "asc",
  //     }));
  //   } else {
  //     setSortBy({ path: item, order: "asc" });
  //   }
  // };

  const handleSort = (path) => {
    setSortBy((prevSortBy) => ({
      ...prevSortBy,
      path,
      order:
        prevSortBy.path === path && prevSortBy.order === "asc" ? "desc" : "asc",
    }));
  };

  if (users && professions) {
    const filteredUsers = searchQuery
      ? // ? users.filter
        // ((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        users.filter(
          (user) =>
            user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : selectedItem
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedItem)
          //всегда идет сравнение двух объектов по ссылке а не по значениям .поэтому преобразуем объекты
          //в строки JSON, включая их вложенные объекты. Затем строки сравниваются между собой.
          //у этого подхода есть свои ограничения, например, он не учитывает порядок свойств в объектах.
          //(или вариант сравнения по _id user.profession._id === selectedItem._id)
        )
      : users;

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrops = paginate(sortedUsers, currentPage, pageSize);

    const resetFilters = () => {
      setSelectedItem();
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedItem}
            />
            <button className="btn btn-secondary mt-2" onClick={resetFilters}>
              Показать всех
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus userLength={count} />
          <TextField
            label="Поиск"
            onChange={handleSearch}
            type="search"
            name="search"
            value={searchQuery}
            error={false}
          />
          {count > 0 && (
            <UsersTable
              users={userCrops}
              onSort={handleSort}
              onRenderSortArrow={renderSortArrow}
              onToggleBookMark={handleToggleBookMark}
              onDelete={handleDelete}
            />
          )}

          <div className="d-flex justify-content-center">
            <Pagination
              count={count}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading";
};
export default UsersListPage;
