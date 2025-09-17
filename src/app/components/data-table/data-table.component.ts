import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { GameDetails } from '../../services/api/api-return-types';

export type AppDataTableRow = GameDetails & {
  lastPlayed?: Date;
  actions?: never[];
};
export type AppDataTableRowAction = {
  type: 'PLAY' | 'EDIT';
  target: AppDataTableRow;
};
type AppDataTableColumn = keyof AppDataTableRow;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
})
export class AppDataTableComponent {
  @Input() dataSource: AppDataTableRow[] = [];
  @Output() actionClick = new EventEmitter<AppDataTableRowAction>();

  displayedColumns: AppDataTableColumn[] = [
    'thumbnailUrl',
    'title',
    'lastPlayed',
    'actions',
  ];

  actionClickHandler(
    type: AppDataTableRowAction['type'],
    target: AppDataTableRow,
  ) {
    this.actionClick.emit({
      type,
      target,
    });
  }
}
