<template>
  <section>
    <div class="shadow">
      <CoachInfo
        :firstName="getCoach.firstName"
        :lastName="getCoach.lastName"
        :hourlyRate="getCoach.hourlyRate"
      />
    </div>
    <ContactForm v-if="isContact" />
    <div class="shadow">
      <AreasElement
        v-for="(area, key) in getCoach.areas"
        :key="key"
        :category="area"
        >{{ area }}</AreasElement
      >
      <p class="mt-4">{{ getCoach.description }}</p>
    </div>
  </section>
</template>

<script>
import AreasElement from "@/components/coaches/AreasElement.vue";
import CoachInfo from "@/components/coaches/CoachInfo.vue";
import ContactForm from "@/components/coaches/ContactForm.vue";
import { mapGetters } from "vuex";

export default {
  props: ["coachId"],
  components: { CoachInfo, ContactForm, AreasElement },
  computed: {
    ...mapGetters(["getCoach"]),
    isContact() {
      const pathArray = this.$route.path.split("/");
      return pathArray[pathArray.length - 1] === "contact";
    },
  },
  created() {
    this.coachId && this.$store.dispatch("selectCoach", this.coachId);
  },
};
</script>

<style lang="scss" scoped>
.shadow {
  padding: 2em;
  border-radius: 1em;
  box-shadow: 0 0 10px #33333379;
}
</style>
