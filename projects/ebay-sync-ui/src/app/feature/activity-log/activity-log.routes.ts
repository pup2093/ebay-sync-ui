import { Routes } from '@angular/router';
import { ActivityLogComponent } from './activity-log.component';

export default <Routes>[
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        component: ActivityLogComponent,
        providers: [],
      },
    ],
  },
];
