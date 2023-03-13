<template>
  <div>
    <ModalAlert :isOpen="!!error" @close="toggleModal">
      <template v-slot:header>
        <h2>An error occurred!</h2>
      </template>
      <p class="ms-3 mt-4 fs-3 text-normal">{{ error }}</p>
      <template v-slot:footer>
        <BaseButton :isColored="true" :isLarge="true" @click="toggleModal"
          >Close</BaseButton
        >
      </template>
    </ModalAlert>
    <DataLoading v-if="isLoading" />
    <form v-else @submit.prevent="">
      <div class="form-control">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!formIsValid">
        Please enter a valid email and password (must be at least 6 characters
        long).
      </p>
      <div class="buttons">
        <BaseButton :isLarge="true" @click="submitForm">{{
          submitButtonCaption
        }}</BaseButton>
        <BaseButton :isLarge="true" :isColored="true" @click="switchAuthMode">{{
          switchModeButtonCapiton
        }}</BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import DataLoading from "@/components/ui/DataLoading.vue";
import ModalAlert from "@/components/ui/ModalAlert.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") return "Login";
      else return "Signup";
    },
    switchModeButtonCapiton() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
    mode(){
      return this.$route.params.mode;
    }
  },
  methods: {
    toggleModal() {
      this.error = null;
    },
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch("sign", {
            email: this.email,
            password: this.password,
          });
        }
        this.$router.replace('/coaches')
      } catch (error) {
        this.error =
          error.message ||
          "Failed to authenticate, try later. Check your login data.";
      }
      this.email = "";
      this.password = "";
      this.isLoading = false;
    },
    switchAuthMode() {
      if(this.mode === 'login'){
        this.$router.replace('/auth/sign')
        this.mode = 'sign'
      }
      else{
        this.$router.replace('/auth/login')
        this.mode = 'login'
      }
    },
  },
  components: { ModalAlert, DataLoading },
};
</script>

<style lang="scss" scoped>
@import "../../mixins/mixins";
form {
  @include form;
  border: none;
  box-shadow: 0 0 10px #33333369;
  .buttons {
    display: flex;
    justify-content: end;
    gap: 20px;
    margin-top: 1em;
    margin-right: 1em;
  }
}
</style>
