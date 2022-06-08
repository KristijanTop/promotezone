<template>
  <transition name="carousel">
    <div class="carousel">
      <button @click="close()" class="close">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </button>
      <button @click="next()" class="next">
        <font-awesome-icon icon="fa-solid fa-chevron-right" />
      </button>
      <button @click="prev()" class="prev">
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
      </button>

      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Carousel",
  methods: {
    close() {
      this.$emit("close");
    },
    next() {
      this.$emit("next");
    },
    prev() {
      this.$emit("prev");
    },
  },
};
</script>

<style lang="scss">
</style>