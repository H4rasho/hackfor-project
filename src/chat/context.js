import { createContext, useState } from "react";
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isCollapsed, toggle] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  return (
    <ChatContext.Provider
      value={{ isCollapsed, toggle, activeChat, setActiveChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};
