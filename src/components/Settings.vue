<template>
    <div>
      <div class="flex max-h-screen h-screen">
        <div class="fixed left-[180px] lg:left-[200px] w-screen h-screen bg-black opacity-60 z-50" v-if="false"></div>
        <div id="sidebar1" class="bg-[#262626] w-[180px] lg:w-[200px] h-screen select-none">
          <div class="bg-[#202020] hover:bg-[#1d1d1d] duration-200 h-[54px] text-white flex px-4">
            <div class="flex flex-col justify-center">
              ←
            </div>
  
            <div class="flex flex-col justify-center ml-2.5 flex-grow mb-0.5">
              戻る
            </div>
  
            <div class="flex flex-col justify-center ml-2.5 mr-1">
              <font-awesome-icon icon="fa-solid fa-caret-down" />
            </div>
          </div>
  
          <div class="px-2 mx-2 text-white flex mt-3 bg-[#353535] py-2 rounded-lg">
            <img src="../assets/folder.png" alt="" class="w-[29px] h-[29px] mr-2 bg-white rounded-full">
            <div class="flex flex-col justify-center mb-1">
              Moon
            </div>
          </div>
  
          <div class="px-2 mx-2 text-white flex mt-3 py-1 rounded-lg opacity-90 hover:opacity-100 group duration-100">
            <font-awesome-icon icon="fa-solid fa-circle-plus" class="text-[20px] mr-2 duration-100"/>
            <div class="flex flex-col justify-center mb-1 text-sm">
              新しいカテゴリ
            </div>
          </div>
        </div>
  
        <div id="sidebar2" class="bg-[#2E2E2E] w-[286px] text-white lg:w-[386px] h-screen">
          <div class="bg-[#242424] duration-200 h-[54px] w-[286px] lg:w-[386px] text-white flex px-4">
            <div class="flex flex-col justify-center">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-[20px] opacity-90"/>
            </div>
  
            <div class="flex flex-col justify-center ml-2.5 flex-grow mb-0.5 text-center">
              全てのノート
            </div>
  
            <div class="flex flex-col justify-center ml-2.5 mr-1">
              <font-awesome-icon icon="fa-regular fa-file-lines" class="text-[20px] mr-1" />
            </div>
  
            <div class="flex flex-col justify-center ml-2.5 mr-1">
              <font-awesome-icon icon="fa-solid fa-circle-plus" class="text-[22px] oapcity-90"/>
            </div>
          </div>
  
          <div class="">
            <div class="flex border-b border-b-[#ffffff15] py-3 px-5 duration-200 hover:bg-[#2b2b2b] hover:bg-[#ffffff10]">
              <font-awesome-icon icon="fa-regular fa-file-lines" class="textt-[#FFB800] text-[#ffcd42] text-[1.035rem] mr-2 mt-1" />
              <div>
                <div class="text-[1.035rem]">ノートの名前</div>
                <div class="opacity-80 text-sm overflow-hidden h-[2.5rem]">これはテストテキストです。これはテストテキストです。これはテストテキストです。これはテストテキストです。これはテストテキストです。</div>
              </div>
            </div>
          </div>
        </div>
  
        <div id="sidebar2" class="bg-[#1f1f1f] flex-grow h-screen max-h-screen">
          <div class="bg-[#242424] duration-200 h-[54px] text-white flex px-4">
            <div class="flex flex-col justify-center">
              <img src="../assets/vue.svg" alt="" class="w-[27px] h-[27px] bg-white rounded-full">
            </div>
  
            <div class="flex flex-col justify-center ml-2.5 flex-grow mb-0.5">
              Korange
            </div>
  
            <div class="flex flex-col justify-center ml-2.5 mr-1">
              <font-awesome-icon icon="fa-solid fa-eye" class="text-[20px] opacity-90" />
            </div>
  
            <div class="flex flex-col justify-center ml-2.5 mr-1">
              <img src="../assets/ellipsis.svg" class="w-[20px] h-[20px] opacity-90">
            </div>
          </div>
  
          <div class="flex justify-center h-[calc(100%-103px)]">
            <!--<div class="w-full max-w-[44rem] mx-[2rem] mt-6 h-[calc(100%-24px)] border-none focus:outline-0 text-white">
              <div class="font-bold text-2xl mb-1.5 border-b pb-1 border-b-white text-white"><font-awesome-icon icon="fa-regular fa-file-lines" class="textt-[#FFB800] text-[#ffcd42] text-[1.24rem] mr-2 mt-1 before absolute -translate-x-6 translate-y-0.5" /><input type="text" value="Note Name" class="bg-transparent"></div>    
              <textarea id="my-text-area" class="bg-transparent w-full h-full" style="outline: none !important;"></textarea>
            </div>-->
            <plaintext />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  </style>
  
  <script>
  import plaintext from './Plaintext.vue'
  //axios.defaults.withCredentials = true;
  
  export default {
    components: {
      plaintext
    },
    mounted(){
      const filePath = window.electronAPI.openFile()
      filePathElement.innerText = filePath
    }
  }
  </script>