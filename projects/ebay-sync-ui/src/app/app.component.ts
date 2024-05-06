import { Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'esync-root',
  standalone: true,
  imports: [MainLayoutComponent, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ebay-sync-ui';
  product: unknown = undefined;

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService,
  ) {}

  //sample api call with bearer token
  // getProduct() {
  //   this.http.get<unknown>('http://localhost:8080/api/v1/product/1', {
  //     headers: {
  //       'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
  //     }
  //   }).subscribe((val) => this.product = val );
  // }
}
