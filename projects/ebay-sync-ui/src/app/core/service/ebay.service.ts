import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EbayService {
  baseUrl = 'http://localhost:8080/api/v1/'; //add to environment later since this will change in prod

  constructor(private http: HttpClient) {}

  getAuthUrl(): Observable<string> {
    const url = this.baseUrl + 'ebay/getUserAuthorizationUrl';
    return this.http.get(url, { responseType: 'text' });
  }

  updateTokens(code: string): Observable<object> {
    const url = this.baseUrl + 'ebay/exchangeCodeForAccessToken';
    return this.http.post(url, code);
  }

  testApiCall(): Observable<object> {
    const url = this.baseUrl + 'ebay/test';
    return this.http.get(url);
  }
}
