import { Component } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'esync-sync',
  standalone: true,
  imports: [
    CardComponent,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sync.component.html',
  styleUrl: './sync.component.scss',
})
export class SyncComponent {
  readonly SYNC_ON = 'Sync on';
  readonly SYNC_OFF = 'Sync off';
  toggleText = this.SYNC_ON;
  readOnly = true;

  toggleChange() {
    this.toggleText =
      this.toggleText === this.SYNC_OFF ? this.SYNC_ON : this.SYNC_OFF;
  }
}
