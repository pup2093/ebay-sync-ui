import { Component, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import { Observable, catchError, of, tap } from 'rxjs';
import { Product } from '../../core/model';
import {
  AsyncPipe,
  CurrencyPipe,
  JsonPipe,
  NgTemplateOutlet,
} from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../core/service/product.service';

@Component({
  selector: 'esync-product-list',
  standalone: true,
  imports: [
    CardComponent,
    AsyncPipe,
    MatProgressSpinner,
    JsonPipe,
    NgTemplateOutlet,
    MatTableModule,
    MatPaginatorModule,
    CurrencyPipe,
    MatIconModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productList$!: Observable<Product[]>;
  hasError = false;
  displayedColumns: string[] = [
    'title',
    'shopifyQuantity',
    'ebayQuantity',
    'shopifyPrice',
    'ebayPrice',
    'synced',
  ];
  dataSource!: MatTableDataSource<Product>;
  private _paginator!: MatPaginator;
  @ViewChild(MatPaginator) set paginator(mp: MatPaginator) {
    if (mp) {
      this._paginator = mp;
      this.dataSource.paginator = this._paginator;
    }
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productList$ = this.productService.getProducts().pipe(
      tap((products) => {
        this.dataSource = new MatTableDataSource<Product>(products);
      }),
      catchError(() => {
        this.hasError = true;
        return of([]);
      }),
    );
  }
}
