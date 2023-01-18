<template>
  <section class="mb-16">
    <h1
      class="font-bold tracking-tighter text-8xl mb-14"
      data-test="action-phrase"
    >
      <span :class="actionClasses">{{ action }} </span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your job at Vlad corp.</h2>
  </section>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { computed, defineComponent, onBeforeUnmount } from "@vue/runtime-core";

import nextElementInList from "@/utils/nextElementInList";

interface ActionClasses {
  [x: string]: boolean;
}

export default defineComponent({
  name: "Headline",
  setup() {
    const action = ref("Build");
    const interval = ref<number | undefined>(undefined);

    const actionClasses = computed<ActionClasses>(() => {
      return {
        [action.value.toLowerCase()]: true,
      };
    });

    const changeTitle = () => {
      interval.value = setInterval(() => {
        const actions = ["Build", "Create", "Design", "Code"];
        action.value = nextElementInList(actions, action.value);
      }, 3000);
    };

    changeTitle();

    onBeforeUnmount(() => {
      clearInterval(interval.value);
    });

    return {
      action,
      actionClasses,
    };
  },
});
</script>

<style scoped>
.build {
  color: #1a73eb;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>