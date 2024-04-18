import { Component } from '@angular/core';
import { CardComponent } from '../../../ui/card/card.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'esync-sync',
  standalone: true,
  imports: [CardComponent, MatSlideToggleModule],
  templateUrl: './sync.component.html',
  styleUrl: './sync.component.scss',
})
export class SyncComponent {
  toggleText = 'Sync Off';

  toggleChange() {
    this.toggleText = this.toggleText === 'Sync Off' ? 'Sync On' : 'Sync Off';
  }
}
