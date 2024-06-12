import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { UserService } from '../../services/user.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp, faThumbsDown, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  faLike = faThumbsUp;
  faDislike = faThumbsDown;
  faView = faEye;
  
  posts: any[] = [];

  async ngOnInit() {
    await this.getPosts()
  }
  
  async getPosts() {
    await this.postService.getPosts()
      .then((resp: any) => {
        resp.data.posts.forEach(async (post: any) => {
          // this.posts.push(post);
          await this.userService.getUser(post.userId)
          .then((res: any) => {
            let userData = res.data;
            this.posts.push({
              id: post.id,
              title: post.title,
              body: post.body,
              tags: post.tags,
              views: post.views,
              reactions: post.reactions,
              user: {
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName
              }
            })
            this.posts.sort((a, b) => a.id - b.id)
            console.log(this.posts)
          })
          .catch((err: any) => {
            console.log(err);
          })
        });
      })
      .catch((err: any ) => {
        console.log(err);
      })
  }

}
