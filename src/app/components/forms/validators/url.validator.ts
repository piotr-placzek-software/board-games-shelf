import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function FormControlCustomValidator_URL(
  control: AbstractControl,
): ValidationErrors | null {
  if (!control.value) return null;

  try {
    new URL(control.value);
    return null;
  } catch {
    return { invalidUrl: true };
  }
}
