<template>
  <div>Job page for job {{ currentJobId }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "JobVue",
  setup() {
    const route = useRoute();

    const currentJobId = computed(() => {
      return route.params.id;
    });
    return {
      currentJobId,
    };
  },
});
</script>

<style>
</style>