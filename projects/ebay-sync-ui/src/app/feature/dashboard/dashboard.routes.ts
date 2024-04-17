import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export default <Routes>[
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        component: DashboardComponent,
        providers: [],
      },
    ],
  },
];
