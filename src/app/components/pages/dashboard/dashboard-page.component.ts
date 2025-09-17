import { Component, OnInit } from '@angular/core';
import {
  AppDataTableComponent,
  AppDataTableRow,
  AppDataTableRowAction,
} from '../../data-table/data-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../services/api/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameDetailsDialog } from '../../dialogs/game-details-dialog/game-details-dialog.component';
import { GameDetails } from '../../../services/api/api-return-types';
import { AppSearchGameComponent } from '../../forms/search-game-component/search-game.component';
import { TextDialog } from '../../dialogs/text-dialog/text-dialog.component';

const gameDetailsDialogParams = {
  height: '316px',
  width: '600px',
};

@Component({
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  imports: [
    AppDataTableComponent,
    AppSearchGameComponent,
    TextDialog,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class DashboardPage implements OnInit {
  dataSource: AppDataTableRow[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.dataSource = this.apiService.getGamesList();
  }

  showRandomGame() {
    const randomGame = this.apiService.getRandomGame();
    this.openGameDetailsDialogInViewMode(randomGame);
  }

  dataTableActionClickHandler(action: AppDataTableRowAction) {
    switch (action.type) {
      case 'EDIT':
        this.openGameDetailsDialogInEditMode(action.target);
        break;

      case 'PLAY':
        this.registerPlay(action.target);
        break;

      default:
        break;
    }
  }

  openGameDetailsBlankForm() {
    const dialogRef = this.matDialog.open(GameDetailsDialog, {
      ...gameDetailsDialogParams,
      data: {
        mode: 'EDIT',
        gameDetails: {},
        actions: [
          {
            icon: 'checkmark',
            label: 'Save',
            callback: async () => {
              const result = await this.apiService.insertGame(
                dialogRef.componentInstance.form.getValue(),
              );

              if (result.success) {
                this.dataSource.push(result.gameDetails);
                dialogRef.close();
                this.refreshDataSource();
              } else {
                alert(result.error);
              }
            },
          },
        ],
      },
    });
  }

  gameSelectedBySearchHandler(gameDetails: GameDetails) {
    this.openGameDetailsDialogInViewMode(gameDetails, true);
  }

  private openGameDetailsDialogInViewMode(
    gameDetails: GameDetails,
    enableEditAction: boolean = false,
  ) {
    const actions = [
      {
        icon: 'casino',
        label: 'Reroll',
        callback: () => {
          dialogRef.close();
          this.showRandomGame();
        },
      },
      {
        icon: 'play_arrow',
        label: 'Play',
        callback: async () => {
          await this.registerPlay(gameDetails);
          dialogRef.close();
        },
      },
    ];

    if (enableEditAction) {
      actions.push({
        icon: 'edit',
        label: 'Edit',
        callback: () => {
          this.matDialog.closeAll();
          this.openGameDetailsDialogInEditMode(gameDetails);
        },
      });
    }

    const dialogRef = this.matDialog.open(GameDetailsDialog, {
      ...gameDetailsDialogParams,
      data: {
        mode: 'VIEW',
        gameDetails,
        actions,
      },
    });
  }

  bggCollectionFileSelectedHandler(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.apiService
          .importBggCollectionFromCsv(reader.result as ArrayBuffer)
          .then((counter) => {
            this.matDialog.open(TextDialog, {
              data: {
                title: 'Collection importing',
                content: `Imported games: ${counter}`,
              },
            });
            this.dataSource = this.apiService.getGamesList();
          });
      };
      reader.readAsArrayBuffer(file);
    }
  }

  private openGameDetailsDialogInEditMode(gameDetails: GameDetails) {
    const dialogRef = this.matDialog.open(GameDetailsDialog, {
      ...gameDetailsDialogParams,
      data: {
        mode: 'EDIT',
        gameDetails,
        actions: [
          {
            icon: 'delete_forever',
            label: 'Remove',
            callback: () => {
              this.removeGameHandler(gameDetails);
            },
          },
          {
            icon: 'checkmark',
            label: 'Save',
            callback: async () => {
              const gameDetails = dialogRef.componentInstance.form.getValue();
              const result = await this.apiService.updateGame(gameDetails);

              if (result.success) {
                let dataSourceItemIndex = this.dataSource.findIndex(
                  ({ id }) => id === result.gameDetails.id,
                );
                Object.assign(
                  this.dataSource[dataSourceItemIndex],
                  result.gameDetails,
                );
                dialogRef.close();
              } else {
                alert(result.error);
              }
            },
          },
        ],
      },
    });
  }

  private async registerPlay(gameDetails: GameDetails) {
    const result = await this.apiService.registerPlay(gameDetails.id);
    if (result.success) {
      alert(result.lastPlayingEntry.playedAt);
      const dataSourceItem = this.dataSource.find(
        ({ id }) => id === result.lastPlayingEntry.gameDetailsId,
      );
      dataSourceItem!.lastPlayed = result.lastPlayingEntry.playedAt;
    } else {
      alert(result.error);
    }
  }

  private removeGameHandler(gameDetails: GameDetails) {
    this.matDialog.open(TextDialog, {
      data: {
        title: 'Remove game',
        content: `Do you want to remove "${gameDetails.title}" from collection?`,
        actions: [
          {
            icon: 'delete_forever',
            label: 'REMOVE',
            callback: async () => {
              await this.apiService.removeGame(gameDetails);
              this.dataSource.splice(
                this.dataSource.findIndex(({ id }) => id === gameDetails.id),
                1,
              );
              this.matDialog.closeAll();
              this.refreshDataSource();
            },
          },
        ],
      },
    });
  }

  private refreshDataSource() {
    this.dataSource = [...this.dataSource].sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }
}
