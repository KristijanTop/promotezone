<template>
  <div class="successfulUpdateModal">
    <div class="successfulUpdateModal__container">
      <h3>Update successful!</h3>
      <button class="primary-button" @click="close()">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "succesfullUpdateModal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.successfulUpdateModal {
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
    padding: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: color(background-color);
    border-radius: 10px;
    text-align: center;
    

    .primary-button {
        margin: auto;
        margin-top: 40px;
    }
  }
}
</style>