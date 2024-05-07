import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'esync-slide-toggle-control',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './slide-toggle-control.component.html',
  styleUrl: './slide-toggle-control.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SlideToggleControlComponent,
      multi: true,
    },
  ],
})
export class SlideToggleControlComponent implements ControlValueAccessor {
  checked = false;
  disabled = false;
  onChange!: (value: boolean) => void;
  onTouched!: () => void;

  writeValue(obj: boolean): void {
    this.checked = obj;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setValue(): void {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
  }
}
