<template>
  <div class="bg-[#2e2e2e] h-screen">
    <div
      class="fixed top-0 left-0 w-screen h-screen bg-[#00000070] flex justify-center"
    >
      <div class="flex flex-col justify-center">
        <div
          class="flex justify-center bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white"
        >
          <div class="text-center" v-if="slide == 0">
            <img
              src="../../icon.png"
              class="inline mb-3"
              width="64"
              height="64"
            />
            <div class="text-2xl font-bold">{{ t.welcome }}</div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                @click="slide = 1"
              >
                {{ t.start_setup }}
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 1">
            <img
              src="../../icon.png"
              class="inline mb-3"
              width="64"
              height="64"
            />
            <div class="text-2xl font-bold">
              {{ t.set_notebook_name }}
            </div>
            <p class="opacity-90 text-sm">
              {{ t.notebook_description }}
            </p>
            <input
              type="text"
              v-model="notebookname"
              class="bg-[#3f3f3f] py-2 px-3 rounded-lg text-center mt-4 w-64"
              placeholder="Notebook"
            />
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="slide = 2"
              >
                {{ t.next }}
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 2">
            <img
              src="../assets/inoppi.png"
              class="inline mb-3"
              width="64"
              height="64"
            />
            <div class="text-2xl font-bold">{{ t.tell_tutorial }}</div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] mr-1 w-32 mt-4"
                @click="slide = 3"
              >
                {{ t.teach_me }}
              </button>

              <button
                class="py-2 px-3 rounded-lg bg-[#3f3f3f] ml-1 w-32 mt-4"
                @click="go()"
              >
                {{ t.no_thanks }}
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 3">
            <img
              src="../assets/tutorial_1.png"
              class="inline mb-3 w-[70vw]"
              width="64"
              height="64"
            />
            <div class="text-2xl font-bold">
              左側にあるノート一覧の上の(+)ボタンからノートを作成します
            </div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="slide = 4"
              >
                わかった！
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 4">
            <div class="text-2xl font-bold">ノートには種類があります...</div>
            <p class="opacity-90 text-md text-left w-full">
              <strong>Markdown… </strong>Markdownのノート。<br />
              <strong>Scrap… </strong
              >時間経過とともに情報を記録していけるScrapのノート。使い方は後で説明します。<br />
              <strong>ToDo… </strong>シンプルなToDoリストです。<br />
              <strong>Plaintext… </strong
              >一般的なプレーンテキスト(.txt)のノート。<br />
              <strong>アップロード… </strong
              >画像ファイルと音声ファイル（今後さらに追加予定）をアップロードできます。
            </p>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="slide = 5"
              >
                わかった！
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 5">
            <img
              src="../assets/tutorial_2.png"
              class="inline mb-3 w-[70vw]"
              width="64"
              height="64"
            />
            <div class="text-2xl font-bold">
              左側のノート一覧からノートを選択します
            </div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="slide = 6"
              >
                わかった！
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 6">
            <img
              src="../assets/tutorial_3.png"
              class="inline mb-3 w-[70vw]"
              width="64"
              height="64"
            />
            <div class="text-2xl font-bold">
              右側の入力エリアから文字を入力できます
            </div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="slide = 7"
              >
                わかった！
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 7">
            <img
              src="../assets/tutorial_4.png"
              class="inline mb-3 w-[70vw]"
              width="64"
              height="64"
            />
            <div class="text-2xl font-bold">
              左側のフォルダ一覧の「新しいフォルダ」からフォルダを作成できます
            </div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="slide = 8"
              >
                わかった！
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 8">
            <img
              src="../assets/tutorial_5.png"
              class="inline mb-3 w-[70vw]"
              width="64"
              height="64"
            />
            <div class="text-2xl font-bold">
              左側のフォルダ一覧からフォルダを切り替えられます
            </div>
            <div class="text-sm opacity-90">
              ※「ルート」はノートブックの根本を表すフォルダです
            </div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="slide = 9"
              >
                わかった！
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 9">
            <div class="text-2xl font-bold">
              次に、Scrapの使い方を説明します
            </div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="slide = 10"
              >
                進む
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 10">
            <img src="../assets/tutorial_6.png" class="inline mb-3 h-[50vh]" />
            <div class="text-2xl font-bold">
              下の入力ボックスに入力するとテキストを追加できます
            </div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="slide = 11"
              >
                わかった！
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 11">
            <img src="../assets/tutorial_7.png" class="inline mb-3 h-[50vh]" />
            <div class="text-2xl font-bold">
              入力したテキストは上に溜まっていきます
            </div>
            <div class="text-sm opacity-90">
              たくさん溜まってきたら、スクロールできるようになります
            </div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="slide = 12"
              >
                わかった！
              </button>
            </div>
          </div>
          <div class="text-center" v-if="slide == 12">
            <img src="../assets/tutorial_7.gif" class="inline mb-3 h-[50vh]" />
            <div class="text-2xl font-bold">
              溜まったテキストは編集したり、削除したりすることもできます
            </div>
            <div class="text-sm opacity-90">
              （エンピツが編集で、ゴミ箱が削除です）
            </div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="slide = 13"
              >
                わかった！
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 13">
            <img
              src="../assets/tutorial_8.png"
              class="inline mb-3 w-[70vw]"
              width="64"
              height="64"
            />
            <div class="text-2xl font-bold">
              最後に、左上のideaNoteアイコンからメニューを開くことができます
            </div>
            <div class="text-sm opacity-90">
              メニューからはノートブックを切り替えたり、ideaNoteの設定を変更することができます
            </div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="slide = 14"
              >
                わかった！
              </button>
            </div>
          </div>

          <div class="text-center" v-if="slide == 14">
            <div class="text-2xl font-bold">チュートリアルは以上です！</div>
            <div class="text-sm opacity-90">ideaNoteをお楽しみください！</div>
            <div>
              <button
                class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
                v-if="notebookname != ''"
                @click="go()"
              >
                {{ t.next }}
              </button>
            </div>
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
import axios from "axios";

export default {
  data: () => {
    return {
      slide: 0,
      notebookname: "",
      t: {},
    };
  },
  mounted() {
    window.electronAPI.getTexts().then((result) => {
      this.t = result;
      console.log(this.t);
    });
  },
  methods: {
    go() {
      window.electronAPI.newNotebook(this.notebookname).then((result) => {
        if (this.t.next == "進む") {
          location.href = "https://ideanoteapp.com/welcome";
        }
        this.$emit("end", "");
      });
    },
  },
};
</script>
