const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const autoUpdater = require('electron-updater').autoUpdater
const log = require('electron-log/main');

let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  // win.webContents.openDevTools()
  log.info("Start")
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => app.getVersion())

  createWindow()
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  autoUpdater.checkForUpdates()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

autoUpdater.on('update-available', () => {
  log.info("A new update is available")
  win.webContents.send("update-msg", "A new update is available")
})

autoUpdater.on('update-not-available', () => {
  log.info("update-not-available")
  win.webContents.send("update-msg", "update-not-available")
})

autoUpdater.on('checking-for-update', () => {
  log.info("checking-for-update")
  win.webContents.send("update-msg", "checking-for-update")
})

autoUpdater.on('error', (error) => {
  log.info(`error: ${error}`)
  win.webContents.send("update-msg", "error")
})

autoUpdater.on('download-progress', (progress) => {
  // `Download speed: ${progress.bytesPerSecond}`
  const log_message = `${progress.percent.toFixed()}%(${(progress.transferred / 1048576).toFixed(1)}MB/${(progress.total / 1048576).toFixed(1)}MB)`
  log.info(log_message);
  win.webContents.send("update-msg", log_message)
})

autoUpdater.on('update-downloaded', (event) => {
  log.info("update-downloaded")
  win.webContents.send("update-msg", "update-downloaded")
})
