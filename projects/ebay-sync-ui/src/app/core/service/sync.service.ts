import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SyncSettings } from '../model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  private baseUrl = environment.serverBaseUrl;

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
