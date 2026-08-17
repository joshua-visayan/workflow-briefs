import { ref, watch } from "vue";
import { defineStore } from "pinia";

const STORAGE_KEY = "ui:showStepDescriptions";

export const useUiStore = defineStore("ui", () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const showStepDescriptions = ref(stored === null ? true : stored === "true");

  watch(showStepDescriptions, (val) => {
    localStorage.setItem(STORAGE_KEY, String(val));
  });

  return { showStepDescriptions };
});
