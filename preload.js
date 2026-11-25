const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ffpro", {
  quit: () => ipcRenderer.send("ffpro:quit"),
  reload: () => ipcRenderer.send("ffpro:reload"),
  confirmClose: () => ipcRenderer.send("ffpro:confirm-close"),
  onRequestClose: (callback) => {
    ipcRenderer.on("ffpro:request-close", () => callback());
  },
});
