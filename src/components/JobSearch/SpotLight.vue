<template>
  <ul>
    <li v-for="spotLight in spotLights" :key="spotLight.id">
      <slot
        :img="spotLight.img"
        :title="spotLight.title"
        :description="spotLight.description"
      ></slot>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "@/store";
import { useFetchSpotlight } from "@/store/composables";

export default defineComponent({
  name: "SpotLight",
  setup() {
    const store = useStore();

    useFetchSpotlight();

    const spotLights = computed(() => {
      return store.state.spotLights;
    });

    return {
      spotLights,
    };
  },
});
</script>
