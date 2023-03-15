import * as React from "react";

const ToogleIcon = (props) => (
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
      d="m6 11 6-6 6 6M6 19l6-6 6 6"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ToogleIcon;
