import { database } from "@/firebase/client";
import { ref, get } from "firebase/database";

export const getUserChats = (userId) => {
  const chatsRef = ref(database, `chats`);
  return get(chatsRef).then((snapshot) => {
    if (snapshot.exists()) {
      let chats = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.participants.includes(userId)) {
          chats.push({ id: childSnapshot.key, ...childData });
        }
      });
      return chats.map((chat) => {
        return {
          id: chat.id,
          participants: chat.participants.filter(
            (participant) => participant !== userId
          ),
        };
      });
    } else {
      console.log("No data available");
    }
  });
};
