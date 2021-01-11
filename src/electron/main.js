const {app, BrowserWindow, Tray, ipcMain } = require('electron')

function createWindow () {
    const main_window = new BrowserWindow({
      width: 330,
      height: 480,
      minWidth: 330,
      minHeight: 480,
      resizable: true,
      frame: true,
      alwaysOnTop: false,
      webPreferences: {
        nodeIntegration: true
      }
    })
    main_window.loadFile("./build/index.html")
}

const window_toggle = () => {
  if (main_window.isVisible()) {
    main_window.hide()
  }
}

const Tray_window = () => {
  tray = new Tray("./src/images/512logo.png")
  tray.setToolTip('This is my application.')
  tray.on("click", e => {
    //window_toggle()
  })
}


app.whenReady().then(() => {
  Tray_window()
  createWindow()  
})
//app.whenReady().then(createWindow)