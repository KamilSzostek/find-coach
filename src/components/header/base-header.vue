<template>
  <header>
    <RouterLink to="/coaches"
      ><h2 class="text-light">find coach</h2></RouterLink
    >

    <div>
      <NavButton link="/coaches">all coaches</NavButton>
      <NavButton link="/requests">Requests</NavButton>
    </div>
  </header>
</template>

<script>
import NavButton from "../ui/NavButton.vue";

export default {
  components: { NavButton },
};
</script>

<style lang="scss" scoped>
header {
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 2em;
  background-color: var(--first-color);
  color: #fff;
  text-transform: capitalize;
  h2 {
    font-size: clamp(1rem, 1.5vw + 1rem, 2.5rem);
  }
}
</style>
