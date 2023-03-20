import * as React from "react";

const BackIcon = (props) => (
  <svg
    width={24}
    height={24}
    strokeWidth={1.5}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="#000"
    {...props}
  >
    <path
      d="M18.5 12H6m0 0 6-6m-6 6 6 6"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BackIcon;
