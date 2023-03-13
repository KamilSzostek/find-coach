<template>
  <header>
    <RouterLink to="/coaches"
      ><h2 class="text-light">find coach</h2></RouterLink
    >

    <div>
      <NavButton link="/coaches">all coaches</NavButton>
      <NavButton v-if="isLogin" link="/requests">Requests</NavButton>
      <NavButton v-else link="/auth/login">Login</NavButton>
      <NavButton v-show="isLogin" link="/" @click="logout">Logout</NavButton>
    </div>
  </header>
</template>

<script>
import NavButton from "../ui/NavButton.vue";

export default {
  components: { NavButton },
  data() {
    return {
      auth: null,
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.getAuthentication;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("signout");
    },
  },
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
