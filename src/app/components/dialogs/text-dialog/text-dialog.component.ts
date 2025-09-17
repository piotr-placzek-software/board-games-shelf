import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export type TextDialogData = {
  title: string;
  content: string;
  actions?: Array<{
    icon: string;
    label: string;
    callback: () => void;
  }>;
};

@Component({
  templateUrl: './text-dialog.component.html',
  styleUrl: './text-dialog.component.scss',
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
})
export class TextDialog {
  constructor(
    public readonly dialogRef: MatDialogRef<TextDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TextDialogData,
  ) {}

  close() {
    this.dialogRef.close();
  }
}
