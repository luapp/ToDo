const {app, BrowserWindow, Menu} = require('electron')


Menu.setApplicationMenu(null)

function createWindow () {
    const main_window = new BrowserWindow({
      width: 330,
      height: 480,
      minWidth: 430,
      minHeight: 580,
      maxWidth: 530,
      maxHeight: 680,
      resizable: true,
      frame: true,
      alwaysOnTop: false,
      webPreferences: {
        nodeIntegration: true
      }
    })
    main_window.loadFile("./build/index.html")
}

app.whenReady().then(() => {
  createWindow()  
})
//app.whenReady().then(createWindow)