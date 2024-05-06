import {
  Routes,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { APP_INITIALIZER } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { initializeOauth } from './auth/auth.config';

export interface CoreOptions {
  routes: Routes;
}

export function provideCore({ routes }: CoreOptions) {
  return [
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideHttpClient(),
    // other 3rd party libraries providers like NgRx, provideStore()
    provideOAuthClient(),
    // other application specific providers and setup

    // perform initialization, has to be last
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [OAuthService],
      useFactory: (oauthService: OAuthService) => {
        return () => {
          // must return promise here to make blocking. reject() will prevent app loading,
          // so should reject when no valid token is found
          return initializeOauth(oauthService);
        };
      },
    },
  ];
}
