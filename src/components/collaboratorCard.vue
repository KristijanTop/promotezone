<template>
  <div class="collaboratorCard">
    <router-link :to="{ name: 'Profile', params: { profileName: card.name } }">
      <img
        :src="card.profileImg"
        class="profileImg"
        @click="store.profileData = card"
      />
    </router-link>
    <div class="collaboratorCard__content">
      <div class="collaboratorCard__content__header">
        <div class="collaboratorCard__content__header__text">
          <router-link
            :to="{ name: 'Profile', params: { profileName: card.name } }"
          >
            <img
              :src="card.profileImg"
              class="profileImgMobile"
              @click="store.profileData = card"
            />
            <h3 @click="store.profileData = card">{{ card.name }}</h3>
          </router-link>
          <a :href="card.instagram" target="_blank" v-if="card.instagram">
            <icon-library name="instagram" />
          </a>
          <a :href="card.facebook" target="_blank" v-if="card.facebook">
            <icon-library name="facebook" />
          </a>
          <a :href="card.tiktok" target="_blank" v-if="card.tiktok">
            <icon-library name="tiktok" />
          </a>
          <a :href="card.youtube" target="_blank" v-if="card.youtube">
            <icon-library name="youtube" />
          </a>
          <a :href="card.linkedIn" target="_blank" v-if="card.linkedIn">
            <icon-library name="linkedin" />
          </a>
        </div>
        <more-dropdown :profile="card" />
      </div>
      <div class="collaboratorCard__content__tags">
        <div
          class="collaboratorCard__content__tags__tag"
          v-for="tag in card.categories"
          :key="tag"
        >
          {{ tag }}
        </div>
      </div>
      <p class="collaboratorCard__content__bio">{{ card.bio }}</p>
    </div>
  </div>
</template>

<script>
import IconLibrary from "@/components/IconLibrary.vue";
import moreDropdown from "@/components/moreDropdown.vue";
import store from "@/store";

export default {
  name: "collaboratorCard",
  props: ["card"],
  data() {
    return {
      store,
    };
  },
  components: {
    IconLibrary,
    moreDropdown,
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.collaboratorCard {
  background: #fff;
  display: flex;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 25px;
  border-radius: 7px;
  margin-bottom: 50px;

  .profileImg {
    border-radius: 50%;
    margin-right: 30px;

    @include breakpoint4 {
      display: none;
    }
  }

  .profileImgMobile {
    display: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;

    @include breakpoint4 {
      display: inline;
    }
  }

  &__content {
    width: 100%;

    &__header {
      display: flex;
      justify-content: space-between;
      gap: 15px;
      place-items: center;

      &__text {
        display: flex;
        //flex-wrap: wrap;
        place-items: center;
        gap: 15px;

        a {
          text-decoration: none;
          color: color(text-color);
          display: flex;
          gap: 15px;
          place-items: center;
        }
      }
    }

    &__tags {
      display: flex;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 22px;

      &__tag {
        padding: 12px 15px;
        background: color(input);
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
      }
    }

    &__bio {
      line-height: 1.5;
      text-align: justify;
      margin-top: 20px;
    }
  }
}
</style>