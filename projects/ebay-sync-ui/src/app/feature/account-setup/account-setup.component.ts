import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EbayService } from '../../core/service/ebay.service';
import {
  EMPTY,
  Observable,
  Subscription,
  catchError,
  concatMap,
  delay,
  interval,
  of,
  takeWhile,
  tap,
} from 'rxjs';
import { CardComponent } from '../../ui/card/card.component';
import { CheckboxControlComponent } from '../../ui/checkbox-control/checkbox-control.component';
import { UserInfoService } from '../../core/service/user-info.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { SyncService } from '../../core/service/sync.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../core/service/product.service';
import { LongJobService } from '../../core/service/long-job.service';
import { LongJobStatus } from '../../core/model/long-job-status';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LongJob } from '../../core/model/long-job';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'esync-account-setup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CardComponent,
    CheckboxControlComponent,
    MatProgressSpinner,
    NgTemplateOutlet,
    MatIcon,
    MatProgressBarModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './account-setup.component.html',
  styleUrl: './account-setup.component.scss',
})
export class AccountSetupComponent implements OnInit, OnDestroy {
  isEbayAccountLinkStepComplete = false;
  isSyncSettingsStepComplete = false;
  isImportStepComplete = false;
  ebayAuthUrl = '';
  syncSettingsForm!: FormGroup;
  @ViewChild('stepper') stepper!: MatStepper;
  stepperSelectedIndex = 0;
  loading = false;
  syncSettingsLoading = false;
  hasError = false;
  pollingSubscription: Subscription | undefined;
  importProgressPercent = 0;
  importInProgress = false;
  importComplete = false;

  constructor(
    private fb: FormBuilder,
    private ebayService: EbayService,
    private userInfoService: UserInfoService,
    private syncService: SyncService,
    private productService: ProductService,
    private longJobService: LongJobService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.initializeSyncSettingsForm();
    this.userInfoService
      .getUserInfo()
      .pipe(
        concatMap((userInfo) => {
          if (userInfo.ebayAccountLinked) {
            this.isEbayAccountLinkStepComplete = true;
            this.stepperSelectedIndex = 1;
            return this.syncService.getSyncSettings().pipe(
              concatMap((syncSettings) => {
                if (syncSettings) {
                  this.isSyncSettingsStepComplete = true;
                  this.stepperSelectedIndex = 2;
                  return this.longJobService.getInProgressJob().pipe(
                    tap((longJob) => {
                      if (longJob.status === LongJobStatus.IN_PROGRESS) {
                        this.importInProgress = true;
                        this.importComplete = false;
                        this.pollImportProgress();
                      }
                      this.loading = false;
                    }),
                    catchError((e) => {
                      if (e instanceof HttpErrorResponse && e.status === 404) {
                        console.log('long job not created yet');
                        this.loading = false;
                        return EMPTY;
                      }
                      throw e;
                    }),
                  );
                } else {
                  this.loading = false;
                  return EMPTY;
                }
              }),
              catchError((e) => {
                if (e instanceof HttpErrorResponse && e.status === 404) {
                  this.loading = false;
                  return EMPTY;
                }
                this.loading = false;
                this.hasError = true;
                return EMPTY;
              }),
            );
          } else {
            return this.handleEbayAccount();
          }
        }),
      )
      .subscribe();
  }

  handleEbayAccount(): Observable<never> {
    return this.ebayService.getAuthUrl().pipe(
      tap((url) => {
        this.ebayAuthUrl = url;
      }),
      concatMap(() => {
        if (localStorage.getItem('ebay_code')) {
          const code = localStorage.getItem('ebay_code');
          return this.ebayService.updateTokens(code as string).pipe(
            tap(() => {
              localStorage.removeItem('ebay_code');
              this.isEbayAccountLinkStepComplete = true;
              this.stepperSelectedIndex = 1;
              this.loading = false;
            }),
            concatMap(() => EMPTY),
            catchError(() => {
              this.hasError = true;
              this.loading = false;
              return EMPTY;
            }),
          );
        }
        this.loading = false;
        return EMPTY;
      }),
    );
  }

  initializeSyncSettingsForm(): void {
    this.syncSettingsForm = this.fb.group({
      sync: new FormControl(true),
      applyMarkup: new FormControl(false),
      markupPercent: new FormControl(0),
      applyMarkdown: new FormControl(false),
      markdownPercent: new FormControl(0),
    });
  }

  saveSyncSettings() {
    this.syncSettingsLoading = true;
    this.syncService
      .createSyncSettings(this.syncSettingsForm.value)
      .pipe(
        delay(1000),
        tap(() => {
          this.isSyncSettingsStepComplete = true;
          this.stepper.selected!.completed = true;
          this.stepper.next();
          this.syncSettingsLoading = false;
        }),
        catchError(() => {
          this.syncSettingsLoading = false;
          this.hasError = true;
          return EMPTY;
        }),
      )
      .subscribe();
  }

  doImport() {
    this.productService
      .triggerImport()
      .pipe(catchError(() => EMPTY))
      .subscribe(() => {
        // this.importInProgress = true;
        // this.pollImportProgress();
      });

    this.importInProgress = true; //put this back inside subscribe and catch error properly
    this.pollImportProgress();
  }

  pollImportProgress() {
    this.pollingSubscription = interval(5000)
      .pipe(
        concatMap(() =>
          this.longJobService.getInProgressJob().pipe(
            catchError((e) => {
              if (e instanceof HttpErrorResponse && e.status === 404) {
                console.log('long job not created yet');
                return of({} as LongJob);
              }
              throw e;
            }),
          ),
        ),
        concatMap((longJob) => {
          //can probably use map instead of concatmap here
          this.importProgressPercent = longJob.progress;
          if (longJob.status === LongJobStatus.COMPLETED) {
            this.importComplete = true;
            this.importInProgress = false;
            console.log('complete');
          } else if (longJob.status === LongJobStatus.FAILED) {
            this.importComplete = true;
            this.importInProgress = false;
            console.log('failed');
          } else {
            console.log('in progress');
          }
          return of(longJob);
        }),
        takeWhile(
          () => this.importComplete !== true && this.importInProgress !== false,
        ),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
