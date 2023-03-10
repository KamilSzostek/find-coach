<template>
  <RouterLink :to="link">
    <slot></slot>
  </RouterLink>
</template>

<script>
export default {
  props: ["link"],
};
</script>

<style lang="scss" scoped>
a {
  padding: 0.5em;
  background: none;
  border: 1px solid transparent;
  color: #ffffffa2;
  font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
  text-decoration: none;
  text-transform: capitalize;
  transition: color 0.5s;

  &:hover {
    color: #fff;
  }
}
.active {
  border: 1px solid #ffffff8a;
}
</style>
