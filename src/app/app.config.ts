import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { getAgroCampoRuntimeConfig } from './runtime-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    providePrimeNG({
      unstyled: true,
      ripple: false,
      license: 'eyJpZCI6IjNjMWVhZjZhLTNkYjctNDFjNS04MjBlLWFiNzcyZmY0NzA4OCIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTE5NTMxNDIsImV4cCI6MTgyMzQ4OTE0Mn0.T-4xDoCmS6i0EdykIfMzCzwpN-VsCkXKcrOQ5nhEzVR-7Zr0J9QOLMOV5_ETEpSQ6haxUPgJjgrfGDuQzmOWBw',
    }),
  ]
};
