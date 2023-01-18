import { computed } from "vue";
import { useStore } from "@/store/index";
import { FETCH_JOBS, FETCH_DEGREES, FETCH_SPOTLIFGT } from "@/store/constants";

import { Job } from "@/api/types";

// GETTRES
// computed будет обёртывать <...>
export const useFilteredJobs = () => {
  const store = useStore();
  return computed<Job[]>(() => store.getters.FILTERED_JOBS);
};

export const useUniqueJobTypes = () => {
  const store = useStore();
  return computed<Set<string>>(() => store.getters.UNIQUE_JOB_TYPES);
};

export const useUniqueJobOrganization = () => {
  const store = useStore();
  return computed<Set<string>>(() => store.getters.UNIQUE_ORGANIZATIONS);
};

export const useUniqueDegrees = () => {
  const store = useStore();
  return computed<string>(() => store.getters.UNIQUE_DEGREES);
};

// ACTIONS
export const useFetchJobsDispatch = () => {
  const store = useStore();
  store.dispatch(FETCH_JOBS);
};

export const useFetchDegreesDispatch = () => {
  const store = useStore();
  store.dispatch(FETCH_DEGREES);
};

export const useFetchSpotlight = () => {
  const store = useStore();
  store.dispatch(FETCH_SPOTLIFGT);
};
