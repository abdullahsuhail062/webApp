import { Routes } from '@angular/router';
import { UserRegisteration } from './user-registeration/user-registeration';
import { Signin } from './signin/signin';

export const routes: Routes = [{path: '', component: UserRegisteration},{path: 'signin', component: Signin}];
