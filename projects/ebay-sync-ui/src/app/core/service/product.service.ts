import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/v1/'; //add to environment later since this will change in prod

  constructor(private http: HttpClient) {}

  triggerImport(): Observable<void> {
    const url = this.baseUrl + 'product/bulk-import';
    return this.http.get<void>(url);
  }
}
