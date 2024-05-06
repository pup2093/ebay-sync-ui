import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sync',
  },
  {
    path: 'sync',
    loadChildren: () => import('./feature/sync/sync.routes'),
  },
  {
    path: 'product-list',
    loadChildren: () => import('./feature/product-list/product-list.routes'),
  },
  {
    path: 'event-log',
    loadChildren: () => import('./feature/activity-log/activity-log.routes'),
  },
];
