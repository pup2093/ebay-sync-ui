import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SetupLayoutComponent } from './layout/setup-layout/setup-layout.component';
import { setupLayoutGuard } from './layout/setup-layout/setup-layout.guard';
import { mainLayoutGuard } from './layout/main-layout/main-layout.guard';

export const routes: Routes = [
  {
    path: '',
    component: SetupLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/account-setup',
        pathMatch: 'full',
      },
      {
        path: 'account-setup',
        canMatch: [setupLayoutGuard()],
        loadChildren: () =>
          import('./feature/account-setup/account-setup.routes'),
      },
    ],
  },
  {
    path: 'app',
    canMatch: [mainLayoutGuard()],
    component: MainLayoutComponent,
    children: [
      {
        path: 'sync',
        loadChildren: () => import('./feature/sync/sync.routes'),
      },
      {
        path: 'product-list',
        loadChildren: () =>
          import('./feature/product-list/product-list.routes'),
      },
      {
        path: 'event-log',
        loadChildren: () =>
          import('./feature/activity-log/activity-log.routes'),
      },
    ],
  },
  { path: '**', redirectTo: '/account-setup', pathMatch: 'full' },
];
