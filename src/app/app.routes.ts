import { Routes } from '@angular/router';
import { UserRegisteration } from './user-registeration/user-registeration';
import { Signin } from './signin/signin';
import { Dashboard } from './dashboard/dashboard';
import { redirectIfLoggedInGuard } from './redirect-if-logged-in-guard';
import { authGuard } from './auth-guard';



export const routes: Routes = [ {
    path: 'signin',
    loadComponent: () => import('./signin/signin').then(m => m.Signin),
    canMatch: [redirectIfLoggedInGuard]
  },
  {
    path: '',
    component:UserRegisteration,canMatch: [redirectIfLoggedInGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard),
    canMatch: [authGuard]
  }];
