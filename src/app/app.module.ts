
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatMenuModule,
  MatPaginatorModule,
  MatDialogModule,
  MatTooltipModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { EntityDataModule, EntityDataService, EntityDefinitionService, EntityMetadataMap } from "@ngrx/data";
import { entityConfig } from "./entity.metadata";
import { PostDataService } from "./posts/post.data.service";
import { PostsResolver } from "./posts/post.resolver";
import { Post } from "./posts/post.model";

const entityMetadata: EntityMetadataMap = {
  Post: {
    sortComparer: sortByName,
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: false,
    },
  },
};

function sortByName(a: Post, b: Post): number {
  let comp = a.title.localeCompare(b.title);
  return comp;
}

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [PostDataService, PostsResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    PostsDataService: PostDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Post', PostsDataService);
  }
}
