import { database } from "@/firebase/client";
import { ref, get, push, set } from "firebase/database";

export const getUserChats = (userId) => {
  const chatsRef = ref(database, `chats`);
  return get(chatsRef).then((snapshot) => {
    if (snapshot.exists()) {
      let chats = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.participants.find((user) => user.uid === userId)) {
          chats.push({ id: childSnapshot.key, ...childData });
        }
      });
      return chats.map((chat) => {
        return {
          id: chat.id,
          participants: chat.participants.filter(
            (participant) => participant.uid !== userId
          ),
        };
      });
    } else {
      console.log("No data available");
    }
  });
};

export const addNewChat = (message, participants) => {
  const chatsRef = ref(database, `chats`);
  const newChatRef = push(chatsRef);
  const newChatId = newChatRef.key;
  const newChat = {
    participants,
    messages: [
      {
        ...message,
        id: newChatId,
      },
    ],
  };
  return set(newChatRef, newChat);
};
