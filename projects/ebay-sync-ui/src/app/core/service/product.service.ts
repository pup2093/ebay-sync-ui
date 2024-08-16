import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.serverBaseUrl;

  constructor(private http: HttpClient) {}

  triggerImport(): Observable<void> {
    const url = this.baseUrl + 'product/bulk-import';
    return this.http.get<void>(url);
  }

  getProducts(): Observable<Product[]> {
    const url = this.baseUrl + 'product';
    return this.http.get<Product[]>(url);
  }
}
