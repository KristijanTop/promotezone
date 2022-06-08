<template>
  <div class="loadingModal">
    <div class="loadingModal__container" >
      <div v-if="loading == true">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
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
      margin-top: 10px;
    }

    .check {
      margin: 8px;
    }
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 5px solid color(primary);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: color(primary) transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>