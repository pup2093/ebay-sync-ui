import { Component } from '@angular/core';
import { CardComponent } from '../../../ui/card/card.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'esync-activity-log',
  standalone: true,
  imports: [CardComponent, MatTableModule],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.scss',
})
export class ActivityLogComponent {
  dataSource = [
    {
      direction: 'ebay \u{2192} shopify',
      change: 'Imported 12 products',
      date: new Date().toDateString(),
    },
    {
      direction: 'ebay \u{2192} shopify',
      change: 'Imported 12 products',
      date: new Date().toDateString(),
    },
    {
      direction: 'ebay \u{2192} shopify',
      change: 'Imported 12 products',
      date: new Date().toDateString(),
    },
    {
      direction: 'ebay \u{2192} shopify',
      change: 'Imported 12 products',
      date: new Date().toDateString(),
    },
    {
      direction: 'ebay \u{2192} shopify',
      change: 'Imported 12 products',
      date: new Date().toDateString(),
    },
  ];
  displayedColumns: string[] = ['direction', 'change', 'date'];
}
