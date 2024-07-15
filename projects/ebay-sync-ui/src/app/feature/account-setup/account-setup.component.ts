import { Component, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EbayService } from '../../core/service/ebay.service';
import { tap } from 'rxjs';

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
  ],
  templateUrl: './account-setup.component.html',
  styleUrl: './account-setup.component.scss',
})
export class AccountSetupComponent implements OnInit {
  ebayAuthUrl = '';

  constructor(
    private fb: FormBuilder,
    private ebayService: EbayService,
  ) {}

  ngOnInit(): void {
    console.log('ebay auth url');
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
  }

  testApiCall() {
    this.ebayService.testApiCall().subscribe();
  }
}
