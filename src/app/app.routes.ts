import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Home } from './home/home';

export const routes: Routes = [
    { path: '',  component: Home},
    { path: 'signup', component: Signup },
];
