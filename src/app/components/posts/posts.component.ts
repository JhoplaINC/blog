import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  constructor(
    private postService: PostService
  ) {}
  
  posts: any[] = [];

  async ngOnInit() {
    await this.getPosts()
    console.log(this.posts)
  }
  
  async getPosts() {
    await this.postService.getPosts()
      .then((resp: any) => {
        resp.data.posts.forEach((post: any) => {
          this.posts.push(post);
        });
      })
      .catch((err: any ) => {
        console.log(err);
      })
  }

}
