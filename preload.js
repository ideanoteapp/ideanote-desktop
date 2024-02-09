const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setFont: (font) => ipcRenderer.invoke("setfont", font),
  getFont: () => ipcRenderer.invoke("getfont"),
  getTexts: () => ipcRenderer.invoke("gettexts"),
  getDirs: (notebook) => ipcRenderer.invoke("getdirs", notebook),
  getFiles: (notebook) => ipcRenderer.invoke("getfiles", notebook),
  readFile: (file) => ipcRenderer.invoke("readfile", file),
  openDir: (dir) => ipcRenderer.invoke("opendir", dir),
  createFolder: (name, notebook) =>
    ipcRenderer.invoke("createfolder", [name, notebook]),
  saveNote: (note, data) => ipcRenderer.invoke("savenote", [note, data]),
  createNote: (note, data) => ipcRenderer.invoke("createnote", [note, data]),
  deleteNote: (note) => ipcRenderer.invoke("deletenote", note),
  deleteFolder: (folder) => ipcRenderer.invoke("deletefolder", folder),
  uploadFile: (path) => ipcRenderer.invoke("uploadfile", path),
  newNotebook: (name) => ipcRenderer.invoke("newnotebook", name),
  listNotebooks: () => ipcRenderer.invoke("listnotebooks"),
  getCurrentNotebook: () => ipcRenderer.invoke("getcurrentnotebook"),
  setCurrentNotebook: (notebook) =>
    ipcRenderer.invoke("setcurrentnotebook", notebook),
  setupCurrentNotebook: (notebook) =>
    ipcRenderer.invoke("setupcurrentnotebook", notebook),
  setIcon: (notebook) => ipcRenderer.invoke("seticon", notebook),
  deleteNotebook: (notebook) => ipcRenderer.invoke("deletenotebook", notebook),
  changeNoteTitle: (old, newer) =>
    ipcRenderer.invoke("changenotetitle", [old, newer]),
  exportScrap: (message) => ipcRenderer.invoke("exportscrap", message),
});
