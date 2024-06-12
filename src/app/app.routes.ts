import { Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { IndexComponent } from './components/index/index.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home' , pathMatch: 'full'},
    { path: 'home', component: IndexComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'post/:id', component: PostComponent }
];
