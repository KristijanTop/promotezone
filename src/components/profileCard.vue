<template>
  <div class="card">
    <div class="card__header">
      <div @click="store.profileData = card">
        <router-link
          :to="{ name: 'Profile', params: { profileName: card.name } }"
        >
          <img :src="card.profileImg" class="profileImg" />
          <span @click="store.profileData = card">{{ card.name }}</span>
        </router-link>
      </div>
      <more-dropdown :profile="card" />
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
import moreDropdown from "@/components/moreDropdown.vue";
import store from "@/store";

export default {
  name: "profileCard",
  props: ["card"],
  data() {
    return {
      store,
    };
  },

  components: {
    moreDropdown,
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
  width: 500px;
  border-radius: 7px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  @include breakpoint3 {
    width: 90vw;
  }

  &__header {
    padding: 12px;
    display: flex;
    justify-content: space-between;

    a {
      text-decoration: none;
      color: color(text-color);
      display: inline-block;
    }

    .profileImg {
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
    border-bottom: 1px solid color(border);
    border-top: 1px solid color(border);

    @include breakpoint3 {
      height: 90vw;
    }

    img {
      height: 100%;
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
