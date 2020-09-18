import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatDialog, MatSnackBar, MatSort } from '@angular/material';
import { CommonService } from 'src/app/utils/common-services/common-services';
import { DialogConfirm } from 'src/app/utils/dialog-confirm/dialog-confirm';
import { User } from 'src/app/utils/interface/user-interface';
import { Post } from '../../utils/interface/post-interface';
import { PostDialog } from './post-dialog/post-dialog';
import { PostService } from './post.component.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['id', 'title', 'userId', 'body', 'acctions'];
  dataSource: MatTableDataSource<Post>;
  confirmDialogRef: MatDialogRef<DialogConfirm>;
  modalPost: MatDialogRef<PostDialog>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private _postService: PostService,
    public _matDialog: MatDialog,
    public _snackBar: MatSnackBar,
    private _commonService: CommonService
  ) {

  }

  ngOnInit(): void {
    this._commonService.getUsers().then(result => {
      this.users = result;
    });
  }
  ngAfterViewInit(): void {
    this._postService.getPosts().then(results => {
      this.createNewDataSource(results);
    })
  }

  createNewDataSource(posts: any[]): void {
    this.dataSource = new MatTableDataSource<Post>(posts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  saveOrEditPost(post: Post): void {
    this.modalPost = this._matDialog.open(PostDialog, {
      disableClose: false,
      data: {
        post: post,
        users: this.users
      },
      width: '530px',
      height: '350px'
    });

    this.modalPost.afterClosed().subscribe(response => {
      if (response) {
        this._postService.savePost(response).then(result => {
          this._snackBar.open('Salvo com sucesso!!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        });
        if (response && response.id != undefined) {
          this.editPost(response);
        } else {
          this.createPost(response);
        }
      }
    });
  }

  createPost(object: Post): void{
    let newId = Math.max(...this.dataSource.data.map(d => d.id));
    object.id = newId + 1;
    this.dataSource.data.push(object);
    this.createNewDataSource(this.dataSource.data);  
  }

  editPost(object: Post): void{
    let post = this.dataSource.data.filter(a => a.id == object.id)[0];
    let index = this.dataSource.data.indexOf(post);
    this.dataSource.data[index] = object;
    this.createNewDataSource(this.dataSource.data);
  }

  deletePost(post: Post): void {
    this.confirmDialogRef = this._matDialog.open(DialogConfirm, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = "Deseja deletar o post selecionado?"
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._postService.deletePost(post.id).then(result => {
          this._snackBar.open('Deletado com sucesso!!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.dataSource.data = this.dataSource.data.filter(a => a.id != post.id);
        }).catch(() => {
        });
      }
    });
  }

  getUserName(idUser): any {
    return this.users.filter(u => u.id == idUser)[0].name;
  }
}
