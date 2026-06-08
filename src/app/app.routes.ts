import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Home } from './home/home';
import { Login } from './auth/login/login';

export const routes: Routes = [
    { path: '',  component: Home},
    { path: 'signup', component: Signup },
    { path: 'login', component: Login }
];
