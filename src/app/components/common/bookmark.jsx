export const Bookmark = ({ status, ...rest }) => {
  // const yesIcon = (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     width="16"
  //     height="16"
  //     fill="currentColor"
  //     className="bi bi-bookmark"
  //     viewBox="0 0 16 16"
  //   >
  //     <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
  //   </svg>
  // );
  // const noIcon = (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     width="16"
  //     height="16"
  //     fill="currentColor"
  //     className="bi bi-bookmark-fill"
  //     viewBox="0 0 16 16"
  //   >
  //     <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
  //   </svg>
  // );

  return (
    // <button {...rest}>
    //   {status ? noIcon : yesIcon}
    // </button>
    <button {...rest}>
      <i className={status ? "bi bi-bookmark-fill" : "bi bi-bookmark"}></i>
      {/* <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
      <i className={clsx("bi bi-bookmark", status ? "-fill" : "")}></i> */}
    </button>
  );
};
