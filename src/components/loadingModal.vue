<template>
  <div class="loadingModal">
    <div class="loadingModal__container">
      <div v-if="loading == true">
        <div class="spinner"></div>
        <p>Please wait...</p>
      </div>

      <div v-if="loading == false">
        <img src="@/assets/check.svg" class="check" />
        <p>Registration successful!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loadingModal",
  props: ["loading"],
};
</script>

<style lang="scss">
@import "@/_shared.scss";

.loadingModal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.815);
  display: table;
  transition: all 0.5s ease;

  &__container {
    padding: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: color(background-color);
    border-radius: 10px;
    text-align: center;
    min-width: 333px;
    min-height: 214px;

    p {
      font-size: 20px;
      font-weight: 600;
      margin-top: 18px;
    }

    .check {
      width: 70px;
      height: 70px;
    }
  }

  .spinner {
    position: relative;
    margin-top: 0;
  }
}
</style>