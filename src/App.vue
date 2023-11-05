<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <welcome @end="openmain" v-if="welcome_" />
  <ui v-if="main" />
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

#app {
  position: absolute;
  top: 0px;
  width: 100vw;
}
</style>

<script>
import ui from "./components/ui.vue";
import settings from "./components/Settings.vue";
import welcome from "./components/Welcome.vue";

//axios.defaults.withCredentials = true;

export default {
  components: {
    ui,
    settings,
    welcome,
  },
  data: () => {
    return {
      notes: {},
      main: true,
      welcome_: false,
    };
  },
  mounted() {
    window.electronAPI.listNotebooks().then((result) => {
      if (result === undefined || result.length == 0) {
        this.main = false;
        this.welcome_ = true;
      } else {
        this.main = true;
        this.welcome_ = false;
      }
    });
  },
  methods: {
    openmain() {
      this.main = true;
      this.welcome_ = false;
    },
  },
};
</script>
