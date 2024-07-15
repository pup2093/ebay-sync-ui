import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { tap } from 'rxjs';
import { CardComponent } from '../../ui/card/card.component';
import { CheckboxControlComponent } from '../../ui/checkbox-control/checkbox-control.component';

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
  ],
  templateUrl: './account-setup.component.html',
  styleUrl: './account-setup.component.scss',
})
export class AccountSetupComponent implements OnInit, AfterViewInit {
  isEbayAccountLinkStepComplete = true;
  isSyncSettingsStepComplete = false;
  isImportStepComplete = false;
  ebayAuthUrl = '';
  syncSettingsForm!: FormGroup;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private fb: FormBuilder,
    private ebayService: EbayService,
  ) {}

  ngOnInit(): void {
    this.ebayService
      .getAuthUrl()
      .pipe(
        tap((res) => {
          console.log(res);
          this.ebayAuthUrl = res;
        }),
      )
      .subscribe();
    if (localStorage.getItem('ebay_code')) {
      const code = localStorage.getItem('ebay_code');
      this.ebayService.updateTokens(code as string).subscribe(() => {
        localStorage.removeItem('ebay_code');
      });
    }
    this.initializeSyncSettingsForm();
  }

  ngAfterViewInit(): void {
    this.isEbayAccountLinkStepComplete = false;
    //this.stepper.selectedIndex = 1;
  }

  initializeSyncSettingsForm(): void {
    this.syncSettingsForm = this.fb.group({
      applyMarkup: new FormControl(false),
      markupPercent: new FormControl(0),
      applyMarkdown: new FormControl(false),
      markdownPercent: new FormControl(0),
    });
  }
}
