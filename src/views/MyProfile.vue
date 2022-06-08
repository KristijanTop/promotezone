<template>
  <div class="page">
    <div class="myProfile">
      <div class="myProfile__heading">
        <div class="myProfile__heading__img">
          <img :src="store.currentUser.profileImg" />
        </div>
        <div class="myProfile__heading__text">
          <h2>{{ store.currentUser.name }}</h2>
          <h4>
             {{ store.currentUser.city }}, {{ store.currentUser.country }}
          </h4>
        </div>
        <div class="myProfile__heading__icons">
          <a
            :href="store.currentUser.instagram"
            target="_blank"
            v-if="store.currentUser.instagram"
          >
            <icon-library name="instagram" />
          </a>
          <a
            :href="store.currentUser.facebook"
            target="_blank"
            v-if="store.currentUser.facebook"
          >
            <icon-library name="facebook" />
          </a>
          <a
            :href="store.currentUser.tiktok"
            target="_blank"
            v-if="store.currentUser.tiktok"
          >
            <icon-library name="tiktok" />
          </a>
          <a
            :href="store.currentUser.youtube"
            target="_blank"
            v-if="store.currentUser.youtube"
          >
            <icon-library name="youtube" />
          </a>
          <a
            :href="store.currentUser.linkedIn"
            target="_blank"
            v-if="store.currentUser.linkedIn"
          >
            <icon-library name="linkedin" />
          </a>
        </div>
      </div>

      <div class="myProfile__tags">
        <div
          class="myProfile__tags__tag"
          v-for="tag in store.currentUser.categories"
          :key="tag"
        >
          {{ tag }}
        </div>
      </div>

      <div class="myProfile__bio">
        <p>{{ store.currentUser.bio }}</p>
      </div>

      <span>Gallery</span>
      <button class="primary-button">Add</button>

      <div class="myProfile__gallery">
        <img
          v-for="(img, index) in store.currentUser.images"
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
          v-for="(image, index) in store.currentUser.images"
          :key="image.url"
          :index="index"
          :visibleImage="visibleImage"
        >
          <div class="img-slide">
            <div class="img-slide__heading-mobile">
              <img class="profileImg" :src="store.currentUser.profileImg" />
              <h4>{{ store.currentUser.name }}</h4>
            </div>
            <img class="image" :src="image.url" />
            <div class="img-slide__content">
              <div class="img-slide__content__heading">
                <img class="profileImg" :src="store.currentUser.profileImg" />
                <h3>{{ store.currentUser.name }}</h3>
              </div>
              <span class="img-slide__content__location"
                > {{ store.currentUser.city }},
                {{ store.currentUser.country }}
              </span>
              <div class="img-slide__content__tags">
                <span
                  class="img-slide__content__tags__tag"
                  v-for="tag in store.currentUser.categories"
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

export default {
  name: "MyProfile",
  data() {
    return {
      store,
      carouselVisible: false,
      visibleImage: null,
    };
  },

  computed: {
    imagesLength() {
      return store.currentUser.images.length;
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
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.page {
  width: 100vw;
}

.myProfile {
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
</style>