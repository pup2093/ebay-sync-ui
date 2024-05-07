import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CheckboxControlComponent } from '../../ui/checkbox-control/checkbox-control.component';
import { SlideToggleControlComponent } from '../../ui/slide-toggle-control/slide-toggle-control.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'esync-sync',
  standalone: true,
  imports: [
    CardComponent,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxControlComponent,
    SlideToggleControlComponent,
  ],
  templateUrl: './sync.component.html',
  styleUrl: './sync.component.scss',
})
export class SyncComponent implements OnInit {
  readonly SYNC_ON = 'Sync on';
  readonly SYNC_OFF = 'Sync off';
  toggleText = this.SYNC_ON;
  settingsForm!: FormGroup;
  syncSub!: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      sync: new FormControl(),
      hasMarkup: new FormControl(),
      markupPercent: new FormControl(), //add validator required
      hasMarkdown: new FormControl(),
      markdownPercent: new FormControl(),
    });
    this.settingsForm.disable();
    this.syncSub = this.settingsForm.controls['sync'].valueChanges.subscribe(
      () => {
        this.toggleText =
          this.toggleText === this.SYNC_OFF ? this.SYNC_ON : this.SYNC_OFF;
      },
    );
  }

  saveSettings(): void {
    this.settingsForm.disable();
    console.log(this.settingsForm.value);
  }
}
