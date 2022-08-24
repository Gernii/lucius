import { Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { PageGuard } from './page.guard';

export const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    canActivate: [PageGuard],
  },
];
