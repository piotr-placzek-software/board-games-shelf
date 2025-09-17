import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

export function createBrowserWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      devTools: false,
      sandbox: false,
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `../board-games-shelf/browser/index.html`),
      protocol: 'file:',
      slashes: true,
    }),
  );
  win.setMenu(null);
  win.setMenuBarVisibility(false);
  win.removeMenu();

  win.on('ready-to-show', () => {
    win.webContents.openDevTools();
  });

  return win;
}
