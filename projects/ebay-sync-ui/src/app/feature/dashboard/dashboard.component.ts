import { Component } from '@angular/core';
import { SyncComponent } from './sync/sync.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';

@Component({
  selector: 'esync-dashboard',
  standalone: true,
  imports: [SyncComponent, ActivityLogComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
