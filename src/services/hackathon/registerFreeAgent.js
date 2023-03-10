import { getDatabase, ref, set } from "firebase/database";
const db = getDatabase();

export function registerFreeAgent({ hackathon, user, tags }) {
  set(ref(db, `hackathon/${hackathon}/freeAgents/${user.uid}`), {
    user,
    tags,
  });
}
