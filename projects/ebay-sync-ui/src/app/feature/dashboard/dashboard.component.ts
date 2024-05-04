import { Component } from '@angular/core';
import { SyncComponent } from './sync/sync.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'esync-dashboard',
  standalone: true,
  imports: [SyncComponent, ActivityLogComponent, ProductListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
