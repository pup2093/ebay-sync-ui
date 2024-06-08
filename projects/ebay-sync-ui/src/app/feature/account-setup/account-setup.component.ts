import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'esync-account-setup',
  standalone: true,
  imports: [MatStepperModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './account-setup.component.html',
  styleUrl: './account-setup.component.scss',
})
export class AccountSetupComponent {}
