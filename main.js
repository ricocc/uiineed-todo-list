const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'public', 'img', 'favicon.png'),
        webPreferences: {
            devTools: true,
            // preload: path.join(__dirname, 'preload.js') // 预加载脚本
        }
    });

    Menu.setApplicationMenu(null);
    if (process.platform === 'darwin') Menu.setApplicationMenu(null);

    mainWindow.loadFile('index-zh.html');
    // mainWindow.loadFile('index.html');

    // 打开开发者工具
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});