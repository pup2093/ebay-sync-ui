import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../../core/model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private baseUrl = environment.serverBaseUrl;

  constructor(private http: HttpClient) {}

  getActivityLog(): Observable<Activity[]> {
    const url = this.baseUrl + 'activity';
    return this.http.get<Activity[]>(url);
  }
}
