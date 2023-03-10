<template>
  <form @submit.prevent="registerNewCoach">
    <h3 class="fw-bold">Register as a Coach now!</h3>
    <div class="form-control">
      <label class="text-capitalize" for="name">firstname</label>
      <input
        type="text"
        name="name"
        v-model="name"
        ref="name"
        @focus="clearInvalidClass($refs.name)"
      />
    </div>
    <div class="form-control">
      <label class="text-capitalize" for="surname">lastname</label>
      <input type="text" name="surname" v-model="surname" ref="surname" />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea
        type="description"
        name="description"
        v-model="description"
        ref="description"
      ></textarea>
    </div>
    <div class="form-control">
      <label class="text-capitalize" for="rate">hourly rate</label>
      <input type="number" name="rate" v-model="rate" ref="rate" />
    </div>
    <div class="areas mt-3">
      <h4>areas of expertise</h4>
      <div class="form-control flex-row">
        <input
          id="frontend"
          class="me-3"
          type="checkbox"
          name="areas"
          value="frontend"
          v-model="areas"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div class="form-control flex-row">
        <input
          id="backend"
          class="me-3"
          type="checkbox"
          name="areas"
          value="backend"
          v-model="areas"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div class="form-control flex-row">
        <input
          id="career"
          class="me-3"
          type="checkbox"
          name="areas"
          value="career"
          v-model="areas"
        />
        <label for="career">Career Advisor</label>
      </div>
      <small v-if="isAreasInvalid" class="fw-bold text-danger fs-5"
        >You must choose at least one area !</small
      >
    </div>
    <BaseButton :isColored="true" :isLarge="true">Register</BaseButton>
  </form>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  components: { BaseButton },
  data() {
    return {
      name: "",
      surname: "",
      description: "",
      rate: 0,
      areas: [],
      isAreasInvalid: false,
    };
  },
  methods: {
    validation(value, ref) {
      if (value.length > 0) return true;
      else {
        ref.classList.contains("warning")
          ? (this.isAreasInvalid = true)
          : ref.classList.add("invalid");
        return false;
      }
    },
    clearInvalidClass(ref) {
      ref.classList.remove("invalid");
    },
    areasValidation() {
      if (this.areas.length > 0) return true;
      else this.isAreasInvalid = true;
      return false;
    },
    registerNewCoach() {
      if (
        this.validation(this.name, this.$refs.name) &&
        this.validation(this.surname, this.$refs.surname) &&
        this.validation(this.description, this.$refs.description) &&
        this.areasValidation()
      ) {
        const coach = {
          id: new Date().toISOString(),
          firstName: this.name,
          lastName: this.surname,
          areas: this.areas,
          description: this.description,
          hourlyRate: this.rate,
        };
        this.$store.dispatch("addCoach", coach);
        this.$router.push("/coaches");
      }
    },
  },
  watch: {
    rate() {
      if (this.rate <= 0) {
        this.rate = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../mixins/mixins";
form {
  @include form;
  border: none;
  box-shadow: 0 0 10px #33333363;
  h4 {
    font-size: 2rem;
    text-transform: capitalize;
  }
  .large {
    margin-top: 2em;
    margin-left: 1em;
    padding-inline: 3em;
  }
  .invalid {
    border: 2px solid rgb(180, 12, 12);
  }
}
</style>
