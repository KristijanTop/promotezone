<template>
  <div class="carousel">
    <div class="img-slide">
      <div class="img-slide__heading-mobile">
        <img class="profileImg" :src="store.currentUser.profileImg" />
        <h4>{{ store.currentUser.name }}</h4>
        <img src="@/assets/x.svg" class="imgDiscardBtn" @click="close()" />
        <img src="@/assets/check.svg" class="imgSubmitBtn" @click="submit()"/>
      </div>
      <img class="image" :src="fileUrl" />
      <div class="img-slide__content">
        <div class="img-slide__content__heading">
          <img class="profileImg" :src="store.currentUser.profileImg" />
          <h3>{{ store.currentUser.name }}</h3>
          <img src="@/assets/x.svg" class="imgDiscardBtn" @click="close()" />
          <img src="@/assets/check.svg" class="imgSubmitBtn" @click="submit()"/>
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
        <textarea
          class="enterDesc"
          placeholder="Enter a description"
          v-model="desc"
        />
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "newImgModal",
  props: ["fileUrl"],
  data() {
    return {
      store,
      desc: null,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submitImg", this.desc);
    },
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.imgDiscardBtn {
  width: 25px;
  height: 25px;
  margin-left: auto;
  z-index: 50;
  cursor: pointer;
  transition: 0.2s ease-in;
}

.imgDiscardBtn:hover {
  transform: scale(1.1);
}

.imgSubmitBtn {
  width: 25px;
  height: 25px;
  margin-left: 12px;
  z-index: 50;
  cursor: pointer;
  transition: 0.2s ease-in;
}

.imgSubmitBtn:hover {
  transform: scale(1.1);
}

.enterDesc {
  font-size: 18px;
  line-height: 1.5;
  padding: 0px 30px;
  padding-right: 90px;
  border: none;
  outline: none;
  background: color(background-color);
  width: 100%;
  font-family: "GothamBook";
  resize: none;
  height: 70%;

  @include breakpoint {
    margin: 0;
    padding: 0px 90px 15px 30px;
    font-size: 16px;
  }
}
</style>