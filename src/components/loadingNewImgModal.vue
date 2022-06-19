<template>
  <div class="loadingNewImgModal">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/_shared.scss";

.loadingNewImgModal {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: table;
  transition: all 0.5s ease;

  .spinner {
    height: 100px;
    width: 100px;
    margin-left: -50px;
    margin-top: -50px;
  }
}
</style>