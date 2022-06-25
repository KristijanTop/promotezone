import store from "@/store";
import { collection, onSnapshot, orderBy, query, where, db } from "@/firebase";

export default {
  async getMessages() {
    const q = query(
      collection(db, "chat"),
      where("users", "array-contains", store.currentUser.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      store.chat = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const user = data.users.filter((user) => user != store.currentUser.uid);
        const chatedWith = store.cards.filter((card) => card.id == user);
          store.chat.push({
            id: doc.id,
            messages: data.messages,
            chatedWith: chatedWith[0]
          })
      });
    });
  },
};
