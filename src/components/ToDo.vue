<template>
  <div class="mt-3"></div>

  <div class="h-[calc(100%-50px)] flex flex-col">
    <div class="">
      <div
        v-for="i in list"
        class="flex rounded-lg text-white px-4 py-1"
      >
        <div class="flex-grow text-white flex">
          <input type="checkbox" name="" id="" @change="save" v-model="i.checked" class="w-6 h-6">
           <div class="ml-3 flex flex-grow flex-col justify-center text">
            {{ i.text }}
           </div>
           <button @click="remove(i.text)"><font-awesome-icon icon="fa-solid fa-trash" class="text-[#4d4c4c] duration-100 hover:text-[#ff6262] mt-1 text-[1rem]" /></button>
          </div>
        
      </div>
    </div>
    <form
      @submit.prevent="addText"
      class="flex items-end bg-[#262626] mt-4 rounded-lg border border-[#3a3a3a]"
    >
      <input
        v-model="input"
        class="rounded-lg text-white flex-grow p-2 bg-transparent"
        style="outline: none !important; resize: none; caret-color: white"
        placeholder="Type something..."
      >
      <button
        type="submit"
        class="rounded-lg w-10 h-10 flex justify-center flex-col text-center bg-[#2F497D]"
      >
        <div class="flex justify-center w-full flex-row">
          <font-awesome-icon icon="fa-solid fa-plus" class="text-white" />
        </div>
      </button>
    </form>
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

* {
  white-space: pre-line;
}
</style>

<script>
export default {
  props: ["text"],
  data: () => {
    return {
      list: [],
      input: "",
    };
  },
  mounted() {
    if (this.text != undefined) {
      this.list = JSON.parse(this.text);
    }

    document.body.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
        this.addText();
      }
    });
  },
  methods: {
    addText() {
      this.list.push({checked: false, text: this.input});
      this.input = "";
      this.$emit("save", JSON.stringify(this.list));
    },
    save(){
      this.$emit("save", JSON.stringify(this.list))
    },
    remove(text){
      this.list = this.list.filter(item => item.text !== text);
      this.$emit("save", JSON.stringify(this.list))
    }
  },
};
</script>
