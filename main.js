const DEBUG = false
const AutoUpdate = false

const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { text } = require("@fortawesome/fontawesome-svg-core");
//const { esbuildVersion } = require("vite");

let notebook = "C:/Users/korange/Documents/ROBLOX/AutoSaves/";

if (require("electron-squirrel-startup")) app.quit();

console.log(Intl.DateTimeFormat().resolvedOptions().locale);

const text_ja = {
  send_feedback: "意見を送る",
  create_notebook: "新しいノートブックを作成",
  notebook_name: "ノートブック名",
  create: "作成",
  delete_note: "ノートを削除",
  upload: "アップロード",
  create_folder: "新しいフォルダ",
  new_notebook: "新しいノートブック",
  delete_notebook: "ノートブックを削除",
  change_icon: "アイコンを変更",
  send: "送信",
  feedback_ex: "例）〇〇という機能が欲しい",
  folder_name: "フォルダの名前",
  root: "ルート",
  next: "進む",
  set_notebook_name: "ノートブックに名前を付けてください",
  notebook_description: "ノートブックは、ノートを保管する場所を表します。",
  start_setup: "セットアップを開始する",
  welcome: "ideaNoteへようこそ",
  preferences: "全体設定",
  font: "フォント",
  copy_path: "パスをコピー",
  copy_embed: "埋め込みコードをコピー",
  unpin: "ピン留めを解除",
  pin_note: "ノートをピン留め",
  warning: "警告",
  deletenotebook_message: "この動作はノートブックの中のファイルをすべて削除します。",
  deletenotebook_message2: "本当にこのノートブックを削除しますか？",
  delete: "削除",
  cancel: "キャンセル",
  update: "アップデートが利用可能です",
  update_message_left: "バージョン ",
  update_message_right: " へのアップデートが利用可能です。",
  update_now: "今すぐアップデートする",
  later: "後で",
  export_scrap: "スクラップをエクスポート",
  email: "メールアドレス",
  yes: "はい",
  no: "いいえ",
  feedback_email_text: "開発者による返信を希望しますか？",
  donate: "寄付する",
  sync_guide: "Syncthingでノートを同期",
  close: "閉じる",
  share_published: "あなたのノートは、次のURLで共有されました:",
  sharing: "共有中...",
  tell_tutorial: "使い方の説明はいるかな？",
  teach_me: "教えて！",
  no_thanks: "結構です",
};

const text_en = {
  send_feedback: "Send Feedback",
  create_notebook: "Create a Notebook",
  notebook_name: "Notebook Name",
  create: "Create",
  delete_note: "Delete Note",
  upload: "Upload",
  create_folder: "New Folder",
  new_notebook: "New Notebook",
  delete_notebook: "Delete Notebook",
  change_icon: "Change icon",
  send: "Send",
  feedback_ex: "I want the...",
  folder_name: "Folder name",
  root: "Root",
  next: "Next",
  set_notebook_name: "Name your notebook!",
  notebook_description:
    "A notebook represents a place where you store your notes.",
  start_setup: "Get Started",
  welcome: "Welcome to ideaNote",
  preferences: "Preferences",
  font: "Font",
  copy_path: "Copy Path",
  copy_embed: "Copy Embed Code",
  unpin: "Unpin Note",
  pin_note: "Pin Note",
  warning: "Warning",
  deletenotebook_message: "This action will delete all files in the notebook.",
  deletenotebook_message2: "Are you sure you want to delete this notebook?",
  delete: "Delete",
  cancel: "Cancel",
  update: "Update is available!",
  update_message_left: "Update to v",
  update_message_right: " is available.",
  update_now: "Update now",
  later: "Later",
  export_scrap: "Export",
  email: "Email Address",
  yes: "Yes",
  no: "No",
  feedback_email_text: "Would you like to receive a Response?",
  donate: "Donate",
  sync_guide: "Sync with Syncthing",
  close: "Close",
  share_published: "Your note was shared at:",
  sharing: "Sharing...",
  tell_tutorial: "Do you need tutorials? (Japanese only)",
  teach_me: "Teach me!",
  no_thanks: "No Thanks",
};

let t = {}

if (Intl.DateTimeFormat().resolvedOptions().locale == "ja-JP") {
  t = text_ja;
} else {
  t = text_en;
}

let userDataPath
if(DEBUG){
  try{
    fs.mkdirSync(path.join(app.getPath("userData"), "dev"))
  }catch{

  }
  userDataPath = path.join(app.getPath("userData"), "dev");
}else{
  userDataPath = app.getPath("userData");
}

const configPath = path.join(userDataPath, "currentnotebook.txt");

if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, "");
  console.log("currentnotebook.txt Created.");
} else {
  console.log("currentnotebook.txt Already exists.");
}

// もしnotebooksフォルダがなかったら、作る
if (!fs.existsSync(path.join(userDataPath, "notebooks/"))) {
  fs.mkdirSync(path.join(userDataPath, "notebooks/"));
  console.log("dir:notebooks Created.");
} else {
  console.log("dir:notebooks Already exists.");
}

function getFilesInDirectory(dir) {
  let files = fs.readdirSync(dir);
  let fileList = [];

  files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
          // fileList = fileList.concat(getFilesInDirectory(filePath));
      } else {
          let noteinfo = "" 
          if(filePath.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == "md" || filePath.replace(/^.*[\\/]/, '').match(/[^.]+$/s)[0] == "txt"){
            fileList.push({"name": filePath, "info": fs.readFileSync(filePath, {encoding: "utf-8"}), "mtime": stat.mtime});
          }else{
            fileList.push({"name": filePath, "info": "", "mtime": stat.mtime});
          }
      }
  });

  // ファイルを更新日時順に並び替え
  fileList.sort((a, b) => {
    // "#pin"がついているかどうかで比較
    const isAPinned = a.name.includes("#pin");
    const isBPinned = b.name.includes("#pin");

    if (isAPinned && !isBPinned) {
      return -1; // aを前に
    } else if (!isAPinned && isBPinned) {
      return 1; // bを前に
    } else {
      // どちらも#pinがついているかどちらもついていない場合は更新日時で比較
      return b.mtime.getTime() - a.mtime.getTime();
    }
  });

  return fileList;
}

function getDirs(dir) {
  let files = fs.readdirSync(dir);
  let fileList = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

async function getDirectorys(notebook) {
  return getDirs(notebook);
}

async function getFiles(notebook) {
  console.log("Getting files in " + notebook);
  return getFilesInDirectory(notebook);
}

async function createFolder(notebook, name) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path.join(notebook, name), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
async function newNotebook(message) {
  return new Promise((resolve, reject) => {
    fs.mkdir(
      path.join(path.join(userDataPath, "notebooks"), message),
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      },
    );
  });
}

async function saveNote(path, data) {
  newPath = path.replace(/\\/g, "/");
  console.log("Saving a note to " + newPath);
  try {
    fs.writeFileSync(newPath, data, "utf-8");
  } catch (err) {
    console.log(err);
  }
}

async function createNote(path, data) {
  newPath = path.replace(/\\/g, "/");
  console.log("Creating a Note to" + newPath);
  try {
    fs.writeFileSync(newPath, data, "utf-8");
    return;
    //return [readFile(newPath), newPath]
  } catch (err) {
    console.log(err);
  }
}

async function setIcon(message) {
  dialog
    .showOpenDialog({
      properties: ["openFile"],
      filters: [
        { name: "Images", extensions: ["png", "jpeg", "jpg", "gif", "webp"] },
      ],
    })
    .then((file) => {
      console.log(
        "Copying icon to " +
          path.join(userDataPath, "notebooks", message, ".icon.png"),
      );
      fs.copyFileSync(
        file,
        path.join(userDataPath, "notebooks", message, ".icon.png"),
      );
    })
    .catch((error) => {
      console.log(error);
    });
}

async function readFile(file) {
  console.log("Reading file: " + file);
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: "utf8" }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function createWindow() {
  let icon
  if(DEBUG){
    icon = "./dev.ico"
  }else{
    icon = "./app.ico"
  }
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true,
    title: "ideaNote",
    icon: icon,
  });

  win.loadFile("dist/index.html");
  //win.loadURL("http://localhost:5173");

  // リンククリック時に OS のデフォルトブラウザで開く
  const handleUrlOpen = (event, url) => {
    if(url.includes("http")){
      event.preventDefault();
      shell.openExternal(url);
    }  
  };

  // リンククリック時のイベントハンドラを登録
  win.webContents.on('will-navigate', handleUrlOpen);
  win.webContents.on('new-window', handleUrlOpen);
}

app.whenReady().then(() => {
  ipcMain.handle("gettexts", (event) => {
    if (Intl.DateTimeFormat().resolvedOptions().locale == "ja-JP") {
      return text_ja;
    } else {
      return text_en;
    }
  });

  ipcMain.handle("getdirs", (event, message) => {
    return getDirectorys(message);
  });

  ipcMain.handle("getfiles", (event, message) => {
    return getFiles(message);
  });

  ipcMain.handle("readfile", (event, message) => {
    return readFile(message);
  });

  ipcMain.handle("opendir", (event, message) => {
    return getFilesInDirectory(message);
  });

  ipcMain.handle("savenote", (event, message) => {
    return saveNote(message[0], message[1]);
  });

  ipcMain.handle("deletefolder", (event, message) => {
    fs.rmdirSync(message, { recursive: true });
  });

  ipcMain.handle("exportscrap", (event, message) => {
    const data = JSON.parse(fs.readFileSync(message, 'utf8'));

    let save = ""
    for (const key in data) {
      save = `${save}${data[key].date}\n${data[key].text + "\n\n"}`;
    }

    const path = dialog.showSaveDialogSync({
      filters: [
        { name: 'Text File', extensions: ['txt'] },
      ]
    });

    if( path === undefined ){
      return
    }

    fs.writeFileSync(path, save)
  });

  ipcMain.handle("newnotebook", (event, message) => {
    newNotebook(message);
    //fs.copyFileSync("../.icon.png", path.join(path.join(app.getPath('userData'), "notebooks", message, ".icon.png")))
    data = fs.readFileSync(path.join(userDataPath, "currentnotebook.txt"), {
      encoding: "utf-8",
    });
    data = path.join(userDataPath, "notebooks", message);
    fs.writeFileSync(path.join(userDataPath, "currentnotebook.txt"), data, {
      encoding: "utf-8",
    });
  });

  ipcMain.handle("createnote", (event, message) => {
    return createNote(message[0], message[1]);
  });

  ipcMain.handle("createfolder", (event, message) => {
    createFolder(message[1], message[0]).then((result) => {
      return result;
    });
  });

  ipcMain.handle("setfont", (event, message) => {
    fs.writeFileSync(path.join(userDataPath, "font.txt"), message)
  });

  ipcMain.handle("getfont", (event, message) => {
    return fs.readFileSync(path.join(userDataPath, "font.txt"), {encoding: 'utf-8'})
  });

  ipcMain.handle("seticon", async (event, message) => {
    try {
      const filePath = await dialog.showOpenDialog({
        properties: ["openFile"],
      });
      if (!filePath.canceled) {
        const sourcePath = filePath.filePaths[0];
        const targetPath = path.join(message, ".icon.png");
        fs.rmSync(targetPath);
        fs.copyFileSync(sourcePath, targetPath);
      }
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  });

  ipcMain.handle("uploadfile", async (event, message) => {
    try {
      const filePath = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [
          { name: 'Markdown, Plaintext, Scrap, ToDo, Images, Musics', extensions: ["md", "txt", "scrap", "todo", "png", "jpeg", "jpg", "webp", "mp3", "wav"] },
        ],
      });
      if (!filePath.canceled) {
        const sourcePath = filePath.filePaths[0];
        const targetPath = path.join(
          message,
          sourcePath.replace(/^.*[\\/]/, ""),
        );
        fs.copyFileSync(sourcePath, targetPath);
      }
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  });

  ipcMain.handle("listnotebooks", (event) => {
    return getDirs(path.join(userDataPath, "notebooks"));
  });

  ipcMain.handle("changenotetitle", (event, message) => {
    console.log(
      "New note path is " + path.join(path.dirname(message[0]), message[1]),
    );
    fs.renameSync(
      message[0],
      path.join(path.dirname(message[0]), message[1]),
    );
    return path.join(path.dirname(message[0]), message[1])
  });

  ipcMain.handle("getcurrentnotebook", (event) => {
    return fs.readFileSync(path.join(userDataPath, "currentnotebook.txt"), {
      encoding: "utf-8",
    });
  });

  ipcMain.handle("deletenotebook", (event, message) => {
    const options = {
      type: "question",
      title: t.warning,
      message: t.deletenotebook_message,
      detail: t.deletenotebook_message2,
      buttons: [t.delete, t.cancel],
      cancelId: -1,
    };

    const selected = dialog.showMessageBoxSync(options);

    if (selected == 0) {
      return fs.rmdirSync(message, { recursive: true });
    }
  });

  ipcMain.handle("deletenote", (event, message) => {
    newPath = message.replace(/\\/g, "/");
    console.log("Trying to delete " + newPath);
    try {
      return fs.rmSync(newPath);

      //return [readFile(newPath), newPath]
    } catch (err) {
      console.log(err);
    }
  });

  ipcMain.handle("setcurrentnotebook", (event, message) => {
    data = fs.readFileSync(path.join(userDataPath, "currentnotebook.txt"), {
      encoding: "utf-8",
    });
    data = message;
    fs.writeFileSync(path.join(userDataPath, "currentnotebook.txt"), data, {
      encoding: "utf-8",
    });
  });

  ipcMain.handle("setupcurrentnotebook", (event, message) => {
    data = fs.readFileSync(path.join(userDataPath, "currentnotebook.txt"), {
      encoding: "utf-8",
    });
    data = path.join(userDataPath, message);
    fs.writeFileSync(path.join(userDataPath, "currentnotebook.txt"), data, {
      encoding: "utf-8",
    });
  });

  createWindow();

  if(AutoUpdate){
    const currentVersion = "1.12.1";
    axios
    .get("https://ideanote-updates.korange.work/info.json", {})
    .then((response) => {
      let { latest, download } = response.data;
      if (currentVersion != latest) {
        const options = {
          type: "question",
          title: "ideaNote",
          message: t.update,
          detail: `${t.update_message_left}${latest}${t.update_message_right}`,
          buttons: [t.update_now, t.later],
          cancelId: -1
        };

        let selected = dialog.showMessageBoxSync(options);
        if (selected == 0) {
          const { shell } = require("electron");
          shell.openExternal(download);
        }
      }
    });
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
