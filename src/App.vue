<template>
  <div>
    <main-nav />
    <router-view />
  </div>
</template>

<script lang="ts">
import MainNav from "@/components/Navigation/MainNav.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "App",
  components: {
    MainNav,
  },
  setup() {},
});
</script>