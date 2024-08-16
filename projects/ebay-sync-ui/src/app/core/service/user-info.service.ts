import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private baseUrl = environment.serverBaseUrl;

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<UserInfo> {
    const url = this.baseUrl + 'userinfo';
    return this.http.get<UserInfo>(url);
  }
}
