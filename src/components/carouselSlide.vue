<template>
    <div class="carouselSlide" v-show="visibleImage === index">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: "CarouselSlide",
  props: ["visibleImage", "index"],
};
</script>

<style>
.carouselSlide {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
