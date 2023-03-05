import { getDatabase, ref, get } from "firebase/database";

const database = getDatabase();

export function getHackathons() {
  const hackathonsRef = ref(database, "hackathon/");
  return get(hackathonsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
