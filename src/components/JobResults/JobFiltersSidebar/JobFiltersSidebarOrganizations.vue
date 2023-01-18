<template>
  <job-filters-sidebar-checkbox-group
    :uniqueValues="uniqueOrganizations"
    :mutation="ADD_SELECTED_ORGANIZATIONS"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useUniqueJobOrganization } from "@/store/composables";
import { ADD_SELECTED_ORGANIZATIONS } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebarOrganizations",
  components: {
    JobFiltersSidebarCheckboxGroup,
  },
  setup() {
    const uniqueOrganizations = useUniqueJobOrganization();

    return {
      uniqueOrganizations,
      ADD_SELECTED_ORGANIZATIONS,
    };
  },
});
</script>