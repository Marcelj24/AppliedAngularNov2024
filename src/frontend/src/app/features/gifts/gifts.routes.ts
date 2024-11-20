import { Routes } from '@angular/router';
import { GiftsComponent } from './gifts.component';
import { PeopleComponent } from './pages/people.component';
import { PeopleEntryComponent } from './pages/people-entry.component';
import { PeopleStore } from './services/people.store';
import { PeopleTableComponent } from './pages/people-table.component';
import { canMatchFeature } from '../../shared/feature-management/feature.guard';

export const GIFT_ROUTES: Routes = [
  {
    path: '',
    component: GiftsComponent,
    providers: [PeopleStore],
    children: [
      {
        path: 'people',
        canMatch: [canMatchFeature('people-table-trial')],
        component: PeopleTableComponent,
      },
      {
        path: 'people',
        component: PeopleComponent,
      },
      {
        path: 'people-entry',
        component: PeopleEntryComponent,
      },
    ],
  },
];
