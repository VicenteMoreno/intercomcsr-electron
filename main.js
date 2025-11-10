const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const fs = require('fs');

const configPath = path.join(__dirname, 'config.json');
const iconPath = path.join(__dirname, 'icon.png');

function createWindow() {
  // Obtener tamaño de pantalla
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width,
    height,
    fullscreen: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: iconPath
  });

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  win.on('minimize', () => win.setAlwaysOnTop(false));
  win.on('restore', () => win.setAlwaysOnTop(true));
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { app.quit(); });
