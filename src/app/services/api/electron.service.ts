import { Injectable } from '@angular/core';

export interface ElectronAPI {
  send(channel: string, data?: any): void;
  sendSync(channel: string, data?: any): any;
  invoke(channel: string, data?: any): Promise<any>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  readonly ipcRenderer = window.electronAPI;
}
