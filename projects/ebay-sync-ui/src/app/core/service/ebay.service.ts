import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EbayService {
  baseUrl = environment.serverBaseUrl;

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
