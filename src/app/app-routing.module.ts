import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectLoggedInToHome = () => redirectLoggedInTo(['/user/home']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);


const routes: Routes = [ 
  { path: 'register', component: RegisterComponent,  ...canActivate(redirectLoggedInToHome) },
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome) },

  {
    path: 'user',
    loadChildren: () => import('./user-space/user-space.module').then(m => m.UserSpaceModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }