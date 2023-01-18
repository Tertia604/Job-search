<template>
  <div class="flex-auto p-8 bg-brand-gray-2" v-if="displayJobs.length">
    <ol>
      <job-listing v-for="job in displayJobs" :key="job.id" :job="job" />
    </ol>

    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            :to="{ name: 'jobResultsView', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            :to="{ name: 'jobResultsView', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>Ничего не найдено</h1>
  </div>
</template>

<script lang="ts">
import JobListing from "@/components/JobResults/JobListing.vue";

import { computed, defineComponent, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";

import {
  useFetchJobsDispatch,
  useFilteredJobs,
  useFetchDegreesDispatch,
} from "@/store/composables";

export default defineComponent({
  name: "JobListings",
  components: {
    JobListing,
  },
  setup() {
    const route = useRoute();

    const filteredJobs = useFilteredJobs();

    const currentPage = computed(() => {
      const page = route.query.page as string;
      const pageString = page || "1";
      return Number.parseInt(pageString);
    });

    const nextPage = computed(() => {
      const nextPage = currentPage.value + 1;
      const maxPage = Math.ceil(filteredJobs.value.length / 10);
      return nextPage <= maxPage ? nextPage : undefined;
    });

    const previousPage = computed(() => {
      const previousPage = currentPage.value - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    });

    const displayJobs = computed(() => {
      const pageNumber = currentPage.value;
      const firstJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex = pageNumber * 10;
      return filteredJobs.value.slice(firstJobIndex, lastJobIndex);
    });

    useFetchJobsDispatch();
    useFetchDegreesDispatch();
    return {
      displayJobs,

      currentPage,
      nextPage,
      previousPage,
    };
  },
});
</script>
