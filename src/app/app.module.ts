import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { ToDoComponent } from './menu/to-do/to-do.component';
import { AlbumComponent } from './menu/album/album.component';
import { PostComponent } from './menu/post/post.component';
import { AlbumService } from './menu/album/album.component.service';
import { ToDoService } from './menu/to-do/to-do.component.service';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './menu/post/post.component.service';
import { DialogConfirm } from './utils/dialog-confirm/dialog-confirm';
import { AlbumDialog } from './menu/album/album-dialog/album-dialog';
import { PostDialog } from './menu/post/post-dialog/post-dialog';
import { ToDoDialog } from './menu/to-do/to-do-dialog/to-do-dialog';
import { CommonService } from './utils/common-services/common-services';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ToDoComponent,
    AlbumComponent,
    PostComponent,
    DialogConfirm,
    AlbumDialog,
    PostDialog,
    ToDoDialog
  ],
  entryComponents:[
    DialogConfirm,
    AlbumDialog,
    PostDialog,
    ToDoDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatExpansionModule,
    HttpClientModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  providers: [
    AlbumService, 
    ToDoService, 
    PostService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
