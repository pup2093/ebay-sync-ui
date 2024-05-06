import { Routes } from '@angular/router';
import { SyncComponent } from './sync.component';

export default <Routes>[
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        component: SyncComponent,
        providers: [],
      },
    ],
  },
];
