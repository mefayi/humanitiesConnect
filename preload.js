const { contextBridge, ipcRenderer } = require("electron");

console.log("preload.js loaded");

contextBridge.exposeInMainWorld("api", {
  getData: () => ipcRenderer.invoke("get-data"),
  saveData: (data) => ipcRenderer.invoke("save-data", data),
  addData: (newData) => ipcRenderer.invoke("add-data", newData),
  updateData: (updatedData) => ipcRenderer.invoke("update-data", updatedData),
  pluginAddData: (newEntries) =>
    ipcRenderer.invoke("plugin-add-data", newEntries),
  openPlugin: (pluginDir) => ipcRenderer.invoke("open-plugin", pluginDir),
  getPlugins: () => ipcRenderer.invoke("get-plugins"),
  notifyMain: () => ipcRenderer.send("notify-main"),
  onRefreshData: (callback) => ipcRenderer.on("refresh-data", callback),
  offRefreshData: (callback) =>
    ipcRenderer.removeListener("refresh-data", callback),
  refreshData: () => ipcRenderer.invoke("refresh-data"),
});

console.log("API exposed to renderer process");
