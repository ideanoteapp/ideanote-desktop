<template>
  <div class="mt-3"></div>

  <div class="h-[calc(100%-50px)] flex flex-col">
    <div class="flex-grow overflow-y-scroll" ref="list">
      <div
        v-for="(i, index) in list"
        class="bg-[#262626] mb-3 flex rounded-lg text-white px-4 py-2 border border-[#3a3a3a]"
        :class="{
          'border-none bg-white opacity-20 rounded-full h-0 py-[2px]':
            index == editing,
        }"
      >
        <div
          class="flex w-full flex-grow"
          v-if="typeof i === 'string' || i instanceof String"
        >
          <div class="flex-grow">{{ i }}</div>
          <button @click="remove(i)" class="">
            <font-awesome-icon
              icon="fa-solid fa-trash"
              class="text-[#4d4c4c] duration-100 hover:text-[#ff6262]"
            />
          </button>
        </div>

        <div v-else-if="index == editing"></div>

        <div class="flex items-start w-full" v-else>
          <div class="flex items-start w-full">
            <div class="flex-grow text flex flex-col">
              <div class="text-[.7rem] opacity-60 flex-grow">{{ i.date }}</div>
              <div v-html="parseURL(i.text)" class="scrap-text"></div>
            </div>
            <button @click="startEdit(index)" class="mr-2">
              <font-awesome-icon
                icon="fa-solid fa-pen"
                class="text-[#4d4c4c] duration-100 hover:text-[#74ff62]"
              />
            </button>
            <button @click="remove(i)" class="">
              <font-awesome-icon
                icon="fa-solid fa-trash"
                class="text-[#4d4c4c] duration-100 hover:text-[#ff6262]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="h-px w-full bg-white mb-5 mt-2"></div>
    <form
      @submit.prevent="addText"
      class="flex items-end bg-[#262626] rounded-lg border border-[#3a3a3a]"
    >
      <textarea
        v-model="input"
        class="rounded-lg text-white px-4 py-2 flex-grow bg-transparent"
        style="outline: none !important; resize: none; caret-color: white"
        rows="4"
        placeholder="Type something..."
        @keydown.enter="keydown"
      ></textarea>
      <button
        type="submit"
        class="mx-3 mb-3 rounded-lg w-10 h-10 flex justify-center flex-col text-center bg-[#2F497D]"
      >
        <div class="flex justify-center w-full flex-row">
          <font-awesome-icon
            v-if="ifEditing"
            icon="fa-solid fa-pen"
            class="text-white"
          />
          <font-awesome-icon
            v-else
            icon="fa-solid fa-plus"
            class="text-white"
          />
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

.scrap-text a {
  color: #84a4f0;
  text-decoration: underline;
}
</style>

<script>
export default {
  props: ["text"],
  data: () => {
    return {
      list: [],
      input: "",
      toReplace: "",
      editing: -1,
      ifEditing: false,
    };
  },
  mounted() {
    if (this.text != undefined) {
      console.log(`Parsing ${this.text}`);
      this.list = JSON.parse(this.text);
    }

    setTimeout(() => {
      this.$refs.list.scrollBy(0, 9999999999);
    }, 50);
  },
  methods: {
    addText() {
      if (this.ifEditing) {
        var d = new Date();
        this.list.splice(this.editing, 1, {
          text: this.input,
          date: this.list[this.editing].date,
        });
        this.input = "";
        this.$emit("save", JSON.stringify(this.list));
        this.ifEditing = false;
        this.editing = -1;
      } else {
        var d = new Date();
        this.list.push({
          text: this.input,
          date: `${d.getFullYear()}/${
            d.getMonth() + 1
          }/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`,
        });
        this.input = "";
        this.$emit("save", JSON.stringify(this.list));
      }

      setTimeout(() => {
        this.$refs.list.scrollBy(0, 9999999999);
      }, 50);
    },
    parseURL(string) {
      return string.replace(
        /\bhttps?:\/\/\S+/gi,
        (match) => `<a href="${match}">${match}</a>`,
      );
    },
    remove(text) {
      this.list = this.list.filter((item) => item !== text);
      this.$emit("save", JSON.stringify(this.list));
    },
    startEdit(index = 0) {
      this.editing = index;
      this.ifEditing = true;
      this.input = this.list[index].text;
    },
    keydown(e) {
      if (e.ctrlKey) {
        this.addText();
      }
    },
  },
};
</script>
