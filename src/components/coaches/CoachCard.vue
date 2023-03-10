<template>
  <section>
    <slot></slot>
    <div class="controls">
      <BaseButton :isColored="false">
        <RouterLink :to="contactLink">Contact</RouterLink>
      </BaseButton>
      <BaseButton isColored="true">
        <RouterLink :to="detailsLink">View Details</RouterLink></BaseButton
      >
    </div>
  </section>
</template>

<script>
import { RouterLink } from "vue-router";
import BaseButton from "../ui/BaseButton.vue";

export default {
  components: { BaseButton, RouterLink },
  props: ["coachId"],
  computed: {
    contactLink() {
      return `/coaches/${this.coachId}/contact`;
    },
    detailsLink() {
      return `/coaches/${this.coachId}`;
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  margin-block: 2em;
  margin-inline: auto;
  padding: 2em;
  border: 1px inset var(--third-color);
  border-radius: 1em;
  .controls {
    display: flex;
    justify-content: end;
    gap: 15px;
    font-size: 1.3rem;
  }
}
</style>
