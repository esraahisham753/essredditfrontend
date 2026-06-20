import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Home } from './home/home';
import { Login } from './auth/login/login';
import { CreateSubreddit } from './subreddit/create-subreddit/create-subreddit';
import { CreatePost } from './post/create-post/create-post';
import { ListSubreddits } from './subreddit/list-subreddits/list-subreddits';
import { ViewPost } from './post/view-post/view-post';
import { ViewSubreddit } from './subreddit/view-subreddit/view-subreddit';
import { UserProfile } from './user-profile/user-profile';
import { guardsGuard } from './auth/guards-guard';

export const routes: Routes = [
    { path: '',  component: Home},
    { path: 'signup', component: Signup },
    { path: 'login', component: Login },
    { path: 'create-subreddit', component: CreateSubreddit, canActivate: [guardsGuard] },
    { path: 'create-post', component: CreatePost, canActivate: [guardsGuard] },
    { path: 'subreddits', component: ListSubreddits },
    { path: 'posts/:id', component: ViewPost },
    { path: 'subreddits/:name', component: ViewSubreddit },
    { path: 'users/:username', component: UserProfile }
];
