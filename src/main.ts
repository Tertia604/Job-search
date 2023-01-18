import { createApp } from "vue";
import App from "@/App.vue";
import "@/assets/tailwind.css";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import router from "@/router";
// import store from "@/store";
import { store, storeKey } from "@/store";

library.add(faAngleDown);
library.add(faAngleUp);
library.add(faSearch);

createApp(App)
  .use(store, storeKey)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
