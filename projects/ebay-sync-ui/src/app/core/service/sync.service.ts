import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SyncSettings } from '../model';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  private baseUrl = 'http://localhost:8080/api/v1/'; //add to environment later since this will change in prod

  constructor(private http: HttpClient) {}

  getSyncSettings(): Observable<SyncSettings> {
    const url = this.baseUrl + 'syncsettings';
    return this.http.get<SyncSettings>(url);
  }

  createSyncSettings(syncSettings: SyncSettings): Observable<number> {
    const url = this.baseUrl + 'syncsettings';
    return this.http.post<number>(url, syncSettings);
  }

  updateSyncSettings(syncSettings: SyncSettings): Observable<number> {
    const url = this.baseUrl + 'syncsettings';
    return this.http.put<number>(url, syncSettings);
  }
}
