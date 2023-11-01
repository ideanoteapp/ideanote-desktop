<template>
  <div class="bg-[#2e2e2e] h-screen">
    <div class="fixed top-0 left-0 w-screen h-screen bg-[#00000070] flex justify-center">
    <div class="flex flex-col justify-center">
      <div class="flex justify-center bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white">
        <div class="text-center" v-if="slide == 0">
          <img src="../../icon.png" class="inline mb-3">
          <div class="text-2xl font-bold">ideaNoteへようこそ</div>
          <div><button class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4" @click="slide=1">セットアップを開始する</button></div>
        </div>

        <div class="text-center" v-if="slide==1">
          <img src="../../icon.png" class="inline mb-3">
          <div class="text-2xl font-bold">ideaNoteを使うのは初めてですか？</div>
          <p>もしideaNoteを初めて使用する場合は、<br>「新しく始める」をクリックしてください、</p>
          <div><button class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4" @click="slide=2">新しく始める</button></div>
          <div><button class="py-2 px-3 rounded-lg bg-[#4e4e4e] w-64 mt-4">既存のノートブックを読み込む</button></div>
        </div>

        <div class="text-center" v-if="slide==2">
          <img src="../../icon.png" class="inline mb-3">
          <div class="text-2xl font-bold">ノートブックに名前を付けてください</div>
          <p class="opacity-90 text-sm">ノートブックは、ノートを保管する場所を表します。</p>
          <input type="text" v-model="notebookname" class="bg-[#3f3f3f] py-2 px-3 rounded-lg text-center mt-4 w-64" placeholder="Notebook">
          <div><button class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4" @click="go">進む</button></div>
        </div>
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
export default {
  data: () => {
    return {
      slide: 0,
      notebookname: ""
    };
  },
  methods:{
    go(){
      window.electronAPI.setCurrentNotebook(this.notebookname)
      window.electronAPI.newNotebook(this.notebookname)
        .then(result => {
          this.$emit('end', "");
        });
      
    }
  }
}
</script>