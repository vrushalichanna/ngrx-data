import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostsResolver } from "./posts/post.resolver";

const routes: Routes = [
  { path: '', component: PostListComponent , resolve: { posts: PostsResolver },},
  { path: 'create', component: PostCreateComponent, resolve: { posts: PostsResolver }, },
  { path: 'edit/:postId', component: PostCreateComponent, resolve: { posts: PostsResolver }, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
