import store from "@/store";
import {collection, getDocs, orderBy, query, where, db} from "@/firebase";

export default {

async getProfiles() {
    if (store.currentUser.accType === "business") {
      const q = query(
        collection(db, "accounts"),
        where("accType", "==", "promo"),
        orderBy("name", "desc")
      );
      const querySnapshot = await getDocs(q);
      store.cards = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        store.cards.push({
          id: doc.id,
          accType: data.accType,
          bio: data.bio,
          categories: data.categories,
          city: data.city,
          country: data.country,
          facebook: data.facebook,
          images: data.images,
          instagram: data.instagram,
          linkedIn: data.linkedIn,
          name: data.name,
          profileImg: data.profileImg,
          tiktok: data.tiktok,
          youtube: data.youtube,
        });
      });
    } else {
      const q = query(
        collection(db, "accounts"),
        where("accType", "==", "business"),
        orderBy("name", "desc")
      );
      const querySnapshot = await getDocs(q);
      store.cards = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        store.cards.push({
          id: doc.id,
          accType: data.accType,
          bio: data.bio,
          categories: data.categories,
          city: data.city,
          country: data.country,
          facebook: data.facebook,
          images: data.images,
          instagram: data.instagram,
          linkedIn: data.linkedIn,
          name: data.name,
          profileImg: data.profileImg,
          tiktok: data.tiktok,
          youtube: data.youtube,
        });
      });
    }
  },
}