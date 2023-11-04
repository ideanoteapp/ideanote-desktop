<script>
export default {
  props: ['text']
}
</script>

<template>
    <div class="w-full max-w-[44rem] mx-[2rem] mt-6 h-[calc(100%-24px)] border-none focus:outline-0 text-white">
    <div class="font-bold text-2xl mb-1.5 border-b pb-1 border-b-white text-white"><font-awesome-icon icon="fa-regular fa-file-lines" class="textt-[#FFB800] text-[#ffcd42] text-[1.24rem] mr-2 mt-1 before absolute -translate-x-6 translate-y-0.5" /><input type="text" value="Note Name" style="outline: none !important; caret-color: white;" class="bg-transparent"></div>   
    <textarea v-bind="text" id="my-text-area" class="bg-transparent w-full h-full" style="outline: none !important; caret-color: white;"></textarea>
  </div>
  </template>

<style>

/* global.css*/
 
@tailwind base;
@tailwind components;
@tailwind utilities;
 
/* width */
::-webkit-scrollbar {
    width: 8px;
}
 
/* Track */
::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 999px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: #ffffff80;
    border-radius: 999px;
}
 
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: transparent;
}
</style>