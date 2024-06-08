import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../model';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  baseUrl = 'http://localhost:8080/api/v1/'; //add to environment later since this will change in prod

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<UserInfo> {
    const url = this.baseUrl + 'userinfo';
    return this.http.get<UserInfo>(url);
  }
}
