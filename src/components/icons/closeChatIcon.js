import * as React from "react";

const ChatCloseIcon = (props) => (
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
      d="m6 13 6 6 6-6M6 5l6 6 6-6"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChatCloseIcon;
