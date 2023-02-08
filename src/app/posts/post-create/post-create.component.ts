import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostsService } from "../posts.service";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";
import { PostService } from "../post.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string = '';
  expanded:[] = [];
  private mode = "create";
  private postId: string = '';

  constructor(
    public route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;

        this.postService.entities$.subscribe((posts) => {
          console.log(this.postId, posts[0].id)
          // const newPost =
          posts.filter((post) => {
            if( post.id === this.postId) {
              this.form.setValue({
                title: post.title,
                content: post.content,
              });
              console.log(post)
            } ;
          // console.log(newPost)
          console.log(posts)

          this.isLoading = false;
        })
        });

        // image: newPost.imagePath
        // this.postsService.getPost(this.postId).subscribe(postData => {
          // this.isLoading = false;
          // this.post = {
          //   id: postData._id,
          //   title: postData.title,
          //   content: postData.content,
          //   imagePath: postData.imagePath
          // };
          // this.form.setValue({
          //   title: this.post.title,
          //   content: this.post.content,
          //   image: this.post.imagePath
          // });
        // });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      const postPayload: Post = this.form.value;
      console.log(postPayload)
      this.postService.add(postPayload).subscribe((data) => {
        console.log(data)
        this.router.navigate(["/"]);
      });
    } else {
      const postPayload: Post = this.form.value;
      postPayload.id = this.postId;
      console.log(this.postId, this.form.value, postPayload)
      this.postService.update(postPayload);
      this.router.navigate(['/']);
    }
    this.form.reset();
  }

  onDelete(id: string) {
    console.log(id)
  }
}
