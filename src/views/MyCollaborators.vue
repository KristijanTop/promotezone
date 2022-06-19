<template>
  <div class="page">
    <div class="myCollaborators">
      <h3 class="myCollaborators__title">My collaborators</h3>
      <p class="myCollaborators__msg" v-if="collaborators.length < 1">You don't have any collaborators yet!</p>
      <collaborator-card
        v-for="card in collaborators"
        :key="card.id"
        :card="card"
      />
    </div>
  </div>
</template>

<script>
import store from "@/store";
import collaboratorCard from "@/components/collaboratorCard.vue";

export default {
  name: "MyCollaborators",
  data() {
    return {
      store,
    };
  },
  components: {
    collaboratorCard,
  },

  computed: {
    collaborators() {
      return store.cards.filter((card) => store.currentUser.collaborators.includes(card.id));
    }
  }
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.myCollaborators {
  margin-top: 130px;
  padding: 0 38px;
  position: relative;
  max-width: 930px;
  left: calc(50% + 150px);
  transform: translateX(-50%);

  @include breakpoint {
    left: 50%;
  }

  &__title {
    margin-bottom: 50px;
  }
}
</style>