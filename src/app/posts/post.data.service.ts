
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Update } from '@ngrx/entity';
import { Post } from './post.model';

@Injectable()
export class PostDataService extends DefaultDataService<Post> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): Observable<Post[]> {
    return this.http.get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
    .pipe(
      map(postData => {
        return postData.posts.map((post: any) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
          };
        });
      })
    )
  }

  // override add(post: Post): Observable<Post[]> {
  //   // const postData = new FormData();
  //   // postData.append("title", title);
  //   // postData.append("content", content);
  //   // postData.append("image", image, title);
  //   return this.http
  //     .post<{ message: string; post: Post }>(
  //       `http://localhost:3000/api/posts`,
  //       post
  //     )
  //     .pipe(
  //       map((responseData) => {
  //          let post: Post[];
  //          post.push( responseData.post);
  //         return post;
  //       })
  //     );
  // }

  override add(post: Post): Observable<Post> {
    console.log(post)
    return this.http
      .post<{ message: string }>(
        `http://localhost:3000/api/posts`,
        post
      ).pipe(
        map((data) => {
          return { ...post, id: data.message };
        })
      )
  }

  override delete(id: string): Observable<string> {
    return this.http
      .delete(`http://localhost:3000/api/posts/${id}`)
      .pipe(
        map((data) => {
          return id;
        })
      );
  }

  override update(postData: Update<Post>): Observable<Post> {
    return this.http.put<Post>(
      `http://localhost:3000/api/posts/` + postData.id, postData
    );
  }
}
