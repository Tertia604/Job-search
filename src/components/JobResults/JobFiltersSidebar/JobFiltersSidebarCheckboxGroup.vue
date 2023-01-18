<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="value in uniqueValues" :key="value" class="w-1/2 h-8">
          <input
            type="checkbox"
            :id="value"
            v-model="selectedValues"
            :value="value"
            @change="selectValue"
            class="mr-3"
          />
          <label :for="value">{{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "@vue/runtime-core";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

// import { key } from "@/store";

import { CLEAR_USER_JOB_FILTER_SECTIONS } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebarChecbox",
  components: {},

  props: {
    uniqueValues: {
      type: [Array, Set] as PropType<string | Set<string>>,
      required: true,
    },
    mutation: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // const store = useStore(key);
    const store = useStore();
    const router = useRouter();

    const selectedValues = ref<string[]>([]);

    // очистка чекбоксов
    store.subscribe((mutation) => {
      if (mutation.type === CLEAR_USER_JOB_FILTER_SECTIONS) {
        selectedValues.value = [];
      }
    });

    const selectValue = () => {
      store.commit(props.mutation, selectedValues.value);
      router.push({ name: "jobResultsView" });
    };

    return {
      selectedValues,
      selectValue,
    };
  },
});
</script>