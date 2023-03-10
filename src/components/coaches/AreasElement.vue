<template>
    <span :class="background">
      <slot></slot>
    </span>
</template>

<script>
export default {
  props: ["category"],
  computed: {
    background() {
      return {
        firstBackground: this.category === "frontend",
        secondBackground: this.category === "backend",
        thirdBackground: this.category === "career",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  margin-right: 1em;
  padding: 0.25em 1em;
  border-radius: 2em;
  color: #fff;
  font-size: 1.7rem;
  text-transform: uppercase;
}
.firstBackground {
  background: var(--first-color);
}
.secondBackground {
  background: var(--second-color);
}
.thirdBackground {
  background: var(--third-color);
}
</style>
