import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlCustomValidator_URL } from '../validators/url.validator';
import { GameDetails } from '../../../services/api/api-return-types';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-details-form',
  templateUrl: './game-details-form.component.html',
  styleUrl: './game-details-form.component.scss',
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class GameDetailsForm implements OnInit {
  @Input() initialData?: Partial<GameDetails>;

  gameDetailsForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.gameDetailsForm = new FormGroup({
      title: new FormControl<string>(this.initialData?.title || '', {
        validators: [Validators.required],
      }),
      thumbnailUrl: new FormControl<string>(
        this.initialData?.thumbnailUrl || '',
        [FormControlCustomValidator_URL],
      ),
    });
  }

  getValue(): GameDetails {
    return {
      ...this.initialData,
      ...this.gameDetailsForm.value,
    };
  }
}
