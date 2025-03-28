import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'spotify',
    loadComponent: () => import('./pages/spotify/spotify.component').then(m => m.SpotifyComponent)
  },
  {
    path: 'aboutMe',
    loadComponent: () => import('./pages/aboutMe/about.component').then(m => m.AboutMeComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
