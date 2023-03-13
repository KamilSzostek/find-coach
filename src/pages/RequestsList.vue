<template>
  <section class="requests p-4">
    <h3 class="text-capitalize mb-5 fw-bold text-center">request recevied</h3>
    <hr />
    <template v-if="isReqestLoaded">
      <p v-if="hasRequests" class="text-center">
        You haven't received any requests yet!
      </p>
      <ul>
        <RequestElement
          v-for="request in activeUserRequests"
          :key="request.key"
          :date="request.date"
          :email="request.email"
          :message="request.message"
        />
      </ul>
    </template>
    <DataLoading v-else />
    <ModalAlert :isOpen="showModal" @close="toggleModal">
      <template v-slot:header>
        <h2>An error occurred!</h2>
      </template>
      <p class="ms-3 mt-4 fs-3 text-normal">{{ getError }}</p>
      <template v-slot:footer>
        <BaseButton :isColored="true" :isLarge="true" @click="closeModal"
          >Close</BaseButton
        >
      </template>
    </ModalAlert>
  </section>
</template>

<script>
import RequestElement from "@/components/requests/RequestElement.vue";
import { mapGetters } from "vuex";

export default {
  components: { RequestElement },
  data() {
    return {
      isReqestLoaded: false,
      isModalOpen: true,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters(["getRequests", "userId", "getError"]),
    hasRequests() {
      return this.getRequests.length <= 0;
    },
    activeUserRequests() {
      const requestsArr = [];
      for (const request of Object.entries(this.getRequests)) {
        requestsArr.unshift(request.pop());
      }
      return requestsArr.filter((request) => request.coachId === this.userId);
    },
    showModal() {
      return !!this.getError && this.isModalOpen;
    },
  },
  methods: {
    async getData() {
      await this.$store.dispatch("setRequests");
      this.isReqestLoaded = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.requests {
  position: relative;
  min-height: 300px;
  border-radius: 2em;
  box-shadow: 0 0 10px #33333379;
  ul {
    list-style: none;
  }
}
</style>
