<template>
  <header :class="['w-full', 'text-sm', headerHeigthClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="
          flex flex-nowrap
          h-full
          px-8
          mx-auto
          border-b border-solid border-brand-gray-1
        "
      >
        <router-link
          :to="{ name: 'home' }"
          class="flex items-center h-full text-xl"
          >Vlad Careers</router-link
        >

        <nav class="h-full ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <li
              v-for="(menuItem, i) in menuItems"
              :key="i"
              class="h-full ml-9 first:ml-0"
              data-test="main-nav-list-item"
            >
              <router-link
                :to="menuItem.url"
                class="flex items-center h-full py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>

        <div class="flex items-center h-full ml-auto">
          <profile-image v-if="isLoggedIn" data-test="profile-image" />
          <action-button
            v-else
            text="Sign in"
            type="primary"
            data-test="login-button"
            @click="loginUser"
          />
        </div>
      </div>

      <subnav v-if="isLoggedIn" data-test="subnav" />
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "@/store";
import { ref } from "@vue/reactivity";

import { LOGIN_USER } from "@/store/constants";

import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import Subnav from "@/components/Navigation/Subnav.vue";

export default defineComponent({
  components: {
    ActionButton,
    ProfileImage,
    Subnav,
  },
  name: "MainNav",
  setup() {
    const store = useStore();

    const menuItems = ref([
      { text: "Teams", url: "/teams" },
      { text: "Locations", url: "/" },
      { text: "Life at Vlad Corp", url: "/" },
      { text: "How we hire", url: "/" },
      { text: "Students", url: "/" },
      { text: "Jobs", url: "/jobs/results" },
    ]);

    const isLoggedIn = computed(() => {
      return store.state.isLoggedIn;
    });

    const loginUser = () => {
      store.commit(LOGIN_USER);
    };

    const headerHeigthClass = computed(() => {
      return {
        "h-16": !isLoggedIn.value,
        "h-32": isLoggedIn.value,
      };
    });

    return {
      menuItems,
      isLoggedIn,

      headerHeigthClass,
      loginUser,
    };
  },
});
</script>
