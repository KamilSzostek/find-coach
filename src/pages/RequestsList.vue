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
          v-for="request in getRequests"
          :key="request.key"
          :date="request.date"
          :email="request.email"
          :message="request.message"
        />
      </ul>
    </template>
    <DataLoading v-else />
    <ModalAlert :isOpen="isModalOpen" @close="() => toggleModal()">
      <template v-slot:header>
        <h2>An error occurred!</h2>
      </template>
      <p class="ms-3 mt-4 fs-3 text-normal">Failed to fetch!</p>
      <template v-slot:footer>
        <BaseButton :isColored="true" :isLarge="true" @click="toggleModal"
          >Close</BaseButton
        >
      </template>
    </ModalAlert>
  </section>
</template>

<script>
import RequestElement from "@/components/requests/RequestElement.vue";
import DataLoading from "@/components/ui/DataLoading.vue";
import ModalAlert from "@/components/ui/ModalAlert.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: { RequestElement, DataLoading, ModalAlert, BaseButton },
  data() {
    return {
      isReqestLoaded: false,
      isModalOpen: false,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters(["getRequests"]),
    hasRequests() {
      return this.getRequests.length <= 0;
    },
  },
  methods: {
    getData() {
      axios
        .get(
          "https://find-coach-9f124-default-rtdb.europe-west1.firebasedatabase.app/requests.json"
        )
        .then((response) => {
          if (response.status === 200) {
            this.isReqestLoaded = true;
            this.$store.dispatch("setRequests", response.data);
          }
        })
        .catch(() => {
          this.isModalOpen = true;
          this.isReqestLoaded = true;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.requests {
  min-height: 300px;
  border-radius: 2em;
  box-shadow: 0 0 10px #33333379;
  ul {
    list-style: none;
  }
}
</style>
