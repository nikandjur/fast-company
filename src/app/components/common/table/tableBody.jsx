import React from "react";
import PropTypes from "prop-types";
// import _ from "lodash";

const TableBody = ({ data, columns }) => {
  //   const renderContent = (item, columnKey) => {
  //     if (columns[columnKey].component) {
  //       const component = columns[columnKey].component;
  //       if (typeof component === "function") {
  //         return component(item);
  //       }
  //       return component;
  //     }
  //     return _.get(item, columns[columnKey].path);
  //   };
  const renderContent = (item, columnKey) => {
    return typeof columns[columnKey].component === "function"
      ? columns[columnKey].component(item)
      : item[columns[columnKey].path];
  };

  return (
    //     <tbody>
    //   {data.map((item) => (
    //     <tr key={item._id}>
    //       {Object.keys(columns).map((columnKey) => {
    //         return (
    //           <td key={columnKey}>
    //             {columns[columnKey].component
    //               ? columns[columnKey].component(item)
    //               : item[columns[columnKey].path]}
    //           </td>
    //         );
    //       })}
    //     </tr>
    //   ))}
    // </tbody>

    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((columnKey) => (
            <td key={columnKey}>{renderContent(item, columnKey)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableBody;
