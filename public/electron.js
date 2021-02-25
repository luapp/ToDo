const {app, BrowserWindow, Menu, Tray} = require('electron')


Menu.setApplicationMenu(null)
//small 330x480
function createWindow () {
    const main_window = new BrowserWindow({
      width: 430,
      height: 580,
      minWidth: 430,
      minHeight: 580,
      resizable: true,
      frame: true,
      maximizable: true,
      alwaysOnTop: false,
      icon: "./src/images/192logo.png",
      webPreferences: {
        nodeIntegration: true
      }
    })
    main_window.loadFile("./build/index.html")
}
const Tray_app = () => {
    new Tray("./src/images/192logo.png")
}

app.whenReady().then(() => {
  //new Tray("./192logo.png")
  //Tray_app()
  createWindow()
})
//app.whenReady().then(createWindow)