<template>
  <section class="contact">
    <div class="contact__fast">
      <h3>Intrested? Reach out now</h3>
      <RouterLink to="/contact">
        <BaseButton :isColored="true" :isLarge="true">Contact</BaseButton>
      </RouterLink>
    </div>
    <form @submit.prevent="sendRequest">
      <div class="form-control">
        <label for="email">Your email</label>
        <input id="email" type="email" name="email" v-model="email" required />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea
          id="message"
          type="message"
          name="message"
          ref="message"
          @focus="() => (isMessageInvalid = false)"
        ></textarea>
        <small v-if="isMessageInvalid" class="text-danger fw-bold"
          >Message can't be empty</small
        >
      </div>
      <div class="m-3 text-center">
        <BaseButton :isColored="true" :isLarge="true">send message</BaseButton>
      </div>
    </form>
  </section>
</template>

<script>
import BaseButton from "../ui/BaseButton.vue";

export default {
  components: { BaseButton },
  data() {
    return {
      email: "",
      isMessageInvalid: false,
    };
  },
  methods: {
    messageValidation() {
      const message = this.$refs.message;
      if (message.value.length > 0) {
        return true;
      } else {
        this.isMessageInvalid = true;
        message.classList.add("invalid");
        return false;
      }
    },
    sendRequest() {
      const message = this.$refs.message;
      const request = {
        key: new Date().toISOString(),
        email: this.email,
        message: message.value,
        date: new Date().toLocaleString()
      };
      if (this.messageValidation()) {
        this.$store.dispatch("addRequest", request);
        this.$router.push("/coaches");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../mixins/mixins";
.contact {
  margin-block: 3em;
  padding: 2em;
  border-radius: 1em;
  box-shadow: 0 0 10px #3333337a;

  &__fast {
    margin-bottom: 2em;
    h3 {
      margin-bottom: 0.5em;
    }
  }
  form {
    @include form;
    .invalid {
      border: 3px solid rgb(236, 14, 14);
    }
  }
}
</style>
