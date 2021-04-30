const { app, BrowserWindow } = require('electron')
require('update-electron-app')()
const path = require('path')
const os = require('os');
const fs = require('fs');
var installDir = os.tmpdir() + "/.GDInstall" ;
if(!fs.existsSync(installDir)) {
  fs.mkdirSync(installDir);
  console.log("Directory created" + installDir);
  }
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth:485,
    minHeight:600,
    autoHideMenuBar:true,
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false,
      enableRemoteModule:true,

    }
  })

  win.loadFile('index.html')
  win.webContents.session.on('will-download', (event, item, webContents) => {
    // Set the save path, making Electron not to prompt a save dialog.
    item.setSavePath(installDir + "/gdevelop5.AppImage");
  
    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download successfully')
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
