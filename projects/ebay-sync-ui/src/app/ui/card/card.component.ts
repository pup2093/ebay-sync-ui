import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'esync-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() cardTitle?: string;
  @Input() cardIcon?: string;
  @Input() cardSubtitle?: string;
}
