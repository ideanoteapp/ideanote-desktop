<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <welcome @end="openmain" v-if="welcome_"/>
  <ui v-if="main" />
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<script>
import ui from './components/ui.vue'
import settings from './components/Settings.vue'
import welcome from './components/Welcome.vue'

//axios.defaults.withCredentials = true;

export default {
  components: {
    ui, settings, welcome
  },
  data: () => {
    return {
      notes: {},
      main: true,
      welcome_: false
    };
  },
  mounted(){
    
  },
  methods:{
    openmain(){
      this.main = true;
      this.welcome_ = false;
    }
  }
}
</script>