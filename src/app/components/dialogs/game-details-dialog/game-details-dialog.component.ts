import { Component, Inject, ViewChild } from '@angular/core';
import { GameDetails } from '../../../services/api/api-return-types';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { GameDetailsForm } from '../../forms/game-details-form/game-details-form.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export type GameDetailsDialogData = {
  mode: 'VIEW' | 'ADD' | 'EDIT';
  gameDetails: GameDetails;
  actions?: Array<{
    icon: string;
    label: string;
    callback: () => void;
  }>;
};

@Component({
  templateUrl: './game-details-dialog.component.html',
  styleUrl: './game-details-dialog.component.scss',
  imports: [
    CommonModule,
    GameDetailsForm,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
  ],
})
export class GameDetailsDialog {
  @ViewChild(GameDetailsForm) form!: GameDetailsForm;

  constructor(
    public readonly dialogRef: MatDialogRef<GameDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: GameDetailsDialogData,
  ) {}

  close() {
    this.dialogRef.close();
  }
}
