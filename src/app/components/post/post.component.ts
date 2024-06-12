import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp, faThumbsDown, faEye } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService: UserService
    ) { }
    
  faLike = faThumbsUp;
  faDislike = faThumbsDown;
  faView = faEye;
  // postId!: number;
  post: {
    id: 0,
    title: '',
    body: '',
    reactions: {
      likes: 0,
      dislikes: 0,
      views: 0
    },
    tags: [],
    views: 0,
    user: {
      firstName: '',
      lastName: '',
      image: ''
    }
  } = {
    id: 0,
    title: '',
    body: '',
    reactions: {
      likes: 0,
      dislikes: 0,
      views: 0
    },
    tags: [],
    views: 0,
    user: {
      firstName: '',
      lastName: '',
      image: ''
    }
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPostData(params['id']);
    });
  }

  async getPostData(idPost: any) {
    await this.postService.getPost(idPost)
      .then(async (resp: any) => {
        this.post = resp.data;
        await this.userService.getUser(resp.data.userId)
          .then((resp: any) => {
            this.post.user = resp.data
          })
          console.log(this.post)
      })
      .catch((err: any) => {
        console.log(err);
      })
  }
}
