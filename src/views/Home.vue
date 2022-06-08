<template>
  <div class="home">
    <div class="home__content">
      <h3 class="home__title">
        {{
          store.currentUser.accType === "business"
            ? "Find Promoters"
            : "Find Brands"
        }}
      </h3>
      <profile-card
        v-for="card in filteredProfiles"
        :key="card.id"
        :card="card"
        @open="
          carouselVisible = true;
          visibleImage = 0;
          cardData = card;
        "
      />
      <div class="home__message" v-if="filteredProfiles.length < 1">
        There are no
        {{ store.currentUser.accType === "business" ? "promoters" : "brands" }}
        that meet the filter requirements.
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
            v-for="(image, index) in cardData.images"
            :key="image.url"
            :index="index"
            :visibleImage="visibleImage"
          >
            <div class="img-slide">
              <div class="img-slide__heading-mobile">
                <router-link
                  :to="{
                    name: 'Profile',
                    params: { profileName: cardData.name },
                  }"
                >
                  <img
                    class="profileImg"
                    :src="cardData.profileImg"
                    @click="store.profileData = cardData"
                  />
                  <h4 @click="store.profileData = cardData">
                    {{ cardData.name }}
                  </h4>
                </router-link>
              </div>
              <img class="image" :src="image.url" />
              <div class="img-slide__content">
                <div class="img-slide__content__heading">
                  <router-link
                    :to="{
                      name: 'Profile',
                      params: { profileName: cardData.name },
                    }"
                  >
                    <img
                      class="profileImg"
                      :src="cardData.profileImg"
                      @click="store.profileData = cardData"
                    />
                    <h3 @click="store.profileData = cardData">
                      {{ cardData.name }}
                    </h3>
                  </router-link>
                </div>
                <span class="img-slide__content__location"
                  > {{ cardData.city }}, {{ cardData.country }}
                </span>
                <div class="img-slide__content__tags">
                  <span
                    class="img-slide__content__tags__tag"
                    v-for="tag in cardData.categories"
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
    <filter-dropdown @filter="filterOptions()" />
  </div>
</template>

<script>
import profileCard from "@/components/profileCard.vue";
import filterDropdown from "@/components/filterDropdown.vue";
import carousel from "@/components/carousel.vue";
import carouselSlide from "@/components/carouselSlide.vue";
import store from "@/store";

export default {
  name: "Home",
  data() {
    return {
      store,
      carouselVisible: false,
      visibleImage: null,
      cardData: null,
      filterValues: {
        categories: [],
        country: "",
        city: "",
      },
    };
  },

  components: {
    profileCard,
    filterDropdown,
    carousel,
    carouselSlide,
  },

  computed: {
    imagesLength() {
      return this.cardData.images.length;
    },

    filteredProfiles() {
      if (
        this.filterValues.categories.length < 1 &&
        !this.filterValues.country &&
        !this.filterValues.city
      ) {
        return store.cards;
      }

      return store.cards.filter((card) =>
        this.filterValues.categories.length > 0
          ? this.filterValues.categories.some((value) =>
              card.categories.includes(value)
            ) &&
            card.country.includes(this.filterValues.country) &&
            card.city
              .toLowerCase()
              .includes(this.filterValues.city.toLowerCase())
          : card.country.includes(this.filterValues.country) &&
            card.city
              .toLowerCase()
              .includes(this.filterValues.city.toLowerCase())
      );
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

    filterOptions() {
      this.filterValues.categories = store.filterOptions.categories;
      this.filterValues.country = store.filterOptions.country;
      this.filterValues.city = store.filterOptions.city;
    },
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.home {
  margin-top: 130px;
  left: 50%;
  margin-left: -277.5px;
  position: relative;
  height: 100%;
  display: flex;

  &__title {
    @include breakpoint3 {
      margin-bottom: 147.5px;
    }
  }

  &__message {
    margin-top: 50px;
    width: 496px;
    max-width: 90vw;
  }

  @include breakpoint {
    left: 50%;
    margin-left: -427.5px;
  }

  @include breakpoint3 {
    left: 0;
    margin-left: auto;
    margin-right: auto;
  }

  .img-slide__content__heading,
  .img-slide__heading-mobile {
    a {
      text-decoration: none;
      color: color(text-color);
      display: inline-block;

      img,
      h3,
      h4 {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>