import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'agrocampo', pathMatch: 'full' },
  {
    path: 'agrocampo',
    loadComponent: () => import('./components/agrocampo/agrocampo').then((module) => module.Agrocampo),
  },
  {
    path: 'home',
    loadComponent: () => import('./components/agrocampo/agrocampo').then((module) => module.Agrocampo),
  },
  { path: '**', redirectTo: 'agrocampo' },
];
