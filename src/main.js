import { createApp } from "vue";
import App from "./App.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faCaretDown,
  faCode,
  faPlus,
  faScroll,
  faTrash,
  faGear,
  faCirclePlus,
  faUpload,
  faEye,
  faStar,
  faMagnifyingGlass,
  faT,
  faXmark,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

/* import specific icons */
import {
  faFileLines,
  faFilePdf,
  faImage,
  faSquareCheck,
} from "@fortawesome/free-regular-svg-icons";

import { faMarkdown } from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(
  faCaretDown,
  faImage,
  faMarkdown,
  faStar,
  faPlus,
  faScroll,
  faTrash,
  faGear,
  faCode,
  faFilePdf,
  faSquareCheck,
  faUpload,
  faFileLines,
  faMagnifyingGlass,
  faCirclePlus,
  faEye,
  faT,
  faXmark,
  faEyeSlash,
);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
