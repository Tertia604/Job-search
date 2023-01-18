<template>
  <div class="flex flex-row flex-nowrap w-full">
    <job-filters-sidebar />
    <Job-listings />
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "JobResultsView",
  components: {
    JobFiltersSidebar,
    JobListings,
  },

  setup() {
    const router = useRouter();
    const goToHome = () => {
      router.push({ name: "home" });
    };
    return {
      goToHome,
    };
  },
});
</script>