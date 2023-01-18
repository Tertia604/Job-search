import { createStore, useStore as baseUseStore, Commit, Store } from "vuex";
import axios from "axios";
import { InjectionKey } from "vue";

import {
  LOGIN_USER,
  FETCH_JOBS,
  FILTERED_JOBS,
  UNIQUE_ORGANIZATIONS,
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
  UNIQUE_JOB_TYPES,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
  FETCH_DEGREES,
  UNIQUE_DEGREES,
  INCLUDE_JOB_BY_DEGREE,
  ADD_SELECTED_DEGREE,
  CLEAR_USER_JOB_FILTER_SECTIONS,
  UPDATE_SKILLS_SEARCH_TERM,
  INCLUDE_JOB_BY_SKILL,
  UPDATE_SKILLS_SEARCH_LOCATIONS,
  INCLUDE_JOB_BY_LOCATIONS,
  FETCH_SPOTLIFGT,
} from "@/store/constants";

import { GlobalState } from "@/store/types";
import { Job, Degree, SpotLights } from "@/api/types";

interface IncludeJobGetters {
  INCLUDE_JOB_BY_ORGANIZATION: (job: Job) => boolean;
  INCLUDE_JOB_BY_JOB_TYPE: (job: Job) => boolean;
  INCLUDE_JOB_BY_DEGREE: (job: Job) => boolean;
  INCLUDE_JOB_BY_SKILL: (job: Job) => boolean;
  INCLUDE_JOB_BY_LOCATIONS: (job: Job) => boolean;
}

export const storeKey: InjectionKey<Store<GlobalState>> = Symbol();

export const store = createStore<GlobalState>({
  state: {
    isLoggedIn: false,
    jobs: [],
    degrees: [],
    skillsSearchTerm: "",
    locationsSearchTerm: "",
    selectedOrganizations: [],
    selectedJobTypes: [],
    selectedDegrees: [],

    spotLights: [],
  },
  mutations: {
    // отображает когда залогинился
    [LOGIN_USER](state) {
      state.isLoggedIn = true;
    },
    // список работ из action
    jobs(state, jobs: Job[]) {
      state.jobs = jobs;
    },
    // список degrees из action
    degrees(state, degrees: Degree[]) {
      state.degrees = degrees;
    },
    spotLights(state, spotLights: SpotLights[]) {
      state.spotLights = spotLights;
    },
    // чекбокс по организации
    [ADD_SELECTED_ORGANIZATIONS](state, organizations: string[]) {
      state.selectedOrganizations = organizations;
    },
    // чекбокс по типу работы
    [ADD_SELECTED_JOB_TYPES](state, jobTypes: string[]) {
      state.selectedJobTypes = jobTypes;
    },
    // чекбокс по типу degrees
    [ADD_SELECTED_DEGREE](state, degrees: string[]) {
      state.selectedDegrees = degrees;
    },
    // инпут по поиску skills
    [UPDATE_SKILLS_SEARCH_TERM](state, skillsSearchTerm: string) {
      state.skillsSearchTerm = skillsSearchTerm;
    },
    // инпут по поиску locations
    [UPDATE_SKILLS_SEARCH_LOCATIONS](state, locationsSearchTerm: string) {
      state.locationsSearchTerm = locationsSearchTerm;
    },
    // очистка фильтров чекбоксов
    [CLEAR_USER_JOB_FILTER_SECTIONS](state) {
      state.selectedOrganizations = [];
      state.selectedJobTypes = [];
      state.selectedDegrees = [];
      state.skillsSearchTerm = "";
      state.locationsSearchTerm = "";
    },
  },
  getters: {
    // фильтр по organization
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrganizations = new Set<string>();
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
      return uniqueOrganizations;
    },
    // фильтр по job types
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set<string>();
      state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
      return uniqueJobTypes;
    },
    // фильтр по degrees
    [UNIQUE_DEGREES](state) {
      return state.degrees.map((degree) => degree.degree);
    },
    // геттеры для фильтра FILTERED_JOBS
    // оформление геттера который возвращает функцию
    [INCLUDE_JOB_BY_ORGANIZATION]: (state) => (job: Job) => {
      if (state.selectedOrganizations.length === 0) return true;
      return state.selectedOrganizations.includes(job.organization);
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: (state) => (job: Job) => {
      if (state.selectedJobTypes.length === 0) return true;
      return state.selectedJobTypes.includes(job.jobType);
    },
    [INCLUDE_JOB_BY_DEGREE]: (state) => (job: Job) => {
      if (state.selectedDegrees.length === 0) return true;
      return state.selectedDegrees.includes(job.degree);
    },
    // поиск через инпут в title db/jobs
    [INCLUDE_JOB_BY_SKILL]: (state) => (job: Job) => {
      return job.title
        .toLowerCase()
        .includes(state.skillsSearchTerm.toLowerCase());
    },
    // поиск через инпут в locations db/jobs
    [INCLUDE_JOB_BY_LOCATIONS]: (state) => (job: Job) => {
      if (state.locationsSearchTerm.length === 0) return true;
      // return job.locations.includes(state.locationsSearchTerm);
      return job.locations.filter((loc) => {
        console.log(loc.includes(state.locationsSearchTerm));

        return loc.includes(state.locationsSearchTerm);
      });
    },
    // фильтр по organization и по job types и по degrees
    [FILTERED_JOBS](state, getters: IncludeJobGetters) {
      return state.jobs
        .filter((job) => getters.INCLUDE_JOB_BY_ORGANIZATION(job))
        .filter((job) => getters.INCLUDE_JOB_BY_JOB_TYPE(job))
        .filter((job) => getters.INCLUDE_JOB_BY_DEGREE(job))
        .filter((job) => getters.INCLUDE_JOB_BY_SKILL(job))
        .filter((job) => getters.INCLUDE_JOB_BY_LOCATIONS(job));
    },
  },
  actions: {
    // получение работ с сервера и передача его в мутации
    [FETCH_JOBS]: ({ commit }): void => {
      axios.get("/db.json").then((result) => commit("jobs", result.data.jobs));
    },
    // получение degrees с сервера и передача его в мутации
    [FETCH_DEGREES]: ({ commit }): void => {
      axios
        .get("/db.json")
        .then((result) => commit("degrees", result.data.degrees));
    },
    [FETCH_SPOTLIFGT]: ({ commit }): void => {
      axios
        .get("/db.json")
        .then((result) => commit("spotLights", result.data.spotlights));
    },
  },
  strict: process.env.NODE_ENV !== "production",
});

export function useStore(): Store<GlobalState> {
  return baseUseStore<GlobalState>(storeKey);
}
