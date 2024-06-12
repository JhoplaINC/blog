import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private postService: PostService,
  ) {}

  tags: any[] = [];

  ngOnInit() {
    this.getTags();
  }

  categoriesVisible: boolean = false;

  toggleCategories() {
    this.categoriesVisible = !this.categoriesVisible;
  }

  closeCategories() {
    this.categoriesVisible = false;
  }

  async getTags() {
    try {
      const resp: any = await this.postService.getAllPosts();
      let posts = resp.data.posts;
      const tagCount: { [key: string]: number } = {};

      posts.forEach((post: any) => {
        post.tags.forEach((tag: string) => {
          if (tagCount[tag]) {
            tagCount[tag]++;
          } else {
            tagCount[tag] = 1;
          }
        });
      });

      this.tags = Object.keys(tagCount).map(tag => ({
        name: tag,
        total: tagCount[tag]
      }));

      this.tags.sort((a, b) => b.total - a.total);
      console.log(this.tags)
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  }

}
