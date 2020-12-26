const {app, BrowserWindow } = require('electron')

function createWindow () {
    const main_window = new BrowserWindow({
      width: 320,
      height: 450,
      minWidth: 320,
      minHeight: 450,
      resizable: false,
      frame: false,
      alwaysOnTop: false,
      webPreferences: {
        nodeIntegration: true
      }
    })
  
    main_window.loadFile("./build/index.html")
}
  
app.whenReady().then(createWindow)