<template>
  <section class="coaches-list">
    <CoachesFilter />
    <div class="shadow">
      <div class="controls">
        <BaseButton :isColored="false" :isLarge="true" @click="getData"
          >refresh</BaseButton
        >
        <BaseButton v-if="getAuthentication" :isColored="true" :isLarge="true">
          <RouterLink to="/register">register as a coach</RouterLink>
        </BaseButton>
        <BaseButton v-else :isColored="true" :isLarge="true">
          <RouterLink to="/auth/sign">Sign up</RouterLink>
        </BaseButton>
      </div>
      <template v-if="isDataLoaded">
        <CoachCard
          v-for="coach in getCoaches"
          :key="coach.id"
          :coachId="coach.id"
        >
          <CoachInfo
            :hourlyRate="coach.hourlyRate"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
          />
          <div class="areas">
            <AreasElement
              v-for="(area, key) in coach.areas"
              :key="key"
              :category="area"
              >{{ area }}</AreasElement
            >
          </div>
        </CoachCard>
      </template>
      <DataLoading v-else />
    </div>
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
import { mapGetters } from "vuex";
import CoachCard from "@/components/coaches/CoachCard.vue";
import AreasElement from "@/components/coaches/AreasElement.vue";
import CoachesFilter from "@/components/coaches/CoachesFilter.vue";
import CoachInfo from "@/components/coaches/CoachInfo.vue";
import axios from "axios";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  components: {
    CoachCard,
    AreasElement,
    CoachesFilter,
    CoachInfo,
    BaseButton,
  },
  data() {
    return {
      isModalOpen: false,
      isDataLoaded: false,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters(["getCoaches", "getAuthentication"]),
  },
  methods: {
    signout() {
      this.$store.dispatch("signout");
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    convertObjectToArray(data) {
      const tempArr = [];
      for (const coach of Object.entries(data)) {
        tempArr.push(coach.pop());
      }
      return tempArr.reverse();
    },
    getData() {
      axios
        .get(
          "https://find-coach-9f124-default-rtdb.europe-west1.firebasedatabase.app/coaches.json"
        )
        .then((response) => {
          if (response.status === 200) {
            this.isDataLoaded = true;
            this.$store.dispatch(
              "fetchCoaches",
              this.convertObjectToArray(response.data)
            );
          }
        })
        .catch(() => {
          this.isModalOpen = true;
          this.isDataLoaded = true;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.shadow {
  position: relative;
  min-height: 300px;
  padding: 2em 5em;
  border-radius: 2em;
  box-shadow: 0 0 10px #3333337c;
  .controls {
    display: flex;
    justify-content: space-between;
  }
  .areas {
    margin-bottom: 1em;
  }
}
</style>
