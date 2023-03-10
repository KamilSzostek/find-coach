<script>
import BaseHeader from "./components/header/base-header.vue";

export default {
  components: {
    BaseHeader,
  },
};
</script>

<template>
  <base-header />
  <div class="layout col-md-8">
    <RouterView v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </RouterView>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}
:root {
  --first-color: #001579;
  --second-color: #a43578;
  --third-color: #040e3f;
  --fourth-color: #dd63ac;
  font-size: 62.5%;
}
body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;

  .layout {
    max-width: 800px;
    margin-inline: auto;
    margin-top: 5em;
  }
  h3 {
    font-size: 2.5rem;
  }
  p {
    font-size: 1.5rem;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: inherit;
    }
  }
  .route-enter-from,
  .route-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }

  .route-enter-active {
    transition: all 0.3s ease-out;
  }

  .route-leave-active {
    transition: all 0.3s ease-in;
  }

  .route-enter-to,
  .route-leave-from {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
