import { Routes } from '@angular/router';
import { UserRegisteration } from './user-registeration/user-registeration';
import { Signin } from './signin/signin';
import { Dashboard } from './dashboard/dashboard';
import { redirectIfLoggedInGuard } from './redirect-if-logged-in-guard';
import { authGuard } from './auth-guard';



export const routes: Routes = [ {
    path: '', component: UserRegisteration, canActivate: [redirectIfLoggedInGuard],
 
  }, {
    path: 'dashboard', component: Dashboard, canActivate: [authGuard]
  }, {
    path: 'signin',component: Signin,canActivate: [redirectIfLoggedInGuard],
    
    
  },
 
 ];
