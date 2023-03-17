import { database } from "@/firebase/client";
import { ref, onValue, child } from "firebase/database";

export const getMessages = async (emiter, receiver) => {
  const messagesRef = ref(database, "messages/");

  onValue(messagesRef, (snapshot) => {
    const data = snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      if (
        childData.users.includes(emiter) &&
        childData.users.includes(receiver)
      )
        return childData;

      return [];
    });
  });
};
