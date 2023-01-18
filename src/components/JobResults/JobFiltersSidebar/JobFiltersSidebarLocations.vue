<template>
  <div class="mt-5">
    <input
      v-model.trim="skillsSearchLocations"
      class="
        p-3
        h-12
        border border-solid border-brand-gray-1
        shadow-gray
        rounded
        w-full
        text-base
      "
      placeholder="Search your locations..."
    />
  </div>
</template>

<script lang="ts">
import { UPDATE_SKILLS_SEARCH_LOCATIONS } from "@/store/constants";
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "@/store";

export default defineComponent({
  name: "JobFiltersSidebarLocaations",
  setup() {
    const store = useStore();
    const skillsSearchLocations = computed({
      get() {
        return store.state.locationsSearchTerm;
      },
      set(value) {
        store.commit(UPDATE_SKILLS_SEARCH_LOCATIONS, value);
      },
    });
    return {
      skillsSearchLocations,
    };
  },
});
</script>

<style>
</style>