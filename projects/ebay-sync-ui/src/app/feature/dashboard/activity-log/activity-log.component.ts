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
      direction: 'Ebay \u{2192} Shopify',
      change: 'Imported 12 products',
      date: new Date().toLocaleDateString(),
    },
    {
      direction: 'Ebay \u{2192} Shopify',
      change: 'Imported 12 products',
      date: new Date().toLocaleDateString(),
    },
    {
      direction: 'Ebay \u{2192} Shopify',
      change: 'Imported 12 products',
      date: new Date().toLocaleDateString(),
    },
    {
      direction: 'Ebay \u{2192} Shopify',
      change: 'Imported 12 products',
      date: new Date().toLocaleDateString(),
    },
    {
      direction: 'Ebay \u{2192} Shopify',
      change: 'Imported 12 products',
      date: new Date().toLocaleDateString(),
    },
  ];
  displayedColumns: string[] = ['direction', 'change', 'date'];
}
