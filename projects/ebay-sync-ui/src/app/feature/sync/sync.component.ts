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
import { Observable, catchError, tap } from 'rxjs';
import { SyncSettings } from '../../core/model';
import { SyncService } from '../../core/service/sync.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';

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
    MatProgressSpinnerModule,
    AsyncPipe,
    NgTemplateOutlet,
  ],
  templateUrl: './sync.component.html',
  styleUrl: './sync.component.scss',
})
export class SyncComponent implements OnInit {
  settingsForm!: FormGroup;
  syncSettings$!: Observable<SyncSettings>;
  syncSettings!: SyncSettings;
  hasError = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private syncService: SyncService,
  ) {}

  ngOnInit(): void {
    this.syncSettings$ = this.syncService.getSyncSettings().pipe(
      tap((settings) => {
        this.syncSettings = settings;
        this.buildForm(settings);
      }),
      catchError((e) => {
        this.hasError = true;
        throw e;
      }),
    );
  }

  buildForm(syncSettings: SyncSettings): void {
    this.settingsForm = this.fb.group({
      sync: new FormControl(syncSettings.sync),
      applyMarkup: new FormControl(syncSettings.applyMarkup),
      markupPercent: new FormControl(syncSettings.markupPercent),
      applyMarkdown: new FormControl(syncSettings.applyMarkdown),
      markdownPercent: new FormControl(syncSettings.markdownPercent),
    });
    this.settingsForm.disable();
  }

  save(): void {
    this.loading = true;
    this.settingsForm.disable();
    this.syncService
      .updateSyncSettings(this.settingsForm.value)
      .pipe(
        tap(() => {
          this.loading = false;
        }),
        catchError((e) => {
          this.hasError = true;
          throw e;
        }),
      )
      .subscribe();
  }

  cancel(): void {
    this.settingsForm.disable();
    this.buildForm(this.syncSettings);
  }

  // ngOnDestroy(): void {

  // }
}
