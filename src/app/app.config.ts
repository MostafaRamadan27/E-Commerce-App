import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'disabled', anchorScrolling: 'disabled' }),
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([headersInterceptor, errorInterceptor, loadingInterceptor]),
    ),
    provideAnimations(),
    provideNgxSkeletonLoader({
      theme: {
        extendsFromRoot: true,
        height: '30px',
      },
    }),
    importProvidersFrom(CookieService, NgxSpinnerModule),
    provideToastr(),
  ],
};
