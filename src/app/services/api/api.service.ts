import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import {
  GameDetails,
  GameDetailsInsertOrUpdateResult,
  RegisterPlayResult,
} from './api-return-types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly electronService: ElectronService) {}

  getGamesList(): GameDetails[] {
    return this.electronService.ipcRenderer.sendSync('get-games-list');
  }

  getRandomGame(): GameDetails {
    return this.electronService.ipcRenderer.sendSync('get-random-game');
  }

  insertGame(
    gameDetails: GameDetails,
  ): Promise<GameDetailsInsertOrUpdateResult> {
    return this.electronService.ipcRenderer.invoke('insert-game', gameDetails);
  }

  updateGame(
    gameDetails: GameDetails,
  ): Promise<GameDetailsInsertOrUpdateResult> {
    return this.electronService.ipcRenderer.invoke('update-game', gameDetails);
  }

  removeGame(gameDetails: GameDetails) {
    return this.electronService.ipcRenderer.invoke('remove-game', gameDetails);
  }

  registerPlay(gameDetailsId: number): Promise<RegisterPlayResult> {
    return this.electronService.ipcRenderer.invoke('register-play', {
      gameDetailsId: gameDetailsId,
    });
  }

  importBggCollectionFromCsv(file: ArrayBuffer): Promise<any> {
    return this.electronService.ipcRenderer.invoke(
      'import-bgg-collection-csv',
      file,
    );
  }
}
