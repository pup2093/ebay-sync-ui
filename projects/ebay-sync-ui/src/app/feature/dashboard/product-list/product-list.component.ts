import { Component } from '@angular/core';
import { CardComponent } from '../../../ui/card/card.component';

@Component({
  selector: 'esync-product-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {}
