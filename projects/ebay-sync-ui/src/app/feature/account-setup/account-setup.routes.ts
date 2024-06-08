import { Routes } from '@angular/router';
import { AccountSetupComponent } from './account-setup.component';

export default <Routes>[
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        component: AccountSetupComponent,
        providers: [],
      },
    ],
  },
];
