const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");
  mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

// Handle Opening Cooking Process Window
ipcMain.on("open-cooking-window", (event, method) => {
  const cookingWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load the cooking process HTML dynamically
  cookingWindow.loadFile("cooking-process.html");

  // Pass the selected method to the new window
  cookingWindow.webContents.on("did-finish-load", () => {
    cookingWindow.webContents.send("init-cooking-process", method);
  });
});