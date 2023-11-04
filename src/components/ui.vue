<template>

  <div class="fixed bottom-4 left-4 bg-[#3f3f3f] text-white rounded-md sm:shadow-md text-sm sm:hover:bottom-5 duration-200">
        <button @click="this.sendFeedbackForm = true" class="px-3 py-2 flex">
            <img src="../../icon.png" class="w-6 h-6 mr-1.5">
            <span class="flex flex-col justify-center">
                意見を送る
            </span>
          </button>
    </div>

    <div class="fixed top-0 left-0 w-screen h-screen bg-[#00000070] flex justify-center" v-if="sendFeedbackForm">
    <div class="flex flex-col justify-center">
      <div class="flex justify-center bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white">
        <form class="text-center" @submit.prevent="sendFeedback">
          <div class="text-2xl font-bold pb-2.5">意見を送る</div>
          <input type="text" v-model="feedback" class="bg-[#262626] rounded-lg py-2 px-3 text-white text-center w-64" placeholder="例）〇〇という機能が欲しい">

          <div><button class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4" @click="sendFeedback">送信</button></div>
        </form>
      </div>
    </div>
</div>


<!---------->


  <div>
    <div class="flex max-h-screen max-w-[100vw] h-screen overflow-hidden">
      <div class="fixed left-[180px] lg:left-[200px] w-screen h-screen bg-black opacity-60 z-50" v-if="false"></div>
      <div id="sidebar1" class="bg-[#262626] min-w-[180px] lg:min-w-[200px] w-[180px] lg:w-[200px] h-screen select-none overflow-x-hidden">
        <div class="bg-[#202020] hover:bg-[#1d1d1d] duration-200 h-[54px] text-white flex px-4" @click="openNotebookMenu">
          <div class="flex flex-col justify-center">
            <img :src="`${currentNotebook}/.icon.png`" alt="" class="w-[27px] h-[27px] bg-white rounded-full">
          </div>

          <div class="flex flex-col justify-center ml-2.5 flex-grow mb-0.5">
            {{currentNotebook.replace(/^.*[\\/]/, '')}}
          </div>

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <font-awesome-icon icon="fa-solid fa-caret-down" />
          </div>
        </div>
        <div class="before:fixed before:top-0 before:left-0 before:w-screen before:h-screen before:bg-black before:opacity-50" v-if="NotebookMenu" @click="openNotebookMenu"></div>
        <div v-if="NotebookMenu" @click="openNotebookMenu" class=" max-h-[calc(100vh-2.5rem)] overflow-scroll absolute bg-[#262626] z-50 w-48 rounded-lg top-10 py-3 shadow-md border border-[#5f5f5f]">
          <div class="flex px-4">
                <img :src="`${currentNotebook}/.icon.png`" class="rounded-full w-7 h-7">
                <div class="ml-2">
                  <div class="text-[1.1rem] font-semibold text-white">{{ currentNotebook.replace(/^.*[\\/]/, '') }}</div>
                </div>
              </div>

              <div class="hover:bg-[#3f3f3f] mt-2 text-white z-50">
                <button class="px-4 pb-1" @click="changeIcon">
                  <font-awesome-icon icon="fa-solid fa-star" class="w-6 textt-[#FFB800] text-[#ffcd42] text-[1.2rem] mr-1 mt-1 before" />
                  アイコンを変更
                </button>
              </div>
              
              <!--<div class="hover:bg-[#3f3f3f] px-4 pb-1 text-white z-50">
                <font-awesome-icon icon="fa-solid fa-gear" class="text-sm w-6 textt-[#FFB800] mt-1 text-[#42ff6b] text-[1.2rem] mr-1 before" />
                ノートブック設定
              </div>-->

              <div class="hover:bg-[#3f3f3f] text-white z-50">
                <button class="px-4 pb-1" @click="deleteNotebook">
                  <font-awesome-icon icon="fa-solid fa-trash" class="text-sm w-6 textt-[#FFB800] mt-1 text-[#ff4242] text-[1.2rem] mr-1 before" />
                ノートブックを削除
                </button>
              </div>
              
              <div class="bg-[#5f5f5f] w-full h-px mt-2 mb-2"></div>

              <div class=" hover:bg-[#3a3a3a]" v-for="n in notebooks">
                <button v-if="n != currentNotebook" class="flex px-4 py-1.5 w-full h-full" @click="changeNotebook(n)">
                  <img :src="`${n}/.icon.png`" class="w-7 h-7 rounded-full">
                  <div class="ml-2">
                    <div class="text-[1.1rem] font-semibold text-white">{{ n.replace(/^.*[\\/]/, '') }}</div>
                  </div>
                </button>
              </div>

              <div class="hover:bg-[#3f3f3f] mt-2 text-white z-50">
                <button class="px-4 pb-1" @click="this.createNotebookForm=true">
                  <font-awesome-icon icon="fa-solid fa-plus" class="w-6 textt-[#FFB800] text-[1.2rem] mr-1 mt-1 before" />
                  新しいノートブック
                </button>
              </div>

              <div class="bg-[#5f5f5f] w-full h-px mt-2 mb-2"></div>

              <div class="hover:bg-[#3f3f3f] text-white z-50">
                <button class="px-4 @b-1">
                  <font-awesome-icon icon="fa-solid fa-gear" class="text-sm w-6 textt-[#FFB800] mt-1 text-[#f3f3f3] text-[1.2rem] mr-1 before" />
                  全体設定
                </button>
              </div>

            </div>

        <div @click="selectRoot" class="mx-2 text-white mt-3 hover:bg-[#353535] rounded-lg select-none" :class="{'bg-[#353535]': openingDir==''}">
          <button class="flex py-2 px-2 w-full">
            <img src="../assets/root.png" alt="" class="w-[29px] h-[29px] mr-2 bg-white rounded-full">
            <div class="flex flex-col justify-center mb-1">
              ルート
            </div>
          </button>
        </div>

        <div class=" mx-2 text-white flex mt-1 hover:bg-[#353535] rounded-lg" v-for="i in dirs" @click="openDir(i)" :class="{'bg-[#353535]': openingDir == i}">
          <button class="flex py-2 px-2 w-full">
            <img src="../assets/folder.png" alt="" class="w-[29px] h-[29px] mr-2 bg-white rounded-full">
            <div class="flex flex-col justify-center mb-1">
              {{i.replace(/^.*[\\/]/, '')}}
            </div>
          </button>
        </div>

        <div class="px-2 mx-2 text-white flex mt-3 py-1 rounded-lg opacity-90 hover:opacity-100 group duration-100" @click="newFolder">
          <font-awesome-icon icon="fa-solid fa-circle-plus" class="text-[20px] mr-2 duration-100"/>
          <div class="flex flex-col justify-center mb-1 text-sm">
            新しいフォルダ
          </div>
        </div>
      </div>

      <div id="sidebar2" class="bg-[#2E2E2E] w-[286px] text-white lg:w-[386px] h-screen">
        <div class="bg-[#242424] duration-200 h-[54px] w-[286px] lg:w-[386px] text-white flex px-4">
          <!--<div class="flex flex-col justify-center">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-[20px] opacity-90"/>
          </div>-->

          <div class="flex flex-col justify-center ml-2.5 flex-grow mb-0.5 text-center">
            {{openingDir.replace(/^.*[\\/]/, '')}}
          </div>

          <!--<div class="flex flex-col justify-center ml-2.5 mr-1">
            <button>
              <font-awesome-icon icon="fa-regular fa-file-lines" class="text-[20px] mr-1" />
            </button>
          </div>-->

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <button @click="this.newNoteMenu = !this.newNoteMenu">
              <font-awesome-icon icon="fa-solid fa-circle-plus" class="text-[22px] oapcity-90"/>
            </button>
            <div v-if="newNoteMenu" class=" absolute bg-[#262626] z-50 w-44 rounded-lg top-10 py-3 shadow-md border border-[#5f5f5f]">
              <div class="hover:bg-[#3f3f3f] px-4 pb-1" @click="createNote('md')">
                <font-awesome-icon icon="fa-regular fa-file-lines" class="w-6 textt-[#FFB800] text-[#ffcd42] text-[1.24rem] mr-2 mt-1 before" />
                Markdown
              </div>
              <div class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]" @click="createNote('txt')">
                <font-awesome-icon icon="fa-solid fa-t" class="w-6 textt-[#FFB800] text-[#628eff] text-[1.24rem] mr-2 mt-1 before" />
                Plaintext
              </div>
              <div class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]" @click="createNote('scrap')">
                <font-awesome-icon icon="fa-solid fa-scroll" class="w-6 textt-[#FFB800] text-[#ffd562] text-[1.24rem] mr-2 mt-1 before" />
                Scrap
              </div>
              <div class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]">
                <font-awesome-icon icon="fa-regular fa-square-check" class="w-6 textt-[#FFB800] text-[#4ae245] text-[1.24rem] mr-2 mt-1 before" />
                ToDo
              </div>
              <div class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]">
                <font-awesome-icon icon="fa-solid fa-code" class="w-6 textt-[#FFB800] text-[#8f4eff] text-[1.24rem] mr-2 mt-1 before" />
                Code
              </div>
              <div class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]">
                <font-awesome-icon icon="fa-regular fa-file-pdf" class="w-6 textt-[#FFB800] text-[#df45e2] text-[1.24rem] mr-2 mt-1 before" />
                PDF
              </div>
              <div class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]">
                <font-awesome-icon icon="fa-solid fa-upload" class="w-6 textt-[#FFB800] text-[#ffffff] text-[1.24rem] mr-2 mt-1 before" />
                アップロード
              </div>
              
            </div>
          </div>
          
        </div>

        <div class="overflow-y-scroll max-h-[calc(100vh-54px)] overflow-x-hidden">
          <div v-for="n in notes" @click="readNote(n.name)" class="flex border-b border-b-[#ffffff15] py-3 px-5 duration-200 hover:bg-[#2b2b2b] hover:bg-[#ffffff10]" :class="{'bg-[#2b2b2b] bg-[#ffffff10]': n == opening}">
            <font-awesome-icon v-if="((n.name).replace(/^.*[\\/]/, '').match(/[^.]+$/s))[0] == 'txt'" icon="fa-regular fa-file-lines" class="textt-[#FFB800] text-[#427eff] text-[1.035rem] mr-2 mt-1" />
            <font-awesome-icon v-if="((n.name).replace(/^.*[\\/]/, '').match(/[^.]+$/s))[0] == 'png'" icon="fa-regular fa-image" class="textt-[#FFB800] text-[#b342ff] text-[1.035rem] mr-2 mt-1" />
            <font-awesome-icon v-if="((n.name).replace(/^.*[\\/]/, '').match(/[^.]+$/s))[0] == 'md'" icon="fa-regular fa-file-lines" class="textt-[#FFB800] text-[#ffcd42] text-[1.035rem] mr-2 mt-1" />
            <font-awesome-icon v-if="((n.name).replace(/^.*[\\/]/, '').match(/[^.]+$/s))[0] == 'scrap'" icon="fa-solid fa-scroll" class="textt-[#FFB800] text-[#ff9742] text-[1.035rem] mr-2 mt-1" />
            <div>
              <button class="w-full h-full text-left">
                <div class="text-[1.035rem]" v-if="((n.name).replace(/^.*[\\/]/, '')).match('&&&&untitled-')">New Note...</div>
                <div class="text-[1.035rem]" v-else>{{(n.name).replace(/^.*[\\/]/, '').split('.').slice(0, -1).join('.')}}</div>
                <!--<div class="opacity-80 text-sm overflow-hidden h-[2.5rem]">{{n.info}}...</div>-->
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="sidebar2" class="bg-[#1f1f1f] flex-grow h-screen max-h-screen">
        <div class="bg-[#242424] duration-200 h-[54px] text-white flex px-4 select-none">
          <!-- Left icons -->

          <div class="flex flex-col justify-center ml-2.5 flex-grow mb-0.5">
          </div>

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <button  @click="this.NoteMenu=!this.NoteMenu">
              <img src="../assets/ellipsis.svg" class="w-[20px] h-[20px] opacity-90">
            </button>
            <div v-if="NoteMenu" class=" absolute bg-[#262626] z-50 min-w-44 right-4 rounded-lg top-10 py-3 shadow-md border border-[#5f5f5f]">
              <div class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]" @click="deleteNote()">
                <font-awesome-icon icon="fa-solid fa-trash" class="w-6 textt-[#FFB800] text-[#ff6262] text-[1.2rem] mr-1 mt-1 before" />
                ノートを削除
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center h-[calc(100%-103px)] overflow-hidden">
          <!--<div class="w-full max-w-[44rem] mx-[2rem] mt-6 h-[calc(100%-24px)] border-none focus:outline-0 text-white">
            <div class="font-bold text-2xl mb-1.5 border-b pb-1 border-b-white text-white"><font-awesome-icon icon="fa-regular fa-file-lines" class="textt-[#FFB800] text-[#ffcd42] text-[1.24rem] mr-2 mt-1 before absolute -translate-x-6 translate-y-0.5" /><input type="text" value="Note Name" class="bg-transparent"></div>    
            <textarea id="my-text-area" class="bg-transparent w-full h-full" style="outline: none !important;"></textarea>
          </div>-->
          <div class="w-full max-w-[35rem] mx-[2rem] mt-6 h-[calc(100%-24px)] border-none focus:outline-0 text-white overflow-y-scroll">
          <div class="font-bold text-2xl mb-1.5 border-b pb-1 border-b-white text-white"><!--<font-awesome-icon icon="fa-regular fa-file-lines" class="textt-[#FFB800] text-[#ffcd42] text-[1.24rem] mr-2 mt-1 before absolute -translate-x-6 translate-y-0.5" />-->
            <input type="text" @change="changeNoteTitle" v-model="notetitle" style="outline: none !important; caret-color: white;" class="bg-transparent w-full" placeholder="Note Name"></div>   
            <textarea v-if="((opening).replace(/^.*[\\/]/, '').match(/[^.]+$/s))[0] == 'txt' || ((opening).replace(/^.*[\\/]/, '').match(/[^.]+$/s))[0] == 'md'" v-model="textarea" placeholder="Type something..." v-on:input="save()" ref="editor" id="editor" class="bg-transparent w-full h-full" style="outline: none !important; caret-color: white;"></textarea>
            <img v-if="((opening).replace(/^.*[\\/]/, '').match(/[^.]+$/s))[0] == 'png'" :src="opening">
            <scrap v-if="((opening).replace(/^.*[\\/]/, '').match(/[^.]+$/s))[0] == 'scrap'" :text="textarea" @save="saveScrap" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="fixed top-0 left-0 w-screen h-screen bg-[#00000070] flex justify-center" v-if="createFolderForm">
    <div class="flex flex-col justify-center">
      <div class="flex justify-center bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white">
        <div class="text-center">
          <div class="text-2xl font-bold">新しいフォルダを作成</div>
          <div class="text-md font-semibold pt-2 py-2.5">フォルダの色</div>
          <div class="flex justify-center mb-3">
            <div class="w-8 h-8 mx-0.5 rounded-full bg-red-500 border-2 border-white"></div>
            <div class="w-8 h-8 mx-0.5 rounded-full bg-orange-500 border-2 border-white"></div>
            <div class="w-8 h-8 mx-0.5 rounded-full bg-yellow-500 border-2 border-white"></div>
            <div class="w-8 h-8 mx-0.5 rounded-full bg-green-500 border-2 border-white"></div>
            <div class="w-8 h-8 mx-0.5 rounded-full bg-blue-500 border-2 border-white"></div>
            <div class="w-8 h-8 mx-0.5 rounded-full bg-purple-500 border-2 border-white"></div>
            <div class="w-8 h-8 mx-0.5 rounded-full bg-black border-2 border-white"></div>
          </div>
          <div class="text-md font-semibold pt-2 py-2.5">フォルダの名前</div>
          <input type="text" v-model="foldertitle" class="bg-[#262626] rounded-lg py-2 px-3 text-white text-center w-64" placeholder="Folder">
          <div><button class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4" @click="createFolder(foldertitle)">作成</button></div>
        </div>
      </div>
    </div>
</div>


<div class="fixed top-0 left-0 w-screen h-screen bg-[#00000070] flex justify-center" v-if="createNotebookForm">
    <div class="flex flex-col justify-center">
      <div class="flex justify-center bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white">
        <div class="text-center">
          <div class="text-2xl font-bold">新しいノートブックを作成</div>
          <div class="text-md font-semibold pt-4 py-2.5">ノートブック名</div>
          <input type="text" v-model="notebookname" class="bg-[#262626] rounded-lg py-2 px-3 text-white text-center w-64" placeholder="Notebook">

          <div><button class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4" @click="createNotebook()">作成</button></div>
        </div>
      </div>
    </div>
</div>
</template>

<style>
@import '../../node_modules/easymde/dist/easymde.min.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

body{
  overflow: hidden;
}

.editor-toolbar{
  background-color: #262626;
  border: none;
  margin-bottom: 16px;
  margin-top: 12px;
  padding: 0px;
  border-radius: 9999px;
}

div.CodeMirror.cm-s-easymde.CodeMirror-wrap{
  background-color: #1f1f1f;
  color: white;
  border: none;
  padding: 0px;
}

.cm-header-1{
  font-size: calc(1.325rem + .9vw) !important;
}

.cm-header-2{
  font-size: calc(1.3rem + .6vw) !important;
}

.cm-strong:not(.cm-formatting){
  text-decoration: underline; /* 下線 */
  text-decoration-thickness: 0.5em; /* 線の太さ */
  text-decoration-color: rgba(255, 228, 0, 0.4); /* 線の色 */
  text-underline-offset: -0.2em; /* 線の位置。テキストに重なるようにやや上部にする */
  text-decoration-skip-ink: none;
}

.cm-strong.cm-formatting{
  text-decoration: underline; /* 下線 */
  text-decoration-thickness: 0.5em; /* 線の太さ */
  text-decoration-color: rgba(255, 228, 0, 0.9); /* 線の色 */
  text-underline-offset: -0.2em; /* 線の位置。テキストに重なるようにやや上部にする */
  text-decoration-skip-ink: none;
}

.cm-formatting:not(.cm-quote){
  font-size: small;
  opacity: 0.5;
}

.CodeMirror-cursor{
  border-left: 1px solid #fff;
}
</style>

<script>
import scrap from './Scrap.vue'
import EasyMDE from 'easymde'
import axios from 'axios';
//axios.defaults.withCredentials = true;

export default {
  components: {
    scrap
  },
  data: () => {
    return {
      currentNotebook: "",
      dirs: [],
      textarea: "",
      notetitle: "",
      opening: "/Untitled.txt",
      createFolderForm: false,
      foldertitle: "",
      notes: [],
      editing: "",
      newNoteMenu: false,
      NoteMenu: false,
      createNotebookForm: false,
      regex: "&&&&untitled-",
      notebooks: [],
      NotebookMenu: false,
      notebookname: "",
      ext: "",
      openingDir: "",
      opening_Dir: "",
      sendFeedbackForm: false,
      feedback: ""
    };
  },
  mounted(){
    window.electronAPI.getCurrentNotebook()
       .then(result => {
          this.currentNotebook = result
            window.electronAPI.getFiles(this.currentNotebook)
            .then(result => {
              this.notes = result
              window.electronAPI.getDirs(this.currentNotebook)
              .then(result => {
                 this.dirs = result
            }).catch(error => {
                 console.error(error)
              })
       })
            }).catch(error => {
              console.error(error)
          
          
       }).catch(error => {
          console.error(error)
       })

    

   
       
    let textarea_ = ""
     
  },
  methods:{
    sendFeedback(){
      axios.post(`https://app.formester.com/forms/ec2b098d-bc7e-4d23-974a-5862383ff006/submissions.json`, {"content": this.feedback})
            .then(response => {
              this.sendFeedbackForm = false
              this.feedback = ""
              alert("ご意見ありがとうございました。")
              })
            .catch(error => {
                // POSTリクエストが失敗した場合の処理
                console.error(error);
                alert("エラーが発生しました。")
      });
      
    },
    selectRoot(){
      window.electronAPI.getFiles(this.currentNotebook)
        .then(result => {
          this.notes = result
          this.openingDir = ""
        })
    },
    changeNoteTitle(){
      window.electronAPI.changeNoteTitle(this.opening, this.notetitle + "." + this.ext)
        .then(_result => {
          if(this.openingDir == ""){
          window.electronAPI.getFiles(this.currentNotebook)
          .then(result => {
              this.notes = result
            }).catch(error => {
              console.error(error)
          })
        }else{
          window.electronAPI.openDir(this.openingDir)
          .then(result => {
            this.notes = result
          }).catch(error => {
            console.error(error)
          })
        }
        })
    },
    createNotebook(){
      window.electronAPI.setCurrentNotebook(this.notebookname)
      window.electronAPI.newNotebook(this.notebookname)
        .then(_result => {
          location.reload()
        })
    },
    newFolder(){
      this.createFolderForm = true
    },
    createFolder(title){
      window.electronAPI.createFolder(title, this.currentNotebook)
       .then(_result => {
          this.createFolderForm = false
          window.electronAPI.getDirs(this.currentNotebook)
            .then(result => {
              this.dirs = result
          }).catch(error => {
              console.error(error)
       })
       }).catch(error => {
          console.error(error)
       })
    },
    save(){
      console.log("Saving a note...")
      window.electronAPI.saveNote(this.opening, this.textarea)
      window.electronAPI.setCurrentNotebook(this.notebook)
    },
    saveScrap(data){
      console.log("Saving a scrap...")
      window.electronAPI.saveNote(this.opening, data)
      window.electronAPI.setCurrentNotebook(this.notebook)
    },
    readNote(notee){
      try{this.$refs.editor.style.display = 'block'}catch{}

      this.opening="null.txt"
      const elements = document.querySelectorAll('.EasyMDEContainer');
      elements.forEach((element) => {
        element.remove();
      });
      window.electronAPI.readFile(notee)
       .then(result => {
          this.ext = notee.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0]
          if (this.notetitle = notee.replace(/^.*[\\/]/, '').match("&&&&untitled-")){
            this.notetitle = ""
          }else{
            this.notetitle = notee.replace(/^.*[\\/]/, '')
            this.notetitle = this.notetitle.split('.').slice(0, -1).join('.');
          }
          
          this.textarea = result
          this.opening = notee

          // Markdown
          if(((notee).replace(/^.*[\\/]/, '').match(/[^.]+$/s))[0] == 'md'){
            let easyMDE = new EasyMDE({
              element: document.getElementById('editor'),
              spellChecker: false,
              lineWrapping: true,
              toolbar: false,
              status: false,
              forceSync: true,
              initialValue: result,
              shortcuts: {
                "togglePreview": null,
                "toggleFullScreen": null,
                "toggleSideBySide": null
              }
            });
            
            let open = this.opening

            easyMDE.codemirror.on("change", () => {
              window.electronAPI.saveNote(open, easyMDE.value())
            });
          }
       }).catch(error => {
          console.error(error)
       })
    },
    openDir(dir){
      this.openingDir = dir
      window.electronAPI.openDir(dir)
       .then(result => {
          this.notes = result
       }).catch(error => {
          console.error(error)
       })
    },
    deleteNotebook(){
      window.electronAPI.deleteNotebook(this.currentNotebook)
        .then(_result => {
          window.electronAPI.setCurrentNotebook(this.notebooks[0])
            .then(_result =>{
              location.reload()
            })
        })
      
    },
    changeNotebook(n){
      window.electronAPI.setCurrentNotebook(n)
      location.reload()
    },
    openNotebookMenu(){
      if (this.NotebookMenu){
        this.NotebookMenu = false
      }else{
        window.electronAPI.listNotebooks()
        .then(result => {
          this.notebooks = result
          this.NotebookMenu = true
        })
      }
      
    },
    changeIcon(){
      window.electronAPI.setIcon(this.currentNotebook)
        .then(_result => {
          location.reload()
        })
    },
    createNote(filetype){
      let noteName = `&&&&untitled-${Math.random().toString(36).slice(-8)}.${filetype}`;
      console.log("Creating note to "+this.currentNotebook+"\\"+this.openingDir.replace(/^.*[\\/]/, '')+"\\"+noteName)
      //window.electronAPI.createNote(this.currentNotebook+"\\"+(this.openingDir+"\\")+noteName, "")
      window.electronAPI.createNote(`${this.currentNotebook}/${this.openingDir.replace(/^.*[\\/]/, '')}/${noteName}`, "")
        .then(_result => {
          this.notetitle = ""
          this.textarea = ""
          this.opening = this.currentNotebook+"\\"+this.openingDir+"\\"+noteName
          
        })
        if(this.openingDir == ""){
          window.electronAPI.getFiles(this.currentNotebook)
          .then(result => {
              this.notes = result
            }).catch(error => {
              console.error(error)
          })
        }else{
          window.electronAPI.openDir(this.openingDir)
          .then(result => {
            this.notes = result
          }).catch(error => {
            console.error(error)
          })
        }
        
            
      this.newNoteMenu = false;
      
    },
    deleteNote(){
      window.electronAPI.deleteNote(this.opening)
        .then(_result => {
          this.NoteMenu = false
          this.notetitle = ""
          this.opening = this.currentNotebook

          if(this.openingDir == ""){
          window.electronAPI.getFiles(this.currentNotebook)
          .then(result => {
              this.notes = result
            }).catch(error => {
              console.error(error)
          })
        }else{
          window.electronAPI.openDir(this.openingDir)
          .then(result => {
            this.notes = result
          }).catch(error => {
            console.error(error)
          })
        }
        })            
    },
    createScrap(){
      let noteName = `&&&&untitled-${Math.random().toString(36).slice(-8)}`;
      window.electronAPI.saveNote(this.currentNotebook+noteName, "")
        .then(result => {
          alert(result)
          this.notetitle = result[1].replace(/^.*[\\/]/, '')
          this.textarea = result[0]
          this.opening = result[1]
        })
      this.newNoteMenu = false;
      window.electronAPI.getFiles()
       .then(result => {
          this.notes = result
       }).catch(error => {
          console.error(error)
       })
    }
  }
}
</script>