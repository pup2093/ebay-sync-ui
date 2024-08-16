import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LongJob } from '../model/long-job';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LongJobService {
  private baseUrl = environment.serverBaseUrl;

  constructor(private http: HttpClient) {}

  getInProgressJob(): Observable<LongJob> {
    const url = this.baseUrl + 'long-job/in-progress';
    return this.http.get<LongJob>(url);
  }
}
