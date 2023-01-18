<template>
  <job-filters-sidebar-checkbox-group
    :uniqueValues="uniqueJobTypes"
    :mutation="ADD_SELECTED_JOB_TYPES"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useUniqueJobTypes } from "@/store/composables";
import { ADD_SELECTED_JOB_TYPES } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebarJobTypes",
  components: {
    JobFiltersSidebarCheckboxGroup,
  },
  setup() {
    const uniqueJobTypes = useUniqueJobTypes();
    return {
      uniqueJobTypes,
      ADD_SELECTED_JOB_TYPES,
    };
  },
});
</script>
