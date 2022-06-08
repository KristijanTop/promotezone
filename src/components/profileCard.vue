<template>
  <div class="card">
    <div class="card__header">
      <router-link
        :to="{ name: 'Profile', params: { profileName: card.name } }"
      >
        <img :src="card.profileImg" @click="store.profileData = card" />
        <span @click="store.profileData = card">{{ card.name }}</span>
      </router-link>
    </div>
    <div class="card__img">
      <img :src="card.images[0].url" @click="openCarousel()" />
    </div>
    <div class="card__location">
      <span> {{ card.city }}, {{ card.country }}</span>
    </div>
    <div class="card__description">
      {{ card.bio }}
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "profileCard",
  props: ["card"],
  data() {
    return {
      store,
    };
  },

  methods: {
    openCarousel() {
      this.$emit("open");
    },
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.card {
  margin: 50px 0;
  background-color: #fff;
  max-width: 500px;
  border-radius: 7px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  @include breakpoint3 {
    max-width: 90vw;
  }

  &__header {
    padding: 12px;

    a {
      text-decoration: none;
      color: color(text-color);
      display: inline-block;
    }

    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 8px;
      vertical-align: middle;
    }

    span {
      font-weight: 600;
      vertical-align: middle;
    }
  }

  &__img {
    overflow: hidden;
    cursor: pointer;
    height: 500px;

    @include breakpoint3 {
      height: 90vw;
    }

    img {
      width: 100%;
      object-fit: cover;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__location {
    padding: 15px 10px 5px 10px;
  }

  &__description {
    padding: 5px 20px 20px 20px;
    text-align: justify;
  }
}
</style>
