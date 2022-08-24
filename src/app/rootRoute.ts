import { Route, Routes } from '@angular/router';

export const rootRoutes: Routes = [
  {
    path: '',
    title: $localize`Lucius`,
    loadChildren: () => import('./pages/main-lucius').then((m) => m.routes),
  },
];
