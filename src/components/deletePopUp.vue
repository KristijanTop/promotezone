<template>
  <div class="deletePopUp">
    <div class="deletePopUp__container">
      <h3>Are you sure you want to delete this image?</h3>
      <div class="deletePopUp__container__footer">
        <button class="secondary-button" @click="close()">No</button>
        <button class="primary-button" @click="deleteImg()">Yes</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deletePopUp",
  data() {
    return {};
  },

  methods: {
    close() {
      this.$emit("close");
    },
    deleteImg() {
      this.$emit("delete");
    },
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.deletePopUp {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: table;
  transition: all 0.5s ease;

  &__container {
    display: inline-block;
    background: color(background-color);
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 35px;
    border-radius: 7px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    &__footer {
      display: flex;
      justify-content: space-evenly;
      margin-top: 35px;
    }
  }
}
</style>