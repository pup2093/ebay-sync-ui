import { Component } from '@angular/core';
import { SyncComponent } from './sync/sync.component';

@Component({
  selector: 'esync-dashboard',
  standalone: true,
  imports: [SyncComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
