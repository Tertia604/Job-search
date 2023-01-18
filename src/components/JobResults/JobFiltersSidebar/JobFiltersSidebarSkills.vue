<template>
  <div class="mt-5">
    <input
      v-model.trim="skillsSearchTerm"
      class="
        p-3
        h-12
        border border-solid border-brand-gray-1
        shadow-gray
        rounded
        w-full
        text-base
      "
      placeholder="Search your skills..."
    />
  </div>
</template>

<script lang="ts">
import { UPDATE_SKILLS_SEARCH_TERM } from "@/store/constants";
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "@/store";

export default defineComponent({
  name: "JobFiltersSidebarSkills",
  setup() {
    const store = useStore();
    const skillsSearchTerm = computed({
      get() {
        return store.state.skillsSearchTerm;
      },
      set(value) {
        store.commit(UPDATE_SKILLS_SEARCH_TERM, value);
      },
    });
    return {
      skillsSearchTerm,
    };
  },
});
</script>

<style>
</style>