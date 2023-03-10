<template>
  <section class="coaches-filter">
    <h3>find your coach</h3>
    <form class="d-flex w-50" @change="filterCoaches">
      <div class="form-control">
        <input
          id="frontend"
          value="frontend"
          name="areas"
          type="checkbox"
          v-model="areas"
        />
        <label for="frontend">frontend</label>
      </div>
      <div class="form-control">
        <input
          id="backend"
          value="backend"
          name="areas"
          type="checkbox"
          v-model="areas"
        />
        <label for="backend">backend</label>
      </div>
      <div class="form-control">
        <input
          id="career"
          value="career"
          name="areas"
          type="checkbox"
          v-model="areas"
        />
        <label for="career">career</label>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      areas: [],
    };
  },
  methods: {
    filterCoaches() {
      this.$store.dispatch("setFilteredCoaches", this.areas);
    },
  },
};
</script>

<style lang="scss" scoped>
.coaches-filter {
  margin-bottom: 5em;
  margin-inline: auto;
  padding: 2em 5em;
  border-radius: 2em;
  box-shadow: 0 0 10px #3333337c;

  h3 {
    margin-bottom: 1em;
    font-size: 2.5rem;
    text-transform: capitalize;
  }
  form {
    .form-control {
      display: flex;
      gap: 5px;
      border: none;
      label {
        font-size: 1.4rem;
        text-transform: capitalize;
      }
    }
  }
}
</style>
