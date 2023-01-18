<template>
  <job-filters-sidebar-checkbox-group
    :uniqueValues="uniqueDegrees"
    :mutation="ADD_SELECTED_DEGREE"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useUniqueDegrees } from "@/store/composables";
import { ADD_SELECTED_DEGREE } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebarDegrees",
  components: {
    JobFiltersSidebarCheckboxGroup,
  },
  setup() {
    const uniqueDegrees = useUniqueDegrees();

    return {
      uniqueDegrees,
      ADD_SELECTED_DEGREE,
    };
  },
});
</script>
