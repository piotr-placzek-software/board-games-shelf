import { ipcMain } from 'electron';
import { getGamesListHandler } from './handers/get-games-list.handler';
import { getRandomGameHandler } from './handers/get-random-game.handler';
import { insertGameHandler } from './handers/insert-game.handler';
import { updateGameHandler } from './handers/update-game.handler';
import { registerPlayHandler } from './handers/register-play.handler';
import { removeGameHandler } from './handers/remove-game.handler';
import { importBggCollectionCsv } from './handers/import-bgg-collectio-csv.handler';

export function registerIpcHandlers() {
  ipcMain.on('get-games-list', async (event) => {
    event.returnValue = await getGamesListHandler();
  });

  ipcMain.on('get-random-game', async (event) => {
    event.returnValue = await getRandomGameHandler();
  });

  ipcMain.handle('insert-game', async (_, data) => {
    try {
      const gameDetails = await insertGameHandler(data);
      return { success: true, gameDetails: gameDetails };
    } catch (error) {
      return { success: false, error: error };
    }
  });

  ipcMain.handle('update-game', async (_, data) => {
    try {
      const gameDetails = await updateGameHandler(data);
      return { success: true, gameDetails: gameDetails };
    } catch (error) {
      return { success: false, error: error };
    }
  });

  ipcMain.handle('register-play', async (_, data) => {
    try {
      const lastPlayingEntry = await registerPlayHandler(data);
      return { success: true, lastPlayingEntry: lastPlayingEntry };
    } catch (error) {
      return { success: false, error: error };
    }
  });

  ipcMain.handle('remove-game', async (_, data) => {
    return await removeGameHandler(data);
  });

  ipcMain.handle('import-bgg-collection-csv', async (_, data) => {
    return await importBggCollectionCsv(data);
  });
}
