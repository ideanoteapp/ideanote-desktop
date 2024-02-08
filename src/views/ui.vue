<template>
  <div :style="{ 'font-family: Serif;': uiFont == 'Serif' }">
    <div class="flex max-h-screen max-w-[100vw] h-screen overflow-hidden">
      <div
        class="fixed left-[180px] lg:left-[200px] w-screen h-screen bg-black opacity-60"
        v-if="false"
      ></div>
      <div
        id="sidebar1"
        class="hidden sm:block bg-[#262626] min-w-[180px] lg:min-w-[200px] w-[180px] z-10 lg:w-[200px] h-screen select-none overflow-x-hidden"
        v-if="showSidebar"
      >
        <div
          class="bg-[#202020] hover:bg-[#1d1d1d] duration-200 h-[54px] text-white flex px-4"
          @click="openNotebookMenu"
        >
          <div class="flex flex-col justify-center">
            <img
              :src="`${currentNotebook}/.icon.png`"
              alt=""
              v-if="notes.includes('.icon.png')"
              class="w-[27px] h-[27px] bg-white rounded-full"
            />
            <img
              src="/.icon.png"
              alt=""
              v-else
              class="w-[27px] h-[27px] bg-white rounded-full"
            />
          </div>

          <div class="flex flex-col justify-center ml-2.5 flex-grow mb-0.5">
            {{ currentNotebook.replace(/^.*[\\/]/, "") }}
          </div>

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <font-awesome-icon icon="fa-solid fa-caret-down" />
          </div>
        </div>
        <Transition name="fade">
        <div
          class="before:fixed before:top-0 before:left-0 before:w-screen before:h-screen before:bg-black before:opacity-50"
          v-if="NotebookMenu"
          @click="openNotebookMenu"
        ></div>
        </Transition>

        <Transition name="slide-up">
        <div
          v-if="NotebookMenu"
          @click="openNotebookMenu"
          class="max-h-[calc(100vh-2.5rem)] overflow-scroll absolute bg-[#262626] z-50 w-48 rounded-lg top-10 py-3 shadow-md border border-[#5f5f5f]"
        >
          <div class="flex px-4">
            <img
              :src="`${currentNotebook}/.icon.png`"
              v-if="notes.includes('.icon.png')"
              class="rounded-full w-7 h-7"
            />
            <img
              src="/.icon.png"
              v-else
              class="rounded-full w-7 h-7"
            />
            <div class="ml-2">
              <div class="text-[1.1rem] font-semibold text-white">
                {{ currentNotebook.replace(/^.*[\\/]/, "") }}
              </div>
            </div>
          </div>

          <!--<div class="hover:bg-[#3f3f3f] mt-2 text-white z-50">
            <button class="px-4 pb-1" @click="changeIcon">
              <font-awesome-icon
                icon="fa-solid fa-star"
                class="w-6 textt-[#FFB800] text-[#ffcd42] text-[1.2rem] mr-1 mt-1 before"
              />
              {{ t.change_icon }}
            </button>
          </div>-->

          <!--<div class="hover:bg-[#3f3f3f] px-4 pb-1 text-white z-50">
                <font-awesome-icon icon="fa-solid fa-gear" class="text-sm w-6 textt-[#FFB800] mt-1 text-[#42ff6b] text-[1.2rem] mr-1 before" />
                ノートブック設定
              </div>-->
          
          <div class="hover:bg-[#3f3f3f] mt-2 text-white z-50">
            <button class="px-4 pb-1 text-left flex" @click="deleteNotebook">
              <font-awesome-icon
                icon="fa-solid fa-trash"
                class="text-sm w-6 textt-[#FFB800] mt-1 text-[#ff4242] text-[1.2rem] mr-2 before"
              />
              <div>
                {{ t.delete_notebook }}
              </div>
            </button>
          </div>

          <div class="bg-[#5f5f5f] w-full h-px mt-2 mb-2"></div>

          <div class="hover:bg-[#3a3a3a]" v-for="n in notebooks">
            <button
              v-if="n != currentNotebook"
              class="flex px-4 py-1.5 w-full h-full"
              @click="changeNotebook(n)"
            >
              <img
                :src="`${n}/.icon.png`"
                v-if="notes.includes('.icon.png')"
                class="w-7 h-7 rounded-full"
              />
              <img
                src="/.icon.png"
                v-else
                class="w-7 h-7 rounded-full"
              />
              <div class="ml-2">
                <div class="text-[1.1rem] font-semibold text-white">
                  {{ n.replace(/^.*[\\/]/, "") }}
                </div>
              </div>
            </button>
          </div>

          <div class="hover:bg-[#3f3f3f] mt-2 text-white z-50">
            <button class="px-4 pb-1 text-left flex" @click="this.createNotebookForm = true">
              <font-awesome-icon
                icon="fa-solid fa-plus"
                class="w-6 textt-[#FFB800] text-[1.2rem] mr-2 mt-1 before"
              />
              {{ t.new_notebook }}
            </button>
          </div>

          <div class="bg-[#5f5f5f] w-full h-px mt-2 mb-2"></div>

          <div
            class="hover:bg-[#3f3f3f] mt-2 text-white z-50"
            @click="openPreferences"
          >
            <button class="px-4 pb-1">
              <font-awesome-icon
                icon="fa-solid fa-gear"
                class="text-sm w-6 textt-[#FFB800] mt-1 text-[#f3f3f3] text-[1.2rem] mr-1 before"
              />
              {{t.preferences}}
            </button>
          </div>
        </div>
        </Transition>

        <div
          @click="selectRoot"
          class="mx-2 text-white mt-3 hover:bg-[#353535] rounded-lg select-none"
          :class="{ 'bg-[#353535]': openingDir == '' }"
        >
          <button class="flex py-2 px-2 w-full">
            <img
              src="../assets/root.png"
              alt=""
              class="w-[29px] h-[29px] mr-2 bg-[#ff3f3f] rounded-full"
            />
            <div class="flex flex-col text-left justify-center mb-1">
              {{ t.root }}
            </div>
          </button>
        </div>

        <div
          class="mx-2 text-white flex mt-1 hover:bg-[#353535] rounded-lg group"
          v-for="i in dirs"
          @click="openDir(i)"
          :class="{ 'bg-[#353535]': openingDir == i }"
        >
          <button class="flex py-2 px-2 w-full" v-if="i.replace(/^.*[\\/]/, '').charAt(0) !== '.'">
            <img
              src="../assets/folder.png"
              alt=""
              class="w-[29px] h-[29px] bg-[#353535] mr-2 rounded-full border-none"
            />
            <div class="flex flex-col text-left justify-center mb-1 flex-grow">
              {{ i.replace(/^.*[\\/]/, "") }}
            </div>
            <button @click="deleteFolder(i)" class="mr-1 mt-0.5 hidden group-hover:block">
              <font-awesome-icon
                icon="fa-solid fa-trash"
                class="text-[#4d4c4c] duration-100 hover:text-[#ff6262] mt-1 text-[1rem]"
             />
            </button>
          </button>
        </div>

        <div
          class="px-2 mx-2 text-white flex mt-3 py-1 rounded-lg opacity-90 hover:opacity-100 group duration-100"
          @click="newFolder"
        >
          <font-awesome-icon
            icon="fa-solid fa-circle-plus"
            class="text-[20px] mr-2 duration-100"
          />
          <div class="flex flex-col justify-center mb-1 text-sm">
            {{ t.create_folder }}
          </div>
        </div>
      </div>

      <div
        id="sidebar2"
        v-if="showSidebar"
        class="hidden sm:block bg-[#2E2E2E] w-[286px] text-white lg:w-[386px] h-screen"
      >
        <div
          class="bg-[#242424] duration-200 h-[54px] w-[286px] lg:w-[386px] text-white flex px-4"
        >
          <!--<div class="flex flex-col justify-center">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-[20px] opacity-90"/>
          </div>-->

          <div
            class="flex flex-col justify-center ml-2.5 flex-grow mb-0.5 text-center"
          >
            <!--{{ openingDir.replace(/^.*[\\/]/, "") }}-->
          </div>

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <button @click="createNote('scrap')">
              <font-awesome-icon
                icon="fa-solid fa-scroll"
                class="text-[20px] mr-1"
              />
            </button>
          </div>

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <button @click="createNote('md')">
              <font-awesome-icon
                icon="fa-regular fa-file-lines"
                class="text-[20px] mr-1"
              />
            </button>
          </div>

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <button @click="this.newNoteMenu = !this.newNoteMenu">
              <font-awesome-icon
                icon="fa-solid fa-circle-plus"
                class="text-[22px] oapcity-90"
              />
            </button>
            <Transition name="slide-up">
            <div
              v-if="newNoteMenu"
              class="absolute bg-[#262626] z-50 w-44 rounded-lg top-10 py-3 shadow-md border border-[#5f5f5f]"
            >
              <div
                class="hover:bg-[#3f3f3f] px-4 pb-1"
                @click="createNote('md')"
              >
                <font-awesome-icon
                  icon="fa-regular fa-file-lines"
                  class="w-6 textt-[#FFB800] text-[#ffcd42] text-[1.24rem] mr-2 mt-1 before"
                />
                Markdown
              </div>
              <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="createNote('txt')"
              >
                <font-awesome-icon
                  icon="fa-solid fa-t"
                  class="w-6 textt-[#FFB800] text-[#628eff] text-[1.24rem] mr-2 mt-1 before"
                />
                Plaintext
              </div>
              <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="createNote('scrap')"
              >
                <font-awesome-icon
                  icon="fa-solid fa-scroll"
                  class="w-6 textt-[#FFB800] text-[#ffd562] text-[1.24rem] mr-2 mt-1 before"
                />
                Scrap
              </div>
              <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="createNote('todo')"
              >
                <font-awesome-icon
                  icon="fa-regular fa-square-check"
                  class="w-6 textt-[#FFB800] text-[#4ae245] text-[1.24rem] mr-2 mt-1 before"
                />
                ToDo
              </div>
              <!--<div class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]">
                <font-awesome-icon
                  icon="fa-solid fa-code"
                  class="w-6 textt-[#FFB800] text-[#8f4eff] text-[1.24rem] mr-2 mt-1 before"
                />
                Code
              </div>-->
              <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="uploadFile"
              >
                <font-awesome-icon
                  icon="fa-solid fa-upload"
                  class="w-6 textt-[#FFB800] text-[#ffffff] text-[1.24rem] mr-2 mt-1 before"
                />
                {{ t.upload }}
              </div>
            </div>
            </Transition>
          </div>
        </div>

        <div
          class="overflow-y-scroll max-h-[calc(100vh-54px)] overflow-x-hidden"
        >
          <div
            v-for="n in notes"
            @click="readNote(n.name, true)"
            class="flex border-b border-b-[#ffffff15] py-3 px-5 duration-200 hover:bg-[#2b2b2b] hover:bg-[#ffffff10] w-[286px] lg:w-[386px]"
            :class="{ 'bg-[#2b2b2b] bg-[#ffffff10]': n.name == opening }"
          >
            <font-awesome-icon
              v-if="
                n.name.replace(/^.*[\\/]/, '').includes('#pin')
              "
              icon="fa-solid fa-thumbtack"
              class="textt-[#FFB800] text-[#ffffffc8] text-[1.035rem] mr-3.5 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'txt'"
              icon="fa-regular fa-file-lines"
              class="textt-[#FFB800] text-[#427eff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'png'"
              icon="fa-regular fa-image"
              class="textt-[#FFB800] text-[#b342ff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'webp'"
              icon="fa-regular fa-image"
              class="textt-[#FFB800] text-[#b342ff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'jpg'"
              icon="fa-regular fa-image"
              class="textt-[#FFB800] text-[#b342ff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'jpeg'"
              icon="fa-regular fa-image"
              class="textt-[#FFB800] text-[#b342ff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'mp3'"
              icon="fa-solid fa-music"
              class="textt-[#FFB800] text-[#7b42ff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'wav'"
              icon="fa-solid fa-music"
              class="textt-[#FFB800] text-[#7b42ff] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'md'"
              icon="fa-regular fa-file-lines"
              class="textt-[#FFB800] text-[#ffcd42] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="
                n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'scrap'
              "
              icon="fa-solid fa-scroll"
              class="textt-[#FFB800] text-[#ff9742] text-[1.035rem] mr-2 mt-1"
            />
            <font-awesome-icon
              v-if="
                n.name.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'todo'
              "
              icon="fa-regular fa-square-check"
              class="textt-[#FFB800] text-[#42ff48] text-[1.035rem] mr-2 mt-1"
            />
            
            <div class="max-h-none">
              <button class="w-full text-left max-h-none">
                <div
                  class="text-[1.035rem]"
                  v-if="n.name.replace(/^.*[\\/]/, '').match('&&&&untitled-')"
                >
                  New Note...
                </div>
                <div class="text-[1.035rem] break-all" v-else>
                  {{
                    n.name
                      .replace(/^.*[\\/]/, "")
                      .split(".")
                      .slice(0, -1)
                      .join(".")
                  }}
                </div>
                <div class="opacity-80 text-sm max-h-[2.5rem] overflow-hidden">
                  {{ n.info.replace("\n", " ") }}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="sidebar2" class="bg-[#1f1f1f] flex-grow h-screen max-h-screen">
        
        <div
          class="bg-[#242424] duration-200 h-[54px] text-white flex px-4 select-none"
        >
          <!-- Left icons -->
          <button @click="showSidebar = !showSidebar" class="hidden sm:block">
            <font-awesome-icon icon="fa-regular fa-window-maximize" class="text-[20px] opacity-90" />
          </button>

          <div
            class="flex flex-col justify-center ml-2.5 flex-grow mb-0.5"
          ></div>

          <div
            class="ml-2.5 mr-1 flex flex-col justify-center"
            v-if="opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'md'"
          >
            <button
              class="flex flex-col justify-center"
              @click="previewMd"
              v-if="!mdParsed"
            >
              <font-awesome-icon
                icon="fa-solid fa-eye-slash"
                class="text-[20px] opacity-90"
              />
            </button>
            <button
              class="flex flex-col justify-center"
              @click="
                this.mdParsed = false;
                this.readNote(opening);
              "
              v-else
            >
              <font-awesome-icon
                icon="fa-solid fa-eye"
                class="text-[20px] opacity-90"
              />
            </button>
          </div>

          <div class="flex flex-col justify-center ml-2.5 mr-1">
            <button @click="this.NoteMenu = !this.NoteMenu">
              <img
                src="../assets/ellipsis.svg"
                class="w-[20px] h-[20px] opacity-90"
              />
            </button>
            <Transition name="slide-up">
            <div
              v-if="NoteMenu"
              class="absolute bg-[#262626] z-50 min-w-44 right-4 rounded-lg top-10 py-3 shadow-md border border-[#5f5f5f]"
            >
            <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="pinNote()"
                v-if="opening.includes('#pin') == false"
              >
                <font-awesome-icon
                  icon="fa-solid fa-thumbtack"
                  class="w-6 textt-[#FFB800] text-[#f5f5f5] text-[1.2rem] mr-1 mt-1 before"
                />
                {{t.pin_note}}
              </div>

              <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="unpinNote()"
                v-if="opening.includes('#pin') == true"
              >
                <font-awesome-icon
                  icon="fa-solid fa-thumbtack"
                  class="w-6 textt-[#FFB800] text-[#f5f5f5] text-[1.2rem] mr-1 mt-1 before transform rotate-180"
                />
                {{t.unpin}}
              </div>

            <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="copyImg()"
                v-if="opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'png' ||
                      opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'jpeg' ||
                      opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'jpg' ||
                      opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'webp'"
              >
                <font-awesome-icon
                  icon="fa-brands fa-markdown"
                  class="w-6 textt-[#FFB800] text-[#6289ff] text-[1.2rem] mr-1 mt-1 before"
                />
                {{t.copy_embed}}
              </div>
            
              <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="exportScrap()"
                v-if="opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'scrap'"
              >
                <font-awesome-icon
                  icon="fa-solid fa-download"
                  class="w-6 textt-[#FFB800] text-[#ffffff] text-[1.2rem] mr-1 mt-1 before"
                />
                {{t.export_scrap}}
              </div>
              
              <div
                class="mt-1 px-4 pb-1 flex hover:bg-[#3f3f3f]"
                @click="share()"
                v-if="opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'scrap' || opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'md'"
              >
                <img src="../assets/share.png" class="w-6 textt-[#FFB800] text-[#ffffff] text-[1.2rem] mt-1 before inline">
                <div class="flex flex-col justify-center ml-2">
                  ideaNote Share
                </div>
              </div>

            <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="copyPath()"
              >
                <font-awesome-icon
                  icon="fa-solid fa-paperclip"
                  class="w-6 textt-[#FFB800] text-[#ffffffcc] text-[1.2rem] mr-1 mt-1 before"
                />
                {{t.copy_path}}
              </div>

              <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="deleteNote()"
              >
                <font-awesome-icon
                  icon="fa-solid fa-trash"
                  class="w-6 textt-[#FFB800] text-[#ff6262] text-[1.2rem] mr-1 mt-1 before"
                />
                {{ t.delete_note }}
              </div>
            </div>
            </Transition>
          </div>
        </div>

        <div class="flex justify-center h-[calc(100%-103px)] overflow-hidden">
          <!--<div class="w-full max-w-[44rem] mx-[2rem] mt-6 h-[calc(100%-24px)] border-none focus:outline-0 text-white">
            <div class="font-bold text-2xl mb-1.5 border-b pb-1 border-b-white text-white"><font-awesome-icon icon="fa-regular fa-file-lines" class="textt-[#FFB800] text-[#ffcd42] text-[1.24rem] mr-2 mt-1 before absolute -translate-x-6 translate-y-0.5" /><input type="text" value="Note Name" class="bg-transparent"></div>    
            <textarea id="my-text-area" class="bg-transparent w-full h-full" style="outline: none !important;"></textarea>
          </div>-->
          <div
            v-if="opened"
            id="editor-pane"
            class="w-full max-w-[35rem] mx-[2rem] mt-6 h-[calc(100%-24px)] border-none focus:outline-0 text-white"
            :class="
              ({
                'overflow-y-hidden':
                  opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] != 'md',
              },
              {
                'overflow-y-scroll':
                  opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'md',
              })
            "
          >
            <div
              class="font-bold mb-1.5 border-b pb-1 mr-2 border-b-white text-white"
            >
              <!--<font-awesome-icon icon="fa-regular fa-file-lines" class="textt-[#FFB800] text-[#ffcd42] text-[1.24rem] mr-2 mt-1 before absolute -translate-x-6 translate-y-0.5" />-->
              <input
                type="text"
                @change="changeNoteTitle"
                v-model="notetitle"
                style="outline: none !important; caret-color: white;"
                class="bg-transparent text-2xl flex-grow w-full focus:bg-[#303030] focus:mb-1.5 focus:text-[1.4rem] focus:rounded-lg focus:py-1.5 focus:pl-4 focus:pr-[-1rem]"
                placeholder="Note Name"
              />
            </div>
            <textarea
              v-if="
                opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'txt'
              "
              v-model="textarea"
              placeholder="Type something..."
              v-on:input="save()"
              id="texteditor"
              class="bg-transparent w-full h-full"
              style="outline: none !important; caret-color: white"
            ></textarea>

            <div v-if="opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'png' ||
                       opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'webp' ||
                       opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'jpg' ||
                       opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'jpeg'"
                       class="h-full">
              <img :src="opening" />
            </div>

            <div v-if="opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'mp3' ||
                       opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'wav'"
                       class="h-full">
              <audio controls :src="opening" class="w-full"></audio>
            </div>

            <scrap
              v-if="
                opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'scrap'
              "
              :text="textarea"
              @save="saveScrap"
            />

            <todo
              v-if="
                opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'todo'
              "
              :text="textarea"
              @save="saveScrap"
            />

            <div
              v-html="mdContent"
              class="mdcontent"
              :class="{ hidden: mdParsed == true }"
            ></div>
            <div
              class="h-full"
              :class="{
                hidden:
                  mdParsed == false &&
                  opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == 'md',
              }"
            >
              <textarea
                v-model="textarea"
                placeholder="Type something..."
                v-on:input="save()"
                ref="editor"
                id="editor"
                class="bg-transparent w-full h-full"
                style="outline: none !important; caret-color: white"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Transition name="fade">
  <div
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-[#00000070] flex justify-center"
    v-if="createFolderForm"
  >
    <inCloseButton @click="this.createFolderForm = false" />
    <div class="flex flex-col justify-center">
      <div
        class="flex justify-center bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white"
      >
        <div class="text-center">
          <div class="text-2xl font-bold mb-3">{{ t.create_folder }}</div>
          <div class="text-md font-semibold pt-2 py-2.5">
            {{ t.folder_name }}
          </div>
          <input
            type="text"
            v-model="foldertitle"
            class="bg-[#262626] rounded-lg py-2 px-3 text-white text-center w-64"
            placeholder="Folder"
          />
          <div>
            <inButton @click="createFolder(foldertitle)" :text="t.create"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Transition>
  <Transition name="fade">
  <div
    class="fixed top-0 left-0 w-screen z-10 h-screen bg-[#00000070] flex justify-center"
    v-if="createNotebookForm"
  >
    <inCloseButton @click="this.createNotebookForm = false" />
    <div class="flex flex-col justify-center">
      <div
        class="flex justify-center bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white"
      >
        <div class="text-center">
          <div class="text-2xl font-bold">{{ t.create_notebook }}</div>
          <div class="text-md font-semibold pt-4 py-2.5">
            {{ t.notebook_name }}
          </div>
          <input
            type="text"
            v-model="notebookname"
            class="bg-[#262626] rounded-lg py-2 px-3 text-white text-center w-64"
            placeholder="Notebook"
          />

          <div>
            <inButton @click="createNotebook()" :text="t.create" />
          </div>
        </div>
      </div>
    </div>
  </div>
  </Transition>
  <Transition name="fade">
  <div
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-[#00000070] flex justify-center"
    v-if="preferences"
  >
    <button class="fixed top-4 z-50 right-4" @click="this.preferences = false">
      <div
        class="w-9 h-9 text-left flex justify-center fles-col text-white bg-[#b93232] rounded-lg"
      >
        <div class="flex flex-col justify-center">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </button>
    <div class="flex flex-col justify-center">
      <div
        class="flex justify-left bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white"
      >
        <div class="text-center">
          <div class="text-xl font-bold mb-4">{{t.preferences}}</div>
          {{t.font}}
          <select v-model="font" @change="fontChange" class="bg-[#202020] text-white ml-3 rounded-lg p-3">
            <option value="">Default</option>
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</Transition>

  <div
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-[#00000070] flex justify-center"
    v-if="sharing"
  >
    <div class="flex flex-col justify-center">
      <div
        class="flex justify-left bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white"
      >
        <div class="text-center">
          <img src="../assets/share.png" class="w-12 h-12 mb-2 inline animate-bounce">
          <div class="text-xl font-bold mb-4">{{t.sharing}}</div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-[#00000070] flex justify-center"
    v-if="sharedForm"
  >
    <button class="fixed top-4 z-50 right-4" @click="this.sharedForm = false">
      <div
        class="w-9 h-9 text-left flex justify-center fles-col text-white bg-[#b93232] rounded-lg"
      >
        <div class="flex flex-col justify-center">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </button>
    <div class="flex flex-col justify-center">
      <div
        class="flex justify-left bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white"
      >
        <div class="text-center">
          <div>
            <img src="../assets/share.png" class="w-12 h-12 mb-2 inline">
          </div>
          {{t.share_published}}
          <br>
          <a :href="sharedUrl" class="text-[#84a4f0]">{{ sharedUrl }}</a>

          <div>
            <inButton @click="this.sharedForm = false" :text="t.close"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../../node_modules/easymde/dist/easymde.min.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

.CodeMirror-scroll{
  max-width: 39rem;
}

body {
  overflow: hidden;
}

.editor-toolbar {
  background-color: #262626;
  border: none;
  margin-bottom: 16px;
  margin-top: 12px;
  padding: 0px;
  border-radius: 9999px;
}

div.CodeMirror.cm-s-easymde.CodeMirror-wrap {
  background-color: #1f1f1f;
  color: white;
  border: none;
  padding: 0px;
}

.cm-header-1 {
  font-size: calc(1.325rem + 0.9vw) !important;
}

.cm-header-2 {
  font-size: calc(1.3rem + 0.6vw) !important;
}

.cm-strong:not(.cm-formatting) {
  text-decoration: underline; /* 下線 */
  text-decoration-thickness: 0.5em; /* 線の太さ */
  text-decoration-color: rgba(255, 228, 0, 0.4); /* 線の色 */
  text-underline-offset: -0.2em; /* 線の位置。テキストに重なるようにやや上部にする */
  text-decoration-skip-ink: none;
}

.cm-strong.cm-formatting {
  text-decoration: underline; /* 下線 */
  text-decoration-thickness: 0.5em; /* 線の太さ */
  text-decoration-color: rgba(255, 228, 0, 0.6); /* 線の色 */
  text-underline-offset: -0.2em; /* 線の位置。テキストに重なるようにやや上部にする */
  text-decoration-skip-ink: none;
}

.cm-formatting:not(.cm-quote) {
  opacity: 0.7;
}

.cm-quote {
  color: white !important;
  opacity: 0.9;
}

.CodeMirror-cursor {
  border-left: 1px solid #fff;
}

.cm-link{
  color: #84a4f0 !important;
}

/*----------*/

.mdcontent h1 {
  font-size: calc(1.325rem + 0.9vw);
  font-weight: bold;
}

.mdcontent h2 {
  font-size: calc(1.3rem + 0.6vw) !important;
  font-weight: bold;
}

.mdcontent h3 {
  font-size: calc(1.2rem + 0.3vw) !important;
  font-weight: bold;
}

.mdcontent h4 {
  font-size: calc(1.1rem + 0.2vw) !important;
  font-weight: bold;
}

.mdcontent h5 {
  font-size: calc(1.05rem + 0.1vw) !important;
  font-weight: bold;
}

.mdcontent h6 {
  font-size: calc(1rem) !important;
  font-weight: bold;
}

.mdcontent strong {
  text-decoration: underline; /* 下線 */
  text-decoration-thickness: 0.5em; /* 線の太さ */
  text-decoration-color: rgba(255, 230, 0, 0.5); /* 線の色 */
  text-underline-offset: -0.2em; /* 線の位置。テキストに重なるようにやや上部にする */
  text-decoration-skip-ink: none;
  font-weight: bold;
}

.mdcontent blockquote {
  border-left: 6px solid #ffffff50;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  margin: 6px;
}

.mdcontent a {
  color: #84a4f0;
  text-decoration: underline;
}

.mdcontent ul, ol{
  display: flex;
  flex-direction: column;
}

.mdcontent ul li{
  list-style: disc;
  list-style-position: inside;
}

.mdcontent ol li{
  list-style: decimal;
  list-style-position: inside;
}

/* Transition */
.slide-up-enter-active {
  transition: all 0.15s ease-out;
}

.slide-up-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/*-----------------------*/

@media(min-width: 1580px) {
  #editor-pane{
    max-width: 50rem;
  }
}
</style>

<script>
import scrap from "./Scrap.vue";
import todo from "./ToDo.vue";
import inButton from "../components/inButton.vue";
import inCloseButton from "../components/inCloseButton.vue";

import EasyMDE from "easymde";
import axios from "axios";
import marked from "marked/marked.min.js";

export default {
  components: {
    scrap,
    todo,
    inButton,
    inCloseButton
  },
  data: () => {
    return {
      showSidebar: true,
      font: "",
      currentNotebook: "",
      opened: false,
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
      t: {},
      mdParsed: true,
      mdContent: "",
      easyMDE: undefined,
      preferences: false,
      sharedForm: false,
      sharing: false,
      sharedUrl: ""
    };
  },
  mounted() {
    window.electronAPI.getTexts().then((result) => {
      this.t = result;
      console.log(this.t);
    });

    window.electronAPI
      .getCurrentNotebook()
      .then((result) => {
        this.currentNotebook = result;
        window.electronAPI.getFiles(this.currentNotebook).then((result) => {
          this.notes = result;
          window.electronAPI
            .getDirs(this.currentNotebook)
            .then((result) => {
              this.dirs = result;
            })
            .catch((error) => {
              console.error(error);
            });
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      });

    let textarea_ = "";

    window.electronAPI.getFont()
      .then((result) => {
        this.font = result
        this.fontChange()
      })
  },
  methods: {
    share(){
      this.NoteMenu = false;
      this.sharing = true;
      window.electronAPI
        .readFile(this.opening)
        .then((result) => {
          axios.post("https://share-api-ideanote.koyeb.app/new/", {"title": this.notetitle, "type": this.opening.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0], "data": result})
            .then((res) => {
              this.sharing = false;
              this.sharedForm = true;
              this.sharedUrl = `https://share.ideanoteapp.com/${res.data}/`
          })
        })
        .catch((error) => {
          console.error(error);
        });
      
    },
    deleteFolder(folder){
      window.electronAPI.deleteFolder(folder).then((result) => {
        location.reload();
      })
    },
    pinNote(){
      this.notetitle = this.notetitle + " #pin"
      this.changeNoteTitle()
    },
    unpinNote(){
      this.notetitle = this.notetitle.replace(" #pin", "")
      this.notetitle = this.notetitle.replace("#pin", "")
      this.changeNoteTitle()
    },
    fontChange(){
      const app = document.querySelector("#app");
      app.style.fontFamily = this.font;
      window.electronAPI.setFont(this.font)
      
    },
    openPreferences() {
      this.preferences = true;
    },
    copyPath(){
      var copyStr = this.opening.replace(this.currentNotebook, "{notebook}")
      copyStr = copyStr.replace(/\\/g, "/")
      navigator.clipboard.writeText(copyStr)
      this.NoteMenu = false
    },
    copyImg(){
      var copyStr = this.opening.replace(this.currentNotebook, "{notebook}")
      copyStr = copyStr.replace(/\\/g, "/")
      navigator.clipboard.writeText(`![](${copyStr})`)
      this.NoteMenu = false
    },
    previewMd() {
      this.mdParsed = true;
      window.electronAPI.readFile(this.opening).then((result) => {
        this.mdContent = marked.parse(result.replace(/{notebook}/g, this.currentNotebook.replace(/\\/g, "/")))
      });
    },
    exportScrap(){
      window.electronAPI.exportScrap(this.opening)
      this.NoteMenu = false;
    },
    selectRoot() {
      window.electronAPI.getFiles(this.currentNotebook).then((result) => {
        this.notes = result;
        this.openingDir = "";
      });
    },
    changeNoteTitle() {
      document.activeElement.blur()

      window.electronAPI
        .changeNoteTitle(this.opening, this.notetitle + "." + this.ext)
        .then((res) => {
          this.readNote(res)
          //alert(res)
          if (this.openingDir == "") {
            window.electronAPI
              .getFiles(this.currentNotebook)
              .then((result) => {
                this.notes = result;
              })
              .catch((error) => {
                console.error(error);
              });
            
          } else {
            window.electronAPI
              .openDir(this.openingDir)
              .then((result) => {
                this.notes = result;
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });
    },
    createNotebook() {
      window.electronAPI.setCurrentNotebook(this.notebookname);
      window.electronAPI.newNotebook(this.notebookname).then((_result) => {
        location.reload();
      });
    },
    newFolder() {
      this.createFolderForm = true;
    },
    createFolder(title) {
      window.electronAPI
        .createFolder(title, this.currentNotebook)
        .then((_result) => {
          this.createFolderForm = false;
          window.electronAPI
            .getDirs(this.currentNotebook)
            .then((result) => {
              this.dirs = result;
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    save() {
      console.log("Saving a note...");
      window.electronAPI.saveNote(this.opening, this.textarea);
      window.electronAPI.setCurrentNotebook(this.notebook);
      if (this.openingDir == "") {
        window.electronAPI
          .getFiles(this.currentNotebook)
          .then((result) => {
            this.notes = result;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        window.electronAPI
          .openDir(this.openingDir)
          .then((result) => {
            this.notes = result;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    saveScrap(data) {
      console.log("Saving a scrap...");
      window.electronAPI.saveNote(this.opening, data);
      window.electronAPI.setCurrentNotebook(this.notebook);
    },
    readNote(notee, md = false) {
      this.editor = ""
      this.textarea = ""
      this.easyMDE = undefined
      const elements = document.querySelectorAll(".EasyMDEContainer");
      elements.forEach((element) => {
        element.remove();
      });

      this.opened = true;
      try {
        this.$refs.editor.style.display = "block";
      } catch {}

      this.opening = "null.txt";
      
      window.electronAPI
        .readFile(notee)
        .then((result) => {
          this.ext = notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0];
          if (
            (this.notetitle = notee
              .replace(/^.*[\\/]/, "")
              .match("&&&&untitled-"))
          ) {
            this.notetitle = "";
          } else {
            this.notetitle = notee.replace(/^.*[\\/]/, "");
            this.notetitle = this.notetitle.split(".").slice(0, -1).join(".");
          }

          if (notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "png" &&
              notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "jpeg" &&
              notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "jpg" &&
              notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "webp" &&
              notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "mp3" &&
              notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] != "wav"){
            this.textarea = result;
          }
          this.opening = notee;

          // Markdown
          if (notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] == "md") {
            this.textarea = result;
            this.easyMDE = new EasyMDE({
              element: document.getElementById("editor"),
              spellChecker: false,
              lineWrapping: true,
              toolbar: false,
              status: false,
              forceSync: true,
              initialValue: result,
              shortcuts: {
                togglePreview: null,
                toggleFullScreen: null,
                toggleSideBySide: null,
              },
            });

            let open = this.opening;
            window.electronAPI.readFile(this.opening).then((result) => {
                this.mdContent = marked.parse(result.replace(/{notebook}/g, this.currentNotebook.replace(/\\/g, "/")))
              });
            this.easyMDE.codemirror.on("change", () => {
              window.electronAPI.saveNote(open, this.easyMDE.value());
              window.electronAPI.readFile(this.opening).then((result) => {
                this.mdContent = marked.parse(result.replace(/{notebook}/g, this.currentNotebook.replace(/\\/g, "/")))
              });
              if (this.openingDir == "") {
                window.electronAPI
                  .getFiles(this.currentNotebook)
                  .then((result) => {
                    this.notes = result;
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              } else {
                window.electronAPI
                  .openDir(this.openingDir)
                  .then((result) => {
                    this.notes = result;
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openDir(dir) {
      this.openingDir = dir;
      window.electronAPI
        .openDir(dir)
        .then((result) => {
          this.notes = result;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteNotebook() {
      window.electronAPI
        .deleteNotebook(this.currentNotebook)
        .then((_result) => {
          window.electronAPI
            .setCurrentNotebook(this.notebooks[0])
            .then((_result) => {
              location.reload();
            });
        });
    },
    changeNotebook(n) {
      window.electronAPI.setCurrentNotebook(n);
      location.reload();
    },
    openNotebookMenu() {
      if (this.NotebookMenu) {
        this.NotebookMenu = false;
      } else {
        window.electronAPI.listNotebooks().then((result) => {
          this.notebooks = result;
          this.NotebookMenu = true;
        });
      }
    },
    changeIcon() {
      window.electronAPI.setIcon(this.currentNotebook).then((_result) => {
        location.reload();
      });
    },
    uploadFile() {
      this.newNoteMenu = false;
      if (this.openingDir == "") {
        window.electronAPI.uploadFile(this.currentNotebook).then((_result) => {
          if (this.openingDir == "") {
            window.electronAPI
              .getFiles(this.currentNotebook)
              .then((result) => {
                this.notes = result;
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            window.electronAPI
              .openDir(this.openingDir)
              .then((result) => {
                this.notes = result;
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });
      } else {
        window.electronAPI.uploadFile(this.openingDir).then((_result) => {
          if (this.openingDir == "") {
            window.electronAPI
              .getFiles(this.currentNotebook)
              .then((result) => {
                this.notes = result;
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            window.electronAPI
              .openDir(this.openingDir)
              .then((result) => {
                this.notes = result;
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });
      }
    },
    createNote(filetype) {
      let noteName = `&&&&untitled-${Math.random()
        .toString(36)
        .slice(-8)}.${filetype}`;
      console.log(
        "Creating note to " +
          this.currentNotebook +
          "\\" +
          this.openingDir.replace(/^.*[\\/]/, "") +
          "\\" +
          noteName,
      );
      //window.electronAPI.createNote(this.currentNotebook+"\\"+(this.openingDir+"\\")+noteName, "")
      window.electronAPI
        .createNote(
          `${this.currentNotebook}/${this.openingDir.replace(
            /^.*[\\/]/,
            "",
          )}/${noteName}`,
          "",
        )
        .then((_result) => {
          this.notetitle = "";
          this.textarea = "";
          this.opening =
            this.currentNotebook + "\\" + this.openingDir + "\\" + noteName;
          
          this.readNote(`${this.currentNotebook}/${this.openingDir.replace(/^.*[\\/]/,"",)}/${noteName}`)
        });
      if (this.openingDir == "") {
        window.electronAPI
          .getFiles(this.currentNotebook)
          .then((result) => {
            this.notes = result;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        window.electronAPI
          .openDir(this.openingDir)
          .then((result) => {
            this.notes = result;
          })
          .catch((error) => {
            console.error(error);
          });
      }

      this.newNoteMenu = false;
    },
    deleteNote() {
      window.electronAPI.deleteNote(this.opening).then((_result) => {
        this.NoteMenu = false;
        this.notetitle = "";
        this.opening = this.currentNotebook;

        if (this.openingDir == "") {
          window.electronAPI
            .getFiles(this.currentNotebook)
            .then((result) => {
              this.notes = result;
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          window.electronAPI
            .openDir(this.openingDir)
            .then((result) => {
              this.notes = result;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },
    createScrap() {
      let noteName = `&&&&untitled-${Math.random().toString(36).slice(-8)}`;
      window.electronAPI
        .saveNote(this.currentNotebook + noteName, "")
        .then((result) => {
          alert(result);
          this.notetitle = result[1].replace(/^.*[\\/]/, "");
          this.textarea = result[0];
          this.opening = result[1];
        });
      this.newNoteMenu = false;
      window.electronAPI
        .getFiles()
        .then((result) => {
          this.notes = result;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
