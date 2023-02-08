import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostService } from "../post.service";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;
  expanded:[] = [];
  posts$: Observable<Post[]>;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    // this.posts$ =
    //  this.postService.getAll().subscribe((data) => {
    //   this.posts = data
    //   console.log(data);
    // });

    this.postService.entities$.subscribe((posts) => {
      this.posts = posts
      console.log(posts);
    });
  }

  onDelete(postId: string) {
    // this.postsService.deletePost(postId);
    if (confirm('Are you sure you want to delete the post')) {
      this.postService.delete(postId);
    }
  }

  ngOnDestroy() {
    // this.postsSub.unsubscribe();
  }
}
