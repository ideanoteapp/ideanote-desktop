<template>
  <div
    class="fixed bottom-4 left-4 bg-[#3f3f3f] z-50 text-white rounded-md sm:shadow-md text-sm sm:hover:bottom-5 duration-200"
  >
    <button @click="this.sendFeedbackForm = true" class="px-3 py-2 flex">
      <img src="../../icon.png" class="w-6 h-6 mr-1.5" />
      <span class="flex flex-col justify-center"> {{ t.send_feedback }} </span>
    </button>
  </div>

  <div
    class="fixed top-0 left-0 w-screen z-10 h-screen bg-[#00000070] flex justify-center"
    v-if="sendFeedbackForm"
  >
    <button
      class="fixed top-4 z-50 right-4"
      @click="this.sendFeedbackForm = false"
    >
      <div
        class="w-9 h-9 text-center flex justify-center fles-col text-white bg-[#b93232] rounded-lg"
      >
        <div class="flex flex-col justify-center">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </button>
    <div class="flex flex-col justify-center">
      <div
        class="flex justify-center bg-[#2e2e2e] rounded-md shadow-lg min-w-32 min-h-32 px-8 py-8 text-white"
      >
        <form class="text-center" @submit.prevent="sendFeedback">
          <div class="text-2xl font-bold pb-2.5">{{ t.send_feedback }}</div>
          <input
            type="text"
            v-model="feedback"
            class="bg-[#262626] rounded-lg py-2 px-3 text-white text-center w-64"
            :placeholder="t.feedback_ex"
          />

          <div>
            <button
              class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
              @click="sendFeedback"
            >
              {{ t.send }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!---------->

  <div :style="{ 'font-family: Serif;': uiFont == 'Serif' }">
    <div class="flex max-h-screen max-w-[100vw] h-screen overflow-hidden">
      <div
        class="fixed left-[180px] lg:left-[200px] w-screen h-screen bg-black opacity-60"
        v-if="false"
      ></div>
      <div
        id="sidebar1"
        class="bg-[#262626] min-w-[180px] lg:min-w-[200px] w-[180px] z-10 lg:w-[200px] h-screen select-none overflow-x-hidden"
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
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAOwAAADsAEnxA+tAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAADh1JREFUeJy9W2uMXVUV/ta5j5m2c+/MdFpKU14tpdOWh4nFKkYIUfihIEEBA+FtsJRCI0hMfBCh0cAfRIHSKSRCJUDBUQsGYwKYQMAEsL7Cq1MCCEWkLdOZuffSztzHXv44+7H2OfveeXSuO5k5Zz/OOmutvd77XGJmtLUNdh2JXPYMBVodEfUD6GfmHiLqYeYuACCiCjOPAhhhot0R01CDG29kOvIv4mv7Pm4netQWBuzoOw0RX8KMswBeBZCeYDBMj0Q/vjczDJZr3mTCc1EUbcfXh1+ebVRnjQGj23p7ij10HYGvZsYJ7g2IaUveAyAieO/X80QUs4aTz/DuiKJtAA/g/JHR2cD78BkwWFiospnvgWgDM4oAEvvp38sW7zSJfutnxXyJmO+LGo1f4KLy/sNBf+YM2ERR45Sey8B8F4j6wAyQINNiK8a93U6Okc+lFDzd96+jSqnbcqq0GRdxYyZkzIgB1cHC6iibfZiANeb5lDgj1m0G2znb18Qmx1joR7O+BwPWiuxUVL8i/43yW9OlJZruA40dvVdEUfZVVmyJBwNKuXtpzJhjQmOVjq+K2R8DQUlJAFLMZMSbbmAwWDzDp0Yq87fGjp7vTJeeqUvA4LcyteiZLQDWAQFp1LgnwVmdDqxnS5on+7ZPAXjJ8eSaiDCQaYxtnKpKTI0Bfzqho/rp/keIcGFySqqAHgCMyFvRN0wQ7pBlH82fJUq9Jz0fM03Q8lR+SfESnLbn0OEz4PmlnbVPRv7I4C+n/JgxXHZnA/7ObpEj3tmLkI/0r3Kt9w4NN217bATx59yC3nNx5nvjM2fAIGWq6H6CwRcIWm3gkqSXCMDco5Hp/SwwZzFYjYOrY6B6Baz/UCsDtTGgXgE3ajEd8GHHO6tZI+gFws4gxk1IhokhgD90LCxdgDO53ozEbCvujKOwhYgvMEg4m2ew0giabt9a5JYLO1RcBXSf3PwFjfGYKfUKUB11DKpXwPUyUC2BG2WgFo9zvQIc/BA8+k+AG24D2OHkJAQA47yJT4p3dwDXN0OhqQSM/7Z4NZgeFG/wxc7smxDDjlPvBOV6JHjgqG8ClGnOhBk0Lg2h9vLVUKOvOxUwUgATfghLG9GVnReOPRyCFXSDEzuKK6BwNwyghBlnluIvdNQjHvHbGy1VcEaNiv3InfF7IFfQhMb6wtq9yjEQAYq3VJ8orArBSjNgkDKqhscYKEjpYNZCxuzpqh3PdIaxjVpq2YwbdR6JzLKrdHyg4w04KTC4a/zmNSjatmkTpehNDUxwcT0zr4mfhgVsACp5tbaBgagJAyh3eJS2aNR1PAyeJgaJgy8f17jPa7+/sisVKHkMqDxUWNgA/8w8ZG2MMm/QfWEMrTvLdAQwjOK/drVG1eJp4w02MQHgYgN7vb38cLFPgvCwozl8M5h7zMMwAI0LEq5P+nxmDqtAG3cfALhecu/nNH6SeD0+nzr4JgnDMWBwfjeD1qcBwMbzSeJtnA8AmblpDNuk/6ZxrexwgZBM4diSdowYG/Fkr7XWlgGf1usbCOi2BiXgHaXBSfapI+kB0H4JqFV8VU2pphsX3WL5YO1a07EMYPCVLjw1D7LO3HyjZ1JZl/kxkA0wIGo3A8owtsk3zs4OJCVAxS7y2xZFACg/XvwiA/1uR417I+vukgZFWlwGQB3FNIbtVoFqSb9fbA4Q4wgE8CQTxq8oPTrvc5YB3GhcHIwIWeTc2hgaiTAviucAZAIMaLsKlLx8ykipkwK4gAhycwGizCWAZgARnQ2h+9LvQ/STxsULQHLz0hhORwVmUNHiegWsnMuWuaWlQylrIO08MwB1FgBkDz4ybzFH1O/7+VhYlL7aVMDMkY65tXgREygb8ALUQgVUDXhnAHj/EWDsX3G/YyGw6GxgxU1A75rJGVAtQZbcXCQoS2YGT0eXJvOkT7d3LcrWEJ0OpVwJRtRpDDNcpUfPKZb8igFn5qQxbCYB4x8DL54DjP7DH5/YD3zwGLDnceDE24BVt7RkgKqKOCAmwOYBnvETyRw7GqhOfHrErE60xCR8vXEKGmbC/Yl4AGgSCQYkgOvAX85PE++tUcDrPwHevb8lA7hedmqokfLUF0mcDX1GOmh1xOB+s8jFzkgD0EVPW/xMzFMUYEBIAj78HXDg1ZaE2fbaj+NaQaipGlTNr3gpgbjyNtNnitJ2gUD9ERCf4qQDB+fikmKVcpcMIBMgNuQFPn5mMrJdqx4A9r8QnOJaWeu+H7UaWqxd4OSGiTnFK7IALVCKdcmJ4h0mV/ayLjahZ/J8L74LJD2hOKDZjjZrhz4KDnOtJFyaLNH5UmzG7EYawx2P9mXB6LILKWA4hFG0RUlKrGcGokDVJ6QC846bBvUAupYFh7nmGOknbN4/v2xOSK4rREzxETXg9FyLhxdcxQcR4oXQqqKMBARayAgee2mz1enWuQjoOy04xbWSl+97xlvgbCJBg6+rHAHMXIiSZSSbD4h6vMwRlBcWQ7uWJjl/SAK6TwH6b54C9QR85s5wlgntAo2Q6m0WG++H70KNlaAlVlymisz9UwYOAqBjrbcO2WlWg06+A1j1IzSVhMxcYM1W4JhLw/OATYQkgZzYHFkc8RI9jbcClyNmLsdZkgCuRUUyRWZcvnIAUSgIAponQ5QBTvppuFo09xjgq0PAstbHfF4tIOEBpPmy9iERt+jhcsTgYccY96RZZEI+KQkp1xOsBmXRUterowjG//OWAnOWtCTeMkB4KRabY6VTMsVQpXHXPBmOANotT3ZNRM1aDGwObcFJomK3SSEGTJYKVw+Ex/N94fFEU1WtApJAqaaaBmuzBF1smaaGsgwMWd9OjnBHrM8Qv2kPkCukMZwsFe5YAKy5H6gOA9WRmCHVYaDvC1NigIkDbN9Ia7zFDg0vL0ipylCWQG8oVibVs8sIccgIEvlTEgn9L+roTU9Olgof3AOU3gByPbHI95wC5OcDxdWtn9NNVUsiQzVOy+EPPeaCPEE4xWFeA3gzqzKZF6AaDCZyZ37CHRpd8k55ncskIlB+BuWwsdeAt+9Jj598O7DyB5MywARCNtJjd/rsXLglAW5brcfjjMq9lF10eXnf3gc7dzF4ld1rDny6khxjcc13pzFsVQsAgCPOBL70tBN9owbzPz8p8QCgamM2LffwFsdkRARWon4BZy8I9NoR11T2ZgFAKfUsEa1SOkYGmWKIs6oEwMybK1NsUKJsVxrDySSgczGwePGUiA0yoFq2UqmQ/pDCMMTdC7xjgp4DdElMAdslh7xQF84UGmCWk0Zj8oFy2GQScJhNTSSNoHPd0mIxEIf1CTNWq6ntgGbAkmuqLwMYUs6aeIBVAqpzI/F8lD3MeuAMmi2GAF6Q4xb49QGzi5qWXUdfW90JiHOBBqttgOGWCYOd4WCwNwerdwCFQuE2V4Tjchi8pM3g7I+J4M0EQqQeMnAsA+apwgCAUWc1pYXVjNA1Az1rd4BCJ8NtPhNQtYrWx2S+65yhJR5w9oAwVi3XH7BompvedQfGANrqEy+vPkBZGqOpVoNmqXH9ILhRgzyYkTst8bbPmDnF9xx3I9vvjL1s5OCh6l3MPGIekICSiYeMsCi0222UACv+ASLNVeYrzADH7nEYnXPu9tCUneUbeT8T3WJ3OZVWxlfzpSebuVBW10YjaA5FTS6S9Fwy9rf3zGCFHy65ojTsoZkEfvRHta0M/BWQgYN/Hhg3p29cD3yPGKoSz1JTEwc8XKxXQsKNaxWJAza8ctTe2q9SaKag38qKOHNpXCeAJwmA8//GNTIDh/6b+B1DtgvIBc4KZ6lV9+20HgiADneF/ou0VzOlkqXoKtzKKgkrWMs66trxtxVjnRdQBHyuuY7segyVPc9DqTo41wssOB1TrvtNszUO7cXY3+/wcHKZoOEJ2atet2HxuoldIXgtvxR9fyC7hYiuc2dtOlAS4ic/a7e5QpQH5QvI5LtB+SKifAGU7UKUKyDq6AbluxHluhDliqB8fI06ekC5AqJcAZSbhygfj0m3O/6f53Hgpe+iPvKWxUXin/zEXj+3+dj1jY3NaGxpqo/d17jhgyMzC8C4yL6IWWyu+0jRZlxE4EYVPD4MNT6cBipja2oyZkJwQsy4fAGqWo4zQJIo+MQqZne8GYctTx3Tp25sReOkH0v/exN10qLM02B8RRLquO1+8gRJRyoN9X84kUxTzZmDP+fHOfI9Ia7Kd4PxXK3eOHf5Rp5oRd+k37AddyuP12qNc5jwG4lwulTO9t4ZJLnNTlcVsw6kfA/jXKyzLzLgsm7Xwkt6JPvuJz8ab5w3GfHAFCTAtMFByqzZH91DwAbzUrtrMigK/XQm8Y2/HoRvypuvDcEMEhOfFW5eurBx4+z+YEK09waylzHzAIAuKffNbL5VAHbi3OrTd+/zeTEu3+HLlR2rALR+2Yb6o9OhZ0Y/mtq9mVZmKfNrEK+F3NAQxkmqDOWmEzKIFjvRF5UM7z5e8ApFfOXS63hourQcxu8Gid65F5dTJvo5K17gPqE35ijWSXuvTXfoV1+u7Aa3xph6hvd5PnlweQTMm5Ytwv/3Z3Oy7bqP+nIc3QTwDSDq9uVWvskVWClw3/SXUOH7URBtrkH9cuX1HPC1U2+z9tPZdx+gbjWB9QBdBcJKEzMBAd2WCJi+WOPdw0kNM+/KRNE2pdTA8o1cmg282/Lj6ffupbUNii4G89kgnOjiE1e19QMa0beBEIOIGMyvA9GzEanty27gnbONa3t+PS7aO1sLR3CtcgYQrWaolWCsQES9YO4Bo0uHsxWKaJSYDzBjN6JoF6DejLJ48fj1vK+d+P0PmKfxjriFnfQAAAAASUVORK5CYII="
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
        <div
          class="before:fixed before:top-0 before:left-0 before:w-screen before:h-screen before:bg-black before:opacity-50"
          v-if="NotebookMenu"
          @click="openNotebookMenu"
        ></div>
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
              src="data:image/png;base64,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"
              v-else
              class="rounded-full w-7 h-7"
            />
            <div class="ml-2">
              <div class="text-[1.1rem] font-semibold text-white">
                {{ currentNotebook.replace(/^.*[\\/]/, "") }}
              </div>
            </div>
          </div>

          <div class="hover:bg-[#3f3f3f] mt-2 text-white z-50">
            <button class="px-4 pb-1" @click="changeIcon">
              <font-awesome-icon
                icon="fa-solid fa-star"
                class="w-6 textt-[#FFB800] text-[#ffcd42] text-[1.2rem] mr-1 mt-1 before"
              />
              {{ t.change_icon }}
            </button>
          </div>

          <!--<div class="hover:bg-[#3f3f3f] px-4 pb-1 text-white z-50">
                <font-awesome-icon icon="fa-solid fa-gear" class="text-sm w-6 textt-[#FFB800] mt-1 text-[#42ff6b] text-[1.2rem] mr-1 before" />
                ノートブック設定
              </div>-->

          <div class="hover:bg-[#3f3f3f] text-white z-50">
            <button class="px-4 pb-1 flex" @click="deleteNotebook">
              <font-awesome-icon
                icon="fa-solid fa-trash"
                class="text-sm w-6 textt-[#FFB800] mt-1 text-[#ff4242] text-[1.2rem] mr-1 before"
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
                src="data:image/png;base64,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"
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
            <button class="px-4 pb-1" @click="this.createNotebookForm = true">
              <font-awesome-icon
                icon="fa-solid fa-plus"
                class="w-6 textt-[#FFB800] text-[1.2rem] mr-1 mt-1 before"
              />
              {{ t.new_notebook }}
            </button>
          </div>

          <div class="bg-[#5f5f5f] w-full h-px mt-2 mb-2"></div>

          <div
            class="hover:bg-[#3f3f3f] text-white z-50"
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
            <div class="flex flex-col justify-center mb-1">
              {{ t.root }}
            </div>
          </button>
        </div>

        <div
          class="mx-2 text-white flex mt-1 hover:bg-[#353535] rounded-lg"
          v-for="i in dirs"
          @click="openDir(i)"
          :class="{ 'bg-[#353535]': openingDir == i }"
        >
          <button class="flex py-2 px-2 w-full">
            <img
              src="../assets/folder.png"
              alt=""
              class="w-[29px] h-[29px] bg-[#353535] mr-2 rounded-full border-none"
            />
            <div class="flex flex-col justify-center mb-1">
              {{ i.replace(/^.*[\\/]/, "") }}
            </div>
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
        class="bg-[#2E2E2E] w-[286px] text-white lg:w-[386px] h-screen"
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
            {{ openingDir.replace(/^.*[\\/]/, "") }}
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
          </div>
        </div>

        <div
          class="overflow-y-scroll max-h-[calc(100vh-54px)] overflow-x-hidden"
        >
          <div
            v-for="n in notes"
            @click="readNote(n.name, true)"
            class="flex border-b border-b-[#ffffff15] py-3 px-5 duration-200 hover:bg-[#2b2b2b] hover:bg-[#ffffff10]"
            :class="{ 'bg-[#2b2b2b] bg-[#ffffff10]': n == opening }"
          >
            <font-awesome-icon
              v-if="
                n.name.replace(/^.*[\\/]/, '').includes('[pin]')
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
            
            <div>
              <button class="w-full h-full text-left">
                <div
                  class="text-[1.035rem]"
                  v-if="n.name.replace(/^.*[\\/]/, '').match('&&&&untitled-')"
                >
                  New Note...
                </div>
                <div class="text-[1.035rem]" v-else>
                  {{
                    n.name
                      .replace(/^.*[\\/]/, "")
                      .split(".")
                      .slice(0, -1)
                      .join(".")
                  }}
                </div>
                <div class="opacity-80 text-sm overflow-hidden max-h-[2.5rem]">
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
            <div
              v-if="NoteMenu"
              class="absolute bg-[#262626] z-50 min-w-44 right-4 rounded-lg top-10 py-3 shadow-md border border-[#5f5f5f]"
            >
            <div
                class="mt-1 px-4 pb-1 hover:bg-[#3f3f3f]"
                @click="pinNote()"
                v-if="opening.includes('[pin]') == false"
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
                v-if="opening.includes('[pin]') == true"
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
              class="mdcontent flex flex-col"
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

  <div
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-[#00000070] flex justify-center"
    v-if="createFolderForm"
  >
    <button
      class="fixed top-4 z-50 right-4"
      @click="this.createFolderForm = false"
    >
      <div
        class="w-9 h-9 text-center flex justify-center fles-col text-white bg-[#b93232] rounded-lg"
      >
        <div class="flex flex-col justify-center">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </button>
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
            <button
              class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
              @click="createFolder(foldertitle)"
            >
              {{ t.create }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="fixed top-0 left-0 w-screen z-10 h-screen bg-[#00000070] flex justify-center"
    v-if="createNotebookForm"
  >
    <button
      class="fixed top-4 z-50 right-4"
      @click="this.createNotebookForm = false"
    >
      <div
        class="w-9 h-9 text-center flex justify-center fles-col text-white bg-[#b93232] rounded-lg"
      >
        <div class="flex flex-col justify-center">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </button>
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
            <button
              class="py-2 px-3 rounded-lg bg-[#3250b9] w-64 mt-4"
              @click="createNotebook()"
            >
              {{ t.create }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

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
</style>

<script>
import scrap from "./Scrap.vue";
import todo from "./ToDo.vue";
import EasyMDE from "easymde";
import axios from "axios";
import marked from "marked/marked.min.js";

export default {
  components: {
    scrap,
    todo,
  },
  data: () => {
    return {
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
      sendFeedbackForm: false,
      feedback: "",
      t: {},
      mdParsed: true,
      mdContent: "",
      easyMDE: undefined,
      preferences: false,
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
    pinNote(){
      this.notetitle = "[pin] " + this.notetitle
      this.changeNoteTitle()
    },
    unpinNote(){
      this.notetitle = this.notetitle.replace("[pin] ", "")
      this.notetitle = this.notetitle.replace("[pin]", "")
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
    sendFeedback() {
      this.sendFeedbackForm = false;
      axios
        .post(
          `https://app.formester.com/forms/ec2b098d-bc7e-4d23-974a-5862383ff006/submissions.json`,
          { content: this.feedback },
        )
        .then((response) => {
          this.feedback = "";
          alert("ご意見ありがとうございました。");
        })
        .catch((error) => {
          // POSTリクエストが失敗した場合の処理
          console.error(error);
          alert("エラーが発生しました。");
        });
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

          if (notee.replace(/^.*[\\/]/, "").match(/[^.]+$/s)[0] == "txt"){
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
