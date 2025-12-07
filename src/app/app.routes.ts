import { Routes } from '@angular/router';
import { UserRegisteration } from './user-registeration/user-registeration';
import { Signin } from './signin/signin';
import { Dashboard } from './dashboard/dashboard';
import { redirectIfLoggedInGuard } from './redirect-if-logged-in-guard';
import { authGuard } from './auth-guard';
import { App } from './app';



export const routes: Routes = [ 
  {

    path: 'user-registeration', component: UserRegisteration, canActivate: [redirectIfLoggedInGuard],
 
  },  {
    path: '',
    redirectTo: 'user-registeration',
    pathMatch: 'full'
  },{
    path: 'dashboard', component: Dashboard, canActivate: [authGuard]
  }, {
    path: 'signin',component: Signin,canActivate: [redirectIfLoggedInGuard],
    
    
  },
 
 ];
