<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["isColored", "isLarge"],
  computed: {
    buttonClass() {
      return { colored: this.isColored, large: this.isLarge };
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 0.5em;
  background: #fff;
  border: 1px solid var(--first-color);
  border-radius: 1em;
  color: var(--first-color);
  text-transform: capitalize;
  transition: 0.5s;
  &:hover {
    background: var(--third-color);
    color: #fff;
  }
}

.colored {
  background: var(--first-color);
  color: #fff;
  &:hover {
    opacity: 0.8;
  }
}
.large {
  padding-inline: 1em;
  font-size: 1.8rem;
}
</style>
