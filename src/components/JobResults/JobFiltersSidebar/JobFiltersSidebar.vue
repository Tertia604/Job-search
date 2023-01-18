<template>
  <div
    class="
      flex flex-col
      p-4
      bg-white
      border-r border-solid border-brand-gray-1
      w-96
    "
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button
            text="Clear Filters"
            type="secondary"
            @click="clearUserJobFilterSelectons"
          />
        </div>
      </div>

      <accordion header="Locations">
        <job-filters-sidebar-locations />
      </accordion>

      <accordion header="Skills and Qualifications">
        <job-filters-sidebar-skills />
      </accordion>

      <accordion header="Degrees">
        <job-filters-sidebar-degrees />
      </accordion>

      <accordion header="Job types">
        <job-dilters-sidebar-job-types />
      </accordion>

      <accordion header="Organizations">
        <job-filters-sidebar-organizations />
      </accordion>
    </section>
  </div>
</template>

<script lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue";
import Accordion from "@/components/Shared/Accordion.vue";

import { defineComponent, onMounted } from "@vue/runtime-core";
import { useStore } from "@/store";

import {
  CLEAR_USER_JOB_FILTER_SECTIONS,
  UPDATE_SKILLS_SEARCH_TERM,
  UPDATE_SKILLS_SEARCH_LOCATIONS,
} from "@/store/constants";

import JobFiltersSidebarDegrees from "./JobFiltersSidebarDegrees.vue";
import JobDiltersSidebarJobTypes from "./JobDiltersSidebarJobTypes.vue";
import JobFiltersSidebarOrganizations from "./JobFiltersSidebarOrganizations.vue";
import JobFiltersSidebarSkills from "./JobFiltersSidebarSkills.vue";
import { useRoute } from "vue-router";
import JobFiltersSidebarLocations from "./JobFiltersSidebarLocations.vue";

export default defineComponent({
  name: "JobFiltersSidebar",
  components: {
    ActionButton,
    Accordion,
    JobFiltersSidebarDegrees,
    JobDiltersSidebarJobTypes,
    JobFiltersSidebarOrganizations,
    JobFiltersSidebarSkills,
    JobFiltersSidebarLocations,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const clearUserJobFilterSelectons = () => {
      store.commit(CLEAR_USER_JOB_FILTER_SECTIONS);
    };

    const parseSkillsSearchTerm = () => {
      const role = route.query.role || "";
      store.commit(UPDATE_SKILLS_SEARCH_TERM, role);
    };

    const parseLocationsSearchTerm = () => {
      const location = route.query.location || "";
      store.commit(UPDATE_SKILLS_SEARCH_LOCATIONS, location);
    };

    onMounted(parseSkillsSearchTerm);
    onMounted(parseLocationsSearchTerm);

    return {
      clearUserJobFilterSelectons,
    };
  },
});
</script>

