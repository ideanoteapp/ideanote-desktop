<template>
  <div class="mt-3"></div>

  <div class="h-[calc(100%-50px)] flex flex-col">
    <div class="flex-grow">
      <div
        v-for="i in list"
        class="bg-[#262626] mb-3 flex rounded-lg text-white px-4 py-2 border border-[#3a3a3a]"
      >
        <div class="flex-grow text">{{ i }}</div>
        <button @click="remove(i)">
          <font-awesome-icon
            icon="fa-solid fa-trash"
            class="text-[#4d4c4c] duration-100 hover:text-[#ff6262] mt-1 text-[1rem]"
          />
        </button>
      </div>
    </div>
    <div class="h-px w-full bg-white my-5"></div>
    <form
      @submit.prevent="addText"
      class="flex items-end bg-[#262626] rounded-lg border border-[#3a3a3a]"
    >
      <textarea
        v-model="input"
        class="rounded-lg text-white px-4 py-2 flex-grow bg-transparent"
        style="outline: none !important; resize: none; caret-color: white"
        rows="5"
        placeholder="Type something..."
      ></textarea>
      <button
        type="submit"
        class="mx-3 mb-3 rounded-lg w-10 h-10 flex justify-center flex-col text-center bg-[#2F497D]"
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
      this.list.push(this.input);
      this.input = "";
      this.$emit("save", JSON.stringify(this.list));
    },
    remove(text) {
      this.list = this.list.filter((item) => item !== text);
      this.$emit("save", JSON.stringify(this.list));
    },
  },
};
</script>
