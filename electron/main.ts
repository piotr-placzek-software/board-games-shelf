import { app, BrowserWindow } from 'electron';
import { createBrowserWindow } from './window';
import { registerIpcHandlers } from './ipc-handlers';

async function main() {
  let browserWindow: BrowserWindow;

  app.on('second-instance', () => {
    if (browserWindow) {
      if (browserWindow.isMinimized()) browserWindow.restore();
      browserWindow.focus();
    }
  });

  app.whenReady().then(() => {
    browserWindow = createBrowserWindow();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createBrowserWindow();
      }
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  registerIpcHandlers();
}
main();
