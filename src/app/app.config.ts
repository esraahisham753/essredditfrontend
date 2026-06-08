import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage';
import { provideToastr, ToastNoAnimation } from 'ngx-toastr';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideNoopAnimations(),
    provideToastr({
      toastComponent: ToastNoAnimation,
    }),
    provideNgxWebstorage(
      withLocalStorage(),
      withSessionStorage()
    )
  ]
};
