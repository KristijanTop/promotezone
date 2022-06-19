<template>
  <div class="page">
    <div class="profile">
      <div class="profile__heading">
        <div class="profile__heading__content">
          <div class="profile__heading__content__img">
            <img :src="store.profileData.profileImg" />
          </div>
          <div class="profile__heading__content__text">
            <h2>{{ store.profileData.name }}</h2>
            <h4>
               {{ store.profileData.city }}, {{ store.profileData.country }}
            </h4>
          </div>
          <div class="profile__heading__content__icons">
            <a
              :href="store.profileData.instagram"
              target="_blank"
              v-if="store.profileData.instagram"
            >
              <icon-library name="instagram" />
            </a>
            <a
              :href="store.profileData.facebook"
              target="_blank"
              v-if="store.profileData.facebook"
            >
              <icon-library name="facebook" />
            </a>
            <a
              :href="store.profileData.tiktok"
              target="_blank"
              v-if="store.profileData.tiktok"
            >
              <icon-library name="tiktok" />
            </a>
            <a
              :href="store.profileData.youtube"
              target="_blank"
              v-if="store.profileData.youtube"
            >
              <icon-library name="youtube" />
            </a>
            <a
              :href="store.profileData.linkedIn"
              target="_blank"
              v-if="store.profileData.linkedIn"
            >
              <icon-library name="linkedin" />
            </a>
          </div>
        </div>
        <more-dropdown :profile="store.profileData" />
      </div>

      <div class="profile__tags">
        <div
          class="profile__tags__tag"
          v-for="tag in store.profileData.categories"
          :key="tag"
        >
          {{ tag }}
        </div>
      </div>

      <div class="profile__bio">
        <p>{{ store.profileData.bio }}</p>
      </div>

      <span>Gallery</span>

      <div class="profile__gallery">
        <img
          v-for="(img, index) in store.profileData.images"
          :key="img.url"
          :src="img.url"
          @click="
            carouselVisible = true;
            visibleImage = index;
          "
        />
      </div>
    </div>

    <transition name="carousel">
      <carousel
        @next="next"
        @prev="prev"
        @close="carouselVisible = false"
        v-if="carouselVisible"
      >
        <carousel-slide
          class="carouselImg"
          v-for="(image, index) in store.profileData.images"
          :key="image.url"
          :index="index"
          :visibleImage="visibleImage"
        >
          <div class="img-slide">
            <div class="img-slide__heading-mobile">
              <div class="img-slide__heading-mobile__text">
                <img class="profileImg" :src="store.profileData.profileImg" />
                <h4>{{ store.profileData.name }}</h4>
              </div>
              <more-dropdown :profile="store.profileData" />
            </div>
            <img class="image" :src="image.url" />
            <div class="img-slide__content">
              <div class="img-slide__content__heading">
                <div class="img-slide__content__heading__text">
                  <img class="profileImg" :src="store.profileData.profileImg" />
                  <h3>{{ store.profileData.name }}</h3>
                </div>
                <more-dropdown :profile="store.profileData" />
              </div>
              <span class="img-slide__content__location"
                > {{ store.profileData.city }},
                {{ store.profileData.country }}
              </span>
              <div class="img-slide__content__tags">
                <span
                  class="img-slide__content__tags__tag"
                  v-for="tag in store.profileData.categories"
                  :key="tag"
                  >{{ tag }}</span
                >
              </div>
              <p>{{ image.desc }}</p>
            </div>
          </div>
        </carousel-slide>
      </carousel>
    </transition>
  </div>
</template>

<script>
import store from "@/store";
import IconLibrary from "@/components/IconLibrary.vue";
import carousel from "@/components/carousel.vue";
import carouselSlide from "@/components/carouselSlide.vue";
import moreDropdown from "@/components/moreDropdown.vue";

export default {
  name: "MyProfile",
  data() {
    return {
      store,
      carouselVisible: false,
      visibleImage: null,
    };
  },

  mounted() {
    console.log("ovo je data" + store.profileData);
  },

  beforeDestroy() {
    store.profileData = null;
  },

  computed: {
    imagesLength() {
      return store.profileData.images.length;
    },
  },

  methods: {
    next() {
      if (this.visibleImage >= this.imagesLength - 1) {
        this.visibleImage = 0;
      } else {
        this.visibleImage++;
      }
    },
    prev() {
      if (this.visibleImage <= 0) {
        this.visibleImage = this.imagesLength - 1;
      } else {
        this.visibleImage--;
      }
    },
  },

  components: {
    IconLibrary,
    carousel,
    carouselSlide,
    moreDropdown,
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.page {
  width: 100vw;
}

.profile {
  margin-top: 80px;
  padding: 30px;
  position: relative;
  max-width: 930px;
  left: calc(50% + 150px);
  transform: translateX(-50%);

  @include breakpoint {
    left: 50%;
  }

  &__heading {
    display: flex;
    justify-content: space-between;
    place-items: center;

    &__content {
      display: flex;
      gap: 30px;

      &__img {
        height: 90px;
        width: 90px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }

      &__text {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }

      &__icons {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: auto;
        padding-top: 15px;
        gap: 15px;
      }
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;

    &__tag {
      padding: 12px 15px;
      background: color(input);
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
    }
  }

  &__bio {
    margin: 30px 0;

    p {
      line-height: 1.5;
    }
  }

  .primary-button {
    padding: 9px 15px;
    margin-left: 15px;
    border-radius: 15px;
  }

  &__gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-top: 30px;

    img {
      height: 280px;
      width: 280px;
      object-fit: cover;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
.img-slide__content__heading,
.img-slide__heading-mobile {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .img-slide__content__heading__text, .img-slide__heading-mobile__text {
    display: flex;
    place-items: center;
  }
}
</style>