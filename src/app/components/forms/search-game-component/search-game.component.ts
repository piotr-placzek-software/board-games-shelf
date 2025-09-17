import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { AppDataTableRow } from '../../data-table/data-table.component';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrl: './search-game.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AppSearchGameComponent implements OnInit {
  @Input() dataSource!: AppDataTableRow[];
  filteredData!: Observable<AppDataTableRow[]>;
  inputControl = new FormControl('');

  @Output() selected = new EventEmitter<AppDataTableRow>();

  ngOnInit(): void {
    this.filteredData = this.inputControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || '')),
    );
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.selected.emit(
      this.dataSource.find((data) => data.title === event.option.value),
    );
  }

  private filter(value: string) {
    const filterValue = this.normalizeValue(value);
    return this.dataSource.filter((data) =>
      this.normalizeValue(data.title).includes(filterValue),
    );
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
