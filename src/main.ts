import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from '@angular/cdk/dialog';

import { environment } from './environments/environment';
import { RouterModule } from '@angular/router';
import { rootRoutes } from './app/rootRoute';

if (environment.production) {
  enableProdMode();
}

const modules = importProvidersFrom([
  HttpClientModule,
  RouterModule.forRoot(rootRoutes, {
    initialNavigation: 'enabledNonBlocking',
    paramsInheritanceStrategy: 'always',
    scrollPositionRestoration: 'top',
  }),
  BrowserAnimationsModule.withConfig({ disableAnimations: false }),
  DialogModule,
]);

bootstrapApplication(AppComponent, { providers: [modules] }).catch((err) =>
  console.error(err)
);
