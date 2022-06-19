<template>
  <div class="moreDropdown">
    <img src="@/assets/more.svg" class="more-icon" />
    <div class="moreDropdown__content">
      <ul>
        <li>Message</li>
        <li @click="addToMyCollaborators()" v-if="!collabBtn">
          Add to collaborators
        </li>
        <li @click="removeFromMyCollaborators()" v-if="collabBtn">
          Remove from collaborators
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { db, doc, updateDoc, arrayUnion } from "@/firebase";

export default {
  name: "moreDropdown",
  props: ["profile"],
  data() {
    return {
      store,
    };
  },
  methods: {
    async addToMyCollaborators() {
      await updateDoc(doc(db, "accounts", store.currentUser.uid), {
        collaborators: arrayUnion(this.profile.id),
      });
      store.currentUser.collaborators.push(this.profile.id);
    },
    async removeFromMyCollaborators() {
      let newCollaborators = store.currentUser.collaborators.filter(
        (id) => id !== this.profile.id
      );
      await updateDoc(doc(db, "accounts", store.currentUser.uid), {
        collaborators: newCollaborators,
      });
      store.currentUser.collaborators = newCollaborators;
    },
  },

  computed: {
    collabBtn() {
      return store.currentUser.collaborators.includes(this.profile.id);
    },
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.moreDropdown {
  position: relative;

  .more-icon {
    cursor: pointer;
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }

  &__content {
    display: none;
    position: absolute;
    right: -13px;
    background: #fff;
    min-width: 246px;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 15px;
    line-height: 2;
    border-radius: 7px;
    font-weight: 600;

    ul {
      list-style: none;

      li {
        cursor: pointer;
      }

      li:hover {
        color: color(primary);
      }
    }
  }
}

.moreDropdown:hover .moreDropdown__content {
  display: block;
}
</style>