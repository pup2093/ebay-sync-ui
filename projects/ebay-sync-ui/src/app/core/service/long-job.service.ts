import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LongJob } from '../model/long-job';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LongJobService {
  private baseUrl = 'http://localhost:8080/api/v1/'; //add to environment later since this will change in prod

  constructor(private http: HttpClient) {}

  getInProgressJob(): Observable<LongJob> {
    const url = this.baseUrl + 'long-job/in-progress';
    return this.http.get<LongJob>(url);
  }
}
