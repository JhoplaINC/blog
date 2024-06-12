import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  faLike = faThumbsUp;
  faDislike = faThumbsDown;
  faView = faEye;
  
  posts: any[] = [];

  tag: string = '';

  ngOnInit() {
    this.route.params.subscribe(async params => {
      if(params['tag']) {
        this.tag = params['tag'];
        this.getPostsByTag(this.tag)
      } else {
        await this.getPosts()
      }
    });
  }
  
  async getPosts() {
    this.posts = [];
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
                lastName: userData.lastName,
                image: userData.image
              }
            })
            this.posts.sort((a, b) => a.id - b.id)
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

  async getPostsByTag(tag: any) {
    this.posts = [];
    console.log(tag)
    await this.postService.getPostsByTag(tag)
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
                lastName: userData.lastName,
                image: userData.image
              }
            })
            this.posts.sort((a, b) => a.id - b.id)
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
