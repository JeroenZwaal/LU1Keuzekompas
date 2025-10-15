import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'auth/login', 
    loadComponent: () => import('./components/auth/login/login.component').then(c => c.LoginComponent)
  },
  { 
    path: 'auth/register', 
    loadComponent: () => import('./components/auth/register/register.component').then(c => c.RegisterComponent)
  },

  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'modules',
        loadComponent: () => import('./components/modules/module-list.component').then(c => c.ModuleListComponent)
      },

      {
        path: 'modules/:id',
        loadComponent: () => import('./components/modules/module-detail.component').then(m => m.ModuleDetailComponent),
        canActivate: [AuthGuard]
      },

      {
        path: 'favorites',
        loadComponent: () => import('./components/favorites/favorites.component').then(c => c.FavoritesComponent)
      },

      {
        path: 'modules/:moduleId/reflections',
        loadComponent: () => import('./components/reflections/reflection-form.component').then(m => m.ReflectionFormComponent),
        canActivate: [AuthGuard]
      },
    ]
  },
  
  // Default redirects
  { path: '', redirectTo: '/modules', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login' }
];