import { Routes } from '@angular/router';
import { UserRegisteration } from './user-registeration/user-registeration';
import { Signin } from './signin/signin';
import { Dashboard } from './dashboard/dashboard';
import { redirectIfLoggedInGuard } from './redirect-if-logged-in-guard';
import { authGuard } from './auth-guard';



export const routes: Routes = [ {
    path: 'signin',canActivate: [redirectIfLoggedInGuard],
    loadComponent: () => import('./signin/signin').then(m => m.Signin),
    
  },
  {
    path: '', canActivate: [redirectIfLoggedInGuard],
    loadComponent: () => import('./user-registeration/user-registeration').then(m => m.UserRegisteration), 
  },
  {
    path: 'dashboard', canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
  }];
