<template>
  <input
    type="text"
    :value="modelValue"
    @input="handleInput"
    :placeholder="placeholder"
    class="w-full text-lg font-normal focus:outline-none"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "TextInput",
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit("update:modelValue", target.value);
    };

    return {
      handleInput,
    };
  },
});
</script>

<style>
</style>